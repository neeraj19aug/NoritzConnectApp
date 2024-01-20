import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {
  Text,
  View,
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


class TermsAndConditionScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      webViewUrl: 'https://procard.noritz.com/assets/uploads/tos_iot.htm',
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

  goBack() {
    this.props.navigation.navigate('Home');
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
            <Header
              isBack
              nav={this.props.navigation}
              onBackClick={() => this.goBack()}
            />
            <View style={[styles.innerContainer, styles.shadow]}>
              <Text
                allowFontScaling={false}
                style={[
                  styles.txtHeading,
                  {color: getColors().cellTitleColor},
                ]}>
                {Strings.txtTermsOfUse}
              </Text>
              <View style={styles.pageContainer}>
                <WebView
                  source={{uri: this.state.webViewUrl}}
                  useWebKit
                  startInLoadingState
                  style={styles.webviewStyle}
                />
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={[
                  styles.callBtn,
                  {backgroundColor: getColors().redColor},
                ]}>
                <Text allowFontScaling={false} style={styles.btnText}>
                  {Strings.txtAcceptTerms}
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default TermsAndConditionScreen;
