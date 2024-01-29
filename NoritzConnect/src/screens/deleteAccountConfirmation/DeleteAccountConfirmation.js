import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Keyboard, Alert} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DarkModeContext} from 'react-native-dark-mode';
import {getColors} from '../../services/Color';
import FastImage from 'react-native-fast-image';
import Assets from '../../services/Assets';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Header} from '../../components/common';
import {CommonActions} from '@react-navigation/native';
import I18n from '../../i18n';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import Strings from '../../services/Strings';
import {FormField} from '../../components';
import {decryptValue, showAlert} from '../../services/Functions';
import {setConfiguration, getConfiguration} from '../../services/configuration';
import {md5} from '../../services/Functions';
// import {
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
//   LoginManager,
// } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

class DeleteAccountConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      feedbackHeading: '',
      feedbackText: '',
      isVisibleTemperaturePassword: false,
      enterPassword: '',
    };
    const {appleid, fb_id, twitter_id, user_id} = this.props.userInfo;
    this.passwordField = '';
  }

  componentDidMount() {
    const {feedbackHeading, feedbackText} = this.props.route.params;
    this.setState({feedbackHeading, feedbackText});
  }
  onDeleteAccountClick() {
    this.setState({isVisibleTemperaturePassword: true});
  }

  async deleteUserProfile(facebookId) {
    // if (googleId !== null) {
    //   // google
    //   var googlePromise = new Promise((resolve, reject) => {
    //     GoogleSignin.revokeAccess()
    //       .then(async () => {
    //         GoogleSignin.signOut()
    //           .then(() => {
    //             resolve(true);
    //             // callback(true, null);
    //           })
    //           .catch(error => {
    //             console.log(`error signOut google: ${error}`);
    //             reject(false);
    //           });
    //       })
    //       .catch(error => {
    //         console.log('revoke google access error');
    //         reject(false);
    //       });
    //   });
    // }

    // facebook
    AccessToken.getCurrentAccessToken()
      .then((data) => {
        console.log('access token', data);
        let logout = new GraphRequest(
          'me/permissions/',
          {
            accessToken: data.accessToken.toString(),
            httpMethod: 'DELETE',
          },
          (error, result) => {
            if (error) {
              console.log('Error fetching data: ' + error.toString());
            } else {
              LoginManager.logOut();
              // callback(true, null)
            }
          },
        );
        new GraphRequestManager().addRequest(logout).start();
      })
      .catch((error) => {
        //  callback(null, error)
        console.log(error);
      });

    // Promise.all([facebookPromise, googlePromise])
    //   .then(results => {
    //     console.log('promise success', results);
    //     callback(true, null);
    //   })
    //   .catch(error => {
    //     console.log('Promise error', error);
    //     callback(null, true);
    //   });
  }

  async validatePassword() {
    const {appleid, fb_id, twitter_id, user_id} = this.props.userInfo;
    let appleId = await decryptValue(appleid);
    let facebookId = await decryptValue(fb_id);
    let twitterId = await decryptValue(twitter_id);
    let userId = await decryptValue(user_id);
    console.log('ids', appleId, facebookId, twitterId);
    const {feedbackHeading, feedbackText} = this.props.route.params;
    if (this.state.enterPassword == '') {
      showAlert(Strings.enterPassword, 300);
      return;
    }
    this.setState({isVisibleTemperaturePassword: false});

    const output = await md5(this.state.enterPassword);
    const serverPassword = getConfiguration('serverPassword');

    if (output == serverPassword) {
      //set access true to show popup in login screen
      if (appleId !== '') {
        await AsyncStorage.setItem('appleRevokeAccess', 'true');
      }
      if (twitterId !== '') {
        await AsyncStorage.setItem('twitterRevokeAccess', 'true');
      }
      this.props
        .deleteUser(userId, feedbackHeading, feedbackText)
        .then(async (response) => {
          let data = await decryptValue(response.responseCode);
          let message = await decryptValue(response.responseMessage);
          console.log('delete success', data, message);
          if (facebookId !== '') {
           // this.deleteUserProfile(facebookId);
          } else {
            console.log('facebook not login');
          }
          if (appleId !== '' || twitterId !== '') {
            await AsyncStorage.setItem('infoPopupCount', '0');
            this.props.navigation.navigate('RemoveAccountAccess', {
              appleId: appleId,
              twitterId: twitterId,
            });
          } else {
            await AsyncStorage.setItem('infoPopupCount', '0');

            Alert.alert(
              '',
              'Account Deleted Successfully.',
              [
                {
                  text: 'Okay',
                  onPress: () => {
                    this.props.navigation.navigate('Login');
                    // this.props.navigation.navigate('RemoveAccountAccess', {appleId: appleId, twitterId: twitterId})
                  },
                },
              ],
              {cancelable: false},
            );
          }
        })
        .catch((error) => {
          console.log('delete account error', error);
        });
      // showAlert('password matched', 300);
      // call api to delete account from server then remove access
    } else {
      showAlert(Strings.invalidPassword, 300);
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  temperaturePassword() {
    return (
      // <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
      <View
        style={styles.temperaturePopup}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <Text allowFontScaling={false} style={styles.titleTemperaturePopup}>
          {/* {Strings.txtSetTemp} */}
          Delete Account
        </Text>
        <Text allowFontScaling={false} style={styles.contentTemperaturePopup}>
          {/* {Strings.TempWarningDesc} */}
          Please re-authenticate your login to delete account
        </Text>

        <FormField
          refer={(instance) => {
            this.passwordField = instance;
          }}
          style={styles.setMarginTop}
          secureTextEntry={true}
          title={Strings.txtEnterPasswrd}
          hideTitle
          value={this.state.enterPassword}
          onPress={() => this.passwordField.focus()}
          onChangeText={(enterPassword) => {
            this.setState({enterPassword: enterPassword});
          }}
        />

        <TouchableOpacity
          style={styles.cancelPopup}
          onPress={() =>
            this.setState({
              isVisibleTemperaturePassword: false,
              enterPassword: '',
            })
          }>
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
          style={styles.btnAcceptStyle}
          onPress={() => {
            this.validatePassword();
          }}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().redColor},
            ]}>
            {Strings.txtAccept}
          </Text>
        </TouchableOpacity>
      </View>
      // </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <DarkModeContext.Consumer>
        {() => (
          <SafeAreaView
            style={[
              styles.mainContainer,
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
                Delete Confirmation
              </Text>
              <View style={[styles.headingView]}>
                <Text
                  style={[styles.headingText, {color: getColors().darkColor}]}>
                  You will permanently lose all your data, settings and profile
                  information.
                </Text>
                <Text
                  style={[
                    styles.headingText,
                    {
                      color: getColors().darkColor,
                      marginTop: heightPercentageToDP('2%'),
                    },
                  ]}>
                  Please note this is a permanent action and once your account
                  is deleted it will no longer accessible by you or anyone in
                  our team.
                </Text>
              </View>

              {/* checkbox view */}
              <View style={[styles.checkboxContainer]}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({checked: !this.state.checked});
                  }}
                  style={[
                    styles.checkBoxView,
                    // {borderColor: getColors().darkColor},s
                  ]}>
                  {this.state.checked ? (
                    <FastImage
                      source={Assets.checked}
                      resizeMode={FastImage.resizeMode.contain}
                      style={[styles.avatar]}
                    />
                  ) : (
                    <FastImage
                      source={Assets.unchecked}
                      resizeMode={FastImage.resizeMode.contain}
                      style={[styles.avatar]}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={[
                    styles.headingText,
                    {color: getColors().primaryDarkColor},
                  ]}>
                  Yes, I want to delete my account
                </Text>
              </View>

              {/* delete Button */}
              <View
                style={{
                  marginTop: heightPercentageToDP('2%'),
                  // alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={[
                    styles.callBtn,
                    {
                      backgroundColor: this.state.checked
                        ? getColors().redColor
                        : getColors().btnDisableColor,
                    },
                  ]}
                  disabled={!this.state.checked}
                  onPress={() => {
                    this.onDeleteAccountClick();
                  }}>
                  <Text allowFontScaling={false} style={styles.btnText}>
                    Delete Account
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.headingView]}>
                <Text
                  style={[
                    styles.headingText,
                    {
                      color: getColors().darkColor,
                      marginTop: heightPercentageToDP('2%'),
                      textAlign: 'center',
                    },
                  ]}>
                  If you'd like to cancel the deletion process,
                </Text>
                <Text
                  style={[
                    styles.headingText,
                    {
                      color: getColors().darkColor,
                      // marginTop: heightPercentageToDP('2%'),
                      textAlign: 'center',
                    },
                  ]}>
                  please use your phone's commands to go back (return) and
                  cancel your deletion request.
                </Text>
              </View>
              <Dialog
                visible={this.state.isVisibleTemperaturePassword}
                rounded={false}
                onTouchOutside={() => {
                  this.setState({
                    isVisibleTemperaturePassword: false,
                    enterPassword: '',
                  });
                }}>
                <DialogContent style={styles.setPadding}>
                  {this.temperaturePassword()}
                </DialogContent>
              </Dialog>
            </View>
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default DeleteAccountConfirmation;
