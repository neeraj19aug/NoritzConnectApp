import {
  INSTANT_RESERVE_REQUEST,
  INSTANT_RESERVE_SUCCESS,
  INSTANT_RESERVE_FAILURE,
} from './types';
import {postAPI} from '../../services/api';
import {Apiversion, Devicetype, DevideID, cipherSecretKey} from '../../../env';
import {encryptValue, md5} from '../../services/Functions';

export const setInstantReserve = async (inThing, slots) => async (
  dispatch: ReduxDispatch,
) => {
  dispatch({
    type: INSTANT_RESERVE_REQUEST,
  });
  try {
    const url = 'Recirculation/requestInstantReserve';
    console.log('recirculationpower calling');

    let inputCipher =
      Apiversion +
      cipherSecretKey +
      DevideID +
      cipherSecretKey +
      Devicetype +
      cipherSecretKey +
      inThing +
      cipherSecretKey;

    for (let i = 0; i < slots.length; i++) {
      inputCipher = inputCipher + slots[i] + cipherSecretKey;
    }

    console.log('setInstantReserve inputCipher', inputCipher);

    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('inThing', await encryptValue(inThing));
    formdata.append('inReserveTime1', await encryptValue(slots[0]));
    formdata.append('inReserveTime2', await encryptValue(slots[1]));
    formdata.append('inReserveTime3', await encryptValue(slots[2]));
    formdata.append('inReserveTime4', await encryptValue(slots[3]));
    formdata.append('inReserveTime5', await encryptValue(slots[4]));
    formdata.append('inReserveTime6', await encryptValue(slots[5]));
    formdata.append('inReserveTime7', await encryptValue(slots[6]));
    formdata.append('inReserveTime8', await encryptValue(slots[7]));
    formdata.append('inReserveTime9', await encryptValue(slots[8]));
    formdata.append('inReserveTime10', await encryptValue(slots[9]));
    formdata.append('inReserveTime11', await encryptValue(slots[10]));
    formdata.append('inReserveTime12', await encryptValue(slots[11]));
    formdata.append('inReserveTime13', await encryptValue(slots[12]));
    formdata.append('inReserveTime14', await encryptValue(slots[13]));
    formdata.append('inReserveTime15', await encryptValue(slots[14]));
    formdata.append('inReserveTime16', await encryptValue(slots[15]));
    formdata.append('inReserveTime17', await encryptValue(slots[16]));
    formdata.append('inReserveTime18', await encryptValue(slots[17]));
    formdata.append('inReserveTime19', await encryptValue(slots[18]));
    formdata.append('inReserveTime20', await encryptValue(slots[19]));
    formdata.append('inReserveTime21', await encryptValue(slots[20]));
    formdata.append('inReserveTime22', await encryptValue(slots[21]));
    formdata.append('inReserveTime23', await encryptValue(slots[22]));
    formdata.append('inReserveTime24', await encryptValue(slots[23]));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: INSTANT_RESERVE_SUCCESS,
      payload: response,
    });
    return response;
  } catch (e) {
    dispatch({
      type: INSTANT_RESERVE_FAILURE,
      payload: e && e.message ? e.message : e,
    });

    throw e;
  }
};
