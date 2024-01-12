import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const loginUser = async (email, password, fbUserId, twitterId, flag, device_token, appleid) => async (
  dispatch: ReduxDispatch
) => {
  console.log('loginUser API called:');


  dispatch({
    type: LOGIN_REQUEST
  });


  try {
    const url = 'User/LogInNew';
    const inputCipher = Apiversion + cipherSecretKey + DevideID + cipherSecretKey + Devicetype + cipherSecretKey + email + cipherSecretKey + password + cipherSecretKey + fbUserId + cipherSecretKey + twitterId + cipherSecretKey + flag + cipherSecretKey + device_token + cipherSecretKey + appleid + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('email', await encryptValue(email));
    formdata.append('password', await encryptValue(password));
    formdata.append('fb_id', await encryptValue(fbUserId));
    formdata.append('twitter_id', await encryptValue(twitterId));
    formdata.append('LogInFlag', await encryptValue(flag));
    formdata.append('device_token', await encryptValue(device_token));
    formdata.append('appleid', await encryptValue(appleid));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };
    console.log('Login API request:', formdata);
    const response = await postAPI(url, formdata, header);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
