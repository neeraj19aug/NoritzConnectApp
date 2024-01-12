import Fonts from '../../services/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isIphoneXorAbove} from '../../services/Utils';

const styles = {
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    padding: wp('11.25%'),
    justifyContent: 'center',
  },
  btnSignInStyle: {marginTop: 10},
  txtForgot: {color: '#000000', marginTop: 4, marginLeft: 0},
  orViewContainer: {
    flexDirection: 'row',
    height: wp('4.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  orLineView: {
    backgroundColor: '#000000',
    height: 1,
    width: wp('32.7%'),
  },
  appleButtonStyle: {
    width: '90%', // You must specify a width
    height: wp('13.88%'), // You must specify a height
    marginTop: hp('1.5%'),
  },
  faceBookBtnStyle: {marginTop: hp('1.5%')},
  btnRegisterStyle: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: wp('100%'),
    height: isIphoneXorAbove() ? 20 + wp('15%') : wp('15%'),
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  homeBGImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  imgBackgroundStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: wp('100%'),
    height: hp('100%'),
    opacity: 0.4,
  },
  txtField: {marginHorizontal: -15},
  imgCheckStyle: {width: wp('4%'), height: wp('4%')},
  imgLogoStyle: {width: '45%', height: hp('10%'), marginTop: -40},
  innerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 4,
  },
  text: {
    fontSize: 17,
    color: 'black',
    padding: 10,
  },

  btnTextHolder: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    marginVertical: 5,
  },

  cellView: {
    width: 'auto',
    height: wp('20.05%'),
    // marginTop: 16,
    // marginHorizontal: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rememberBG: {
    width: '100%',
    height: 40,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  txtRemember: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('4.5%'),
    marginLeft: 15,
    color: '#000000',
  },
  txtOr: {
    fontFamily: Fonts.oxygenLight,
    fontSize: wp('4.5%'),
    color: '#000000',
    marginHorizontal: 10,
  },

  txtRegister: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('4.5%'),
  },
  btnText: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('5%'),
    color: 'white',
  },
  setPadding: {
    padding: 10,
  },
  revokePopup: {
    width: wp('70%'),
    height: wp('85%'),
    margin: 0,
    padding:0,
  },
  cancelPopup: {
    position: 'absolute',
    right: wp('-3%'),
    bottom: -15,
    width: wp('20%'),
    height: hp('5%'),
  },

  closeTemperaturePopup: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('4.5%'),
    textAlign: 'center',
  },
  titleTemperaturePopup: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('5%'),
    marginTop: 10,
    // marginHorizontal: 10,
  },
  contentTemperaturePopup: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('4.2%'),
    marginTop: 15,
    lineHeight: wp('6%'),
  },
  clickHere: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('4%'),
    color: '#000000',
  },

  avatar: {
    width: wp('4%'),
    height: wp('4%'),
    marginTop: 5,
    marginRight: 10
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: hp('1%')

  },
};

export default styles;
