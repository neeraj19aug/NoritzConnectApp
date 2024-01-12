import {
  ONDEMAND_ONOFF_REQUEST,
  ONDEMAND_ONOFF_SUCCESS,
  ONDEMAND_ONOFF_FAILURE,
} from './types';
import {postAPI} from '../../services/api';
import {Apiversion, Devicetype, DevideID, cipherSecretKey} from '../../../env';
import {encryptValue, md5} from '../../services/Functions';

export const ondemandpower = async (inThing, inValue) => async (
  dispatch: ReduxDispatch,
) => {
  dispatch({
    type: ONDEMAND_ONOFF_REQUEST,
  });
  try {
    const url = 'Recirculation/requestInstantOnDemandOffTimer';

    const inputCipher =
      Apiversion +
      cipherSecretKey +
      DevideID +
      cipherSecretKey +
      Devicetype +
      cipherSecretKey +
      inThing +
      cipherSecretKey +
      inValue +
      cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('inThing', await encryptValue(inThing));
    formdata.append('inValue', await encryptValue(inValue));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: ONDEMAND_ONOFF_SUCCESS,
      payload: response,
    });
    return response;
  } catch (e) {
    dispatch({
      type: ONDEMAND_ONOFF_FAILURE,
      payload: e && e.message ? e.message : e,
    });

    throw e;
  }
};
