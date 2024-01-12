import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';
import {getColors} from '../../services/Color';
import {TextInput} from 'react-native';
import FastImage from 'react-native-fast-image';
import Assets from '../../services/Assets';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DarkModeContext} from 'react-native-dark-mode';
import {Header} from '../../components/common';

import {Button} from '../../components/common';
class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: ['Issue faced with app', 'I have privacy concern', 'Others'],
      checked: null,
      feedbackText: '',
    };
  }

  selectFeedback = (index) => {
    this.setState({checked: index});
    // Keyboard.dismiss();
  };

  goBack() {
    this.props.navigation.goBack();
  }

  continueClick = () => {
    const feedback = this.state.feedback[this.state.checked];
    const feedbackText = this.state.feedbackText;
    console.log('feedback text', feedbackText);
    this.props.navigation.navigate('DeleteAccountConfirmation', {
      feedbackHeading: feedback,
      feedbackText: feedbackText,
    });
  };

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
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
            <View style={[styles.innerContainer, styles.shadow]}>
              <Text
                allowFontScaling={false}
                style={[
                  styles.txtHeading,
                  {color: getColors().cellTitleColor},
                ]}>
                Delete Account
              </Text>
              <View style={[styles.headingView]}>
                <Text
                  style={[styles.headingText, {color: getColors().darkColor}]}>
                  We're sorry to see you leave!
                </Text>
                <Text
                  style={[styles.headingText, {color: getColors().darkColor, marginTop: heightPercentageToDP('1.5%')}]}>
                  Before you go, could you kindly let us know why you're terminating your NORITZ account?
                </Text>
              </View>

              <View style={[styles.feedBackView]}>
                {this.state.feedback.map((data, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        this.selectFeedback(index);
                        Keyboard.dismiss();
                      }}>
                      <View style={[styles.radioBtnView]}>
                        {this.state.checked == index ? (
                          <FastImage
                            source={Assets.radioButtonChecked}
                            tintColor={getColors().darkColor}
                            resizeMode={FastImage.resizeMode.cover}
                            style={[styles.avatar]}
                          />
                        ) : (
                          <FastImage
                            source={Assets.radioButtonUnchecked}
                            tintColor={getColors().darkColor}
                            resizeMode={FastImage.resizeMode.cover}
                            style={[styles.avatar]}
                          />
                        )}
                        <Text
                          style={[
                            styles.radioBtnText,
                            {color: getColors().darkColor},
                          ]}>
                          {data}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}

                <TextInput
                  multiline
                  editable={this.state.checked !== null}
                  style={[
                    styles.feedBackText,
                    {
                      // borderColor:
                      //   this.state.checked !== null
                      //     ? getColors().primaryColor
                      //     : getColors().lightGrey,
                    },
                  ]}
                  placeholder="Please enter your feedback (optional)"
                  onChangeText={(feedbackText) => this.setState({feedbackText: feedbackText})}
                />
              </View>

              {/* continue Button */}
              {/* <View
                style={{
                  marginTop: heightPercentageToDP('5%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.continueClick()}
                  disabled={this.state.checked == null}
                  style={[
                    styles.button,
                    {
                      backgroundColor: getColors().screenBackground,
                      borderColor:
                        this.state.checked !== null
                          ? getColors().primaryColor
                          : getColors().lightGrey,
                    },
                  ]}>
                  <View>
                    <Text
                      style={[
                        styles.continueText,
                        {color: getColors().primaryColor},
                      ]}>
                      Continue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View> */}

              <TouchableOpacity
                style={[
                  styles.callBtn,
                  {
                    backgroundColor:this.state.checked !== null ? getColors().redColor : getColors().btnDisableColor,
                  },
                ]}
                disabled={this.state.checked == null}
                onPress={() => {this.continueClick()}}>
                <Text allowFontScaling={false} style={styles.btnText}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default DeleteAccount;
