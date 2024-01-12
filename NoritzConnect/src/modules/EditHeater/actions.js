import {
  EDITHEATER_REQUEST,
  EDITHEATER_SUCCESS,
  EDITHEATER_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const EditHeater = async (heater_id, heater_friendly_name, preferred_contractor_id, iot_user_id, company_id) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: EDITHEATER_REQUEST
  });

  try {
    const url = 'Heater/Update_heater';

    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + heater_id
      + cipherSecretKey
      + heater_friendly_name
      + cipherSecretKey
      + preferred_contractor_id
      + cipherSecretKey
      + iot_user_id
      + cipherSecretKey
      + company_id
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('heater_id', await encryptValue(heater_id));
    formdata.append('heater_friendly_name', await encryptValue(heater_friendly_name));
    formdata.append('preferred_contractor_id', await encryptValue(preferred_contractor_id));
    formdata.append('iot_user_id', await encryptValue(iot_user_id));
    formdata.append('company_id', await encryptValue(company_id));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: EDITHEATER_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: EDITHEATER_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
