import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import AndroidOpenSettings from 'react-native-android-open-settings';
import WifiManager from 'react-native-wifi-reborn';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Strings from '../../services/Strings';

import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import {
  Text,
  View,
  PermissionsAndroid,
  Linking,
  BackHandler,
  Image,
  AppState,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import {WifiSetupHeader, Button} from '../../components/common';
import styles from './styles';
import Assets from '../../services/Assets';
import {getColors} from '../../services/Color';
import {showAlert} from '../../services/Functions';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};
class WifiSetupScreen extends Component {
  nav = this.props.navigation;

  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {
      selectedTabIndex: 0,
      stepCount: 1.1,
      currentNetwork: '',
      active: 0,
      active2: 0,
      stepNumber: 0,
      openSettings: false,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.getCurrentSSID();

    this.focusCall = this.props.navigation.addListener('focus', () => {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick.bind(this),
      );
      this.setState({
        selectedTabIndex: 0,
        stepCount: 1.1,
        active: 0,
        stepNumber: 0,
        openSettings: false,
      });
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.focusCall();
  }

  handleBackButtonClick() {
    this.nav.goBack();
    return true;
  }

  async getCurrentSSID() {
    WifiManager.setEnabled(true);
    if (Platform.OS == 'ios') {
      this.getCurrentWifi();
    } else {
      this.setGPSEnabledManually();
    }
  }

  setGPSEnabledManually() {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(data => {
        this.checkAndroidFineLocation();
        console.log(data);
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
      })
      .catch(err => {
        showAlert(
          Strings.msgLocationPermissionDenid,
          300,
        );
        console.log(err);
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
        // codes :
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        //  - ERR03 : Internal error
      });
  }

  async checkAndroidFineLocation() {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted == PermissionsAndroid.RESULTS.GRANTED) {
      this.getCurrentWifi();
      // this.timer = setInterval(() => this.getCurrentWifi(), 5000); // Refresh data every 10 seconds
    } else {
      this.getLocationPermissionInAndroid();
    }
  }

  async getLocationPermissionInAndroid() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: Strings.msgLocationPermissionRequiredTitle,
        message:
          Strings.msgLocationPermissionRequired,
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      this.getCurrentWifi();

