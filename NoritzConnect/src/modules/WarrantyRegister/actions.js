import {
  WARRANTY_REGISTER_REQUEST,
  WARRANTY_REGISTER_SUCCESS,
  WARRANTY_REGISTER_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const warrantyRegister = async (jsonString) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: WARRANTY_REGISTER_REQUEST
  });

  try {
    const url = 'Register/registrations';
    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + jsonString
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('registration_json', await encryptValue(jsonString));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: WARRANTY_REGISTER_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: WARRANTY_REGISTER_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
