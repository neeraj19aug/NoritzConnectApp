import {
  GETINITIAL_REQUEST,
  GETINITIAL_SUCCESS,
  GETINITIAL_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const getInitialdata = async (inSerialnumber, macAddress, inThing, update) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: GETINITIAL_REQUEST
  });

  try {
    const url = 'Connect/getinitial';

    let inputCipher = '';
    if (inThing === '') {
      inputCipher = Apiversion
        + cipherSecretKey
        + DevideID
        + cipherSecretKey
        + Devicetype
        + cipherSecretKey
        + inSerialnumber
        + cipherSecretKey
        + macAddress
        + cipherSecretKey
        + update
        + cipherSecretKey;
    } else {
      inputCipher = Apiversion
        + cipherSecretKey
        + DevideID
        + cipherSecretKey
        + Devicetype
        + cipherSecretKey
        + inThing
        + cipherSecretKey
        + inSerialnumber
        + cipherSecretKey
        + macAddress
        + cipherSecretKey
        + update
        + cipherSecretKey;
    }

    const output = await md5(inputCipher);

    const formdata = new FormData();
    if (inThing === '') {
      formdata.append('inSerialnumber', await encryptValue(inSerialnumber));
      formdata.append('macAddress', await encryptValue(macAddress));
      formdata.append('update', await encryptValue(update));
    } else {
      formdata.append('inThing', await encryptValue(inThing));
      formdata.append('inSerialnumber', await encryptValue(inSerialnumber));
      formdata.append('macAddress', await encryptValue(macAddress));
      formdata.append('update', await encryptValue(update));
    }

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: GETINITIAL_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: GETINITIAL_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
