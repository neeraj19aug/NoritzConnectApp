import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../services/Fonts';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
main: {
    flexDirection: 'row',
   // alignItems: 'center',
   // justifyContent: 'center',
  // marginBottom: 20,
 marginTop: wp('2%'),
  marginLeft: wp('5%'),
        alignItems: 'center',
       // zIndex: 2,
    
    
  },
  placeholderContainer: {
    position: 'absolute',
   // backgroundColor:'red',
   // zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
},
box1: {
    width: wp('20%'),
    height: wp('12%'),
   // justifyContent: 'center',
   // alignItems: 'center',
  //  borderRadius: 10,
  borderBottomWidth: 0.81,
    borderColor:'grey'
},
box2: {
  width: wp('10%'),
  height: wp('12%'),
  //  justifyContent: 'center',
  //  alignItems: 'center',
  //  borderRadius: 10,
  borderBottomWidth: 0.81,
  borderColor: 'grey',
},
box3: {
  width: wp('25%'),
    height: wp('12%'),
  //  justifyContent: 'center',
  //  alignItems: 'center',
   // borderRadius: 10,
   borderBottomWidth: 0.81,
    borderColor:'grey'
},
boxLarge: {
   // width: wp('50%'),
  height: 50,
  paddingRight:wp('4.7%'),
   // justifyContent: 'center',
   // alignItems: 'center',
  //borderBottomWidth: 0.81,
 // borderColor: 'grey',
  marginTop: wp('2%'),
  marginLeft: wp('5%'),
  flexDirection: 'row',
  justifyContent: 'space-between',
 // backgroundColor:'red'

    
  },
  innerLargeBox: {
    width:wp('60%'),
    borderBottomWidth: 0.81,
    borderColor: 'grey'
},
input: {
    width: '100%',
    height: '100%',
  color:'black',
  fontSize: wp('4.4%'),


  // fontSize: wp('4.2%'),
  // paddingHorizontal: 10,
  // maxWidth: wp('40%'),
   fontFamily: Fonts.SpectralRegular,
  
   
   
  },

  separatorDot: {
    fontSize: wp('6.2%'),
    fontWeight: 'bold',
  marginHorizontal: 5,
//marginBottom:wp('0%')
marginTop:wp('8.5%')
  //alignSelf: 'bottom',
  // justifyContent:'center'
 // alignItems:'center'
},
separator: {
  fontSize: wp('6.2%'),
    fontWeight: 'bold',
  marginHorizontal: 5,
  marginTop:wp('10.5%')

  //alignSelf: 'bottom',
  // justifyContent:'center'
 // alignItems:'center'
},
preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
},
XImg:{
  width:hp('4%'),
   height:hp('4%'),
    marginRight:hp('5%'),
  //  backgroundColor:'blue'

},
flashImg:{
  width:hp('3%'),
   height:hp('4%'),
   marginLeft:hp('5%'),
  // backgroundColor:'blue'

  },
captureContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    width:'100%',
    margin:20,
    alignItems:'center',
   // marginVertical:hp('5%'),
  //  backgroundColor:'yellow',
   // marginLeft:hp('5%'),
    //marginRight:hp('5%')
    
    marginBottom:hp('5%')
},
capture: {
   // flex: 1,
    backgroundColor: 'red',
   // borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
   
   // marginHorizontal: 120,
    
},
captureText: {
  fontFamily: Fonts.oxygenRegular,
  fontSize: wp('5%'),
  color: 'white',
    textAlign: 'center',
},
CameraSection: {
  backgroundColor:'transparent',
  flexDirection:'row',
  marginTop:hp('2%'),
  justifyContent:'space-between',
  height:hp('7%'),
  alignItems:'center'
},

buttonContainer: {
    margin: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
},
loadingIndicator: {
  width: wp('12%'),
  height: wp('12%'),
 // backgroundColor: 'blue',
  justifyContent: 'center',
  alignItems: 'center',
//  borderRadius: 10,
  marginLeft: wp('2.5%'),
//  borderWidth: 1,
  marginTop:wp('4%')
 
    // position: 'absolute',
    // alignSelf: 'center',
    // bottom: 20,
},

loadingIndicator1:{

  width: wp('12%'),
  height: wp('12%'),
 // backgroundColor: 'blue',
  justifyContent: 'center',
  alignItems: 'center',
 // borderRadius: 10,
  marginLeft: wp('2.5%'),
 // borderWidth: 1,
  marginTop:wp('1.5%')
 



},
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

  },
  ScanImg1: {
    width: wp('12%'),
    height: wp('12%'),
   // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
   // borderRadius: 10,
    marginLeft: wp('2.5%'),
   // borderWidth: 1,
    marginTop:wp('1%')
   
    
  },
  ScanImg: {
    width: wp('12%'),
    height: wp('12%'),
   // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  //  borderRadius: 10,
    marginLeft: wp('2.5%'),
  //  borderWidth: 1,
    marginTop:wp('3%')
   
    
  },
  outerMain:{flexDirection:'row', justifyContent:'space-between', paddingRight:18},
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  // backgroundColor:'red',
 // marginTop: wp('2%'),
   marginLeft: wp('5%'),
       
       
     
},
inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   // zIndex: 2,
},
placeholderContainer: {
    position: 'absolute',
   // zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
   // alignItems: 'center',
},
placeholderText: {
    color: '#9B9B9B',
    fontSize: wp('4.4%'),
},
  

};

export default styles;
