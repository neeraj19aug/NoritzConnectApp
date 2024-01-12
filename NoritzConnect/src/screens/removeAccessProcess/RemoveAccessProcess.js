import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Linking} from 'react-native';
import styles from './styles';
import {getColors} from '../../services/Color';
import FastImage from 'react-native-fast-image';
import Assets from '../../services/Assets';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DarkModeContext} from 'react-native-dark-mode';
import {Header} from '../../components/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from '../../components/common';

class RemoveAccountAccess extends Component {
  constructor(props) {
    super(props);
  }


  goBack() {
    this.props.navigation.goBack();
  }

  appleClick(){
    const url = "https://support.apple.com/en-us/HT210426"
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.log('An error occurred', err));
  }

  twitterClick(){
    const url = "https://help.twitter.com/en/managing-your-account/connect-or-revoke-access-to-third-party-apps#%20connectremove:~:text=How%20to%20revoke%20access%20or%20remove%20an%20app"
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.log('An error occurred', err));
  }

  async exitClick() {
    const {appleId, twitterId} = this.props.route.params;
    if(appleId !== ''){
      await AsyncStorage.setItem('appleRevokeAccess', "false");
      }
      if(twitterId !== ''){
        await AsyncStorage.setItem('twitterRevokeAccess', "false");
        }
      await AsyncStorage.removeItem('infoPopupCount')

    this.props.navigation.navigate('Login')
  }

  render() {
    const {appleId, twitterId} = this.props.route.params;
    return (
      <DarkModeContext.Consumer>
        {() => (
          <SafeAreaView
            style={[
              styles.mainContainer,
              {backgroundColor: getColors().screenBackground},
            ]}>
            <Header
            isHeaterImage = {false}
              // nav={this.props.navigation}
            />
            <View style={[styles.innerContainer, styles.shadow]}>
              <Text
                allowFontScaling={false}
                style={[
                  styles.txtHeading,
                  {color: getColors().cellTitleColor},
                ]}>
                Revoke Access
              </Text>
              <View style={[styles.headingView]}>
                <Text
                  style={[styles.headingText, {color: getColors().darkColor}]}>
                  It seems you have created your account using 'Sign in with Apple or Twitter', to revoke access to the app, please follow the instruction mentioned on the below link.
                  {/* Due to Twitter and Apple polices, not able to revoke access programmatically. So Please follow the below link to delete access manually. */}
                </Text>
              </View>

              {/* <Text
                allowFontScaling={false}
                style={[
                  styles.txtHeading,
                  {color: getColors().cellTitleColor},
                ]}>
                For Apple : 
              </Text> */}
              <View style ={{marginLeft: 10}}>
              {appleId !== '' &&
              <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{this.appleClick()}}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.txtRemember,{color: getColors().txtBlackColor}]}>
                    Remove access from apple, {'  '} 
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[styles.txtRemember,{color: getColors().redColor, textDecorationLine: 'underline'}]}>
                    Click here
                  </Text>
                </TouchableOpacity>
              }
              {twitterId !== '' && 
              <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{this.twitterClick()}}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.txtRemember,{color: getColors().txtBlackColor}]}>
                    Remove access from Twitter, {'  '} 
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[styles.txtRemember,{color: getColors().redColor, textDecorationLine: 'underline'}]}>
                    Click here
                  </Text>
                </TouchableOpacity>
              }
                </View>
                <TouchableOpacity
                style={[
                  styles.callBtn,
                  {
                    backgroundColor: getColors().redColor,
                  },
                ]}
                onPress={() => {this.exitClick()}}>
                <Text allowFontScaling={false} style={styles.btnText}>
                Go to login
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default RemoveAccountAccess;
