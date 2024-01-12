import {
  GETCONFIG_REQUEST,
  GETCONFIG_SUCCESS,
  GETCONFIG_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const getConfigdata = async (thingName) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETCONFIG_REQUEST
  });

  try {
    const url = 'Connect/getTemperatureBlock';

    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + thingName
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('inThing', await encryptValue(thingName));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: GETCONFIG_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: GETCONFIG_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
