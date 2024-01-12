import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../services/Fonts';

const styles = {
  pageContainer: {
    flex: 1,
    paddingBottom: 15

  },
  setPaddingZero: {padding: 0},
  setMarginTopZero: {marginTop: 0},
  installerPickerBG: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  scrollViewPredBG: {
    height: 200,
    width: 'auto',
    backgroundColor: 'white',
    marginHorizontal: 15,
  },
  setMarginTop: {marginTop: 20},
  setHeaterLabelWidth: {width: '75%'},
  setMarginLeft: {marginLeft: 20},
  setBlockWidth: {width: '95%'},
  setFullView: {flex: 1},
  txtFirstName: {marginLeft: 10, fontWeight: '400', fontSize: wp('3.86%')},
  branchContainer: {
    paddingVertical: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.0,
    borderColor: 'gray',
  },
  branchPredBG: {
    width: 'auto',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#e0e0e0',
    opacity: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  homeBGImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0
  },
  dropIcon: {
    width: 15,
    height: 10
  },
  fullNameStyle: {
    marginTop: 10,
    marginHorizontal: -5
  },
  innerContainer: {
    // flex: 1,
    height: 'auto',
    backgroundColor: '#ffffff',
    margin: 15,
    paddingBottom: 20
  },
  keyboardViewContainer: {
    flex: 1,
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
    padding: 10
  },

  btnTextHolder: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    marginVertical: 5
  },

  cellView: {
    width: 'auto',
    height: wp('20.05%'),
    marginTop: 16,
    marginHorizontal: 15,
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

  Btn: {
    padding: 10,
    flexDirection: 'row'
  },
  cellInnerLeftView: {
    width: '60%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellInnerRightView: {
    width: '40%',
    height: 80,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,

  },
  cellIcon: {
    width: wp('7%'),
    height: wp('7%'),
    marginLeft: 20
  },
  txtHeaterName: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('4.5%'),
    marginLeft: 20,
    color: '#000000'
  },

  cellContent: {
    fontFamily: Fonts.oxygenLight,
    fontSize: wp('4%'),
    marginTop: 0,
    marginHorizontal: 20,
    lineHeight: hp('2.5%'),
    opacity: 0.8,
    marginBottom: 10
  },
  txtHeading: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('4.83%'),
    marginLeft: 15,
    marginTop: 10
  },
  tabBarSeperator: {
    height: 40,
    width: 0.5,
    backgroundColor: '#86929D',
    opacity: 0.7
  },
  callBtn: {
    width: '90%',
    height: wp('15%'),
    // marginBottom: 15,
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: hp('2.5%'),
    color: 'white'
  },
  temperaturePopup: {
    width: wp('65%'),
    height: wp('70%'),
    margin: 0,
  },
  titleTemperaturePopup: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('5%'),
    marginTop: 10,
    marginHorizontal: 10

  },
  contentTemperaturePopup: {
    fontFamily: Fonts.oxygenLight,
    fontSize: wp('4%'),
    marginTop: 10,
    marginHorizontal: 10,
    lineHeight: hp('3.59%')
  },
  closeTemperaturePopup: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('5%'),
    position: 'absolute',
    right: 0,
    bottom: -10,
    width: 90,
    height: 40,
    textAlign: 'right'

  },
  cancelPopup: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('5%'),
    position: 'absolute',
    right: 100,
    bottom: -10,
    width: 90,
    height: 40
  },
};

export default styles;
