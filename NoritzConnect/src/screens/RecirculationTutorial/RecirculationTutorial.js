import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';

import {getConfiguration} from '../../services/configuration';

import {
  Text,
  View,
  ScrollView,
  BackHandler,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import {getColors} from '../../services/Color';
import styles from './styles';
import {Header} from '../../components/common';
import Strings from '../../services/Strings';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class RecirculationTutorialScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      webViewUrl:
        'https://help.noritz.com/index.php/knowledge-base/nrcr-changing-modes-noritz-connect-app/',

      // video_link: getConfiguration('video_link'),
      // video_mode: getConfiguration('video_mode'),
      // mode: getConfiguration('mode'),
      // recirculation_description: getConfiguration('recirculation_description'),
    };
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick.bind(this),
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.goBack();
    return true;
  }

  goBack() {
    this.props.navigation.navigate('Home');
  }

  render() {
    // var videoLink = this.state.video_link;
    // var myArray = videoLink.split('/');

    return (
      <DarkModeContext.Consumer>
        {() => (
          <SafeAreaView
            style={[
              styles.pageContainer,
              {backgroundColor: getColors().screenBackground},
            ]}>
            <Header
              isBack
              nav={this.props.navigation}
              onBackClick={() => this.goBack()}
            />

            <View style={[styles.innerContainer, styles.shadow]}>
              <View style={styles.pageContainer}>
                <WebView
                  source={{uri: this.state.webViewUrl}}
                  useWebKit
                  startInLoadingState
                  style={styles.webviewStyle}
                />
              </View>
            </View>
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default RecirculationTutorialScreen;
