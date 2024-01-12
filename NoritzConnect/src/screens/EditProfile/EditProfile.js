import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import NetInfo from '@react-native-community/netinfo';
import {
  Text,
  View,
  Image,
  BackHandler,
  Platform,
  UIManager,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {getColors} from '../../services/Color';
import Assets from '../../services/Assets';
import styles from './styles';
import {Header} from '../../components/common';
import {FormField, PickerView} from '../../components';
import {setConfiguration, getConfiguration} from '../../services/configuration';
import {decryptValue, showAlert} from '../../services/Functions';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    backPressed = 0;
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      city: '',
      state: '',
      zip: '',
      username: '',
      email: '',
      showStatePickerView: false,
      stateData: [],
    };
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick.bind(this),
    );

    const states = getConfiguration('states');

    this.setState({
      stateData: states,
    });

    const loginUser = getConfiguration('loginUser');
    this.setState({
      firstName: loginUser.first_name,
      lastName: loginUser.last_name,
      address: loginUser.address,
      phone: loginUser.phone,
      city: loginUser.city,
      state: loginUser.state_name,
      zip: loginUser.zip,
      username: loginUser.username,
      email: loginUser.email,
    });
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

  // Perform action on click of Next button on Keyboard Assessory view
  nextTextInputButtonClicked = () => {
    if (this.firstNameField.isFocused()) {
      this.lastNameField.focus();
    } else if (this.lastNameField.isFocused()) {
      this.phoneField.focus();
    } else if (this.phoneField.isFocused()) {
      this.addressField.focus();
    } else if (this.addressField.isFocused()) {
      this.cityField.focus();
    } else if (this.cityField.isFocused()) {
      this.stateField.focus();
    } else if (this.stateField.isFocused()) {
      this.zipField.focus();
    }

    // this.textFieldGetFoucus();
  };

  // Perform action on click of Previous button on Keyboard Assessory view
  previousTextInputButtonClicked = () => {
    if (this.zipField.isFocused()) {
      this.stateField.focus();
    } else if (this.stateField.isFocused()) {
      this.cityField.focus();
    } else if (this.cityField.isFocused()) {
      this.addressField.focus();
    } else if (this.addressField.isFocused()) {
      this.phoneField.focus();
    } else if (this.phoneField.isFocused()) {
      this.lastNameField.focus();
    } else if (this.lastNameField.isFocused()) {
      this.firstNameField.focus();
    }
  };

  goBack() {
    this.callEditProfileWebservice();
    // this.props.navigation.goBack();
  }

  openChangePasswordScreen() {
    this.props.navigation.navigate('ChangePassword');
  }

  openDeleteAccountFeedback() {
    this.props.navigation.navigate('DeleteAccountFeedback');
  }

  doneStatePicker() {
    this.setState({showStatePickerView: false});
    if (this.state.state === '' && this.state.stateData.length > 0) {
      const obj = this.state.stateData[0];
      this.setState({state: obj.label});
    }
  }

  openStatePickerView() {
    this.setState({
      showStatePickerView: true,
    });
    Keyboard.dismiss();
  }

  callEditProfileWebservice() {
    if (this.props.isBusyEditProfile) {
      return;
    }

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        const loginUser = getConfiguration('loginUser');
        // first_name, last_name, address, phone, email, username, state, city, zip, iot_user_id
        let stateValue = '';
        if (this.state.state !== '') {
          const states = getConfiguration('states');
          for (let i = 0; i < states.length; i += 1) {
            const obj = states[i];
            if (obj.label === this.state.state) {
              stateValue = obj.value;
              break;
            }
          }
        }

        this.props
          .EditProfile(
            this.state.firstName,
            this.state.lastName,
            this.state.address,
            this.state.phone,
            this.state.email,
            this.state.username,
            stateValue,
            this.state.city,
            this.state.zip,
            loginUser.iot_user_id,
          )
          .then(() => this.afterCallChangePasswordAPI())
          .catch((e) =>
            showAlert(
              'It seems something went wrong on the server. Please try after some time.',
              300,
            ),
          );
      } else {
        showAlert(
          'It seems some problem in network connectivity. Please try again after some time.',
          300,
        );
      }
    });
  }

  async afterCallChangePasswordAPI() {
    const {response} = this.props.responseEditProfile;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        const DictUserInfo = response.Userinfo;

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

        this.props.navigation.navigate('Home');
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
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
              <View style={[styles.innerContainer, styles.shadow]}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtHeading,
                    {color: getColors().cellTitleColor},
                  ]}>
                  Personal Information
                </Text>

                <FormField
                  refer={(instance) => (this.firstNameField = instance)}
                  style={styles.fullNameStyle}
                  title="First Name"
                  value={this.state.firstName}
                  onFocus={this.textFieldGetFoucus}
                  onPress={() => this.firstNameField.focus()}
                  onChangeText={(firstName) => this.setState({firstName})}
                />

                <FormField
                  refer={(instance) => (this.lastNameField = instance)}
                  style={styles.fullNameStyle}
                  title="Last Name"
                  value={this.state.lastName}
                  onFocus={this.textFieldGetFoucus}
                  onPress={() => this.lastNameField.focus()}
                  onChangeText={(lastName) => this.setState({lastName})}
                />
                <FormField
                  refer={(instance) => (this.phoneField = instance)}
                  style={styles.fullNameStyle}
                  title="Phone"
                  keyboardType="phone-pad"
                  value={this.state.phone}
                  onFocus={this.textFieldGetFoucus}
                  onPress={() => this.phoneField.focus()}
                  onChangeText={(phone) => this.setState({phone})}
                />

                <FormField
                  refer={(instance) => (this.addressField = instance)}
                  style={styles.fullNameStyle}
                  title="Address"
                  value={this.state.address}
                  onFocus={this.textFieldGetFoucus}
                  onPress={() => this.addressField.focus()}
                  onChangeText={(address) => this.setState({address})}
                />

                <FormField
                  refer={(instance) => (this.cityField = instance)}
                  style={styles.fullNameStyle}
                  title="City"
                  value={this.state.city}
                  onFocus={this.textFieldGetFoucus}
                  onPress={() => this.cityField.focus()}
                  onChangeText={(city) => this.setState({city})}
                />
                <View>
                  <FormField
                    refer={(instance) => (this.stateField = instance)}
                    style={styles.fullNameStyle}
                    title="State"
                    value={this.state.state}
                    onFocus={this.textFieldGetFoucus}
                    onPress={() => this.stateField.focus()}
                    onChangeText={(state) => this.setState({state})}
                  />
                  <TouchableOpacity
                    onPress={() => this.openStatePickerView()}
                    style={styles.statePickerBG}>
                    <Image
                      resizeMode="contain"
                      source={Assets.drop_icon}
                      style={styles.dropIcon}
                    />
                  </TouchableOpacity>
                </View>
                <FormField
                  refer={(instance) => (this.zipField = instance)}
                  style={styles.fullNameStyle}
                  title="Zip"
                  value={this.state.zip}
                  onFocus={this.textFieldGetFoucus}
                  onPress={() => this.zipField.focus()}
                  onChangeText={(zip) => this.setState({zip})}
                />
              </View>

              <View
                style={[
                  styles.innerContainer,
                  styles.shadow,
                  styles.setMarginTopZero,
                ]}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtHeading,
                    {color: getColors().cellTitleColor},
                  ]}>
                  Account Information
                </Text>

                <FormField
                  refer={(instance) => (this.userNameField = instance)}
                  style={styles.fullNameStyle}
                  title="Username"
                  value={this.state.username}
                  onFocus={this.textFieldGetFoucus}
                  onPress={() => this.userNameField.focus()}
                  onChangeText={(username) => this.setState({username})}
                />
                <FormField
                  refer={(instance) => (this.emailField = instance)}
                  style={styles.fullNameStyle}
                  title="Email"
                  editable={false}
                  value={this.state.email}
                  onFocus={this.textFieldGetFoucus}
                  onPress={() => this.emailField.focus()}
                  onChangeText={(email) => this.setState({email})}
                />

                <TouchableOpacity
                  style={[
                    styles.callBtn,
                    {backgroundColor: getColors().redColor},
                  ]}
                  onPress={() => this.openChangePasswordScreen()}>
                  <Text allowFontScaling={false} style={styles.btnText}>
                    Change Password
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}} onPress={()=>{this.openDeleteAccountFeedback()}}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.txtRemember,{color: getColors().txtBlackColor}]}>
                    If you want delete account?{'  '} 
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[styles.txtRemember,{color: getColors().redColor,textDecorationLine: 'underline'}]}>
                    Click here
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

            <PickerView
              refer={(instance) => (this.statePicker = instance)}
              data={this.state.stateData}
              selectedValue={this.state.state}
              onValueChange={(itemValue) => this.setState({state: itemValue})}
              showPickerView={this.state.showStatePickerView}
              onDonePress={() => this.doneStatePicker()}
            />
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default EditProfileScreen;
