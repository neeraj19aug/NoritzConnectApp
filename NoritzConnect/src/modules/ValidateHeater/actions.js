import {
  VALIDATE_HEATER_REQUEST,
  VALIDATE_HEATER_SUCCESS,
  VALIDATE_HEATER_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const validateHeater = async (Model_name, Serial_number) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: VALIDATE_HEATER_REQUEST
  });

  try {
    const url = 'Heater/Validate_heater';
    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + Model_name
      + cipherSecretKey
      + Serial_number
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('Model_name', await encryptValue(Model_name));
    formdata.append('Serial_number', await encryptValue(Serial_number));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: VALIDATE_HEATER_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: VALIDATE_HEATER_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
