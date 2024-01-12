import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import Fonts from '../../services/Fonts';

const styles = StyleSheet.create ({
  mainContainer: {
    flex: 1,
  },
  headingView: {
    marginHorizontal: 15,
    marginTop: hp('2%'),
  },
  headingText: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: hp('2.1%'),
    lineHeight: hp('4%'),
  },
  feedBackView: {
    marginHorizontal: 15,
    marginTop: hp('2%')
  },
  radioBtnView: {
    flexDirection: 'row',
    paddingVertical: hp('.8%'),
    borderColor: 'red',
    // borderWidth: 1,
    alignItems: 'center',
  },
  radioBtnText: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: hp('2%'),
    marginLeft: wp('5%'),
    lineHeight: hp('4%'),
  },
  avatar: {
    // borderWidth: 2,
    width: wp('6.5%'),
    height: wp('6.5%'),
  },
  feedBackText: {
    marginTop: hp('3%'),
    height: hp('25%'),
    borderWidth: 0.4,
    // borderRadius: 5,
    fontFamily: Fonts.oxygenRegular,
    fontSize: hp('1.7%'),
    paddingLeft: wp('2%')
  },
  button: {
    height: hp('4%'),
    width: wp('26%'),
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1.6
  },
  continueText:{
    fontFamily: Fonts.spectralRegular,
    fontSize: hp('2%'),
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
  }
});

export default styles;
