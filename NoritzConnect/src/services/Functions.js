/* eslint-disable no-useless-escape */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import { NativeModules } from 'react-native';

const { aes } = NativeModules;

// Method to aes encrypt
export function encryptValue(encryptvalue) {
  return new Promise((resolve, reject) => {
    aes.encrypt(encryptvalue, (error, encryptedvalue) => {
      if (error) {
        // console.error(error);
        reject(error);
      } else {
        // console.log('encryptedvalue ------ ', encryptedvalue);
        resolve(encryptedvalue);
      }
    });
  });
}

// Method to aes decrypt
export function decryptValue(decryptvalue) {
  return new Promise((resolve, reject) => {
    aes.decrypt(decryptvalue, (error, decryptedvalue) => {
      if (error) {
        console.log('decrypt error ------ ', error);

        reject(error);
      } else {
        resolve(decryptedvalue);
      }
    });
  });
}

export function md5(value) {
  return new Promise((resolve, reject) => {
    aes.md5(value, (error, encryptedvalue) => {
      if (error) {
        console.log('md5 error value ------ ', error);

        console.error(error);
        reject(error);
      } else {
        console.log('md5 value ------ ', encryptedvalue);
        resolve(encryptedvalue);
      }
    });
  });
}

// Method to vaildate the email id
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// Method to vaildate the email id
export function showAlert(message, duration) {
  setTimeout(() => {
    alert(message);
  }, duration);
}

export function stringToHex(str) {
  const arr1 = [];
  for (let n = 0, l = str.length; n < l; n += 1) {
    const hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
}
