import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {
  Text,
  View,
  Image,
  Platform,
  UIManager,
  TouchableOpacity,
  NativeModules,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {getColors} from '../../services/Color';
import Assets from '../../services/Assets';
import styles from './styles';
import {LoginFormField} from '../../components';
import {Button} from '../../components/common';
import {setConfiguration, getConfiguration} from '../../services/configuration';
import {decryptValue, validateEmail, showAlert} from '../../services/Functions';
import Activity from '../../components/ActivityIndicator';
import Fonts from '../../services/Fonts';
import Strings from '../../services/Strings';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import FastImage from 'react-native-fast-image';
import { faL } from '@fortawesome/free-solid-svg-icons';
const {RNTwitterSignIn} = NativeModules;

const Constants = {
  TWITTER_CONSUMER_KEY: 'sCySOWkXCJePAenNMlRBKhhpu', //'TBjMgh3V9SLxzEvVoWzjqu3me', //
  TWITTER_CONSUMER_SECRET: '0WnmgV6S8m6MlGmW9IeuPxWLGbuvz3EAnzn4B2MXPLsKhaMW8O', //'9QGv8sTkkJCyM28sFUGJO8AvBEuWQZIg4yMzawwHrFX53RUrAi',
};

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      email: 'qwerty@bytelaunch.com',
      password: 'qwerty',
      rememberMe: false,
      isVisibleRevokePopup: false,
      isVisibleMaintainancePopup: false,
      showAgain: true,
      button_text: '',
      popup_text: '',
      popup_title: '',
      is_maintenance: 0,
      force_update: 0,
      recommend_update: 0
    };
  }

  async componentDidMount() {
    setConfiguration('navigation', this.props.navigation);
    setConfiguration('newHeaterAdded', 'false');
    setConfiguration('slotsUpdated', 'false');
    this.getRevokePermissionFromStorage();
    this.getCredentialsFromStorage();
    this.focusCall = this.props.navigation.addListener('focus', () => {
      setConfiguration('homescreenLoaded', 'false');
      setConfiguration('navigation', this.props.navigation);
    });
    // this.getAppVersionDataAPI();
  }

  componentWillUnmount() {
    this.focusCall();
  }

  _twitterSignIn = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        RNTwitterSignIn.init(
          Constants.TWITTER_CONSUMER_KEY,
          Constants.TWITTER_CONSUMER_SECRET,
        );
        RNTwitterSignIn.logIn()
          .then((loginData) => {
            const {authToken, authTokenSecret, email, userID, userName} =
              loginData;
            if (authToken && authTokenSecret) {
              setConfiguration('socialName', userName);
              setConfiguration('socialEmail', email);
              setConfiguration('facebookId', '');
              setConfiguration('twitterId', userID);
              setConfiguration('appleId', '');

              this.props
                .loginUser(
                  email,
                  '',
                  '',
                  userID,
                  '2',
                  getConfiguration('device_token'),
                  '',
                )
                .then(() => this.afterCallLoginAPI())
                .catch((e) =>
                  showAlert(
                    'It seems something went wrong on the server. Please try after some time.',
                    300,
                  ),
                );
            }
          })
          .catch(error => {
            console.log(error)
          }
          );
      } else {
        showAlert(Strings.networkError, 300);
      }
    });
  };

  async onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      setConfiguration('socialName', '');
      setConfiguration('socialEmail', '');
      setConfiguration('facebookId', '');
      setConfiguration('twitterId', '');
      setConfiguration('appleId', appleAuthRequestResponse.user);

      this.props
        .loginUser(
          '',
          '',
          '',
          '',
          '3',
          getConfiguration('device_token'),
          appleAuthRequestResponse.user,
        )
        .then(() => this.afterCallLoginAPI())
        .catch((e) =>
          showAlert(
            'It seems something went wrong on the server. Please try after some time.',
            300,
          ),
        );
    }
  }

  async getRevokePermissionFromStorage() {
    let twitter = '';
    let apple = '';
    const count = await AsyncStorage.getItem('infoPopupCount');
    console.log('popup count', count);
    const twitterPromise = new Promise((resolve, reject) => {
      AsyncStorage.getItem('twitterRevokeAccess')
        .then((data) => {
          twitter = data;
          resolve(data);
          console.log('async twitter error', data);
        })
        .catch((error) => {
          resolve('false');
          console.log('async twitter error', error);
        });
    });
    const applePromise = new Promise((resolve, reject) => {
      AsyncStorage.getItem('appleRevokeAccess')
        .then((data) => {
          apple = data;
          resolve(data);
          console.log('async apple error', data);
        })
        .catch((error) => {
          resolve('false');
          console.log('async apple error', error);
        });
    });
    Promise.all([applePromise, twitterPromise]).then(async (values) => {
      console.log('promise values', values);
      if (values[0] == 'true' || values[1] == 'true') {
        if (count == '0') {
          await AsyncStorage.setItem('infoPopupCount', '1');
          this.setState({isVisibleRevokePopup: true});
        } else if (count == '1') {
          await AsyncStorage.setItem('infoPopupCount', '2');
          this.setState({isVisibleRevokePopup: true});
        } else if (count == '2') {
          await AsyncStorage.setItem('infoPopupCount', '3');
          this.setState({isVisibleRevokePopup: true});
        } else {
          await AsyncStorage.setItem('appleRevokeAccess', 'false');
          await AsyncStorage.setItem('twitterRevokeAccess', 'false');
          await AsyncStorage.removeItem('infoPopupCount');
        }
      }
    });
  }

  async getCredentialsFromStorage() {
    try {
      const credentials = await AsyncStorage.getItem('credentials');

      if (credentials !== null) {
        setConfiguration('credentials', credentials);
        const crdObj = JSON.parse(credentials);

        if (crdObj.email !== '') {
          this.setState({
            rememberMe: true,
            email: crdObj.email,
            password: crdObj.password,
          });
        } else {
          this.setState({
            rememberMe: false,
            email: '',
            password: '',
          });
        }
      }
    } catch (e) {
      this.setState({
        rememberMe: false,
        email: '',
        password: '',
      });
    }
  }

  handleFacebookLogin() {
    const that2 = this;
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (result1) => {
        if (result1.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const {accessToken} = data;
            // alert(accessToken.toString())

            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error);
                showAlert(`Error fetching data: ${error.toString()}`, 300);
              } else {
                console.log(result);
                // alert('Success fetching data: ' + result.toString());

                // var user = data.credentials;
                const api = `https://graph.facebook.com/v2.3/${result.id}?fields=name,email,picture&access_token=${accessToken}`;

                fetch(api)
                  .then((response) => response.json())
                  .then((responseData) => {
                    setConfiguration('socialName', responseData.name);
                    setConfiguration('socialEmail', responseData.email);
                    setConfiguration('facebookId', responseData.id);
                    setConfiguration('twitterId', '');
                    setConfiguration('appleId', '');

                    that2.props
                      .loginUser(
                        responseData.email,
                        '',
                        responseData.id,
                        '',
                        '1',
                        getConfiguration('device_token'),
                        '',
                      )
                      .then(() => that2.afterCallLoginAPI())
                      .catch((e) =>
                        showAlert(
                          'It seems something went wrong on the server. Please try after some time.',
                          300,
                        ),
                      );
                  });
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name',
                  },
                },
              },
              responseInfoCallback,
            );

            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      (error) => {
        console.log(`Login fail with error: ${error}`);
      },
    );
  }

  onPressFacebookButton = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.handleFacebookLogin();
      } else {
        showAlert(Strings.networkError, 300);
      }
    });
  };

  goToRegisterScreen = () => {
    setConfiguration('socialName', '');
    setConfiguration('socialEmail', '');
    setConfiguration('facebookId', '');
    setConfiguration('twitterId', '');
    setConfiguration('appleId', '');

    this.props.navigation.navigate('Register');
  };

  goBack() {
    this.props.navigation.goBack();
  }

  checkInternerConnectivity() {
    setTimeout(() => this.checkInternerConnectivity(), 2000);
  }

  forgotPasswordClickEvent() {
    Keyboard.dismiss();

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (this.state.email === '') {
          showAlert(Strings.enterEmail, 300);
          return;
        }

        const validate = validateEmail(this.state.email);
        if (validate) {
          this.props
            .forgotUser(this.state.email)
            .then(() => this.afterCallForgotAPI())
            .catch((e) =>
              showAlert(
                'It seems something went wrong on the server. Please try after some time.',
                300,
              ),
            );
        } else {
          showAlert(Strings.enterValidEmail, 300);
        }
      } else {
        showAlert(Strings.networkError, 300);
      }
    });
  }

  async afterCallForgotAPI() {
    const {response} = this.props.responseForgot;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      var resMessage = '';
      if (resCode == 200) {
        resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      } else {
        resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  getAppVersionDataAPI() {
    Keyboard.dismiss();

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
          this.props
            .getAppVersionData('1', '1', Platform.OS)
            .then(() => this.afterGetAppVersionData())
            .catch((e) =>
              showAlert(
                'It seems something went wrong on the server. Please try after some time.',
                300,
              ),
            );
      } else {
        showAlert(Strings.networkError, 300);
      }
    });
  }

  async afterGetAppVersionData() {
    const {response} = this.props.responseAppVersiondata;

    if (response != null) {
      let resCode = response.responseCode;
      // resCode = await decryptValue(resCode);
      var resMessage = '';
      if (resCode == 200) {
        let is_maintenance = response.data.is_maintenance;
        // is_maintenance = await decryptValue(is_maintenance);        
        
        let force_update = response.data.force_update;
        // force_update = await decryptValue(force_update);
        
        let recommend_update = response.data.recommend_update;
        // recommend_update = await decryptValue(recommend_update);
        
        if (force_update == true) {
          let popup_text = response.data.popup_text;
          // popup_text = await decryptValue(popup_text);
  
          let allow_app_access = response.data.allow_app_access;
          // allow_app_access = await decryptValue(allow_app_access);

          let button_text = response.data.button_text;
          // button_text = await decryptValue(button_text);
  
          let popup_title = response.data.popup_title;
          // popup_title = await decryptValue(popup_title);
          

        } else if (is_maintenance == true) {

          let popup_text = response.data.popup_text;
          // popup_text = await decryptValue(popup_text);
  
          let allow_app_access = response.data.allow_app_access;
          // allow_app_access = await decryptValue(allow_app_access);

          let button_text = response.data.button_text;
          // button_text = await decryptValue(button_text);
  
          let popup_title = response.data.popup_title;
          // popup_title = await decryptValue(popup_title);

          let timezone = response.data.timezone;
          // timezone = await decryptValue(timezone);
  
          let maintenance_start = response.data.maintenance_start;
          // maintenance_start = await decryptValue(maintenance_start);
  
          let maintenance_end = response.data.maintenance_end;
          // maintenance_end = await decryptValue(maintenance_end);
  
          
        } else if (recommend_update == true) {

          let popup_text = response.data.popup_text;
          // popup_text = await decryptValue(popup_text);
  
          let allow_app_access = response.data.allow_app_access;
          // allow_app_access = await decryptValue(allow_app_access);

          let button_text = response.data.button_text;
          // button_text = await decryptValue(button_text);
  
          let popup_title = response.data.popup_title;
          // popup_title = await decryptValue(popup_title);          
        }


      

       
      

        



      } else {
        resMessage = response.responseMessage;
        // resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }  

  callMetaDataAPI(user_id, Check) {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.props
          .getMetadata(user_id)
          .then(() => this.afterCallMetadataAPI(Check))
          .catch((e) =>
            showAlert(
              'It seems something went wrong on the server. Please try after some time.',
              300,
            ),
          );
      } else {
        showAlert(Strings.networkError, 300);
      }
    });
  }

  afterCallMetadataAPI(Check) {
    if (Check) {
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('AddHeaterLogin');
    }
  }

  updateLastConnectedHeater() {
    // this.props
    //   .changeHeater('1772', '3521')
    //   .then(() => console.log('ok'))
    //   .catch((e) =>
    //     showAlert(
    //       'It seems something went wrong on the server. Please try after some time.',
    //       300,
    //     ),
    //   );
    // return;
  }
  onPressLoginButton = () => {
    Keyboard.dismiss();

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (this.state.email === '') {
          showAlert(Strings.enterEmail, 300);
          return;
        }
        if (this.state.password === '') {
          showAlert(Strings.enterPassword, 300);
          return;
        }

        const validate = validateEmail(this.state.email);
        if (validate) {
          this.props
            .loginUser(
              this.state.email,
              this.state.password,
              '',
              '',
              '0',
              '1234567890',
              '',
            )
            .then(() => this.afterCallLoginAPI())
            .catch((e) =>
              showAlert(
                'It seems something went wrong on the server. Please try after some time.' + e.message,
                300,
              ),
            );
        } else {
          showAlert(Strings.enterValidEmail, 300);
        }
      } else {
        showAlert(Strings.networkError, 300);
      }
    });
  };

  async afterCallLoginAPI() {
    const {response} = this.props.responseLogin;
    console.log('login response ---', response);
    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        let {user_id} = response;
        user_id = await decryptValue(user_id);
        setConfiguration('user_id', user_id);
        console.log('login response user_id ---', user_id);

        let {password} = response;
        password = await decryptValue(password);
        setConfiguration('serverPassword', password);
        console.log('login password ---', password);

        const {Connected_Heater} = response;

        let Check = false;
        try {
          if (Connected_Heater.Last_connected != null) {
            Check = true;
            let heaterName = Connected_Heater.model_name;
            heaterName = await decryptValue(heaterName);
            let thingName = Connected_Heater.inThing;
            thingName = await decryptValue(thingName);
            let {image} = Connected_Heater;
            image = await decryptValue(image);

            setConfiguration('heaterName', heaterName);
            setConfiguration('thingName', thingName);
            setConfiguration('heater_image', image);
          }
        } catch (e) {
          Check = false;
        }

        this.callMetaDataAPI(user_id, Check);

        if (this.state.rememberMe) {
          var obj = {
            email: '',
            password: '',
          };
          obj = {
            email: this.state.email,
            password: this.state.password,
          };
          this.storeCredentials(JSON.stringify(obj));
        } else {
          obj = {
            email: '',
            password: '',
          };
          this.storeCredentials(JSON.stringify(obj));
        }

        let {all_error_viewed} = response;
        all_error_viewed = await decryptValue(all_error_viewed);
        if (all_error_viewed === '0') {
          setConfiguration('isOpenErrorInfo', true);
        } else {
          setConfiguration('isOpenErrorInfo', false);
        }
      } else if (resCode == 401) {
        this.props.navigation.navigate('Register');
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  async storeCredentials(credentials) {
    try {
      setConfiguration('credentials', credentials);
      await AsyncStorage.setItem('credentials', credentials);
    } catch (e) {
      console.log(e);
    }
  }

  onPressTwitterButton = () => {
    this.props.navigation.navigate('Home');
  };

  appleClick() {
    const url = 'https://support.apple.com/en-us/HT210426';
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.log('An error occurred', err));
  }

  twitterClick() {
    const url = 'https://help.twitter.com/en/managing-your-account/connect-or-revoke-access-to-third-party-apps#%20connectremove:~:text=How%20to%20revoke%20access%20or%20remove%20an%20app';
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.log('An error occurred', err));
  }

  async popupOkayClick() {
    this.setState({isVisibleRevokePopup: false});
    if (!this.state.showAgain) {
      await AsyncStorage.setItem('appleRevokeAccess', 'false');
      await AsyncStorage.setItem('twitterRevokeAccess', 'false');
      await AsyncStorage.removeItem('infoPopupCount');
    }
  }

  revokeAccessPopup = () => {
    return (
      <View style={styles.revokePopup}>
        <Text allowFontScaling={false} style={styles.titleTemperaturePopup}>
          Info
        </Text>
        <Text allowFontScaling={false} style={styles.contentTemperaturePopup}>
          {/* {Strings.TempWarningDesc} */}
          You have recently deleted an associated account from the application,
          if you didn't revoke its access from Apple and Twitter then you can do
          that by following the below links.
        </Text>

        <View style={{marginTop: 5}}>
          {/* {apple == "true" && */}
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              this.appleClick();
            }}>
            <Text
              allowFontScaling={false}
              style={[styles.clickHere, {color: getColors().txtBlackColor}]}>
              Remove access from apple,{' '}
            </Text>
            <Text
              allowFontScaling={false}
              style={[styles.clickHere, {color: getColors().redColor}]}>
              Click here
            </Text>
          </TouchableOpacity>
          {/* } */}
          {/* {twitter == "true" &&  */}
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              this.twitterClick();
            }}>
            <Text
              allowFontScaling={false}
              style={[styles.clickHere, {color: getColors().txtBlackColor}]}>
              Remove access from Twitter,{' '}
            </Text>
            <Text
              allowFontScaling={false}
              style={[styles.clickHere, {color: getColors().redColor}]}>
              Click here
            </Text>
          </TouchableOpacity>
          {/* } */}
        </View>

        {/* checkbox view */}
        <View style={[styles.checkboxContainer]}>
          <TouchableOpacity
            onPress={() => {
              this.setState({showAgain: !this.state.showAgain});
            }}
            style={[
              styles.checkBoxView,
              // {borderColor: getColors().darkColor},s
            ]}>
            {this.state.showAgain ? (
              <FastImage
                source={Assets.unchecked}
                resizeMode={FastImage.resizeMode.contain}
                style={[styles.avatar]}
              />
            ) : (
              <FastImage
                source={Assets.checked}
                resizeMode={FastImage.resizeMode.contain}
                style={[styles.avatar]}
              />
            )}
          </TouchableOpacity>
          <Text
            style={[
              styles.contentTemperaturePopup,
              {color: getColors().primaryDarkColor},
            ]}>
            Don't ask again
          </Text>
        </View>
        <TouchableOpacity
          style={styles.cancelPopup}
          onPress={() => this.popupOkayClick()}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().redColor},
            ]}>
            Okay
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  maintainancePopupOButtonClick() {
    
  }

  maintainancePopup = () => {
    return (
      <View style={styles.maintainancePopup}>
        <Text allowFontScaling={false} style={styles.titleTemperaturePopup}>
          {this.state.popup_title}
        </Text>
        <Text allowFontScaling={false} style={styles.contentTemperaturePopup}>
          {/* {Strings.TempWarningDesc} */}
          {this.state.popup_text}
        </Text>

        

        <View style={{width: '100%', alignItems: 'flex-end'}}>
        <TouchableOpacity
          style={styles.cancelMaintainancePopup}
          onPress={() => this.maintainancePopupOButtonClick()}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().redColor},
            ]}>
          {this.state.button_text}
          </Text>
          </TouchableOpacity>
          </View>
      </View>
    );
  };

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
              style={styles.imgBackgroundStyle}
            />
            <Image
              resizeMode="contain"
              source={Assets.logo}
              style={styles.imgLogoStyle}
            />

            <LoginFormField
              refer={(e) => {
                this.emailField = e;
              }}
              style={styles.txtField}
              icon={Assets.email}
              title={Strings.txtfldEmail}
              keyboardType="email-address"
              hideTitle
              value={this.state.email}
              onFocus={this.textFieldGetFoucus}
              onPress={() => this.emailField.focus()}
              onChangeText={(email) => this.setState({email})}
              autoCapitalize="none"
            />

            <LoginFormField
              refer={(instance) => {
                this.passwordField = instance;
              }}
              style={styles.txtField}
              icon={Assets.locked}
              title={Strings.txtfldPassword}
              hideTitle
              secureTextEntry
              value={this.state.password}
              onFocus={this.textFieldGetFoucus}
              onPress={() => this.passwordField.focus()}
              onChangeText={(password) => this.setState({password})}
            />

            <Dialog
              visible={this.state.isVisibleRevokePopup}
              rounded={false}
              onTouchOutside={() => {
                this.setState({isVisibleRevokePopup: false});
              }}>
              <DialogContent style={styles.setPadding}>
                {this.state.isVisibleRevokePopup && this.revokeAccessPopup()}
              </DialogContent>
            </Dialog>


            <Dialog
              visible={this.state.isVisibleMaintainancePopup}
              rounded={false}
              onTouchOutside={() => {
                this.setState({isVisibleRevokePopup: false});
              }}>
              <DialogContent style={styles.setPadding}>
                {this.state.isVisibleMaintainancePopup && this.maintainancePopup()}
              </DialogContent>
            </Dialog>


            <TouchableOpacity
              style={styles.rememberBG}
              onPress={() =>
                this.setState({rememberMe: !this.state.rememberMe})
              }>
              {this.state.rememberMe ? (
                <Image
                  resizeMode="contain"
                  source={Assets.checked}
                  style={styles.imgCheckStyle}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={Assets.unchecked}
                  style={styles.imgCheckStyle}
                />
              )}
              <Text allowFontScaling={false} style={[styles.txtRemember]}>
                {Strings.txtRememberme}
              </Text>
            </TouchableOpacity>

            <Button
              title={Strings.txtSignin}
              textStyle={styles.btnText}
              onPress={this.onPressLoginButton}
              containerStyle={styles.btnSignInStyle}
            />

            <TouchableOpacity onPress={() => this.forgotPasswordClickEvent()}>
              <Text
                allowFontScaling={false}
                style={[styles.txtRemember, styles.txtForgot]}>
                {Strings.txtForgotPassword}
              </Text>
            </TouchableOpacity>

            <View style={styles.orViewContainer}>
              <View style={styles.orLineView} />
              <Text allowFontScaling={false} style={[styles.txtOr]}>
                {Strings.txtOR}
              </Text>
              <View style={styles.orLineView} />
            </View>

            {Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 13 ? (
              <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                font={Fonts.oxygenLight}
                cornerRadius={0}
                style={styles.appleButtonStyle}
                onPress={() => this.onAppleButtonPress()}
              />
            ) : null}

            <Button
              title={Strings.txtSigninWithFacebook}
              textStyle={styles.btnText}
              containerBackgroundColor={getColors().faceBookColor}
              onPress={this.onPressFacebookButton}
              containerStyle={styles.faceBookBtnStyle}
            />

            <Button
              title={Strings.txtSigninWithTwitter}
              textStyle={styles.btnText}
              containerBackgroundColor={getColors().twitterColor}
              onPress={this._twitterSignIn}
              containerStyle={styles.faceBookBtnStyle}
            />

            <TouchableOpacity
              onPress={this.goToRegisterScreen}
              style={styles.btnRegisterStyle}>
              <Text
                allowFontScaling={false}
                style={[styles.txtRegister, {color: getColors().whiteColor}]}>
                {Strings.txtDontHaveAccount}
              </Text>
              <Text
                allowFontScaling={false}
                style={[styles.txtRegister, {color: getColors().redColor}]}>
                {Strings.txtSignUp}
              </Text>
            </TouchableOpacity>

            {this.props.isBusyLogin ||
            this.props.isBusyForgot ||
            this.props.isBusyMetadata ? (
              <Activity />
            ) : null}

            {/* <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: wp('100%'),
                height: hp('100%'),
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                resizeMode="cover"
                source={Assets.background}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: wp('100%'),
                  height: hp('100%'),
                  opacity: 0.4,
                }}
              />
              <Image
                resizeMode="contain"
                source={Assets.logo}
                style={{width: '40%', height: hp('10%'), marginTop: -40}}
              />
            </View> */}
          </KeyboardAvoidingView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default LoginScreen;
