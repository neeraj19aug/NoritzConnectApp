import {
  DELETEHEATER_REQUEST,
  DELETEHEATER_SUCCESS,
  DELETEHEATER_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const DeleteHeater = async (heater_id) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: DELETEHEATER_REQUEST
  });

  try {
    const url = 'Heater/Remove_heater';

    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + heater_id
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('heater_id', await encryptValue(heater_id));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: DELETEHEATER_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: DELETEHEATER_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