      // this.timer = setInterval(() => this.getCurrentWifi(), 5000); // Refresh data every 10 seconds
    } else {
      showAlert(
        Strings.msgLocationPermissionDenid,
        300,
      );
    }

    // return granted;
  }

  getCurrentWifi() {
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        this.setState({currentNetwork: ssid});
      },
      e => {console.log(e);},
    );
  }

  _handleAppStateChange = nextAppState => {
    // if (
    //   nextAppState == 'active' &&
    //   (this.state.appState == 'inactive' || this.state.appState == 'background')
    // ) {

    // }

    this.getCurrentWifi();
    this.setState({appState: nextAppState});
  };

  changeLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const array = this.state.AccordionData.map(item => {
      const newItem = {...item};

      newItem.expanded = false;

      return newItem;
    });

    array[index].expanded = true;

    this.setState(() => ({
      AccordionData: array,
    }));
  };

  onPressBackButton = () => {
    if (this.state.stepCount == 1.1) {
      this.props.navigation.goBack();
    } else if (this.state.stepCount == 1.2) {
      this.setState({stepCount: 1.1});
    } else if (this.state.stepCount == 1.3) {
      this.setState({stepCount: 1.2, openSettings: false});
    } else if (this.state.stepCount == 1.4) {
      this.setState({openSettings: false});
    }
  };

  onPressNextkButton = () => {
    if (this.state.stepCount === 1.1) {
      this.setState({
        stepCount: 1.2,
        stepNumber: 1,
      });
    } else if (this.state.stepCount === 1.2) {
      this.setState({
        stepCount: 1.3,
        stepNumber: 2,
      });
    } else if (this.state.stepCount === 1.3) {
      if (this.state.openSettings) {
        this.props.navigation.navigate('RouterSetup');
      } else {
        if (Platform.OS === 'android') {
          AndroidOpenSettings.wifiSettings();
        } else {
          Linking.openSettings();
        }
        this.setState({
          openSettings: true,
        });
      }
    }
  };

  goBack() {
    this.props.navigation.goBack();
  }

  swiperView(backgroundImage, description, width) {
    return (
      <Animatable.View
        duration={300}
        transition="width"
        style={[styles.innerContainer, {width}, styles.setOverflowHidden]}>
        <Image
          resizeMode="contain"
          source={backgroundImage}
          style={styles.step2ImageStyle}
        />
        {this.state.stepCount == 1.1 ? (
          <Animatable.Text
            animation={fadeIn}
            allowFontScaling={false}
            style={styles.descriptionText}>
            {description}
          </Animatable.Text>
        ) : null}
        {this.state.stepCount == 1.1 ? (
          <Button
            title={Strings.txtYesItIsConnected}
            onPress={this.onPressNextkButton}
            containerStyle={styles.btnConnected}
          />
        ) : null}
      </Animatable.View>
    );
  }

  swiperViewStep1(backgroundImage, description, width) {
    return (
      <Animatable.View
        duration={300}
        transition="width"
        style={[styles.innerContainer, {width}, styles.setOverflowHidden]}>
        <Image
          resizeMode="cover"
          source={this.state.stepCount == 1.2 ? backgroundImage : null}
          style={styles.step2ImageStyle}
        />
        {this.state.stepCount == 1.2 ? (
          <Animatable.Text
            animation={fadeIn}
            allowFontScaling={false}
            style={styles.descriptionText}>
            {description}
          </Animatable.Text>
        ) : null}
        {this.state.stepCount == 1.2 ? (
          <Button
            title={Strings.txtTheUnitLightIsON}
            onPress={this.onPressNextkButton}
            containerStyle={styles.btnConnected}
          />
        ) : null}
      </Animatable.View>
    );
  }

  swiperViewStep2(backgroundImage, description, width) {
    return (
      <Animatable.View
        duration={300}
        transition="width"
        style={[styles.innerContainer, {width}, styles.setOverflowHidden]}>
        <Image
          resizeMode="contain"
          source={backgroundImage}
          style={styles.step2ImageStyle}
        />

        {this.state.openSettings ? (
          <Button
            disabled
            title={
              this.state.currentNetwork != null &&
              this.state.currentNetwork.substring(0, 3) == 'NAW'
                ? this.state.currentNetwork
                : Strings.txtNetworkNotFound
            }
            containerStyle={styles.btnContainerStyle}
            containerBackgroundColor={getColors().whiteColor}
            textStyle={styles.setBlackColor}
          />
        ) : this.state.stepCount == 1.3 ? (
          <Animatable.Text
            animation={fadeIn}
            allowFontScaling={false}
            style={styles.descriptionText}>
            {
              Strings.txtGoToSettings
            }
            <Animatable.Text
              animation={fadeIn}
              allowFontScaling={false}
              style={styles.setXXXColor}>
              xxxx.
            </Animatable.Text>
            {Strings.txtConectAndCome}
          </Animatable.Text>
        ) : null}
        {this.state.openSettings ? (
          <Button
            title={Strings.txtNetworkConnected}
            disabled={
              this.state.currentNetwork != null &&
              this.state.currentNetwork.substring(0, 3) == 'NAW'
                ? false
                : true
            }
            onPress={this.onPressNextkButton}
            containerStyle={styles.btnConnected}
            containerBackgroundColor={
              this.state.currentNetwork != null &&
              this.state.currentNetwork.substring(0, 3) == 'NAW'
                ? null
                : '#AAAAAA'
            }
          />
        ) : (
          <Button
            title={Strings.alerttxtGoToSettings}
            onPress={this.onPressNextkButton}
            containerStyle={styles.btnConnected}
          />
        )}
      </Animatable.View>
    );
  }

  swiperViewStep3(backgroundImage, description, width) {
    return (
      <Animatable.View
        duration={300}
        transition="width"
        style={[styles.innerContainer, {width}, styles.setOverflowHidden]}>
        <Image
          resizeMode="contain"
          source={backgroundImage}
          style={styles.step3ImageStyle}
        />

        <Text
          allowFontScaling={false}
          style={[
            styles.descriptionText,
            styles.descriptionTextStyle,
          ]}>
          {this.state.currentNetwork != null &&
          this.state.currentNetwork.substring(0, 3) == 'NAW'
            ? this.state.currentNetwork
            : Strings.txtNetworkNotFound}
        </Text>
        <Button
          title={Strings.txtNetworkConnected}
          onPress={this.onPressNextkButton}
          containerStyle={styles.btnConnected}
        />
      </Animatable.View>
    );
  }

  render() {
    return (
      <DarkModeContext.Consumer>
        {() => (
          <SafeAreaView
            style={[
              styles.pageContainer,
              {backgroundColor: getColors().screenBackground},
            ]}>
            <WifiSetupHeader
              nav={this.props.navigation}
              stepNumber={this.state.stepNumber}
            />

            <View style={styles.swiperContainerBG}>
              {this.swiperView(
                Assets.adapterImage,
                Strings.wifiSetupDesc1,
                this.state.stepCount === 1.1 ? wp('100%') : 0,
              )}

              {this.swiperViewStep1(
                Assets.step1Gif,
                Strings.wifiSetupDesc2,
                this.state.stepCount === 1.2 ? wp('100%') : 0,
              )}

              {this.swiperViewStep2(
                Assets.step2Gif,
                Strings.wifiSetupDesc3,
                this.state.stepCount === 1.3 ? wp('100%') : 0,
              )}
              {this.swiperViewStep3(
                Assets.step2,
                '',
                this.state.stepCount === 1.4 ? wp('100%') : 0,
              )}

              <TouchableOpacity
                onPress={() => this.onPressBackButton()}
                style={styles.backBtnContainer}>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  size={wp('4.8%')}
                  color={'#000000'}
                  style={styles.backIconStyle}
                />
              </TouchableOpacity>

              {/* {this.swiperView(
                Assets.adapterImage,
                'Before starting the setup, please make\nsure your wifi adapter is connected to the\nheater.',
                this.state.stepCount === 1.2 ? wp('100%') : 0,
              )} */}
            </View>
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default WifiSetupScreen;
