import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import NetInfo from '@react-native-community/netinfo';
import {Text, View, Platform, UIManager, TouchableOpacity} from 'react-native';
import {getColors} from '../../services/Color';
import styles from './styles';
import {Header} from '../../components/common';
import {FormField} from '../../components';
import {setConfiguration, getConfiguration} from '../../services/configuration';
import {md5, decryptValue, showAlert} from '../../services/Functions';

class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    backPressed = 0;

    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // Perform action on click of Next button on Keyboard Assessory view
  nextTextInputButtonClicked = () => {
    if (this.oldPasswordField.isFocused()) {
      this.newPasswordField.focus();
    } else if (this.newPasswordField.isFocused()) {
      this.confirmPasswordField.focus();
    }

    // this.textFieldGetFoucus();
  };

  // Perform action on click of Previous button on Keyboard Assessory view
  previousTextInputButtonClicked = () => {
    if (this.confirmPasswordField.isFocused()) {
      this.newPasswordField.focus();
    } else if (this.newPasswordField.isFocused()) {
      this.oldPasswordField.focus();
    }
  };

  goBack() {
    this.props.navigation.goBack();
  }

  async ChangePassword() {
    if (this.state.oldPassword === '') {
      showAlert('Please enter old password.', 300);
      return;
    }
    if (this.state.newPassword === '') {
      showAlert('Please enter new password.', 300);
    } else if (this.state.confirmPassword === '') {
      showAlert('Please enter confirm password.', 300);
    } else if (
      this.state.oldPassword !== '' &&
      this.state.newPassword !== '' &&
      this.state.confirmPassword !== ''
    ) {
      const loginUser = getConfiguration('loginUser');

      const md5Password = await md5(this.state.oldPassword);

      if (md5Password === loginUser.password) {
        if (this.state.newPassword === this.state.confirmPassword) {
          if (this.state.newPassword === this.state.oldPassword) {
            showAlert(
              'The next password you are attempting to change matches your old password.',
              300,
            );
          } else {
            this.callChangePasswordWebservice();
          }
        } else {
          showAlert('Password and Confirm password does not match.', 300);
        }
      } else {
        showAlert('Old password does not match.', 300);
      }
    }
  }

  callChangePasswordWebservice() {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        const loginUser = getConfiguration('loginUser');

        this.props
          .ChangePassword(this.state.newPassword, loginUser.iot_user_id)
          .then(() => this.afterCallChangePasswordAPI())
          .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
      } else {
        showAlert(
          'It seems some problem in network connectivity. Please try again after some time.',
          300,
        );
      }
    });
  }

  async afterCallChangePasswordAPI() {
    const {response} = this.props.responseChangePassword;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        const DictUserInfo = response.Userinfo;
        const password = await md5(this.state.newPassword);
        setConfiguration('serverPassword', password);
        console.log('login password ---', password);

        const objUser = {
          address: await decryptValue(DictUserInfo.address),
          authcode: await decryptValue(DictUserInfo.authcode),
          created: await decryptValue(DictUserInfo.created),
          email: await decryptValue(DictUserInfo.email),
          fb_id: await decryptValue(DictUserInfo.fb_id),
          first_name: await decryptValue(DictUserInfo.first_name),
          iot_user_id: await decryptValue(DictUserInfo.iot_user_id),
          last_name: await decryptValue(DictUserInfo.last_name),
          password: await decryptValue(DictUserInfo.password),
          phone: await decryptValue(DictUserInfo.phone),
          twitter_id: await decryptValue(DictUserInfo.twitter_id),
          username: await decryptValue(DictUserInfo.username),
          city: await decryptValue(DictUserInfo.city),
          state: await decryptValue(DictUserInfo.state),
          zip: await decryptValue(DictUserInfo.zip),
          state_name: await decryptValue(DictUserInfo.state_name),
        };

        setConfiguration('loginUser', objUser);

        this.props.navigation.goBack();
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        this.showAlert(resMessage, 300);
      }
    }
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
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              style={styles.pageContainer}>
              <View
                style={[styles.innerContainer, styles.shadow, styles.setMarginTop]}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtHeading,
                    {color: getColors().cellTitleColor},
                  ]}>
                  Change Password
                </Text>

                <FormField
                  refer={instance => {
                    this.oldPasswordField = instance;
                  }}
                  style={styles.fullNameStyle}
                  title="Old Password"
                  hideTitle
                  secureTextEntry
                  value={this.state.oldPassword}
                  onFocus={this.textFieldGetFoucus}
                  onPress={() => this.oldPasswordField.focus()}
                  onChangeText={oldPassword => this.setState({oldPassword})}
                />
                <FormField
                  refer={instance => {
                    this.newPasswordField = instance;
                  }}
                  style={styles.fullNameStyle}
                  title="New Password"
                  hideTitle
                  secureTextEntry
                  value={this.state.newPassword}
                  onFocus={this.textFieldGetFoucus}
                  onPress={() => this.newPasswordField.focus()}
                  onChangeText={newPassword => this.setState({newPassword})}
                />

                <FormField
                  refer={instance => {
                    this.confirmPasswordField = instance;
                  }}
                  style={styles.fullNameStyle}
                  title="Confirm Password"
                  hideTitle
                  secureTextEntry
                  value={this.state.confirmPassword}
                  onFocus={this.textFieldGetFoucus}
                  onPress={() => this.confirmPasswordField.focus()}
                  onChangeText={confirmPassword =>
                    this.setState({confirmPassword})
                  }
                />

                <TouchableOpacity
                  style={[
                    styles.callBtn,
                    {backgroundColor: getColors().redColor},
                  ]}
                  onPress={() => this.ChangePassword()}>
                  <Text allowFontScaling={false} style={styles.btnText}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
            <KeyboardAccessoryNavigation
              onNext={this.nextTextInputButtonClicked}
              onPrevious={this.previousTextInputButtonClicked}
              onDone={this.doneTextInputButtonClicked}
              nextDisabled={this.state.isNextDisabled}
              previousDisabled={this.state.isPreviousDisabled}
              androidAdjustResize
            />
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default ChangePasswordScreen;
