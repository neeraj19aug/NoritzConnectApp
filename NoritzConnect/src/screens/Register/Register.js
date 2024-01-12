import React, { Component } from 'react';
import { DarkModeContext } from 'react-native-dark-mode';
import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import { getColors } from '../../services/Color';
import Assets from '../../services/Assets';
import styles from './styles';
import { Button } from '../../components/common';
import Fonts from '../../services/Fonts';
import { LoginFormField } from '../../components';
import { decryptValue, validateEmail } from '../../services/Functions';
import Activity from '../../components/ActivityIndicator';
import { setConfiguration, getConfiguration } from '../../services/configuration';
import Strings from '../../services/Strings';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      email: getConfiguration('socialEmail'),
      password: '',
      fullName: getConfiguration('socialName'),
      confirmPassword: '',
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onPressRegisterButton = () => {
    if (this.state.fullName === '') {
      this.showAlert(Strings.enterFullName, 300);
      return;
    }
    if (this.state.email === '') {
      this.showAlert(Strings.enterEmail, 300);
      return;
    }
    if (this.state.password === '') {
      this.showAlert(Strings.enterPassword, 300);
      return;
    }
    if (this.state.confirmPassword === '') {
      this.showAlert(Strings.enterConfirmPassword, 300);
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      this.showAlert(Strings.passwordNotMatch, 300);
      return;
    }

    const validate = validateEmail(this.state.email);
    if (validate) {
      this.props.registerUser(
          this.state.fullName,
          this.state.email,
          this.state.password,
          getConfiguration('facebookId'),
          getConfiguration('twitterId'),
          getConfiguration('appleId'),
        )
        .then(() => this.afterCallRegisterAPI())
        .catch(e => this.showAlert('It seems something went wrong on the server. Please try after some time.', 300));
    } else {
      this.showAlert(Strings.enterValidEmail, 300);
    }
  };

  goBack() {
    this.props.navigation.goBack();
  }

  async afterCallRegisterAPI() {
    const {response} = this.props.responseRegister;
    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        let {user_id} = response;
        user_id = await decryptValue(user_id);
        setConfiguration('user_id', user_id);

        let {password} = response;
        password = await decryptValue(password);
        setConfiguration('serverPassword', password);

        this.callMetaDataAPI(user_id);
        // this.props.navigation.navigate('AddHeaterLogin');
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        this.showAlert(resMessage, 300);
      }
    }
  }

  callMetaDataAPI(user_id) {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.props
          .getMetadata(user_id)
          .then(() => this.afterCallMetadataAPI())
          .catch(e => this.showAlert('It seems something went wrong on the server. Please try after some time.', 300));
      } else {
        this.showAlert(Strings.networkError, 300);
      }
    });
  }

  afterCallMetadataAPI() {
    this.props.navigation.navigate('AddHeaterLogin');
  }

  showAlert(message, duration) {
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }

  render() {
    return (
      <DarkModeContext.Consumer>
        {() => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            enabled={Platform.OS === 'ios' ? false : false}
            style={[
              styles.pageContainer,
              {backgroundColor: getColors().screenBackground},
            ]}>
            <Image
              resizeMode="cover"
              source={Assets.background}
              style={styles.backgroundImage}
            />

            <TouchableOpacity
              onPress={() => this.goBack()}
              style={styles.btnBack}
              >
              <Image
                resizeMode="contain"
                source={Assets.back_btn}
                style={styles.imgBack}
              />
            </TouchableOpacity>

            <Image
              resizeMode="contain"
              source={Assets.logo}
              style={styles.imgLogo}
            />

            <View style={styles.rememberBG}>
              <Text
                allowFontScaling={false}
                style={[styles.txtRegister, {color: getColors().txtBlackColor}]}>
                {Strings.txtRegister}
              </Text>
            </View>

            <LoginFormField
              refer={instance => (this.fullNameField = instance)}
              style={styles.txtField}
              icon={Assets.user}
              title={Strings.txtFullName}
              hideTitle
              value={this.state.fullName}
              onFocus={this.textFieldGetFoucus}
              onPress={() => this.fullNameField.focus()}
              onChangeText={fullName => this.setState({fullName})}
            />

            <LoginFormField
              refer={instance => (this.emailField = instance)}
              style={styles.txtField}
              icon={Assets.email}
              title={Strings.txtfldEmail}
              keyboardType="email-address"
              hideTitle
              value={this.state.email}
              onFocus={this.textFieldGetFoucus}
              onPress={() => this.emailField.focus()}
              onChangeText={email => this.setState({email})}
            />

            <LoginFormField
              refer={instance => (this.passwordField = instance)}
              style={styles.txtField}
              icon={Assets.locked}
              title={Strings.txtfldPassword}
              hideTitle
              secureTextEntry
              value={this.state.password}
              onFocus={this.textFieldGetFoucus}
              onPress={() => this.passwordField.focus()}
              onChangeText={(password) => this.setState({ password })}
            />

            <LoginFormField
              refer={instance => (this.confirmPasswordField = instance)}
              style={styles.txtField}
              icon={Assets.confirmPassword}
              title={Strings.txtfldConfirmPassword}
              hideTitle
              secureTextEntry
              value={this.state.confirmPassword}
              onFocus={this.textFieldGetFoucus}
              onPress={() => this.confirmPassword.focus()}
              onChangeText={confirmPassword => this.setState({confirmPassword})}
            />

            <View style={styles.setHeight} />

            <Button
              title={Strings.txtRegister}
              textStyle={styles.btnText}
              onPress={this.onPressRegisterButton}
            />

            <View style={styles.bottomViewBG}>
              <Text 
                allowFontScaling={false}
                style={[styles.txtBottomText, styles.setBlackColor]}>
                {Strings.txtByclicking}
              </Text>
              <Text
                allowFontScaling={false}
                style={[
                  styles.txtBottomText,
                  {
                    marginTop:
                      Platform.OS === 'android' ? wp('4.5%') : wp('2%'),
                    fontFamily: Fonts.oxygenBold,
                  },
                ]}>
                {Strings.txtRegister}
              </Text>
            </View>
            <View style={styles.txtAgreeBG}>
              <Text
                allowFontScaling={false}
                style={[styles.txtBottomText, styles.setBlackColor]}>
                {Strings.txtYouAgree}
              </Text>
              <Text
                allowFontScaling={false}
                style={[styles.txtBottomText, {color: getColors().redColor}]}>
                {Strings.txtTermsAndCondition}
              </Text>
            </View>
            <Text
              allowFontScaling={false}
              style={[styles.txtBottomText, { width: wp('100%') }]}
            >
              {Strings.txtCopyright}
            </Text>
            <Text
              allowFontScaling={false}
              style={[styles.txtBottomText, { color: getColors().txtBlackColor}]}>
              {Strings.txtAllRights}
            </Text>

            {this.props.isBusyRegister || this.props.isBusyMetadata ? (
              <Activity />
            ) : null}
          </KeyboardAvoidingView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default RegisterScreen;
