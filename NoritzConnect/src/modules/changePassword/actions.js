import {
  CHANGEPASSWORD_REQUEST,
  CHANGEPASSWORD_SUCCESS,
  CHANGEPASSWORD_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const ChangePassword = async (password, iot_user_id) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: CHANGEPASSWORD_REQUEST
  });

  try {
    const url = 'User/Edit_profile';

    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + password
      + cipherSecretKey
      + iot_user_id
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('password', await encryptValue(password));
    formdata.append('iot_user_id', await encryptValue(iot_user_id));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: CHANGEPASSWORD_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: CHANGEPASSWORD_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
