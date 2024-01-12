import {
  GET_RECIRC_DATA_REQUEST,
  GET_RECIRC_DATA_SUCCESS,
  GET_RECIRC_DATA_FAILURE,
} from './types';
import {postAPI} from '../../services/api';
import {Apiversion, Devicetype, DevideID, cipherSecretKey} from '../../../env';
import {encryptValue, md5} from '../../services/Functions';

export const getRecircData =
  async (inThing) => async (dispatch: ReduxDispatch) => {
    dispatch({
      type: GET_RECIRC_DATA_REQUEST,
    });

    try {
      const url = 'Recirculation/get_recirculation_data';

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

      console.log('recirc data response---', response);

      dispatch({
        type: GET_RECIRC_DATA_SUCCESS,
        payload: response,
      });
      return response;
    } catch (e) {
      console.log('recirc data response error---', e);

      dispatch({
        type: GET_RECIRC_DATA_FAILURE,
        payload: e && e.message ? e.message : e,
      });

      throw e;
    }
  };
