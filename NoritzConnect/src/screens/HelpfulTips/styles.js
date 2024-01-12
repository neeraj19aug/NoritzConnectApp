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
  setMarginLeft: {marginLeft: 20},
  scrollViewContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 17,
    color: 'black',
    padding: 10
  },

  btnTextHolder: {
    borderWidth: 0.5,
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
    shadowRadius: 2.84,
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
    fontSize: wp('4.53%'),
    marginTop: 0,
    marginHorizontal: 20,
    lineHeight: wp('6%'),
    opacity: 0.7,
    marginBottom: 10
  },
  dropIcon: {
    width: 15,
    height: 10,
  },
  txtSetTemperatureControl: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('4.83%'),
    marginLeft: 20
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
    marginBottom: 15,
    marginTop: 15,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: hp('2.5%'),
    color: 'white'
  }
};

export default styles;
