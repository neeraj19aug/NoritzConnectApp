import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Fonts from '../../services/Fonts';

const styles = {
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  setContentCenter: {justifyContent: 'center', alignItems: 'center'},
  homeBGImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 20
  },
  upperView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: wp('100%'),
    height: '50%',
    left: 0,
    top: 0
  },
  lowerView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: wp('100%'),
    height: '50%',
    left: 0,
    top: '50%'
  },
  orImage: {
    width: wp('13/33%'),
    height: wp('13.33%'),
    // position: 'absolute',
    // left: (wp('100%') - 50) / 2,
    // top: isIphoneXorAbove() ? (hp('100%') - 40) / 2 : (hp('100%') - 25) / 2,
  },
  Add_btn: {
    width: wp('18%'),
    height: wp('18%'),
    marginTop: 20
  },
  txtAddHearer: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('7%'),
    padding: 0
  },
  txtManually: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('4.8%'),
    padding: 0,
    marginTop: -15

  },
  upperBGImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  btnBack: {
    width: wp('8%'),
    height: wp('8%'),
    position: 'absolute',
    left: 20,
    top: 20
  },
  txtRemember: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('4.3%'),
    textAlign: 'center',
    lineHeight: wp('5.3%')
  },
};

export default styles;
