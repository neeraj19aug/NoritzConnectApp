import {
    DELETE_FAILURE, DELETE_REQUEST,DELETE_SUCCESS
  } from './types';
  import { postAPI } from '../../services/api';
  import {
    Apiversion, Devicetype, DevideID, cipherSecretKey
  } from '../../../env';
  import { encryptValue, md5 } from '../../services/Functions';

  export const deleteUser = async (userId, feedbackHeading, feedbackText) => async (
    dispatch: ReduxDispatch
  ) => {
    dispatch({
      type: DELETE_REQUEST
    });
    console.log('delete header', userId, feedbackHeading, feedbackText)
    try {
      const url = 'User/deleteUser';
      const inputCipher = Apiversion + cipherSecretKey + DevideID + cipherSecretKey + Devicetype + cipherSecretKey + userId + cipherSecretKey + feedbackHeading + cipherSecretKey + feedbackText + cipherSecretKey;
      const output = await md5(inputCipher);
      const formdata = new FormData();
      formdata.append('userId', await encryptValue(userId));
      formdata.append('feedbackHeading', await encryptValue(feedbackHeading));
      formdata.append('feedbackText', await encryptValue(feedbackText));
  
      const header = {
        Devicetype,
        Cipher: output,
        Apiversion,
        Deviceid: DevideID,
      };
  
      const response = await postAPI(url, formdata, header);
      console.log('api response', response);
  
      dispatch({
        type: DELETE_SUCCESS,
        payload: response
      });
      return response;
    } catch (e) {
      dispatch({
        type: DELETE_FAILURE,
        payload: e && e.message ? e.message : e
      });
  
      throw e;
    }
  };