
  import { postAPI } from '../../services/api';
  import {
    Apiversion, Devicetype, DevideID, cipherSecretKey
  } from '../../../env';
  import { encryptValue, md5 } from '../../services/Functions';
  
  export const getAppVersionData = async (userid, currentVersion, platform) => async (
    dispatch: ReduxDispatch
  ) => {
    dispatch({
      type: APP_VERSION_DATA_REQUEST
    });
  
    var dummyResponse = '{"responseMessage":"Success .","responseCode":200,"data":{"app_management_id":"1","ios_version":"1.1","android_version":"1.1","is_maintenance":1,"force_update":0,"recommend_update":0,"popup_text":"Due to recent updates, existing version of the app will no longer be working. To keep using the app, we request you to update the app by visiting the App Store.","allow_app_access":"1","timezone":"GMT","maintenance_start":"2024-01-01 11:00", "maintenance_end":"2024-01-01 :21:00","button_text":"OK"}}';
    var jsonObject = JSON.parse(dummyResponse);
    try {
      const url = 'Common/getAppVersionData';
      const inputCipher = Apiversion
        + cipherSecretKey
        + DevideID
        + cipherSecretKey
        + Devicetype
        + cipherSecretKey
        + userid
        + cipherSecretKey
        + currentVersion
        + cipherSecretKey
        + platform
        + cipherSecretKey;
      
      const output = await md5(inputCipher);
      const formdata = new FormData();
      formdata.append('iot_user_id', await encryptValue(userid));
      formdata.append('currentVersion', await encryptValue(currentVersion));
      formdata.append('platform', await encryptValue(platform));
      
      const header = {
        Devicetype,
        Cipher: output,
        Apiversion,
        Deviceid: DevideID,
      };
  
      const response = await postAPI(url, formdata, header);
  
      dispatch({
        type: APP_VERSION_DATA_SUCCESS,
        payload: response
      });
      return response;
    } catch (e) {
  
      dispatch({
        type: APP_VERSION_DATA_SUCCESS,
        payload: jsonObject
      });
      return jsonObject;    
      // dispatch({
      //   type: APP_VERSION_DATA_FAILURE,
      //   payload: e && e.message ? e.message : e
      // });
      // throw e;
    }
  };
  