/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { eventEmitter, DarkModeProvider } from 'react-native-dark-mode';
import { StatusBar, StyleSheet, View, TouchableOpacity, Text, Platform, TextInput, Linking
 } from 'react-native';
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { setConfiguration, getConfiguration } from './services/configuration';
import { API_ROOT } from '../env';
import Navigator from './navigation/Navigator';
import { postAPI } from './services/api';
import {
  Apiversion, Devicetype, DevideID, cipherSecretKey
} from '../env';
import { encryptValue, md5 } from './services/Functions';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getColors} from './services/Color';
import Fonts from './services/Fonts';
import Moment from 'moment';
import {decryptValue, showAlert} from './services/Functions';
import { faL } from '@fortawesome/free-solid-svg-icons';
import {Appearance} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import moment from 'moment-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';



// // State Management with redux
// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister() {
//   },

//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification(notification) {
//     notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },

//   onAction() {
//     // process the action
//   },

//   onRegistrationError() {
//   },

//   // IOS ONLY (optional): default: all - Permissions to register.
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },

//   // Should the initial notification be popped automatically
//   // default: true
//   popInitialNotification: true,

//   /**
//    * (optional) default: true
//    * - Specified if permissions (ios) and token (android and ios) will requested or not,
//    * - if not, you must call PushNotificationsHandler.requestPermissions() later
//    * - if you are not using remote notification or do not have Firebase installed, use this:
//    *     requestPermissions: Platform.OS === 'ios'
//    */
//   requestPermissions: true,
// });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleMaintainancePopup: false,
      showAgain: true,
      button_text: '',
      popup_text: '',
      popup_title: '',
      is_maintenance: 0,
      force_update: 0,
      recommend_update: 0,
      dontAskAgain: false
    };
  }

  async componentDidMount() {
    Appearance.setColorScheme('light');
    setConfiguration('device_token', '1234567890');
    console.disableYellowBox = true;
    setConfiguration('API_ROOT', API_ROOT);
    eventEmitter.on('currentModeChanged', () => {
      this.forceUpdate();
    });
    setTimeout(() => SplashScreen.hide(), 2000);
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#FFFFFF');

    // eslint-disable-next-line no-unused-vars
    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //   this.showLocalNotification(remoteMessage);
    // });

    this.checkPermission();
    this.getFcmToken();
    this.getAppVersionDataFromStorage();

// Assuming you're calling this inside an async function or in another async context
this.getAppVersionData()
  .then(async (response) => {
    console.log("versionData is---", response);
    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);

      console.log("resCode is---", resCode);

      var resMessage = '';
      if (resCode == 200) {

        this.storeAppVersionData(JSON.stringify(response.data));

        let is_maintenance = response.data.is_maintenance;
        is_maintenance = await decryptValue(is_maintenance);        
        
        let force_update = response.data.force_update;
        force_update = await decryptValue(force_update);
        
        let recommend_update = response.data.recommend_update;
        recommend_update = await decryptValue(recommend_update);
        
        console.log('force_update check', force_update);
        console.log('is_maintenance check', is_maintenance);
        console.log('recommend_update check', recommend_update);
        


        if (force_update == 1) {
          let popup_text = response.data.popup_text;
          popup_text = await decryptValue(popup_text);
  
          let allow_app_access = response.data.allow_app_access;
          allow_app_access = await decryptValue(allow_app_access);

          let button_text = response.data.button_text;
          button_text = await decryptValue(button_text);
  
          let popup_title = response.data.popup_title;
          popup_title = await decryptValue(popup_title);

          this.setState({
            isVisibleMaintainancePopup: true,
            popup_text: popup_text,
            button_text: button_text,
            popup_title: popup_title,
            allow_app_access: allow_app_access,
            force_update: force_update,
            is_maintenance: is_maintenance,
            recommend_update: recommend_update
          });
          

        } else if (is_maintenance == 1) {

          let popup_text = response.data.popup_text;
          popup_text = await decryptValue(popup_text);
  
          let allow_app_access = response.data.allow_app_access;
          allow_app_access = await decryptValue(allow_app_access);
          console.log('allow_app_access check', allow_app_access);

          let button_text = response.data.button_text;
          button_text = await decryptValue(button_text);
  
          let popup_title = response.data.popup_title;
          popup_title = await decryptValue(popup_title);

          let timezone = response.data.timezone;
          timezone = await decryptValue(timezone);

          let android_timezone = response.data.android_timezone;
          android_timezone = await decryptValue(android_timezone);
  
          let maintenance_start = response.data.maintenance_start;
          maintenance_start = await decryptValue(maintenance_start);
  
          let maintenance_end = response.data.maintenance_end;
          maintenance_end = await decryptValue(maintenance_end);

          let maintenance_start_time = response.data.maintenance_start_time;
          maintenance_start_time = await decryptValue(maintenance_start_time);
  
          let maintenance_end_time = response.data.maintenance_end_time;
          maintenance_end_time = await decryptValue(maintenance_end_time);
  
         

          setInterval(() => {
            console.log('ismaintainance check')
            console.log('timeZone is---', timezone)
            console.log('android_timezone is---', android_timezone)

            var date = ""

            if (Platform.OS == 'ios') {
            date = new Date();
            date = date.toLocaleString('en-US', {
              timeZone: timezone,
            });
            } else {
              const targetTimezone = android_timezone;//'America/Los_Angeles';

              // Get the current time in the specified timezone
              date = moment.tz(new Date(), targetTimezone).format('MM/DD/YYYY hh:mm:ss A');
              console.log('newTime ', date)
     
            }

            

            if (this.state.dontAskAgain == true) {
              return
            }

           
            
            console.log('maintenance_start ', maintenance_start)
            console.log('maintenance_start_time ', maintenance_start_time)
            console.log('maintenance_end ', maintenance_end)
            console.log('maintenance_end_time ', maintenance_end_time)
            

            let currentDate = Moment(date, 'MM/DD/YYYY hh:mm:ss A').format(
              'YYYY-MM-DD HH:mm',
            );
            console.log('current date ', currentDate);

            var startDate = Moment(maintenance_start.toString(), 'YYYY-MM-DD');
            var current = Moment(currentDate.toString(), 'YYYY-MM-DD');
            var endDate = Moment(maintenance_end.toString(), 'YYYY-MM-DD');
            
            // const isMaintenance = current.isBetween(startDate, endDate);
            const isMaintenance = current.isSameOrAfter(startDate) && current.isSameOrBefore(endDate);

            
            var showMaintainancePopup = false;  
// Output the result
if (isMaintenance) {
  console.log('Maintenance is currently ongoing during dates.');
  let currentTime = Moment(date, 'MM/DD/YYYY hh:mm:ss A').format(
    'HH:mm',
  );

  var startTime = Moment(maintenance_start_time.toString(), 'HH:mm:ss');
  var time = Moment(currentTime.toString(), 'HH:mm');
  var endTime = Moment(maintenance_end_time.toString(), 'HH:mm:ss');
  
  console.log('startTime ', startTime)
  console.log('endTime ', endTime)
  console.log('currenttime ', time)

  const getHoursAndMinutes = (date) => {
    const timeString = date.toISOString();
    const hours = parseInt(timeString.substring(11, 13));
    const minutes = parseInt(timeString.substring(14, 16));
    return hours * 60 + minutes; // Convert hours to minutes and add minutes
  };
  
  const startMinutes = getHoursAndMinutes(startTime);
  const endMinutes = getHoursAndMinutes(endTime);
  const currentMinutes = getHoursAndMinutes(time);
  
  const isMaintenanceCurrentTime = currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  
  // console.log(isMaintenanceCurrentTime2);




  // const isMaintenanceCurrentTime = time.isBetween(startTime, endTime);
  if (isMaintenanceCurrentTime) {
    console.log('Maintenance is currently ongoing.');
    showMaintainancePopup = true;  

  } else {
    console.log('No maintenance is currently ongoing.');
    showMaintainancePopup = false;    }

} else {
  console.log('No maintenance is currently scheduled.');
  showMaintainancePopup = false;  }

this.setState({
  isVisibleMaintainancePopup: showMaintainancePopup,
  popup_text: popup_text,
  button_text: button_text,
  popup_title: popup_title,
  allow_app_access: allow_app_access,
  force_update: force_update,
  is_maintenance: is_maintenance,
  recommend_update: recommend_update,
  timezone: timezone,
  maintenance_start: maintenance_start,
  maintenance_end: maintenance_end
});
          

          }, 5000);


          
        } else if (recommend_update == 1) {

          let popup_text = response.data.popup_text;
          popup_text = await decryptValue(popup_text);
  
          let allow_app_access = response.data.allow_app_access;
          allow_app_access = await decryptValue(allow_app_access);

          let button_text = response.data.button_text;
          button_text = await decryptValue(button_text);
  
          let popup_title = response.data.popup_title;
          popup_title = await decryptValue(popup_title);     
          

          this.setState({
            isVisibleMaintainancePopup: true,
            popup_text: popup_text,
            button_text: button_text,
            popup_title: popup_title,
            allow_app_access: allow_app_access,
            force_update: force_update,
            is_maintenance: is_maintenance,
            recommend_update: recommend_update

          });

        }

      } else {
        resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }

    

  })
  .catch((error) => {
    console.error("Error fetching version data:", error);
  });
    
    
  }

  componentWillUnmount() {
  }


  async getAppVersionData() {
   
    try {
      let userId = '1';
      let currentVersion = '2.2';
      let platform = Platform.OS;

      const url = 'User/getAppVersionData';
      const inputCipher = Apiversion
        + cipherSecretKey
        + DevideID
        + cipherSecretKey
        + Devicetype
        + cipherSecretKey
        + userId
        + cipherSecretKey
        + currentVersion
        + cipherSecretKey
        + platform
        + cipherSecretKey;
      
      const output = await md5(inputCipher);
      const formdata = new FormData();
      formdata.append('iot_user_id', await encryptValue(userId));
      formdata.append('currentVersion', await encryptValue(currentVersion));
      formdata.append('platform', await encryptValue(platform));
      
      console.log('formdata7 ----', formdata);
      const header = {
        Devicetype,
        Cipher: output,
        Apiversion,
        Deviceid: DevideID,
      };

      console.log('header7 ----', header);

      const response = await postAPI(url, formdata, header);     
      
      // const response = await fetch("https://procard.noritz.com/API/IOT/User/getAppVersionData", {
      //   method: 'POST', // or 'GET' or other HTTP methods
      //   headers: header,
      //   body: formdata,
      // });


      console.log('response string ----', response);

      return response;
    } catch (e) {
      console.log('formdata5 ----', e);

      // return jsonObject;    
      throw e;
    }
  }



  maintainancePopupOButtonClick() {

    console.log('this.state.force_update ******', this.state.force_update);
    console.log('this.state.is_maintenance ******', this.state.is_maintenance);
    console.log('this.state.recommend_update ******', this.state.recommend_update);



    if (this.state.force_update == 1) {
      console.log('force_update ******');
      var url = ""
      if (Platform.OS == 'android') {
        url = "https://play.google.com/store/apps/details?id=com.noritz.iot&hl=en&gl=US"
        
      } else {
        url = "https://apps.apple.com/us/app/noritz-connect/id1227949334"
      }

      Linking.canOpenURL(url)
        .then(supported => {
          if (!supported) {
            console.log(`Can't handle url: ${url}`);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch(err => console.log('An error occurred', err));
  



    } else if(this.state.is_maintenance == 1){
      console.log('is_maintenance ******');
      if (this.state.allow_app_access == 1) {
        this.setState({
          isVisibleMaintainancePopup: false,
          dontAskAgain: true
        })
      } else {
        RNExitApp.exitApp();
       }

    } else if (this.state.recommend_update == 1) {
      console.log('recommend_update ******');
      var url = ""
      if (Platform.OS == 'android') {
        url = "https://play.google.com/store/apps/details?id=com.noritz.iot&hl=en&gl=US"
        
      } else {
        url = "https://apps.apple.com/us/app/noritz-connect/id1227949334"
      }

      Linking.canOpenURL(url)
        .then(supported => {
          if (!supported) {
            console.log(`Can't handle url: ${url}`);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch(err => console.log('An error occurred', err));
  
   
    } else {
      // this.setState({
      //   isVisibleMaintainancePopup: false
      // })
    }
    
  }

  maintainancePopup = () => {
    return (
      <View style={styles.maintainancePopup}>
        <Text allowFontScaling={false} style={styles.titleTemperaturePopup}>
          {this.state.popup_title}
        </Text>
        <TextInput
          multiline={true}
          editable = {false}
          allowFontScaling={false}
          style={styles.contentTemperaturePopup}>
          {/* {Strings.TempWarningDesc} */}
          {this.state.popup_text}
        </TextInput>

        

        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          
          {this.state.recommend_update == 1 ? 
            <TouchableOpacity
            style={styles.cancelMaintainancePopup}
              onPress={() => {
                this.setState({
                  isVisibleMaintainancePopup: false,
                  dontAskAgain: true
                })
            }}>
            <Text
              allowFontScaling={false}
              style={[
                styles.closeTemperaturePopup,
                {color: 'gray'},
              ]}>
            {'Cancel'}
            </Text>
            </TouchableOpacity>
          : null
            
          }
        <TouchableOpacity
          style={styles.cancelMaintainancePopup}
          onPress={() => this.maintainancePopupOButtonClick()}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().redColor},
            ]}>
          {this.state.button_text}
          </Text>
          </TouchableOpacity>
          </View>
      </View>
    );
  };



  async getFcmToken() {

    const apnsToken = await messaging().getAPNSToken();
    if (apnsToken) {
      // Call getToken here
    } else {
      console.warn('No APNS token available');
    }


    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log('fcmToken ---', fcmToken);
      setConfiguration('device_token', fcmToken);
    }
  }




  async getAppVersionDataFromStorage() {
    try {
      const versionData = await AsyncStorage.getItem('appversiondata');

      if (versionData !== null) {
        
        const versionDataObj = JSON.parse(versionData);
        console.log("Storage data found", versionDataObj);

        let is_maintenance = versionDataObj.is_maintenance;
        is_maintenance = await decryptValue(is_maintenance);        
        console.log('is_maintenance check', is_maintenance);
        
          let popup_text = versionDataObj.popup_text;
          popup_text = await decryptValue(popup_text);
  
          let allow_app_access = versionDataObj.allow_app_access;
          allow_app_access = await decryptValue(allow_app_access);
          console.log('allow_app_access check', allow_app_access);

          let button_text = versionDataObj.button_text;
          button_text = await decryptValue(button_text);
  
          let popup_title = versionDataObj.popup_title;
          popup_title = await decryptValue(popup_title);

          let timezone = versionDataObj.timezone;
          timezone = await decryptValue(timezone);

          let android_timezone = versionDataObj.android_timezone;
          android_timezone = await decryptValue(android_timezone);
  
          let maintenance_start = versionDataObj.maintenance_start;
          maintenance_start = await decryptValue(maintenance_start);
  
          let maintenance_end = versionDataObj.maintenance_end;
          maintenance_end = await decryptValue(maintenance_end);

          let maintenance_start_time = versionDataObj.maintenance_start_time;
          maintenance_start_time = await decryptValue(maintenance_start_time);
  
          let maintenance_end_time = versionDataObj.maintenance_end_time;
          maintenance_end_time = await decryptValue(maintenance_end_time);
  
            console.log('ismaintainance check')
            console.log('timeZone is---', timezone)
            console.log('android_timezone is---', android_timezone)

            var date = ""

            if (Platform.OS == 'ios') {
            date = new Date();
            date = date.toLocaleString('en-US', {
              timeZone: timezone,
            });
            } else {
              const targetTimezone = android_timezone;//'America/Los_Angeles';

              // Get the current time in the specified timezone
              date = moment.tz(new Date(), targetTimezone).format('MM/DD/YYYY hh:mm:ss A');
              console.log('newTime ', date)
     
            }
            

            if (this.state.dontAskAgain == true) {
              return
            }
            
            console.log('maintenance_start ', maintenance_start)
            console.log('maintenance_start_time ', maintenance_start_time)
            console.log('maintenance_end ', maintenance_end)
            console.log('maintenance_end_time ', maintenance_end_time)
            

            let currentDate = Moment(date, 'MM/DD/YYYY hh:mm:ss A').format(
              'YYYY-MM-DD HH:mm',
            );
            console.log('current date ', currentDate);

            var startDate = Moment(maintenance_start.toString(), 'YYYY-MM-DD');
            var current = Moment(currentDate.toString(), 'YYYY-MM-DD');
            var endDate = Moment(maintenance_end.toString(), 'YYYY-MM-DD');
            
            // const isMaintenance = current.isBetween(startDate, endDate);
            const isMaintenance = current.isSameOrAfter(startDate) && current.isSameOrBefore(endDate);

            
            var showMaintainancePopup = false;  
// Output the result
if (isMaintenance) {
  console.log('Maintenance is currently ongoing during dates.');
  let currentTime = Moment(date, 'MM/DD/YYYY hh:mm:ss A').format(
    'HH:mm',
  );

  var startTime = Moment(maintenance_start_time.toString(), 'HH:mm:ss');
  var time = Moment(currentTime.toString(), 'HH:mm');
  var endTime = Moment(maintenance_end_time.toString(), 'HH:mm:ss');
  


  const getHoursAndMinutes = (date) => {
    const timeString = date.toISOString();
    const hours = parseInt(timeString.substring(11, 13));
    const minutes = parseInt(timeString.substring(14, 16));
    return hours * 60 + minutes; // Convert hours to minutes and add minutes
  };
  
  const startMinutes = getHoursAndMinutes(startTime);
  const endMinutes = getHoursAndMinutes(endTime);
  const currentMinutes = getHoursAndMinutes(time);
  
  const isMaintenanceCurrentTime = currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  


  // const isMaintenanceCurrentTime = time.isBetween(startTime, endTime);
  if (isMaintenanceCurrentTime) {
    console.log('Maintenance is currently ongoing.');
    showMaintainancePopup = true;  

  } else {
    console.log('No maintenance is currently ongoing.');
    showMaintainancePopup = false;    }

} else {
  console.log('No maintenance is currently scheduled.');
  showMaintainancePopup = false;  }

this.setState({
  isVisibleMaintainancePopup: showMaintainancePopup,
  popup_text: popup_text,
  button_text: button_text,
  popup_title: popup_title,
  allow_app_access: allow_app_access,
  is_maintenance: is_maintenance,
  timezone: timezone,
  maintenance_start: maintenance_start,
  maintenance_end: maintenance_end
});
          




       
      } else {
        console.log("Storage data null");
      }
    } catch (e) {
      console.log("Storage data error", e.message);
    }
  }


  async storeAppVersionData(credentials) {
    try {
      await AsyncStorage.setItem('appversiondata', credentials);
    } catch (e) {
      console.log(e);
    }
  }

  // showLocalNotification(payload) {
  //   if (payload && payload.data) {
  //     const notification = payload.data.notification || payload.notification;

  //     const navigation = getConfiguration('navigation');
  //     if (navigation.dangerouslyGetState().routes[0].name === 'Home') {
  //       PushNotification.localNotification({
  //         title: notification.title,
  //         message: notification.body,
  //         ignoreInForeground: false,
  //         userInfo: payload.data,
  //       });

  //       navigation.navigate('ErrorInfo');

  //       // Alert.alert(
  //       //   notification.title,
  //       //   notification.body,
  //       //   [
  //       //     {
  //       //       text: "Cancel",
  //       //       onPress: () => console.log("Cancel Pressed"),
  //       //       style: "cancel"
  //       //     },
  //       //     { text: "Open Error Info", onPress: () => navigation.navigate('ErrorInfo') }
  //       //   ],
  //       //   { cancelable: false }
  //       // );
  //     }
  //     //
  //   }
  // }

  checkPermission() {
    messaging()
      .hasPermission()
      .then((authStatus) => {
        const { AuthorizationStatus } = firebase.messaging;
        const enabled = authStatus === AuthorizationStatus.AUTHORIZED
          || authStatus === AuthorizationStatus.PROVISIONAL;
        console.log(enabled);
        if (enabled) {
          // user has permissions, go forward and get fcmToken
          this.subscribeTopic('NoritzConnectInfo');
          this.getFcmToken();
        } else {
          // user doesn't have permission, go forward and ask for permission
          this.requestPermission();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  subscribeTopic = async topic => {
    messaging()
      .subscribeToTopic(topic)
      .then(() => console.log('Subscribed to topic:', topic))
      .catch(e => {
        console.log('Subscribed error--', e);
      });
  };



  requestPermission() {
    messaging()
      .requestPermission()
      .then((authStatus) => {
        const { AuthorizationStatus } = firebase.messaging;
        const enabled = authStatus === AuthorizationStatus.AUTHORIZED
          || authStatus === AuthorizationStatus.PROVISIONAL;
        console.log(enabled);

        if (enabled) {
          // User has authorized, go forward and get fcmToken
          this.getFcmToken();
        }
      })
      .catch(() => {
        // User has rejected permissions
        this.alertForPushNotificationPermission();
      });
  }

  render() {
    const store = require('./redux/store').default;

    return (
      <Provider store={store}>
        <DarkModeProvider>
          <Navigator />

          <Dialog
              visible={this.state.isVisibleMaintainancePopup}
              rounded={false}
              onTouchOutside={() => {
                this.setState({isVisibleRevokePopup: false});
              }}>
              <DialogContent style={styles.setPadding}>
                {this.state.isVisibleMaintainancePopup && this.maintainancePopup()}
              </DialogContent>
            </Dialog>

        </DarkModeProvider>
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  maintainancePopup: {
    width: wp('70%'),
    // height: wp('85%'),
    margin: 0,
    padding:0,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  titleTemperaturePopup: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('5%'),
    marginTop: 10,
    color: 'black'
    // marginHorizontal: 10,
  },
  contentTemperaturePopup: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('4.2%'),
    marginTop: 15,
    lineHeight: wp('6%'),
    color: 'black'

  },
  cancelMaintainancePopup: {
   
    width: wp('18%'),
    marginTop: 20
    // height: hp('5%'),
  },
  closeTemperaturePopup: {
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('4.5%'),
    textAlign: 'center',
    lineHeight: wp('6%')
  },
});

export default App;
