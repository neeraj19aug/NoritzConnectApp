import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../services/Fonts';
import {getColors} from '../../services/Color';

const styles = {
  pageContainer: {
    flex: 1,
    paddingBottom: 15,
  },
  txtField: {marginHorizontal: -15},

  setFlexFullView: {flex : 1},
  homeBGImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  txtSSIDBG: {flexDirection: 'row', justifyContent: 'space-between'},
  txtSearchingNetwork: {
    color: 'white',
    fontSize: wp('5%'),
    fontFamily: Fonts.oxygenRegular,
    height: 50,
    marginTop: -50,
  },
  imgSignalStyle: {width: 25, height: 25},
  lockImgStyle: {width: 15, height: 15, marginRight: 20},
  loaderBG: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#000000',
    opacity: 0.7,
  },
  txtHeading: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('4%'),
    marginLeft: 0,
  },
  setPadding: {padding: 0},
  txtDescription: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('4.83%'),
    width: '90%',
    textAlign: 'center',
  },
  alreadyPairedDescBG: {flex: 1, padding: 30},
  failImageStyle: {width: '50%', height: '50%'},
  failImageBG: {
    width: wp('100%'),
    height: wp('80%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  successImageBG: {
    width: wp('100%'),
    height: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtContactNoritz: {
    marginTop: hp('4.46%'),
    textAlign: 'center',
    fontFamily: Fonts.oxygenRegular,
  },
  btnStartOverStyle: {
    marginHorizontal: 0,
    width: '100%',
    borderColor: '#AAAAAA',
    borderWidth: 0.6,
    marginTop: hp('3.34%'),
  },
  btnStartOverContainer: {width: (wp('100%') - 60) / 2},
  buttonsContainer: {
    flexDirection: 'row',
    width: wp('100%') - 40,
    justifyContent: 'space-between',
  },
  txtLightsOn: {
    marginTop: hp('2%'),
    textAlign: 'center',
    fontFamily: Fonts.oxygenRegular,
  },
  ledImageStyle: {
    width: wp('100%') - 40,
    height: wp('18%'),
    marginTop: 20,
  },
  txtWaitForSec: {
    marginTop: hp('2%'),
    textAlign: 'center',
    fontFamily: Fonts.oxygenRegular,
  },
  txtFailToConnect: {
    color: getColors().cellTitleColor,
    width: wp('100%') - 40,
    fontSize: wp('5%'),
  },
  step5ContainerInner: {
    width: wp('100%'),
    height: wp('100%'),
    alignItems: 'center',
    marginTop: 10,
  },
  heaterOnlineDescContainer: {flex: 1, padding: 30},
  txtDesc: {
    fontFamily: Fonts.oxygenLight,
    fontSize: wp('4.83%'),
    marginLeft: 0,
    marginRight: 20,
    marginTop: 10,
    opacity: 0.6,
  },
  txtDesc2: {
    color: getColors().cellTitleColor,
    opacity: 1,
    width: wp('100%') - 40,
    marginLeft: 20,
  },
  txtDesc3: {
    marginTop: -15,
    textAlign: 'center',
    fontFamily: Fonts.oxygenRegular,
  },
  txtListHeading: {
    fontFamily: Fonts.oxygenLight,
    fontSize: wp('4.83%'),
    marginTop: 10,
    opacity: 0.6,
  },

  bottomTabView: {
    width: '100%',
    height: hp('8.04%'),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBarSeperator: {
    height: '70%',
    width: 0.5,
    backgroundColor: '#86929D',
    opacity: 0.7,
  },
  tabView: {
    height: '100%',
    width: '33%',
    backgroundColor: getColors().whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  txtTab: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('4%'),
  },

  wrapper: {},
  innerContainer: {
    flex: 1,
    width: 'auto',
    backgroundColor: 'white',
    margin: 20,
  },

  step5Container: {
    flex: 1,
    width: 'auto',
    backgroundColor: 'white',
  },

  slideView: {
    // margin: 20
    flex: 1,
  },
  slide2: {
    flex: 1,
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  cellView: {
    width: 'auto',
    height: wp('14.05%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  cellInnerLeftView: {
    width: '60%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellInnerRightView: {
    width: '40%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingRight: 5,
  },
  wifiName: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('4.83%'),
    opacity: 0.6,
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
    marginHorizontal: 10,
  },
  contentTemperaturePopup: {
    fontFamily: Fonts.oxygenLight,
    fontSize: wp('4%'),
    marginTop: 10,
    marginHorizontal: 5,
    lineHeight: hp('3.59%'),
  },
  closeTemperaturePopup: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('5%'),
    position: 'absolute',
    right: 0,
    bottom: -10,
    width: 90,
    height: 40,
    textAlign: 'right',
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
};

export default styles;
