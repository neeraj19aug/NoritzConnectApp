import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
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
    top: 0
  },
  setMarginTopZero: {marginTop: 0},
  fullNameStyle: {
    marginTop: 10,
    marginHorizontal: -5
  },
  statePickerBG: {
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
  dropIcon: {
    width: 20,
    height: 20,
  },
  btnTextHolder: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    marginVertical: 5
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
    width: 30,
    height: 30,
    marginLeft: 20
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

  txtRemember: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('4.5%'),
    textAlign: 'center',
    paddingTop: hp('2%')
  },
};

export default styles;
