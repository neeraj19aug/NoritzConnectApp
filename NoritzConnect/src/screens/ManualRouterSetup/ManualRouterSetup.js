import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import Moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  UIManager,
  TouchableOpacity,
  Animated,
  AppState,
  Easing,
  Alert,
  NativeModules,
  Linking,
  NativeEventEmitter,
} from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';
import WifiManager from 'react-native-wifi-reborn';
import {getColors} from '../../services/Color';
import Assets from '../../services/Assets';
import styles from './styles';
import {Button, WifiSetupHeader} from '../../components/common';
import {FormField} from '../../components';
import {setConfiguration, getConfiguration} from '../../services/configuration';
import {decryptValue, showAlert, stringToHex} from '../../services/Functions';
import Activity from '../../components/ActivityIndicator';
import Strings from '../../services/Strings';

const {udp} = NativeModules;
const socketEmitter = new NativeEventEmitter(udp);

class ManualRouterSetupScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    startOverPressed = false;

    this.state = {
      selectedTabIndex: 2,
      stepNumber: 4,
      isVisiblePasswordPopup: false,
      selectedWiFi: 'Advance KPC',
      wifiPassword: '',
      error_response: '',
      isVisibleWaitingView: false,
      isVisibleSuccessView: false,
      isVisibleFailView: false,
      spinAnim: new Animated.Value(0),
      SSID: [],
      range: [],
      indexOfExpandedCell: -1,
      SelectedSSIDName: '',
      isSearching: false,
      isVisibleFailViewNew: false,
      isConnecting: false,
      isDisable: false,
      isStopRequest: false,
      isSuccess: false,
      inThing: '',
      tab1Text: 'Step 2',
      tab2Text: 'Step 3',
      tab3Text: 'Step 4',
      openSettings: false,
    };
  }

  componentDidMount() {
    this.startOverPressed = false;
    AppState.addEventListener('change', this.handleAppStateChange);

    const update = getConfiguration('update');
    if (update === '0') {
      this.setState({
        inThing: '',
      });
    } else {
      this.setState({
        inThing: getConfiguration('thingName'),
      });
    }

    Animated.loop(
      Animated.timing(this.state.spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
    setConfiguration('isComeFromWPS', false);
    setConfiguration('isComeFromManual', true);
    this.socketCommandListener = socketEmitter.addListener(
      'socketResponse',
      reminder => this.showSocketResponse(reminder),
    );

    setTimeout(() => this.commandFireGetSSIDList(), 1000);

    this.setState({
      isSearching: true,
      selectedTabIndex: 2,
    });
  }

  componentWillUnmount() {
    this.socketCommandListener.remove();
  }

  handleAppStateChange = nextAppState => {
    console.log('App state change --- ', nextAppState);
    console.log('route name---', this.props.route.name);
    console.log('startOverPressed---', this.startOverPressed);

    if (nextAppState == 'active') {
      console.log('this.state.openSettings --- ', this.state.openSettings);

      if (this.state.openSettings) {
        this.setState({openSettings: false});
        this.getCurrentWifi();
      }
    }
  };

  handleGetInitial() {
    this.setState({
      isStopRequest: true,
      isSuccess: true,
      isVisibleFailView: true,
      stepNumber: 5,
      isVisibleFailViewNew: false,
      isVisiblePasswordPopup: false,
      isVisibleWaitingView: false,
    });
  }

  getInitial() {
    const inSerialnumber = getConfiguration('manualSavedSerialNUmber');
    const macAddress = getConfiguration('macAddress');
    const update = getConfiguration('update');
    this.props
      .getInitialdata(inSerialnumber, macAddress, this.state.inThing, update)
      .then(() => this.afterGetInitialdataAPI())
      .catch(e => {
        this.handleGetInitial();
        console.log(e);
        });
  }

  onPressBackButton = () => {
    this.props.navigation.goBack();
  };

  onPressCancelButton = () => {
    this.startOverPressed = true;

    this.props.navigation.navigate('Tutorial');
  };

  onPressNextkButton = () => {
    setTimeout(() => this.commandFireGetSSIDList(), 1000);

    this.setState({
      isSearching: true,
      selectedTabIndex: 2,
    });
  };

  onPressConnectButton = () => {
    if (this.state.indexOfExpandedCell < 0) {
      showAlert(Strings.msgPleaseSelectWifi, 300);
    } else {
      this.setState({
        isVisiblePasswordPopup: true,
      });
    }
  };

  onPressAPLedButton = () => {
    this.setState({
      selectedTabIndex: 1,
    });
  };

  backWaitingView = () => {
    this.setState({
      isVisiblePasswordPopup: false,
      isVisibleWaitingView: false,
      isStopRequest: true,
      isVisibleFailViewNew: false,
    });
    this.startOverPressed = true;

    this.props.navigation.navigate('Tutorial');
  };

  retrySearch = () => {
    Animated.loop(
      Animated.timing(this.state.spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
    this.setState({
      isVisiblePasswordPopup: false,
      isVisibleWaitingView: false,
      isVisibleFailView: false,
      isVisibleSuccessView: false,
      isVisibleFailViewNew: false,
      selectedTabIndex: 2,
      isSearching: true,
      stepNumber: 4,
    });
    setTimeout(() => this.commandFireGetSSIDList(), 1000);
  };

  SSIDError() {
    Alert.alert(
      '',
      Strings.msgHeaterNotConnected,
      [
        {
          text: Strings.txtStartOver,
          onPress: () => {
            this.startOverPressed = true;

            this.props.navigation.navigate('Tutorial');
          },
        },
        {
          text: Strings.alerttxtGoToSettings,
          onPress: () => {
            this.setState({
              openSettings: true,
            });
            if (Platform.OS === 'android') {
              AndroidOpenSettings.wifiSettings();
            } else {
              Linking.openSettings();
            }
          },
        },
      ],
      {cancelable: false},
    );
  }

  getCurrentWifi = () => {
    console.log('getCurrentWifi calling');
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        if (ssid.substring(0, 3) == 'NAW') {
          this.retrySearch();
        } else {
          this.SSIDError();
        }
      },
      e => {
        this.SSIDError();
        console.log(e);
      },
    );
  };

  retryFromFailView = () => {
    this.props.navigation.navigate('Tutorial');
  };

  retryFromFailViewNew = () => {
    this.props.navigation.navigate('Tutorial');
  };

  doneFromSuccesView = () => {
    const loginUser = getConfiguration('loginUser');

    const Model_name = getConfiguration('heaterNameNew');
    const Serial_number = getConfiguration('heaterID');
    const Router_serial_num = getConfiguration('manualSavedSerialNUmber');
    const {iot_user_id} = loginUser;
    const {inThing} = this.state; // getConfiguration('thingName');
    const MaxTempSet = getConfiguration('selectedHeaterMax');
    const MinTempSet = getConfiguration('selectedHeaterMin');
    const macAddress = getConfiguration('macAddress');
    const update = getConfiguration('update');
    const signal_strength = '50';

    this.props
      .saveHeater(
        Model_name,
        Serial_number,
        Router_serial_num,
        iot_user_id,
        inThing,
        MaxTempSet,
        MinTempSet,
        macAddress,
        update,
        signal_strength,
      )
      .then(() => this.afterCallSaveHeaterAPI())
      .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));

    // this.props.navigation.navigate('Home');
  };

  verifyPassword() {
    if (this.state.wifiPassword !== '' && this.state.wifiPassword !== null) {
      this.setState({
        isVisiblePasswordPopup: false,
        isVisibleWaitingView: true,
      });

      setTimeout(() => this.commandFireSetPassword(), 1000);

      setTimeout(() => {
        this.setState({
          isVisiblePasswordPopup: false,
          isVisibleWaitingView: false,
          isVisibleFailView: !this.state.isSuccess,
          stepNumber: 5,
          isStopRequest: true,
          tab1Text: 'Step 4',
          tab2Text: 'Step 5',
          tab3Text: 'Step 6',
        });
        if(this.state.error_response != ''){
          showAlert(this.state.error_response, 300);
        }
      }, 180000);
    }
  }

  async afterGetInitialdataAPI() {
    const {response} = this.props.responseGetInitial;

    let resCode = response.responseCode;
    resCode = await decryptValue(resCode);

    if (resCode == 200) {

        const error_response = response.error_response;
         console.log('error_response --', error_response);
         if(error_response.length > 0){
            const message = await decryptValue(error_response[0].message);
            this.setState({error_response: message});
            //showAlert(message, 300);
         }

      const iotResponse = response.iot_response;

      const thingName = await decryptValue(iotResponse.thingname);
      // setConfiguration('thingName', thingName);
      this.setState({
        inThing: thingName,
      });

      const {initial_result} = iotResponse;

      const rowsAr = initial_result.rows;

      if (rowsAr.length > 0) {
        const rowsArr = rowsAr[0];

        const rst = await decryptValue(rowsArr.rst);

        if (rst === '1' || rst === true || rst === 'true') {
          this.setState({
            isStopRequest: true,
            isSuccess: true,
            isVisibleSuccessView: true,
            stepNumber: 5,
            isVisiblePasswordPopup: false,
            isVisibleWaitingView: false,
            tab1Text: 'Step 4',
            tab2Text: 'Step 5',
            tab3Text: 'Step 6',
          });
        } else if (this.state.isStopRequest === false) {
          setTimeout(() => this.getInitial(), 4000);
        }
        // }
      } else if (this.state.isStopRequest === false) {
        setTimeout(() => this.getInitial(), 4000);
      }
    } else if (resCode == 401) {
       const error_response = response.error_response;
         console.log('error_response --', error_response);
         if(error_response.length > 0){
            const message = await decryptValue(error_response[0].message);
            this.setState({error_response: message});
            //showAlert(message, 300);
         }
      this.setState({
        isStopRequest: true,
        isSuccess: true,
        isVisibleFailView: false,
        stepNumber: 5,
        isVisibleFailViewNew: true,
        isVisiblePasswordPopup: false,
        isVisibleWaitingView: false,
        tab1Text: 'Step 4',
        tab2Text: 'Step 5',
        tab3Text: 'Step 6',
      });
    } else if (this.state.isStopRequest == false) {
       const error_response = response.error_response;
         console.log('error_response --', error_response);
         if(error_response.length > 0){
            const message = await decryptValue(error_response[0].message);
            this.setState({error_response: message});
            //showAlert(message, 300);
         }
      setTimeout(() => this.getInitial(), 4000);
    }
  }

  commandFireForAPDisable() {
    this.setState({
      isDisable: true,
    });

    let msgId = 1;
    try {
      const messageID = getConfiguration('messageID');
      if (messageID != null) {
        msgId = messageID + 1;
      } else {
        msgId = 1;
      }
    } catch (e) {
      msgId = 1;
    }
    setConfiguration('messageID', msgId);

    let commandForFire = '010100000000';

    msgId = msgId.toString(16);

    if (msgId.length === 1) {
      msgId = `000${msgId}`;
    } else if (msgId.length === 2) {
      msgId = `00${msgId}`;
    } else if (msgId.length === 3) {
      msgId = `0${msgId}`;
    }

    let year = Moment(new Date()).format('YY');
    let month = Moment(new Date()).format('MM');
    let day = Moment(new Date()).format('DD');

    let hour = Moment(new Date()).format('HH');
    let min = Moment(new Date()).format('mm');
    let sec = Moment(new Date()).format('ss');

    year = parseInt(year).toString(16);
    month = parseInt(month).toString(16);
    day = parseInt(day).toString(16);
    hour = parseInt(hour).toString(16);
    min = parseInt(min).toString(16);
    sec = parseInt(sec).toString(16);

    if (year.length === 1) {
      year = `0${year}`;
    }
    if (month.length === 1) {
      month = `0${month}`;
    }
    if (day.length === 1) {
      day = `0${day}`;
    }
    if (hour.length === 1) {
      hour = `0${hour}`;
    }
    if (min.length === 1) {
      min = `0${min}`;
    }
    if (sec.length === 1) {
      sec = `0${sec}`;
    }

    commandForFire = `${commandForFire +
      msgId +
      year +
      month +
      day +
      hour +
      min +
      sec}070001010402000000`;

    udp.sendudpcommandNew(commandForFire);
  }

  commandFireSetPassword() {
    this.setState({
      isConnecting: true,
    });
    let msgId = 1;
    try {
      const messageID = getConfiguration('messageID');
      if (messageID != null) {
        msgId = messageID + 1;
      } else {
        msgId = 1;
      }
    } catch (e) {
      msgId = 1;
    }
    setConfiguration('messageID', msgId);

    let commandForFire = '010100000000';
    msgId = msgId.toString(16);

    if (msgId.length === 1) {
      msgId = `000${msgId}`;
    } else if (msgId.length === 2) {
      msgId = `00${msgId}`;
    } else if (msgId.length === 3) {
      msgId = `0${msgId}`;
    }

    let year = Moment(new Date()).format('YY');
    let month = Moment(new Date()).format('MM');
    let day = Moment(new Date()).format('DD');

    let hour = Moment(new Date()).format('HH');
    let min = Moment(new Date()).format('mm');
    let sec = Moment(new Date()).format('ss');

    year = parseInt(year).toString(16);
    month = parseInt(month).toString(16);
    day = parseInt(day).toString(16);
    hour = parseInt(hour).toString(16);
    min = parseInt(min).toString(16);
    sec = parseInt(sec).toString(16);

    if (year.length === 1) {
      year = `0${year}`;
    }
    if (month.length === 1) {
      month = `0${month}`;
    }
    if (day.length === 1) {
      day = `0${day}`;
    }
    if (hour.length === 1) {
      hour = `0${hour}`;
    }
    if (min.length === 1) {
      min = `0${min}`;
    }
    if (sec.length === 1) {
      sec = `0${sec}`;
    }
    commandForFire =
      commandForFire + msgId + year + month + day + hour + min + sec;

    let ssidName = this.state.SelectedSSIDName;
    ssidName = stringToHex(ssidName);

    const ssidSize = ssidName.length / 2;
    let ssidSizeString = parseInt(ssidSize).toString(16);
    if (ssidSizeString.length == 1) {
      ssidSizeString = `0${ssidSizeString}`;
    }

    let password = this.state.wifiPassword;
    password = stringToHex(password);

    const passwordLength = password.length / 2;
    let passwordLengthString = parseInt(passwordLength).toString(16);
    if (passwordLengthString.length === 1) {
      passwordLengthString = `0${passwordLengthString}`;
    }

    const adapterSize = ssidSize + passwordLength + 2;
    let adapterSizeString = parseInt(adapterSize).toString(16);
    if (adapterSizeString.length === 1) {
      adapterSizeString = `0${adapterSizeString}`;
    }

    const dataSize = adapterSize + 5;
    let dataLengthString = parseInt(dataSize).toString(16);
    if (dataLengthString.length === 1) {
      dataLengthString = `0${dataLengthString}`;
    }

    commandForFire = `${commandForFire +
      dataLengthString}00010107${adapterSizeString}00${ssidSizeString}${ssidName}${passwordLengthString}${password}`;

    udp.sendudpcommandNew(commandForFire);
  }

  checkResponseSSIDList() {
    this.setState({
      isSearching: false,
    });

    if (this.state.SSID.length === 0) {
      this.setState({
        isVisibleFailView: true,
        stepNumber: 5,
      });
    }
  }

  commandFireGetSSIDList() {
    setTimeout(() => this.checkResponseSSIDList(), 15000);

    this.setState({
      isSearching: true,
    });
    let msgId = 1;
    try {
      const messageID = getConfiguration('messageID');
      if (messageID != null) {
        msgId = messageID + 1;
      } else {
        msgId = 1;
      }
    } catch (e) {
      msgId = 1;
    }
    setConfiguration('messageID', msgId);

    let commandForFire = '010200000000';
    msgId = msgId.toString(16);

    if (msgId.length === 1) {
      msgId = `000${msgId}`;
    } else if (msgId.length === 2) {
      msgId = `00${msgId}`;
    } else if (msgId.length === 3) {
      msgId = `0${msgId}`;
    }

    let year = Moment(new Date()).format('YY');
    let month = Moment(new Date()).format('MM');
    let day = Moment(new Date()).format('DD');

    let hour = Moment(new Date()).format('HH');
    let min = Moment(new Date()).format('mm');
    let sec = Moment(new Date()).format('ss');

    year = parseInt(year).toString(16);
    month = parseInt(month).toString(16);
    day = parseInt(day).toString(16);
    hour = parseInt(hour).toString(16);
    min = parseInt(min).toString(16);
    sec = parseInt(sec).toString(16);

    if (year.length === 1) {
      year = `0${year}`;
    }
    if (month.length === 1) {
      month = `0${month}`;
    }
    if (day.length === 1) {
      day = `0${day}`;
    }
    if (hour.length === 1) {
      hour = `0${hour}`;
    }
    if (min.length === 1) {
      min = `0${min}`;
    }
    if (sec.length === 1) {
      sec = `0${sec}`;
    }

    commandForFire = `${commandForFire +
      msgId +
      year +
      month +
      day +
      hour +
      min +
      sec}0300010000`;

    udp.sendudpcommandNew(commandForFire);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  searchingDone(response) {
    this.setState({
      indexOfExpandedCell: -1,
      SSID: [],
      range: [],
    });

    const SSID = [];
    const range = [];
    const totalCount = response.substring(38, 40);
    const countSSID = parseInt(totalCount, 16);
    // const bit2 = response.substring(34, 36);
    // let bit3 = response.substring(36, 38);
    // bit3 += bit2;
    // bit3 = parseInt(bit3, 16);
    // bit3 *= 2;

    const RemainingString = response.substring(40, response.length);
    const checkCount = RemainingString.length / 82;

    if (checkCount === countSSID) {
      let str = RemainingString;
      for (let x = 0; x < countSSID; x++) {
        const substring = str.substring(0, 82);
        const secureBit = substring.substring(78, 80);
        if (secureBit === '00' || secureBit === '01') {
          str = str.substring(82, str.length);
          break;
        }

        const rangeStr = substring.substring(80, 82);
        const rangeVal = parseInt(rangeStr, 16);
        range.push(rangeVal);

        let name = str.substring(12, 76);
        let nameVal = '';
        for (let i = 0; i < name.length && name.substr(i, 2) !== '00'; i += 2)
          nameVal += String.fromCharCode(parseInt(name.substr(i, 2), 16));
        name = nameVal;
        SSID.push(name);
        str = str.substring(82, str.length);
      }

      this.setState({
        SSID,
        range,
      });
    }
  }

  connectingDone(response) {
    const checkResponse = response.substring(0, 6);
    if (checkResponse === '018100' || checkResponse === '018200') {
      this.commandFireForAPDisable();
      this.setState({
        tab1Text: 'Step 3',
        tab2Text: 'Step 4',
        tab3Text: 'Step 5',
      });

      setTimeout(() => this.getInitial(), 20000);
    }
  }

  SocketDisableDone(response) {
    const checkResponse = response.substring(0, 6);
    if (checkResponse === '018100' || checkResponse === '018200') {
      this.setState({
        isVisibleWaitingView: true,
      });
    }
  }

  showSocketResponse(message) {
    let response = '';

    if (Platform.OS === 'android') {
      response = message;
    } else {
      response = message.name;
    }
    if (this.state.isSearching) {
      this.setState({isSearching: false});
      this.searchingDone(response);
    } else if (this.state.isConnecting) {
      this.setState({isConnecting: false});
      this.connectingDone(response);
    } else if (this.state.isDisable) {
      this.setState({isDisable: false});
      this.SocketDisableDone(response);
    }
  }

  async afterCallSaveHeaterAPI() {
    const {response} = this.props.responseSaveHeater;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      var resMessage = "";
      if (resCode == 200) {
        resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        const loginUser = getConfiguration('loginUser');
        this.callMetaDataAPI(loginUser.iot_user_id);
      } else {
        resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  callMetaDataAPI(user_id) {
    this.props
      .getMetadata(user_id)
      .then(() => this.afterCallMetadataAPI())
      .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
  }

  afterCallMetadataAPI() {
    setConfiguration('newHeaterAdded', 'true');
    this.props.navigation.navigate('Home');
  }

  passwordPopupContent() {
    return (
      <View style={styles.temperaturePopup}>
        <Text allowFontScaling={false} style={styles.titleTemperaturePopup}>
          {Strings.txtEnterWifiPassword}
        </Text>
        <Text allowFontScaling={false} style={styles.contentTemperaturePopup}>
          {this.state.selectedWiFi}
        </Text>
        <FormField
          refer={instance => (this.wifiPasswordField = instance)}
          style={styles.txtField}
          title={Strings.txtEnterPasswrd}
          hideTitle
          secureTextEntry
          value={this.state.wifiPassword}
          onFocus={this.textFieldGetFoucus}
          onPress={() => this.wifiPasswordField.focus()}
          onChangeText={wifiPassword => this.setState({wifiPassword})}
        />
        <TouchableOpacity
          style={styles.cancelPopup}
          onPress={() => this.setState({isVisiblePasswordPopup: false})}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().cellTitleColor},
            ]}>
            {Strings.txtCancel}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeTemperaturePopup}
          onPress={() => this.verifyPassword()}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().redColor},
            ]}>
            {Strings.txtConnect}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }


  step4View() {
    const wifiListTable = this.state.SSID.map((data, index) => (
      <TouchableOpacity
        style={[styles.cellView, {backgroundColor: getColors().whiteColor}]}
        onPress={() =>
          this.setState({
            isVisiblePasswordPopup: true,
            selectedWiFi: data,
            wifiPassword: '',
            indexOfExpandedCell: index,
            SelectedSSIDName: data,
          })
        }>
        <View style={styles.cellInnerLeftView}>
          <Text
            allowFontScaling={false}
            style={[
              styles.wifiName,
              {
                color: getColors().primaryBlackColor,
                opacity: this.state.indexOfExpandedCell === index ? 1 : 0.7,
              },
            ]}>
            {data}
          </Text>
        </View>

        <View style={styles.cellInnerRightView}>
          <Image
            resizeMode="contain"
            source={Assets.lock}
            style={styles.lockImgStyle}
          />
          {this.state.range[index] > 0 && this.state.range[index] <= 30 ? (
            <Image
              resizeMode="contain"
              source={Assets.signal3}
              style={styles.imgSignalStyle}
            />
          ) : null}
          {this.state.range[index] > 30 && this.state.range[index] <= 70 ? (
            <Image
              resizeMode="contain"
              source={Assets.signal2}
              style={styles.imgSignalStyle}
            />
          ) : null}
          {this.state.range[index] > 70 && this.state.range[index] <= 80 ? (
            <Image
              resizeMode="contain"
              source={Assets.signal1}
              style={styles.imgSignalStyle}
            />
          ) : null}
          {this.state.range[index] > 80 ? (
            <Image
              resizeMode="contain"
              source={Assets.signal0}
              style={styles.imgSignalStyle}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    ));

    return (
      <View style={[styles.innerContainer]}>
        <Text
          allowFontScaling={false}
          style={[styles.txtHeading, {color: getColors().cellTitleColor}]}>
          {Strings.txtSelectWirelessNetwork}
        </Text>
        <View style={styles.setFlexFullView}>
          <View style={styles.txtSSIDBG}>
            <Text
              allowFontScaling={false}
              style={[
                styles.txtListHeading,
                {color: getColors().primaryBlackColor},
              ]}>
              {Strings.txtSSID}
            </Text>
            <Text
              allowFontScaling={false}
              style={[
                styles.txtListHeading,
                {color: getColors().primaryBlackColor},
              ]}>
              {Strings.txtSignal}
            </Text>
          </View>
          <ScrollView style={styles.setFlexFullView}>{wifiListTable}</ScrollView>
        </View>
      </View>
    );
  }

  step5View() {
    Animated.loop(
      Animated.timing(this.state.spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    return (
      <View style={[styles.step5Container]}>
        <View
          style={styles.successImageBG}>
          <Animated.Image
            resizeMode="contain"
            source={Assets.waitingGIF}
            style={styles.failImageStyle}
          />
        </View>
        <View style={styles.alreadyPairedDescBG}>
          <Text
            allowFontScaling={false}
            style={[styles.txtHeading, {color: getColors().cellTitleColor, lineHeight: wp('6%')}]}>
            {Strings.txtWaitingForHeater}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, {color: getColors().cellTitleColor}]}>
            {Strings.txtPleaseReconnect}
          </Text>
        </View>
      </View>
    );
  }

  successView() {
    return (
      <View style={[styles.step5Container]}>
        <View
          style={styles.successImageBG}>
          <Image
            resizeMode="contain"
            source={Assets.heaterSuccess}
            style={styles.failImageStyle}
          />
        </View>
        <View style={styles.heaterOnlineDescContainer}>
          <Text
            allowFontScaling={false}
            style={[styles.txtHeading, {color: getColors().cellTitleColor}]}>
            {Strings.txtHeaterOnline}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, {color: getColors().cellTitleColor}]}>
            {Strings.descCongratulations}
          </Text>
        </View>
      </View>
    );
  }

  failView() {
    return (
      <View style={[styles.step5Container]}>
        <ScrollView style={{height: '100%', width: '100%'}}>
        <View
          style={[styles.step5ContainerInner , {height: '100%'}]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.txtHeading,
              styles.txtFailToConnect,
            ]}>
            {Strings.txtFailedToConnect}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, styles.txtDesc2]}>
            {
              Strings.descUnfortunatly
            }
          </Text>
          <Text
            allowFontScaling={false}
            style={[
              styles.txtDesc,
              styles.txtDesc2,
              styles.txtWaitForSec,
            ]}>
            {Strings.txtWaitForFewSeconds}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, styles.txtDesc2, styles.txtDesc3]}>
            {Strings.txtLEDisON}
          </Text>
          <Image
            resizeMode="contain"
            source={Assets.ledImage}
            style={styles.ledImageStyle}
          />
          <Button
            title={Strings.txtLightsAreOn}
            onPress={this.doneFromSuccesView}
            containerStyle={{marginTop: hp('3.34%')}}
            disabled={
              this.state.inThing != null && this.state.inThing != ''
                ? false
                : true
            }
            containerBackgroundColor={
              this.state.inThing != null && this.state.inThing != ''
                ? null
                : '#AAAAAA'
            }
          />
          <Text
            allowFontScaling={false}
            style={[
              styles.txtDesc,
              styles.txtDesc2,
              styles.txtLightsOn,
            ]}>
            {Strings.txtIfLightsAreOn}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, styles.txtDesc2, styles.txtDesc3]}>
            {Strings.txtIfLightsAreOn2}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, styles.txtDesc2, styles.txtDesc3]}>
            {Strings.txtIfLightsAreOn3}
          </Text>
          <View
            style={styles.buttonsContainer}>
            <View style={styles.btnStartOverContainer}>
              <Button
                title={Strings.txtWifiPassword}
                onPress={this.getCurrentWifi}
                containerStyle={styles.btnStartOverStyle}
                containerBackgroundColor={getColors().whiteColor}
                textStyle={{color: getColors().txtBlackColor}}
              />
            </View>
            <View style={styles.btnStartOverContainer}>
              <Button
                title={Strings.txtStartOver}
                onPress={this.onPressCancelButton}
                containerStyle={styles.btnStartOverStyle}
                containerBackgroundColor={getColors().whiteColor}
                textStyle={{color: getColors().txtBlackColor}}
              />
            </View>
          </View>

          <Text
            allowFontScaling={false}
            style={[
              styles.txtDesc,
              styles.txtDesc2,
              styles.txtContactNoritz,
            ]}>
            {Strings.txtIfTheIssuePersist}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, styles.txtDesc2, styles.txtDesc3]}>
            {Strings.txtSupportAt}
          </Text>
        </View>
        </ScrollView>
      </View>
    );
  }

  failViewHeaterAlreadyConnected() {
    return (
      <View style={[styles.step5Container]}>
        <View
          style={styles.failImageBG}>
          <Image
            resizeMode="contain"
            source={Assets.heaterFail}
            style={styles.failImageStyle}
          />
        </View>
        <View style={styles.alreadyPairedDescBG}>
          <Text
            allowFontScaling={false}
            style={[styles.txtHeading, {color: getColors().cellTitleColor}]}>
            {Strings.AlreadyPairedMsg}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, {color: getColors().cellTitleColor}]}>
            {Strings.txtAlreadyPairedDesc}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, {color: getColors().cellTitleColor}]}>
            {Strings.alreadyPairedContactMessage}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['360deg', '0deg'],
    });
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


            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleWaitingView === false &&
            this.state.isVisibleSuccessView === false &&
            this.state.isVisibleFailView === false &&
            this.state.isVisibleFailViewNew === false
              ? this.step4View()
              : null}

            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleWaitingView === true &&
            this.state.isVisibleSuccessView === false &&
            this.state.isVisibleFailView === false
              ? this.step5View()
              : null}

            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleWaitingView === false &&
            this.state.isVisibleSuccessView === true
              ? this.successView()
              : null}

            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleWaitingView === false &&
            this.state.isVisibleFailView === true
              ? this.failView()
              : null}

            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleWaitingView === false &&
            this.state.isVisibleFailView === false &&
            this.state.isVisibleFailViewNew === true
              ? this.failViewHeaterAlreadyConnected()
              : null}

            {this.state.selectedTabIndex === 1 ? (
              <Button title="Next" onPress={this.onPressNextkButton} />
            ) : null}
            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleWaitingView === false &&
            this.state.isVisibleSuccessView === false &&
            this.state.isVisibleFailView === false &&
            this.state.isVisibleFailViewNew === false ? (
              <Button title="Connect" onPress={this.onPressConnectButton} />
            ) : null}

            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleWaitingView === true &&
            this.state.isVisibleSuccessView === false &&
            this.state.isVisibleFailView === false ? (
              <Button title="Back" onPress={this.backWaitingView} />
            ) : null}

            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleWaitingView === false &&
            this.state.isVisibleSuccessView === true &&
            this.state.isVisibleFailViewNew === false ? (
              <Button title="Done" onPress={this.doneFromSuccesView} />
            ) : null}
            {/* {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleWaitingView === false &&
            this.state.isVisibleFailView === true &&
            this.state.isVisibleFailViewNew === false ? (
              <Button
                title="Start Wifi Setup from begining"
                onPress={this.retryFromFailView}
              />
            ) : null} */}

            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleWaitingView === false &&
            this.state.isVisibleFailView === false &&
            this.state.isVisibleFailViewNew === true ? (
              <Button title={Strings.txtRetry} onPress={this.retryFromFailViewNew} />
            ) : null}

            <Dialog
              visible={this.state.isVisiblePasswordPopup}
              rounded={false}
              onTouchOutside={() => {
                this.setState({isVisiblePasswordPopup: false});
              }}>
              <DialogContent style={styles.setPadding}>
                {this.passwordPopupContent()}
              </DialogContent>
            </Dialog>

            {this.state.isSearching ? (
              <View
                style={styles.loaderBG}>
                <Text
                  allowFontScaling={false}
                  style={styles.txtSearchingNetwork}>
                  {Strings.txtSearchingLocalNetwork}
                </Text>
                <Animated.Image
                  resizeMode="contain"
                  source={Assets.waiting}
                  style={{
                    width: wp('25%'),
                    height: wp('25%'),
                    transform: [{rotate: spin}],
                  }}
                />
              </View>
            ) : null}

            {this.props.isBusySaveHeater || this.props.isBusyMetadata ? (
              <Activity />
            ) : null}
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default ManualRouterSetupScreen;
