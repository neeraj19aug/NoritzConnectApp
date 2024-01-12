import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import {isIOS} from '../../services/Utils';
import Fonts from '../../services/Fonts';


const styles = StyleSheet.create ({
  mainContainer: {
    flex: 1,
  },
  headingView: {
    marginHorizontal : 15,
    marginTop: hp('2%')
  },
  headingText: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: hp('2%'),
    lineHeight: hp('3.5%')
  },
  avatar: {
    width: wp('5%'),
    height: wp('5%'),
  },
  button: {
    height: hp('4%'),
    width: wp('36%'),
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 5
  },
  continueText:{
    fontFamily: Fonts.spectralRegular,
    fontSize: hp('2%'),
  },
  checkBoxView: {
    // height: wp('5%'),
    // width: wp('5%'),
    // borderWidth: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginRight: wp('2.5%')
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('4%')

  },
  innerContainer: {
    // flex: 1,
    height: 'auto',
    backgroundColor: '#ffffff',
    margin: 15,
    paddingBottom: 10
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
  txtHeading: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('4.83%'),
    marginLeft: 15,
    marginTop: 10
  },
  callBtn: {
    width: 'auto',
    height: wp('15%'),
    // marginBottom: 15,
    marginTop: 20,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: hp('2.5%'),
    color: 'white'
  },

  setPadding: {padding: 20},
  setMarginTop: {marginTop: 20},
  titleTemperaturePopup: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('5%'),
    marginTop: 10,
    marginHorizontal: 10,
  },
  contentTemperaturePopup: {
    fontFamily: Fonts.oxygenLight,
    fontSize: wp('4%'),
    marginTop: 10,
    marginHorizontal: 10,
    lineHeight: wp('5%'),
    // lineSpacing: 5,
  },
  closeTemperaturePopup: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('5%'),
    position: 'absolute',
    width: 80,
    height: 40,
    right: 10,
    bottom: 0,
    textAlign: 'right',
  },
  temperaturePopup: {
    width: wp('65%'),
    height: wp('75%'),
    margin: 0,
  },
  cancelPopup: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('5%'),
    position: 'absolute',
    right: 100,
    bottom: -10,
    width: 90,
    height: 40,
  },
  btnAcceptStyle: {
    position: 'absolute',
    width: 80,
    height: 40,
    right: 10,
    bottom: -10,
  },
});

export default styles;
