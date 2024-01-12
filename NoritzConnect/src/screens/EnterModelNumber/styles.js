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
  containerTxtModelName: {
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderBottomWidth: 1.0,
    borderColor: 'gray',
  },
  predBG: {
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
  predScrollView: {
    height: wp('35%'),
    backgroundColor: '#e0e0e0',
    marginHorizontal: 15,
    position: 'absolute',
    left: 0,
    top: wp('20%'),
    right: 0,
    overflow: 'hidden',
  },
  txtModelName: {marginLeft: 10, fontWeight: '400', fontSize: wp('3.86%')},
  innerContainer: {
    // flex: 1,
    height: 'auto',
    backgroundColor: '#ffffff',
    margin: 20,
    paddingBottom: 20,

  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.84,
    elevation: 5,
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
    width: wp('22%'),
    height: wp('22%'),
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
    marginTop: 5
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
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('5%'),
    color: 'white'
  },
  collectionBG: {
    flex: 1,
    marginTop: -10,
    paddingBottom: 0,
    marginHorizontal: 10
  },
  collectionCellView: {
    // flex: 1,
    height: wp('43%'),
    width: (wp('100%') - 60) / 2.0,
    backgroundColor: 'white',
    margin: 10,
    padding: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cellTitle: {
    fontSize: wp('5%'),
    marginTop: 15,
    marginHorizontal: 5,
    fontFamily: Fonts.oxygenRegular

  }

};

export default styles;
