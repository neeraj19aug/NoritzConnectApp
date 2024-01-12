import {
  CHANGEHEATER_REQUEST,
  CHANGEHEATER_SUCCESS,
  CHANGEHEATER_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const changeHeater = async (heater_id, iot_user_id) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: CHANGEHEATER_REQUEST
  });

  try {
    const url = 'Connect/update_last_connnected_heater_details';

    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + heater_id
      + cipherSecretKey
      + iot_user_id
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('heater_id', await encryptValue(heater_id));
    formdata.append('iot_user_id', await encryptValue(iot_user_id));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: CHANGEHEATER_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: CHANGEHEATER_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
