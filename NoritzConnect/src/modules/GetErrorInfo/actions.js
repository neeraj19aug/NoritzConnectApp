import {
  GETERRORINFO_REQUEST,
  GETERRORINFO_SUCCESS,
  GETERRORINFO_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const getErrorInfo = async (thingName, user_id, WH01, Device_token) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETERRORINFO_REQUEST
  });

  try {
    const url = 'Connect/get_error_code_details';

    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + thingName
      + cipherSecretKey
      + user_id
      + cipherSecretKey
      + WH01
      + cipherSecretKey
      + Device_token
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('inThing', await encryptValue(thingName));
    formdata.append('user_id', await encryptValue(user_id));
    formdata.append('WH01', await encryptValue(WH01));
    formdata.append('Device_token', await encryptValue(Device_token));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: GETERRORINFO_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: GETERRORINFO_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
