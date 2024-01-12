import {
  HEATERON_OFF_REQUEST,
  HEATERON_OFF_SUCCESS,
  HEATERON_OFF_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const heateronoff = async (thingName, inStatus, macAddress) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: HEATERON_OFF_REQUEST
  });

  try {
    const url = 'Connect/turn_heater_onoff';

    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + thingName
      + cipherSecretKey
      + inStatus
      + cipherSecretKey
      + macAddress
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('inThing', await encryptValue(thingName));
    formdata.append('inStatus', await encryptValue(inStatus));
    formdata.append('macaddress', await encryptValue(macAddress));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: HEATERON_OFF_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: HEATERON_OFF_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
