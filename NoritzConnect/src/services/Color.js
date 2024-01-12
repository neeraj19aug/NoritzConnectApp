import { initialMode, eventEmitter } from 'react-native-dark-mode';

const lightTheme = {
  screenBackground: '#ffffff',
  whiteColor: '#FFFFFF',
  redColor: '#E13628',
  lightRed: '#f09a93',
  switchOffThumb: '#9b9b9b',
  switchOffTrack: '#cdcccd',
  maximumTrackTintColor: '#bdbdbd',
  graphBG: '#f7ebe9',
  cellTitleColor: '#000000',
  textInputTitleColor: '#9B9B9B',
  primaryBlackColor: '#4A4A4A',
  placeholder: '#9B9B9B',
  innerViewBackgroundColor: '#F9F9F9',
  faceBookColor: '#3B5998',
  twitterColor: '#4099FF',
  txtBlackColor: '#000000',
  xxxColor: '#A48C8C',
  btnDisableColor: '#AAAAAA',
  transparentColor: 'transparent',
  timeZoneBGColor: '#F1F1F1',
  headerBaseLine: '#E6E6E6',
  menuTextColor: '#434B52',
  pickerBG: '#E0E0E0',


};

const darkTheme = {
  screenBackground: '#ffffff',
  whiteColor: '#FFFFFF',
  redColor: '#E13628',
  lightRed: '#f09a93',
  switchOffThumb: '#9b9b9b',
  switchOffTrack: '#cdcccd',
  maximumTrackTintColor: '#bdbdbd',
  graphBG: '#f7ebe9',
  cellTitleColor: '#000000',
  textInputTitleColor: '#9B9B9B',
  primaryBlackColor: '#4A4A4A',
  placeholder: '#9B9B9B',
  innerViewBackgroundColor: '#F9F9F9',
  faceBookColor: '#3B5998',
  twitterColor: '#4099FF',
  txtBlackColor: '#000000',
  xxxColor: '#A48C8C',
  btnDisableColor: '#AAAAAA',
  transparentColor: 'transparent',
  timeZoneBGColor: '#F1F1F1',
  headerBaseLine: '#E6E6E6',
  menuTextColor: '#434B52',
    pickerBG: '#E0E0E0',






};

let theme = initialMode;

eventEmitter.on('currentModeChanged', (newMode) => {
  theme = newMode;
});

export function getColors() {
  return theme === 'dark' ? darkTheme : lightTheme;
}

export default getColors();
