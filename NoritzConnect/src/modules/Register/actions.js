import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const registerUser = async (fullName, email, password, fbUserId, twitterId, appleId) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: REGISTER_REQUEST
  });

  try {
    const url = 'User/RegisterUser';
    const inputCipher = `${Apiversion + cipherSecretKey + DevideID + cipherSecretKey + Devicetype + cipherSecretKey + fullName + cipherSecretKey}${cipherSecretKey}${cipherSecretKey}${cipherSecretKey}${email}${cipherSecretKey}${password}${cipherSecretKey}${fbUserId}${cipherSecretKey}${twitterId}${cipherSecretKey}${appleId}${cipherSecretKey}`;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('first_name', await encryptValue(fullName));
    formdata.append('last_name', await encryptValue(''));
    formdata.append('username', await encryptValue(''));
    formdata.append('address', await encryptValue(''));
    formdata.append('email', await encryptValue(email));
    formdata.append('password', await encryptValue(password));
    formdata.append('fb_id', await encryptValue(fbUserId));
    formdata.append('twitter_id', await encryptValue(twitterId));
    formdata.append('appleid', await encryptValue(appleId));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: e && e.message ? e.message : e
    });
    return e.message;
  }
};
