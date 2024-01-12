import {
  INSTALLERINFO_REQUEST,
  INSTALLERINFO_SUCCESS,
  INSTALLERINFO_FAILURE
} from './types';
import { postAPI } from '../../services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../../../env';
import { encryptValue, md5 } from '../../services/Functions';

export const getInstallerInfo = async (branch_name) => async (
  dispatch: ReduxDispatch
) => {
  dispatch({
    type: INSTALLERINFO_REQUEST
  });

  try {
    const url = 'Register/get_installer_details';

    const inputCipher = Apiversion
      + cipherSecretKey
      + DevideID
      + cipherSecretKey
      + Devicetype
      + cipherSecretKey
      + branch_name
      + cipherSecretKey;
    const output = await md5(inputCipher);
    const formdata = new FormData();
    formdata.append('branch_name', await encryptValue(branch_name));

    const header = {
      Devicetype,
      Cipher: output,
      Apiversion,
      Deviceid: DevideID,
    };

    const response = await postAPI(url, formdata, header);

    dispatch({
      type: INSTALLERINFO_SUCCESS,
      payload: response
    });
    return response;
  } catch (e) {
    dispatch({
      type: INSTALLERINFO_FAILURE,
      payload: e && e.message ? e.message : e
    });

    throw e;
  }
};
