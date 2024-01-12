import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../services/Fonts';
import {getColors} from '../../services/Color';

const styles = {
  pageContainer: {
    flex: 1,
    paddingBottom: 15

  },
  homeBGImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0
  },
  fullNameStyle: {
    marginTop: hp('2%'),
  },
  innerContainer: {
    // flex: 1,
    height: 'auto',
    backgroundColor: '#ffffff',
    margin: 20,
    paddingBottom: 10
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
    marginTop: 20,
    marginHorizontal: 20,
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
  dropIcon: {
    width: 15,
    height: 10,
  },
  txtHeading: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('5%'),
    marginLeft: 20,
    marginTop: 10
  },
  tabBarSeperator: {
    height: 40,
    width: 0.5,
    backgroundColor: '#86929D',
    opacity: 0.7,
    marginLeft: 20
  },
  txtModelNumberContainer: {
    backgroundColor: 'transparent',
    width: 'auto',
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  predScrollStyle: {
    height: 200,
    width: 'auto',
    backgroundColor: 'white',
    marginHorizontal: 15,
  },
  innerViewStyle: {
    flex: 1,
    backgroundColor: getColors().innerViewBackgroundColor,
  },
  txtBranchName: {marginLeft: 10, fontWeight: '400', fontSize: wp('3.86%')},
  branchNameContainer: {
    paddingVertical: 8,
    marginHorizontal: 10,
    borderBottomWidth: 1.0,
    borderColor: 'gray',
  },
  predictionContainer: {
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
  setModelNumberWidth: {width: '40%'},
  setModelMonthWidth: {width: '30%'},
  callBtn: {
    width: '90%',
    height: wp('15%'),
    // marginBottom: 15,
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  cellTitle: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('4.5%'),
    marginLeft: 20
  },
  btnText: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('5%'),
    color: 'white'
  },

  datePickerStyle:
  {
    width: '100%',
    backgroundColor: 'transparent',
    opacity: 0,
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
  },
  dateIconStyle: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0,
  },
};

export default styles;
