import {
  EVENTDATA_REQUEST,
  EVENTDATA_SUCCESS,
  EVENTDATA_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const getEventData = async (inThing) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: EVENTDATA_REQUEST
  });

  try {
    const url = 'Connect/get_event_data';

    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + inThing
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('inThing', await encryptValue(inThing));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: EVENTDATA_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: EVENTDATA_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
