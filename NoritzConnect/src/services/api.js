/* eslint-disable no-useless-catch */
/* eslint-disable no-underscore-dangle */
import Promise from 'bluebird';
import HttpError from 'standard-http-error';
import {getConfiguration} from './configuration';

const TIMEOUT = 30000;

export async function get(path) {
  return bodyOf(requestAPI('get', path, null));
}

export async function postAPI(path, body, header) {
  return bodyOf(requestAPI('POST', path, body, header));
}

export async function requestAPI(method, path, body, header) {
  try {
    const response = await sendRequestAPI(method, path, body, header);
    return handleResponse(path, response);
  } catch (error) {
    throw error;
  }
}

async function sendRequestAPI(method, path, body, header) {
  try {
    const endpoint = url(path);
    const headers = header;
    const options = {method, headers, body};
    console.log('url---', endpoint);
    console.log('headers---', headers);
    console.log('options---', options);

    return timeout(fetch(endpoint, options), TIMEOUT);
  } catch (e) {
    throw new Error(e);
  }
}
/*
fetch('http://api.treatmd.com/api/users/sign_in', {
     method: 'POST',
     headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
     },
     body: formBody
 }
*/

/**
 * Takes a relative path and makes it a full URL to API server
 */
export function url(path) {
  if (path.includes('http')) {
    return path;
  } else {
    const apiRoot = getConfiguration('API_ROOT');
    return path.indexOf('/') === 0 ? apiRoot + path : `${apiRoot}/${path}`;
  }
}

/**
 * Receives and reads a HTTP response
 */
async function handleResponse(path, response) {
  // eslint-disable-next-line no-useless-catch
  try {
    const {status} = response;

    // `fetch` promises resolve even if HTTP status indicates failure. Reroute
    // promise flow control to interpret error responses as failures
    if (status >= 400) {
      const message = await getErrorMessageSafely(response);
      const error = new HttpError(status, message);

      // emit events on error channel, one for status-specific errors and other for all errors
      //      errors.emit(status.toString(), {path, message: error.message});
      //      errors.emit('*', {path, message: error.message}, status);

      throw error;
    }

    // parse response text
    const responseBody = await response.text();
    return {
      status: response.status,
      headers: response.headers,
      body: responseBody ? JSON.parse(responseBody) : null,
    };
  } catch (e) {
    throw e;
  }
}

// try to get the best possible error message out of a response
// without throwing errors while parsing
async function getErrorMessageSafely(response) {
  try {
    const body = await response.text();
    if (!body) {
      return '';
    }

    // Optimal case is JSON with a defined message property
    const payload = JSON.parse(body);
    if (payload && payload.message) {
      return payload.message;
    }

    // Should that fail, return the whole response body as text
    return body;
  } catch (e) {
    // Unreadable body, return whatever the server returned
    return response._bodyInit;
  }
}

/**
 * Rejects a promise after `ms` number of milliseconds, it is still pending
 */
function timeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error('Server is not responding. Please try again.')),
      ms,
    );
    promise
      .then(response => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(reject);
  });
}

async function bodyOf(requestPromise) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await requestPromise;
    return response.body;
  } catch (e) {
    throw e;
  }
}
