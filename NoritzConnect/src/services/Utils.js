import {Platform, Dimensions} from 'react-native';
import Strings from './Strings';

export const isIOS = Platform.OS === 'ios';

export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) {
    return Strings.EMAIL_REQUIRED;
  }
  if (!re.test(email)) {
    return Strings.INVAILD_EMAILID;
  }

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) {
    return Strings.NAME_REQUIRED;
  }

  return '';
};

export const isIphoneXorAbove = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
};

export const dimensions = Dimensions.get('window');
export const screenWidth = dimensions.width;
export const screenHeight = dimensions.height;

export const isSmallAndroid = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'android' && (dimen.height <= 600 || dimen.width <= 400)
  );
};
