import axios from 'axios';
import { LocaleConfig } from 'react-native-calendars';
import I18n from '../i18n';
import * as Storage from './Storage';
import Global from './Global';
import Keys from './Keys';

export async function set() {
  // Set selected language
  await Storage.getData(Keys.language, (language) => {
    I18n.locale = language || Keys.english;
    LocaleConfig.defaultLocale = language || Keys.english;
  });
  // Set Axios headers default field
  await Storage.getData(Keys.authTokenKey, (token) => {
    // if (token) {
    this.setAxiosDefault(token);
    // }
  });
}

export function setAxiosDefault(token) {
  axios.defaults.baseURL = Global.apiBaseUrl;
  axios.defaults.headers.get[Keys.authTokenKey] = token;
  axios.defaults.headers.post[Keys.authTokenKey] = token;
}
