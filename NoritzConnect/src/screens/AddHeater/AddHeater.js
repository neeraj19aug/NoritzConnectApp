import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {
  Text,
  View,
  Image,
  BackHandler,
  Platform,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import {getColors} from '../../services/Color';
import Assets from '../../services/Assets';
import styles from './styles';
import {getConfiguration} from '../../services/configuration';
import Strings from '../../services/Strings';

class AddHeaterScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {
      isShowBackButton: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick.bind(this),
    );

    this.focusCall = this.props.navigation.addListener('focus', () => {
      const isComeFromHomeScreen = getConfiguration('homescreenLoaded');
      if (isComeFromHomeScreen === 'true') {
        this.setState({isShowBackButton: true});
      } else {
        this.setState({isShowBackButton: false});
      }
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
    this.goBack();
    return true;
  }

  goBack() {
    this.props.navigation.navigate('Home');
  }

  goToEnterModelNumberScreen() {
    this.props.navigation.navigate('EnterModelNumber');
  }

  OpenScanScreen() {
    this.props.navigation.navigate('ScanQR');
  }

  render() {
    return (
      <DarkModeContext.Consumer>
        {() => (
          <View
            style={[
              styles.pageContainer,
              {backgroundColor: getColors().screenBackground},
            ]}>
            <View style={styles.upperView}>
              <Image
                resizeMode="cover"
                source={Assets.addHeaterBG}
                style={styles.upperBGImage}
              />
              <View style={styles.setContentCenter}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtAddHearer,
                    {color: getColors().whiteColor},
                  ]}>
                  Add a heater
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[styles.txtManually, {color: getColors().whiteColor}]}>
                  {Strings.ManuallyChhoseHeater}
                </Text>
                <TouchableOpacity
                  onPress={() => this.goToEnterModelNumberScreen()}>
                  <Image
                    resizeMode="contain"
                    source={Assets.Add_btn}
                    style={styles.Add_btn}
                  />
                </TouchableOpacity>
              </View>
              {this.state.isShowBackButton ? (
                <TouchableOpacity
                  onPress={() => this.goBack()}
                  style={styles.btnBack}>
                  <Image
                    resizeMode="contain"
                    source={Assets.back_white}
                    style={styles.setFullView}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.lowerView}>
              <View style={styles.setContentCenter}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtAddHearer,
                    {color: getColors().primaryBlackColor},
                  ]}>
                  Scan QR Code
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtManually,
                    {color: getColors().primaryBlackColor},
                  ]}>
                  {'QR Code is shown on the'}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtManually,
                    {color: getColors().primaryBlackColor},
                  ]}>
                  {'rating plate of the heater'}
                </Text>

                <TouchableOpacity onPress={() => this.OpenScanScreen()}>
                  <Image
                    resizeMode="contain"
                    source={Assets.qrImage}
                    style={styles.Add_btn}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Image
              resizeMode="contain"
              source={Assets.or}
              style={styles.orImage}
            />
          </View>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default AddHeaterScreen;
