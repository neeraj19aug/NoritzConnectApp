/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { eventEmitter, DarkModeProvider } from 'react-native-dark-mode';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { setConfiguration, getConfiguration } from './services/configuration';
import { API_ROOT } from '../env';
import Navigator from './navigation/Navigator';

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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
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
  }

  componentWillUnmount() {
  }

  async getFcmToken() {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log('fcmToken ---', fcmToken);
      setConfiguration('device_token', fcmToken);
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
        </DarkModeProvider>
      </Provider>
    );
  }
}
