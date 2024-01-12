import {
  CHANGETEMP_REQUEST,
  CHANGETEMP_SUCCESS,
  CHANGETEMP_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const ChangeTemperature = async (thingName, inTemperature, macAddress) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: CHANGETEMP_REQUEST
  });

  try {
    const url = 'Connect/turn_temp_updown';

    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + thingName
      + cipherSecretKey
      + inTemperature
      + cipherSecretKey
      + macAddress
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('inThing', await encryptValue(thingName));
    formdata.append('inTemperature', await encryptValue(inTemperature));
    formdata.append('macaddress', await encryptValue(macAddress));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: CHANGETEMP_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: CHANGETEMP_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
