import {Platform} from 'react-native';

// App all fonts
export default {
  oxygenBold: Platform.select({
    ios: 'Oxygen-Bold',
    android: 'oxygenbold',
  }),

  oxygenRegular: Platform.select({
    ios: 'Oxygen',
    android: 'oxygen',
  }),

  oxygenLight: Platform.select({
    ios: 'Oxygen-Light',
    android: 'oxygenlight',
  }),
};
