import {
  METADATA_REQUEST,
  METADATA_SUCCESS,
  METADATA_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const getMetadata = async (user_id) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: METADATA_REQUEST
  });

  try {
    const url = 'Common/Get_metadata';

    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + user_id
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('iot_user_id', await encryptValue(user_id));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: METADATA_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: METADATA_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
