import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import Moment from 'moment';
import {
  Text,
  View,
  Image,
  Platform,
  UIManager,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter,
  Alert,
} from 'react-native';
import {getColors} from '../../services/Color';
import Assets from '../../services/Assets';
import styles from './styles';
import {WifiSetupHeader} from '../../components/common';
import {setConfiguration, getConfiguration} from '../../services/configuration';
import Activity from '../../components/ActivityIndicator';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Strings from '../../services/Strings';

const {udp} = NativeModules;
const socketEmitter = new NativeEventEmitter(udp);

class RouterSetupScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    // eslint-disable-next-line no-undef
    backPressed = 0;
    this.state = {
      command1: false,
      command2: false,
      command1Success: false,
      command2Success: false,
      enableWpsButton: false,
      enableManualButton: false,
      runningSocketCommand: false,
    };
  }

  componentDidMount() {
    this.setState({runningSocketCommand: true});
    setTimeout(() => this.commandFireGetRouterNUmber(), 1000);
    setTimeout(() => this.checkSocketResponse(), 15000);

    this.socketCommandListener = socketEmitter.addListener(
      'socketResponse',
      (reminder) => this.showSocketResponse(reminder),
    );
  }

  componentWillUnmount() {
    this.socketCommandListener.remove();
  }

  checkSocketResponse() {
    if (
      this.state.command1Success === false &&
      this.state.command2Success === false
    ) {
      // this.setState({ runningSocketCommand: false });
      Alert.alert(
        '',
        Strings.msgHeaterNotResponding,
        [
          {
            text: 'OK',
            onPress: () => this.props.navigation.goBack(),
          },
        ],
        {cancelable: false},
      );
      // showAlert('Heater is not responding, Please try again.', 300);
      // setTimeout(() => this.setState({ runningSocketCommand: false }), 1000);
    }
  }

  showSocketResponse(message) {
    let response = '';

    if (Platform.OS === 'android') {
      response = message;
    } else {
      response = message.name;
    }

    if (this.state.command1 === true && this.state.command2 === false) {
      this.setState({
        command1Success: true,
      });

      const macAddress = response.substring(
        response.length - 12,
        response.length,
      );
      setConfiguration('macAddress', macAddress);

      const substr = response.substring(0, response.length - 12);
      let name = substr.substring(substr.length - 32, substr.length);

      let str = '';
      for (let i = 0; i < name.length && name.substr(i, 2) !== '00'; i += 2)
        str += String.fromCharCode(parseInt(name.substr(i, 2), 16));
      name = str;

      setConfiguration('manualSavedSerialNUmber', name);

      setTimeout(() => this.secondCommandFire(), 500);
    } else if (this.state.command1 === true && this.state.command2 === true) {
      const checkResponse = response.substring(0, 6);
      if (checkResponse === '018100' || checkResponse === '018200') {
        if (this.state.command1Success) {
          this.setState({
            enableWpsButton: true,
            enableManualButton: true,
            runningSocketCommand: false,
            command2Success: true,
          });
        }
      }
    }
  }

  commandFireGetRouterNUmber() {
    this.setState({
      command1: true,
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

    year = parseInt(year, 10).toString(16);
    month = parseInt(month, 10).toString(16);
    day = parseInt(day, 10).toString(16);
    hour = parseInt(hour, 10).toString(16);
    min = parseInt(min, 10).toString(16);
    sec = parseInt(sec, 10).toString(16);

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

    commandForFire = `${
      commandForFire + msgId + year + month + day + hour + min + sec
    }05000001010000`;

    udp.sendudpcommandNew(commandForFire);
  }

  secondCommandFire() {
    this.setState({
      command2: true,
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

    year = parseInt(year, 10).toString(16);
    month = parseInt(month, 10).toString(16);
    day = parseInt(day, 10).toString(16);
    hour = parseInt(hour, 10).toString(16);
    min = parseInt(min, 10).toString(16);
    sec = parseInt(sec, 10).toString(16);

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

    commandForFire = `${
      commandForFire + msgId + year + month + day + hour + min + sec
    }070001010702000000`;

    udp.sendudpcommandNew(commandForFire);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  goToWPSSetupScreen() {
    // if (this.state.enableWpsButton) {
    this.props.navigation.navigate('WPSSetup');
    // }
  }

  goToManualSetupScreen() {
    // if (this.state.enableManualButton)
    this.props.navigation.navigate('ManualRouterSetup');
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
            <WifiSetupHeader nav={this.props.navigation} stepNumber={3} />

            <View style={styles.upperView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.backBtnContainer}>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  size={wp('4.8%')}
                  color={getColors().txtBlackColor}
                  style={styles.backIconStyle}
                />
              </TouchableOpacity>
              <View style={styles.setContentCenter}>
                <TouchableOpacity onPress={() => this.goToWPSSetupScreen()}>
                  <Image
                    resizeMode="contain"
                    source={Assets.WPSImage}
                    style={[styles.Add_btn, styles.imgWPSStyle]}
                  />
                </TouchableOpacity>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtTitle,
                    {color: getColors().primaryBlackColor},
                  ]}>
                  {Strings.txtSetupUsingWPS}
                </Text>
                <Text allowFontScaling={false} style={styles.descriptionText}>
                  {Strings.WPSDesc}
                </Text>
              </View>
              {/* <TouchableOpacity
                onPress={() => this.goBack()}
                style={styles.btnBack}>
                <Image
                  resizeMode="contain"
                  source={Assets.back_white}
                  style={[{width: wp('24.15%'), height: wp('24.150%')}]}
                />
              </TouchableOpacity> */}
            </View>
            <View style={styles.lowerView}>
              <View style={styles.setContentCenter}>
                <TouchableOpacity onPress={() => this.goToManualSetupScreen()}>
                  <Image
                    resizeMode="contain"
                    source={Assets.manualImage}
                    style={styles.Add_btn}
                  />
                </TouchableOpacity>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtTitle,
                    {color: getColors().primaryBlackColor},
                  ]}>
                  {Strings.txtManualRouterSetup}
                </Text>
                <Text allowFontScaling={false} style={styles.descriptionText}>
                  {Strings.manualSetupDesc}
                </Text>
              </View>
            </View>
            <View style={styles.bottomBlankView} />
            {this.state.runningSocketCommand ? <Activity /> : null}
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default RouterSetupScreen;
