import Fonts from '../../services/Fonts';
import { isIphoneXorAbove } from '../../services/Utils';
import { getColors } from '../../services/Color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = {
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    padding: wp('11.25%'),
    justifyContent: 'center'

  },

  txtField: {
    marginHorizontal: -20
  },

  setHeight: {height: 20},
  bottomViewBG: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  setBlackColor: {
    color: getColors().txtBlackColor
  },
  txtAgreeBG: {
    flexDirection: 'row', 
    marginTop: -7
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: wp('100%'),
    height: hp('100%'),
    opacity: 0.4,
  },
  homeBGImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0
  },
 
  innerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 20
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
  rememberBG: {
    width: '100%',
    // height: 40,
    // marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtRegister: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('6%'),
  },

  txtBottomText: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('4.5%'),
    color: '#000000',
    marginLeft: 0,
    marginTop: 0,
    padding: 0,
    height: wp('7.5%'),
    textAlign: 'center'
  },

  btnText: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('5%'),
    color: 'white'
  },
  btnBack: {
    width: wp('8%'),
    height: wp('8%'),
    position: 'absolute',
    left: 20,
    top: isIphoneXorAbove() ? 50 : 20
  },
  imgBack: {
    width: '100%', 
    height: '100%'
  },
  imgLogo: {
    width: '45%', 
    height: hp('10%')
  }

};

export default styles;
