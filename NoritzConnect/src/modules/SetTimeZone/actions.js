import {
  SET_TIMEZONE_REQUEST,
  SET_TIMEZONE_SUCCESS,
  SET_TIMEZONE_FAILURE,
} from './types';
import {postAPI} from '../../services/api';
import {Apiversion, Devicetype, DevideID, cipherSecretKey} from '../../../env';
import {encryptValue, md5} from '../../services/Functions';

export const setTimeZone = async (inThing, inTimeZoneID, inEnableDST) => async (
  dispatch: ReduxDispatch,
) => {
  dispatch({
    type: SET_TIMEZONE_REQUEST,
  });

  try {
    const url = 'Timezone/setTimeZone';

    const inputCipher =
      Apiversion +
      cipherSecretKey +
      DevideID +
      cipherSecretKey +
      Devicetype +
      cipherSecretKey +
      inThing +
      cipherSecretKey +
      inTimeZoneID +
      cipherSecretKey +
      inEnableDST +
      cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('inThing', await encryptValue(inThing));
    formdata.append('inTimeZoneID', await encryptValue(inTimeZoneID));
    formdata.append('inEnableDST', await encryptValue(inEnableDST));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: SET_TIMEZONE_SUCCESS,
      payload: response,
    });
    return response;
  } catch (e) {
    dispatch({
      type: SET_TIMEZONE_FAILURE,
      payload: e && e.message ? e.message : e,
    });

    throw e;
  }
};
