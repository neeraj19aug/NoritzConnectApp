import {
  RECIRCULATION_ONOFF_REQUEST,
  RECIRCULATION_ONOFF_SUCCESS,
  RECIRCULATION_ONOFF_FAILURE,
} from './types';
import {postAPI} from '../../services/api';
import {Apiversion, Devicetype, DevideID, cipherSecretKey} from '../../../env';
import {encryptValue, md5} from '../../services/Functions';

export const recirculationpower = async (inThing, inStatus) => async (
  dispatch: ReduxDispatch,
) => {
  dispatch({
    type: RECIRCULATION_ONOFF_REQUEST,
  });
  try {
    const url = 'Recirculation/requestInstantStartStop';
    console.log('recirculationpower calling');

    const inputCipher =
      Apiversion +
      cipherSecretKey +
      DevideID +
      cipherSecretKey +
      Devicetype +
      cipherSecretKey +
      inThing +
      cipherSecretKey +
      inStatus +
      cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('inThing', await encryptValue(inThing));
    formdata.append('inStatus', await encryptValue(inStatus));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: RECIRCULATION_ONOFF_SUCCESS,
      payload: response,
    });
    return response;
  } catch (e) {
    dispatch({
      type: RECIRCULATION_ONOFF_FAILURE,
      payload: e && e.message ? e.message : e,
    });

    throw e;
  }
};
