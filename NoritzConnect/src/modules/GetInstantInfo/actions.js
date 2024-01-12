import {
  GET_INSTANTINFO_REQUEST,
  GET_INSTANTINFO_SUCCESS,
  GET_INSTANTINFO_FAILURE,
} from './types';
import {postAPI} from '../../services/api';
import {Apiversion, Devicetype, DevideID, cipherSecretKey} from '../../../env';
import {encryptValue, md5} from '../../services/Functions';

export const getInstantInfo = async inThing => async (
  dispatch: ReduxDispatch,
) => {
  dispatch({
    type: GET_INSTANTINFO_REQUEST,
  });

  try {
    const url = 'Recirculation/getInstantInfo';

    const inputCipher =
      Apiversion +
      cipherSecretKey +
      DevideID +
      cipherSecretKey +
      Devicetype +
      cipherSecretKey +
      inThing +
      cipherSecretKey;
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
      type: GET_INSTANTINFO_SUCCESS,
      payload: response,
    });
    return response;
  } catch (e) {
    dispatch({
      type: GET_INSTANTINFO_FAILURE,
      payload: e && e.message ? e.message : e,
    });

    throw e;
  }
};
