/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
// static NSString *urlServer=@"http://noritzprocard.dev2.bigideas.io/development/API/IOT/%@";// Dev
// static NSString *urlServer=@"http://noritzprocard.dev2.bigideas.io/API/IOT/%@";// test
// static NSString *urlServer=@"http://procard-staging.bigideas.io/API/IOT/%@";// staging
// static NSString *urlServer=@"http://procard.noritz.com/API/IOT/%@";// live

import {Platform} from 'react-native';

// export const API_ROOT = 'https://noritz-procard-staging.web-preview.xyz/API/IOT'; // Staging
export const API_ROOT = 'https://procard.noritz.com/API/IOT'; // live
export const cipherSecretKey = 'x%&*';
export const Apiversion = '2.0';
export const Devicetype = Platform.OS;
export const DevideID = Math.floor(100000 + Math.random() * 900000).toString();
export const device_token = 'token';

// module.exports = {
//   // API_ROOT: 'http://procard.noritz.com/API/IOT',

//   API_ROOT: 'http://procard-staging.bigideas.io/API/IOT', // 'http://procard.noritz.com/API/IOT',
//   cipherSecretKey: 'x%&*',
//   Apiversion: '1.0',
//   Devicetype: Platform.OS,
//   DevideID: '123456789',
//   device_token: '1234567890'

// };
