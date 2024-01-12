import {
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const forgotUser = async (email) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: FORGOT_REQUEST
  });

  try {
    const url = 'User/ForgotPasswordProcessIOT';

    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + email
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('email', await encryptValue(email));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: FORGOT_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: FORGOT_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
