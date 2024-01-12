import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isIphoneXorAbove } from '../services/Utils';
// import Fonts from '../services/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    // fontFamily: Fonts.RalewayRegular,
    fontSize: hp('2%'),
    letterSpacing: wp('0.5%'),
    marginTop: -6
  },
  headerStyle: {
    height: isIphoneXorAbove() ? hp('12.3%') : undefined,
  },
});

export default styles;
