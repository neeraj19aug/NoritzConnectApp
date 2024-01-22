import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import Moment from 'moment';
import {
  NativeModules,
  NativeEventEmitter,
  Text,
  View,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  UIManager,
  Animated,
  Easing,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getColors} from '../../services/Color';
import Assets from '../../services/Assets';
import styles from './styles';
import {Button, WifiSetupHeader} from '../../components/common';
import {setConfiguration, getConfiguration} from '../../services/configuration';
import {decryptValue, showAlert} from '../../services/Functions';
import Activity from '../../components/ActivityIndicator';
import Strings from '../../services/Strings';

const {udp} = NativeModules;
const socketEmitter = new NativeEventEmitter(udp);

class WPSSetupScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      selectedTabIndex: 1,
      stepCount: 1.1,
      showStep1Swiper: false,
      error_response: '',
      isVisibleSuccessView: false,
      spinAnim: new Animated.Value(0),
      command1Success: false,
      isStopRequest: false,
      isSuccess: false,
      isVisibleFailViewNew: false,
      apiResponseSuccess: false,
      inThing: '',
      tab1Text: 'Step 3',
      tab2Text: 'Step 4',
      tab3Text: 'Step 5',
      stepNumber: 4,
    };
  }

  componentDidMount() {
    const update = getConfiguration('update');
    if (update == '0') {
      this.setState({
        inThing: '',
      });
    } else {
      this.setState({
        inThing: getConfiguration('thingName'),
      });
    }

    setTimeout(() => this.setState({showStep1Swiper: true}), 200);

    Animated.loop(
      Animated.timing(this.state.spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    setConfiguration('isComeFromWPS', true);
    setConfiguration('isComeFromManual', false);
    this.socketCommandListener = socketEmitter.addListener(
      'socketResponse',
      () => this.showSocketResponse(),
    );
  }

  componentWillUnmount() {
    this.socketCommandListener.remove();
  }

  handleGetInitial() {
    // this.showAlert(message, 300);
    if (this.state.isStopRequest === false) {
      setTimeout(() => this.getInitial(), 2000);
    } else {
      // show fail screen
    }
  }

  onPressBackButton = () => {
    this.props.navigation.goBack();
  };

  onPressCancelButton = () => {
    this.setState({
      isStopRequest: true,
    });
    this.props.navigation.navigate('Tutorial');
  };

  onPressNextkButton = () => {
    setTimeout(() => this.nextStepAction(), 1000);
  };

  getInitial() {
    const inSerialnumber = getConfiguration('manualSavedSerialNUmber');
    const macAddress = getConfiguration('macAddress');

    const update = getConfiguration('update');

    this.props
      .getInitialdata(inSerialnumber, macAddress, this.state.inThing, update)
      .then(() => this.afterGetInitialdataAPI())
      .catch(() => this.handleGetInitial());
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

  doneFromSuccesView = () => {
    if (!this.state.isSuccess) {
      this.props.navigation.navigate('Tutorial');
      return;
    }

    const loginUser = getConfiguration('loginUser');
    const Model_name = getConfiguration('heaterNameNew');
    const Serial_number = getConfiguration('heaterID');
    const Router_serial_num = getConfiguration('manualSavedSerialNUmber');
    const {iot_user_id} = loginUser;
    const {inThing} = this.state; // getConfiguration('thingName');
    const MaxTempSet = getConfiguration('selectedHeaterMax');
    const MinTempSet = getConfiguration('selectedHeaterMin');
    const macAddress = getConfiguration('macAddress');
    const update = getConfiguration('update');
    const signal_strength = '50';

    this.props
      .saveHeater(
        Model_name,
        Serial_number,
        Router_serial_num,
        iot_user_id,
        inThing,
        MaxTempSet,
        MinTempSet,
        macAddress,
        update,
        signal_strength,
      )
      .then(() => this.afterCallSaveHeaterAPI())
      .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
  };

  saveHeaterFromFailView = () => {
    const loginUser = getConfiguration('loginUser');
    const Model_name = getConfiguration('heaterNameNew');
    const Serial_number = getConfiguration('heaterID');
    const Router_serial_num = getConfiguration('manualSavedSerialNUmber');
    const {iot_user_id} = loginUser;
    const {inThing} = this.state; // getConfiguration('thingName');
    const MaxTempSet = getConfiguration('selectedHeaterMax');
    const MinTempSet = getConfiguration('selectedHeaterMin');
    const macAddress = getConfiguration('macAddress');
    const update = getConfiguration('update');
    const signal_strength = '50';

    this.props
      .saveHeater(
        Model_name,
        Serial_number,
        Router_serial_num,
        iot_user_id,
        inThing,
        MaxTempSet,
        MinTempSet,
        macAddress,
        update,
        signal_strength,
      )
      .then(() => this.afterCallSaveHeaterAPI())
      .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
  };

  nextStepAction() {
    setTimeout(() => {
      this.setState({
        isVisibleSuccessView: !this.state.apiResponseSuccess,
        stepNumber: 5,
        isStopRequest: true,
        tab1Text: 'Step 4',
        tab2Text: 'Step 5',
        tab3Text: 'Step 6',
      });
       if(this.state.error_response != ''){
          showAlert(this.state.error_response, 300);
        }
    }, 180000);

    this.setState({
      selectedTabIndex: 2,
      tab1Text: 'Step 3',
      tab2Text: 'Step 4',
      tab3Text: 'Step 5',
    });
    setTimeout(() => this.commandFire(), 1000);
    setTimeout(() => this.getInitial(), 25000);
  }

  TabBarView() {
    return (
      <View style={styles.bottomTabView}>
        <View style={styles.tabView}>
          <Text allowFontScaling={false} style={styles.txtTab}>
            {this.state.tab1Text}
          </Text>
        </View>
        <View style={styles.tabBarSeperator} />
        <View style={styles.tabView}>
          <Text allowFontScaling={false} style={styles.txtTab}>
            {this.state.tab2Text}
          </Text>
        </View>
        <View style={styles.tabBarSeperator} />
        <View style={styles.tabView}>
          <Text allowFontScaling={false} style={styles.txtTab}>
            {this.state.tab3Text}
          </Text>
        </View>

        <View
          style={styles.tabbarBG}>
          <Animatable.View
            transition="left"
            style={styles.tabUnderLine}
          />
        </View>
      </View>
    );
  }

  step4View() {
    return (
      <View style={[styles.innerContainer]}>
        <Image
          resizeMode="contain"
          source={Assets.WPS_image}
          style={styles.step4ImgViewStyle}
        />
        <Text allowFontScaling={false} style={styles.descriptionText}>
          {Strings.txtPressWPSButton}
        </Text>
        <Text allowFontScaling={false} style={styles.descriptionText}>
          {Strings.txtPressWPSButtonHeater}
        </Text>
        <Button
          title={Strings.txtContinue}
          containerStyle={styles.btnStyle}
          onPress={this.onPressNextkButton}
        />
      </View>
    );
  }

  step5View() {
    return (
      <View style={[styles.step5Container]}>
        <View
          style={styles.successImageContainer}>
          <Animated.Image
            resizeMode="contain"
            source={Assets.waitingGIF}
            style={styles.alreadyConnectImageStyle}
          />
        </View>
        <View style={styles.txtWaitingForHeaterBG}>
          <Text
            allowFontScaling={false}
            style={[styles.txtHeading, {color: getColors().cellTitleColor, lineHeight: wp('6%')}]}>
            {Strings.txtWaitingForHeater}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, {color: getColors().cellTitleColor}]}>
            {Strings.txtPleaseReconnect}
          </Text>
        </View>
      </View>
    );
  }

  successView() {
    return this.state.isSuccess ? (
      <View style={[styles.step5Container]}>
        <View
          style={styles.successImageContainer}>
          {this.state.isSuccess ? (
            <Image
              resizeMode="contain"
              source={Assets.heaterSuccess}
              style={styles.alreadyConnectImageStyle}
            />
          ) : (
            <Image
              resizeMode="contain"
              source={Assets.heaterFail}
              style={styles.alreadyConnectImageStyle}
            />
          )}
        </View>
        <View style={styles.txtWaitingForHeaterBG}>
          {this.state.isSuccess ? (
            <Text
              allowFontScaling={false}
              style={[styles.txtHeading, {color: getColors().cellTitleColor}]}>
              {Strings.txtHeaterOnline}
            </Text>
          ) : (
            <Text
              allowFontScaling={false}
              style={[styles.txtHeading, {color: getColors().cellTitleColor}]}>
              {Strings.txtFailedToConnect}
            </Text>
          )}
          {this.state.isSuccess ? (
            <Text
              allowFontScaling={false}
              style={[styles.txtDesc, {color: getColors().cellTitleColor}]}>
              {Strings.descCongratulations}
            </Text>
          ) : (
            <Text
              allowFontScaling={false}
              style={[styles.txtDesc, {color: getColors().cellTitleColor}]}>
              {
                Strings.descFail
              }
            </Text>
          )}
        </View>
      </View>
    ) : (
      <View style={[styles.step5Container]}>
        <ScrollView style={{height: '100%', width: '100%'}}>
        <View
          style={[styles.failToConnectBG, {height: '100%'}]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.txtHeading,
              styles.txtFailToConnect,
            ]}>
            {Strings.txtFailedToConnect}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, styles.txtDesc2]}>
            {
              Strings.descUnfortunatly
            }
          </Text>
          <Text
            allowFontScaling={false}
            style={[
              styles.txtDesc,
              styles.txtDesc2,
              styles.txtWaitFewSec,
            ]}>
            {Strings.txtWaitForFewSeconds}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, styles.txtDesc2, styles.txtDesc3]}>
            {Strings.txtLEDisON}
          </Text>
          <Image
            resizeMode="contain"
            source={Assets.ledImage}
            style={styles.imgLEDLights}
          />

          <Button
            title={Strings.txtLightsAreOn}
            onPress={this.saveHeaterFromFailView}
            containerStyle={{marginTop: hp('3.34%')}}
            disabled={
              this.state.inThing != null && this.state.inThing != ''
                ? false
                : true
            }
            containerBackgroundColor={
              this.state.inThing != null && this.state.inThing != ''
                ? null
                : getColors().btnDisableColor
            }
          />

          <Text
            allowFontScaling={false}
            style={[
              styles.txtDesc,
              styles.txtDesc2,
              styles.txtLightsAreON,
            ]}>
            {Strings.txtIfLightsAreOn}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, styles.txtDesc2, styles.txtDesc3]}>
            {Strings.txtIfLightsAreOn2}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, styles.txtDesc2, styles.txtDesc3]}>
            {Strings.txtIfLightsAreOn3}
          </Text>
          <View
            style={styles.btnStartOverContainer}>
            <View style={{width: wp('100%') - 40}}>
              <Button
                title={Strings.txtStartOver}
                onPress={this.onPressCancelButton}
                containerStyle={styles.btnStartOverStyle}
                containerBackgroundColor={getColors().whiteColor}
                textStyle={styles.setBlackColor}
              />
            </View>
          </View>

          <Text
            allowFontScaling={false}
            style={[
              styles.txtDesc,
              styles.txtDesc2,
              styles.txtIssuePersist,
            ]}>
            {Strings.txtIfTheIssuePersist}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, styles.txtDesc2, styles.txtDesc3]}>
            {Strings.txtSupportAt}
          </Text>
        </View>
        </ScrollView>
      </View>
    );
  }

  failViewHeaterAlreadyConnected() {
    return (
      <View style={[styles.step5Container]}>
        <View
          style={styles.alreadyConnectImageContainer}>
          <Image
            resizeMode="contain"
            source={Assets.heaterFail}
            style={styles.alreadyConnectImageStyle}
          />
        </View>
        <View style={styles.alreadyConnectDescBG}>
          <Text
            allowFontScaling={false}
            style={[styles.txtHeading, {color: getColors().cellTitleColor}]}>
            {Strings.AlreadyPairedMsg}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, {color: getColors().cellTitleColor}]}>
            {Strings.txtAlreadyPairedDesc}
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.txtDesc, {color: getColors().cellTitleColor}]}>
            {Strings.alreadyPairedContactMessage}
          </Text>
        </View>
      </View>
    );
  }

  async afterGetInitialdataAPI() {
    const {response} = this.props.responseGetInitial;

    let resCode = response.responseCode;
    resCode = await decryptValue(resCode);
    if (resCode == 200) {

        const error_response = response.error_response;
         console.log('error_response --', error_response);
         if(error_response.length > 0){
            const message = await decryptValue(error_response[0].message);
            this.setState({error_response: message});
            //showAlert(message, 300);
         }

      const iotResponse = response.iot_response;

      const thingName = await decryptValue(iotResponse.thingname);
      this.setState({
        inThing: thingName,
      });
      const {initial_result} = iotResponse;
      const rowsAr = initial_result.rows;
      if (rowsAr.length > 0) {
        const rowsArr = rowsAr[0];

        const rst = await decryptValue(rowsArr.rst);

        if (rst === '1') {
          this.setState({
            isStopRequest: true,
            isSuccess: true,
            isVisibleSuccessView: true,
            stepNumber: 5,
            apiResponseSuccess: true,
            tab1Text: 'Step 4',
            tab2Text: 'Step 5',
            tab3Text: 'Step 6',
          });
        }
      } else if (this.state.isStopRequest === false) {
        setTimeout(() => this.getInitial(), 2000);
      }
    } else if (resCode == 401) {
       const error_response = response.error_response;
         console.log('error_response --', error_response);
         if(error_response.length > 0){
            const message = await decryptValue(error_response[0].message);
            this.setState({error_response: message});
            //showAlert(message, 300);
         }
      this.setState({
        isStopRequest: true,
        isSuccess: false,
        isVisibleFailViewNew: true,
        apiResponseSuccess: true,
        stepNumber: 5,
        tab1Text: 'Step 4',
        tab2Text: 'Step 5',
        tab3Text: 'Step 6',
      });
    } else if (this.state.isStopRequest === false) {
       const error_response = response.error_response;
         console.log('error_response --', error_response);
         if(error_response.length > 0){
            const message = await decryptValue(error_response[0].message);
            this.setState({error_response: message});
            //showAlert(message, 300);
         }
      setTimeout(() => this.getInitial(), 2000);
    }
  }

  showSocketResponse() {
    this.setState({
      command1Success: true,
    });
  }

  commandFire() {
    this.setState({
      command1Success: false,
    });
    let msgId = 1;
    try {
      const messageID = getConfiguration('messageID');
      if (messageID != null) {
        msgId = messageID + 1;
      } else {
        msgId = 1;
      }
    } catch (e) {
      msgId = 1;
    }
    setConfiguration('messageID', msgId);

    let commandForFire = '010100000000';
    msgId = msgId.toString(16);

    if (msgId.length === 1) {
      msgId = `000${msgId}`;
    } else if (msgId.length === 2) {
      msgId = `00${msgId}`;
    } else if (msgId.length === 3) {
      msgId = `0${msgId}`;
    }

    let year = Moment(new Date()).format('YY');
    let month = Moment(new Date()).format('MM');
    let day = Moment(new Date()).format('DD');

    let hour = Moment(new Date()).format('HH');
    let min = Moment(new Date()).format('mm');
    let sec = Moment(new Date()).format('ss');

    year = parseInt(year, 10).toString(16);
    month = parseInt(month, 10).toString(16);
    day = parseInt(day, 10).toString(16);
    hour = parseInt(hour, 10).toString(16);
    min = parseInt(min, 10).toString(16);
    sec = parseInt(sec, 10).toString(16);

    if (year.length === 1) {
      year = `0${year}`;
    }
    if (month.length === 1) {
      month = `0${month}`;
    }
    if (day.length === 1) {
      day = `0${day}`;
    }
    if (hour.length === 1) {
      hour = `0${hour}`;
    }
    if (min.length === 1) {
      min = `0${min}`;
    }
    if (sec.length === 1) {
      sec = `0${sec}`;
    }

    commandForFire = `${commandForFire +
      msgId +
      year +
      month +
      day +
      hour +
      min +
      sec}070001010402000000`;

    udp.sendudpcommandNew(commandForFire);
  }

  checkSocketResponse() {
    if (this.state.command1Success === false) {
      this.setState({
        isSuccess: false,
        isVisibleSuccessView: true,
        selectedTabIndex: 2,
      });
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  async afterCallSaveHeaterAPI() {
    const {response} = this.props.responseSaveHeater;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        const loginUser = getConfiguration('loginUser');
        this.callMetaDataAPI(loginUser.iot_user_id);
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  callMetaDataAPI(user_id) {
    this.props
      .getMetadata(user_id)
      .then(() => this.afterCallMetadataAPI())
      .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
  }

  afterCallMetadataAPI() {
    setConfiguration('newHeaterAdded', 'true');

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
            <WifiSetupHeader
              nav={this.props.navigation}
              stepNumber={this.state.stepNumber}
            />

            {this.state.selectedTabIndex === 1 ? this.step4View() : null}
            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleSuccessView === false &&
            this.state.isVisibleFailViewNew === false
              ? this.step5View()
              : null}

            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleSuccessView === true
              ? this.successView()
              : null}

            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleFailViewNew === true
              ? this.failViewHeaterAlreadyConnected()
              : null}

            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleSuccessView === false &&
            this.state.isVisibleFailViewNew === false ? (
              <Button title="Cancel" onPress={this.onPressCancelButton} />
            ) : null}

            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleSuccessView === true &&
            this.state.isSuccess === true ? (
              <Button title="Done" onPress={this.doneFromSuccesView} />
            ) : null}

            {/* {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleSuccessView === true &&
            this.state.isSuccess === false ? (
              <Button title="Retry" onPress={this.doneFromSuccesView} />
            ) : null} */}

            {this.state.selectedTabIndex === 2 &&
            this.state.isVisibleSuccessView === false &&
            this.state.isSuccess === false &&
            this.state.isVisibleFailViewNew === true ? (
              <Button title="Retry" onPress={this.doneFromSuccesView} />
            ) : null}

            {this.props.isBusySaveHeater || this.props.isBusyMetadata ? (
              <Activity />
            ) : null}
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}
export default WPSSetupScreen;
