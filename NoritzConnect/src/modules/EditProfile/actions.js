import {
  EDITPROFILE_REQUEST,
  EDITPROFILE_SUCCESS,
  EDITPROFILE_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const EditProfile = async (first_name, last_name, address, phone, email, username, state, city, zip, iot_user_id) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: EDITPROFILE_REQUEST
  });

  try {
    const url = 'User/Edit_profile';

    const formdata = new FormData();
    let inputCipher = Apiversion + cipherSecretKey + DevideID + cipherSecretKey + Devicetype + cipherSecretKey;
    if (first_name != null) {
      inputCipher = inputCipher + first_name + cipherSecretKey;
      formdata.append('first_name', await encryptValue(first_name));
    }
    if (last_name != null) {
      inputCipher = inputCipher + last_name + cipherSecretKey;
      formdata.append('last_name', await encryptValue(last_name));
    }
    if (address != null) {
      inputCipher = inputCipher + address + cipherSecretKey;
      formdata.append('address', await encryptValue(address));
    }
    if (phone != null) {
      inputCipher = inputCipher + phone + cipherSecretKey;
      formdata.append('phone', await encryptValue(phone));
    }
    if (email != null) {
      inputCipher = inputCipher + email + cipherSecretKey;
      formdata.append('email', await encryptValue(email));
    }
    if (username != null && username !== '') {
      inputCipher = inputCipher + username + cipherSecretKey;
      formdata.append('username', await encryptValue(username));
    }
    if (state != null) {
      inputCipher = inputCipher + state + cipherSecretKey;
      formdata.append('state', await encryptValue(state));
    }
    if (city != null) {
      inputCipher = inputCipher + city + cipherSecretKey;
      formdata.append('city', await encryptValue(city));
    }
    if (zip != null) {
      inputCipher = inputCipher + zip + cipherSecretKey;
      formdata.append('zip', await encryptValue(zip));
    }
    if (iot_user_id != null) {
      inputCipher = inputCipher + iot_user_id + cipherSecretKey;
      formdata.append('iot_user_id', await encryptValue(iot_user_id));
    }

    const output = await md5(inputCipher);

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: EDITPROFILE_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: EDITPROFILE_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
