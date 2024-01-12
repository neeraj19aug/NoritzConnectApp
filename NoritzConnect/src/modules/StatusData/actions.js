import {
  STATUSDATA_REQUEST,
  STATUSDATA_SUCCESS,
  STATUSDATA_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const getStatusData = async (inThing, WH01, MRC, CanadaBit) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: STATUSDATA_REQUEST
  });

  try {
    const url = 'Connect/get_status_tab_data';

    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + inThing
      + cipherSecretKey
      + WH01
      + cipherSecretKey
      + MRC
      + cipherSecretKey
      + CanadaBit
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('inThing', await encryptValue(inThing));
    formdata.append('WH01', await encryptValue(WH01));
    formdata.append('MRC', await encryptValue(MRC));
    formdata.append('CanadaBit', await encryptValue(CanadaBit));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: STATUSDATA_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: STATUSDATA_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
