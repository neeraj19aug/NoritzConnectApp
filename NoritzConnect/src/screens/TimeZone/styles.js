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
    top: 0,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    margin: 15,
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
    height: wp('14.05%'),
    // marginTop: 16,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',

    // marginVertical: 5,
    borderColor: '#AAB2BA',
    borderBottomWidth: 1,
  },

  Btn: {
    padding: 10,
    flexDirection: 'row',
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
    alignItems: 'flex-end',
    justifyContent: 'center',
    // paddingRight: 20,
  },
  cellIcon: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  txtSetTemperatureControl: {
    fontFamily: Fonts.oxygenLight,
    fontSize: wp('4.5%'),
    // marginLeft: 20,
    color: '#000000',
  },
  cellContent: {
    fontFamily: Fonts.oxygenLight,
    fontSize: wp('4%'),
    marginTop: 0,
    marginHorizontal: 20,
    lineHeight: hp('2.5%'),
    opacity: 0.8,
    marginBottom: 10,
  },
  dropIcon: {
    width: 15,
    height: 10,
  },
  txtHeading: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('4.83%'),
    marginLeft: 5,
    marginTop: 10
  },
  tabBarSeperator: {
    height: 40,
    width: 0.5,
    backgroundColor: '#86929D',
    opacity: 0.7,
  },
  callBtn: {
    width: '90%',
    height: wp('15%'),
    marginBottom: 15,
    marginTop: 15,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('5%'),
    color: 'white',
  },
    btnSignInStyle: {marginTop: 20},

};

export default styles;
