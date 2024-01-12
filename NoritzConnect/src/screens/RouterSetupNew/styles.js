import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import Fonts from '../../services/Fonts';

const styles = {
  pageContainer: {
    flex: 1,
  },
  homeBGImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  backBtnContainer: {
    width: 100,
    height: 70,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  backIconStyle: {marginLeft: 20, marginTop: 20},
  imgWPSStyle: {width: wp('24.15%'), height: wp('10.70%')},
  wpsImageStyle: {width: wp('24.15%'), height: wp('10.70%')},
  setContentCenter: {justifyContent: 'center', alignItems: 'center'},
  bottomBlankView: {
    position: 'absolute',
    width: '100%',
    height: 40,
    left: 0,
    bottom: 0,
    backgroundColor: '#F2F2F2',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 20,
  },
  upperView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  Add_btn: {
    width: 70,
    height: 70,
    marginTop: 20,
  },
  txtTitle: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('5.07%'),
    padding: 0,
  },
  descriptionText: {
    fontFamily: Fonts.oxygenLight,
    fontSize: wp('4.83%'),
    textAlign: 'center',
    marginHorizontal: 20,
  },
  txtManually: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('4.53%'),
    padding: 0,
    marginTop: -15,
  },
  upperBGImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  btnBack: {
    width: wp('8%'),
    height: wp('8%'),
    position: 'absolute',
    left: 20,
    top: 20,
  },
};

export default styles;
