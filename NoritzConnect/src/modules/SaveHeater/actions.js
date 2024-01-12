import {
  SAVEHEATER_REQUEST,
  SAVEHEATER_SUCCESS,
  SAVEHEATER_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const saveHeater = async (Model_name, Serial_number, Router_serial_num, iot_user_id, inThing, MaxTempSet, MinTempSet, macAddress, update, signal_strength) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: SAVEHEATER_REQUEST
  });

  try {
    const url = 'Heater/Save_heater';
    let inputCipher = '';

    inputCipher = Apiversion + cipherSecretKey + DevideID + cipherSecretKey + Devicetype + cipherSecretKey + Model_name + cipherSecretKey + Serial_number + cipherSecretKey + Router_serial_num + cipherSecretKey + iot_user_id + cipherSecretKey + inThing + cipherSecretKey + MaxTempSet + cipherSecretKey + MinTempSet + cipherSecretKey + macAddress + cipherSecretKey + update + cipherSecretKey + signal_strength + cipherSecretKey;

    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('Model_name', await encryptValue(Model_name));
    formdata.append('Serial_number', await encryptValue(Serial_number));
    formdata.append('Router_serial_num', await encryptValue(Router_serial_num));
    formdata.append('iot_user_id', await encryptValue(iot_user_id));
    formdata.append('inThing', await encryptValue(inThing));
    formdata.append('MaxTempSet', await encryptValue(MaxTempSet));
    formdata.append('MinTempSet', await encryptValue(MinTempSet));
    formdata.append('macAddress', await encryptValue(macAddress));
    formdata.append('update', await encryptValue(update));

    formdata.append('signal_strength', await encryptValue(signal_strength));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: SAVEHEATER_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: SAVEHEATER_FAILURE,
      payload: e && e.message ? e.message : e
    });
    return e.message;
  }
};
