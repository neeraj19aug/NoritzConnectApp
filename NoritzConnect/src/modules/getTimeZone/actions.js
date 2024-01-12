import {
  GET_TIMEZONE_REQUEST,
  GET_TIMEZONE_SUCCESS,
  GET_TIMEZONE_FAILURE,
} from './types';
import {postAPI} from '../../services/api';

export const getTimeZone = async thingName => async (
  dispatch: ReduxDispatch,
) => {
  dispatch({
    type: GET_TIMEZONE_REQUEST,
  });

  try {
    const url =
      'https://connect.noritz.com/Thingworx/Things/thg_P900001/Services/getTimeZone?appKey=cd71486a-9d76-4246-b012-73be8bf8e88e';

    const formdata = new FormData();
    formdata.append('inThing', thingName);

    const body = {
      Contents: [('inThing': thingName)],
    };
    const header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const response = await postAPI(url, body, header);

    dispatch({
      type: GET_TIMEZONE_SUCCESS,
      payload: response,
    });
    return response;
  } catch (e) {
    dispatch({
      type: GET_TIMEZONE_FAILURE,
      payload: e && e.message ? e.message : e,
    });

    throw e;
  }
};
