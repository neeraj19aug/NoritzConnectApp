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
  homeBGImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },

  txtHeading: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('5%'),
    marginLeft: 0,
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

  txtDescription: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('4%'),
    width: '90%',
    textAlign: 'center',
  },

  txtDesc: {
    fontFamily: Fonts.oxygenLight,
    fontSize: wp('4.83%'),
    marginLeft: 0,
    marginRight: 20,
    marginTop: 10,
    opacity: 0.6,
  },
  alreadyConnectDescBG: {flex: 1, padding: 30, marginTop: -20},
  alreadyConnectImageStyle: {width: '50%', height: '50%'},
  alreadyConnectImageContainer: {
    width: wp('100%'),
    height: wp('80%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtWaitingForHeaterBG: {flex: 1, padding: 30},
  successImageContainer: {
    width: wp('100%'),
    height: wp('90%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {bottom: 10, position: 'absolute'},
  txtLightsAreON: {
    marginTop: hp('2%'),
    textAlign: 'center',
    fontFamily: Fonts.oxygenRegular,
  },
  tabbarBG: {
    width: '100%',
    height: 4,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#E6E6E6',
  },
  tabUnderLine: {
    width: wp('33%'),
    height: '100%',
    backgroundColor: getColors().redColor,
    position: 'absolute',
    top: 0,
    
  },
  step4ImgViewStyle: {
    width: wp('100%'),
    height: hp('58%'),
    marginLeft: 0,
  },
  txtIssuePersist: {
    marginTop: hp('4.46%'),
    textAlign: 'center',
    fontFamily: Fonts.oxygenRegular,
  },
  setBlackColor: {color: getColors().txtBlackColor},
  bottomTabView: {
    width: '100%',
    height: hp('8.04%'),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnStartOverStyle: {
    marginHorizontal: 0,
    width: '100%',
    borderColor: '#AAAAAA',
    borderWidth: 0.6,
    marginTop: hp('3.34%'),
  },
  btnStartOverContainer: {
    flexDirection: 'row',
    width: wp('100%') - 40,
    justifyContent: 'space-between',
  },
  imgLEDLights: {
    width: wp('100%') - 40,
    height: wp('18%'),
    marginTop: 20,
  },
  txtWaitFewSec: {
    marginTop: hp('2%'),
    textAlign: 'center',
    fontFamily: Fonts.oxygenRegular,
  },
  txtFailToConnect: {
    color: getColors().cellTitleColor,
    width: wp('100%') - 40,
    fontSize: wp('5%'),
  },

  failToConnectBG: {
    width: wp('100%'),
    height: wp('100%'),
    alignItems: 'center',
    marginTop: 10,
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
    // flexDirection: 'row'
  },

  step5Container: {
    flex: 1,
    width: 'auto',
    backgroundColor: 'white',
  },
  descriptionText: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('4.58%'),
    textAlign: 'center',
    marginHorizontal: 20,
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
};

export default styles;
