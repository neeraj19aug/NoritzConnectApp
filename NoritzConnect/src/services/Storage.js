/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';

export function storeData(key, value, action = () => { }) {
  return AsyncStorage.setItem(key, value)
    .then(action)
    .catch((error) => {
      console.log(`Failed to store value for ${key} key. Error: ${error}`);
    });
}

export function getDataForKey(key) {
  return AsyncStorage.getItem(key);
}

export function getData(key, action) {
  return AsyncStorage.getItem(key)
    .then(action)
    .catch((error) => {
      console.log(`Failed to get value for ${key} key. Error: ${error}`);
    });
}

export function getMultipleData(keys, action) {
  return AsyncStorage.multiGet(keys)
    .then(action)
    .catch((error) => {
      console.log(`Failed to get values for multple keys. Error: ${error}`);
    });
}

export function removeData(key, action) {
  AsyncStorage.removeItem(key)
    .then(action)
    .catch((error) => {
      console.log(`Failed to remove value for ${key} key. Error: ${error}`);
    });
}

export function clearAll(callback) {
  AsyncStorage.clear()
    .then(callback)
    .catch((error) => {
      console.log(`Failed to remove all key and values. Error: ${error}`);
    });
}
