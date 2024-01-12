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
  backIconStyle: {marginLeft: 20, marginTop: 20},

  setXXXColor: {color: getColors().xxxColor},

  setBlackColor: {color: getColors().txtBlackColor},

  btnContainerStyle:
  {
    marginHorizontal: 0,
    borderColor: getColors().btnDisableColor,
    borderWidth: 0.6,
    marginTop: hp('3.34%'),
  },

  backBtnContainer: 
  {
    width: 100,
    height: 70,
    position: 'absolute',
    left: 0,
    top: 0,
  },

  swiperContainerBG:
  {flex: 1, flexDirection: 'row', overflow: 'hidden'},

  btnConnected:
  {bottom: 10, position: 'absolute'},

  descriptionTextStyle:
  {
    width: wp('100%') - 40,
    height: wp('13.88%'),
    borderWidth: 0.5,
    borderColor: '#AAAAAA',
    marginTop: 30,
  },

  step2ImageStyle: {
    width: wp('100%') - 40,
    height: hp('55%'),
    marginLeft: 15,
  },

  step3ImageStyle:
  {
    width: wp('100%') - 40,
    height: hp('55%'),
    marginLeft: 15,
  },

  setOverflowHidden: {overflow: 'hidden'},

  txtHeading: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('4%'),
    marginLeft: 0,
  },

  txtDescription: {
    fontFamily: Fonts.oxygenBold,
    fontSize: hp('2.4%'),
    width: '80%',
    textAlign: 'center',
    marginBottom: 20,
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
    width: '48%',
    backgroundColor: getColors().whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  txtTab: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: hp('2%'),
  },

  wrapper: {},
  innerContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    // flexDirection: 'row'
  },

  slideView: {
    // margin: 20
    flex: 1,
    // borderColor: 'black',
    // borderWidth: 10
  },
  slide2: {
    flex: 1,
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  descriptionText: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('4.58%'),
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 20,
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
