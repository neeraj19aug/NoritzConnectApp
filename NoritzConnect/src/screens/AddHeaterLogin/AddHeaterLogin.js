import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {
  Text,
  View,
  Image,
  Platform,
  UIManager,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {getColors} from '../../services/Color';
import Assets from '../../services/Assets';
import styles from './styles';
import {setConfiguration} from '../../services/configuration';
import {decryptValue} from '../../services/Functions';
import Activity from '../../components/ActivityIndicator';
import { heightPercentageToDP } from 'react-native-responsive-screen';

class AddHeaterLoginScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    backPressed = 0;
    this.state = {
      parsingData: false,
    };
  }

  componentDidMount() {
    try {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick.bind(this),
      );

      this.parseMetadata();
    } catch (e) {
      this.setState({parsingData: false});
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  goBack() {
    this.props.navigation.goBack();
  }

  handleBackButtonClick() {
    if (this.backPressed > 0) {
      BackHandler.exitApp();
      this.backPressed = 0;
      return true;
    }
    this.backPressed += 1;
    ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
    setTimeout(() => {
      this.backPressed = 0;
    }, 2000);
    return true;
  }

  openDeleteAccountFeedback() {
    this.props.navigation.navigate('DeleteAccountFeedback');
  }

  goToEnterModelNumberScreen() {
    this.props.navigation.navigate('EnterModelNumber');
  }

  async parseMetadata() {
    this.setState({parsingData: true});
    const {response} = this.props.responseMetadata;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        const miscData = response.MiscData;
        const country = miscData.Country;
        const countries = [];
        for (let i = 0; i < country.length; i += 1) {
          const objCountry = country[i];
          const obj = {
            Lable: await decryptValue(objCountry.Lable),
            Value: await decryptValue(objCountry.Value),
          };
          countries.push(obj);
        }
        setConfiguration('country', countries);

        const gasDetailArr = miscData.GasDetail;
        const gasDetails = [];
        for (let i = 0; i < gasDetailArr.length; i += 1) {
          const dict = gasDetailArr[i];
          const objGasDetail = {
            value: await decryptValue(dict.GasId),
            label: await decryptValue(dict.GasName),
          };
          gasDetails.push(objGasDetail);
        }
        setConfiguration('gasDetails', gasDetails);

        const HeaterTipArr = miscData.HeaterTip;
        const heaterTips = [];
        for (let i = 0; i < HeaterTipArr.length; i += 1) {
          const dict = HeaterTipArr[i];
          const objHeaterTip = {
            heater_tip_id: await decryptValue(dict.heater_tip_id),
            title: await decryptValue(dict.title),
            text: await decryptValue(dict.text),
          };
          heaterTips.push(objHeaterTip);
        }
        setConfiguration('heaterTips', heaterTips);

        const InstallationTypeArr = miscData.InstallationType;
        const installationType = [];
        for (let i = 0; i < InstallationTypeArr.length; i += 1) {
          const dict = InstallationTypeArr[i];
          const objInstallationType = {
            label: await decryptValue(dict.Type),
            value: await decryptValue(dict.Value),
          };
          installationType.push(objInstallationType);
        }
        setConfiguration('installationType', installationType);

        const ModelDetailArr = miscData.ModelDetail;
        const modalDetail = [];
        for (let i = 0; i < ModelDetailArr.length; i += 1) {
          const dict = ModelDetailArr[i];
          const objModelDetail = {
            ModelId: await decryptValue(dict.ModelId),
            ModelImage: await decryptValue(dict.ModelImage),
            ModelName: await decryptValue(dict.ModelName),
            MAX: await decryptValue(dict.Temperature.MAX),
            MIN: await decryptValue(dict.Temperature.MIN),
            label: await decryptValue(dict.ModelName),
            value: await decryptValue(dict.ModelId),
          };
          modalDetail.push(objModelDetail);
        }

        setConfiguration('modalDetail', modalDetail);

        const StateArr = miscData.State;
        const states = [];
        for (let i = 0; i < StateArr.length; i += 1) {
          const dict = StateArr[i];
          const objState = {
            value: await decryptValue(dict.State_Id),
            label: await decryptValue(dict.State_Name),
          };
          states.push(objState);
        }
        setConfiguration('states', states);

        const resiTypeArr = miscData.ResidenceType;
        const ResiType = [];
        for (let i = 0; i < resiTypeArr.length; i += 1) {
          const dict = resiTypeArr[i];
          const objResiType = {
            label: await decryptValue(dict.Type),
            value: await decryptValue(dict.Value),
          };
          ResiType.push(objResiType);
        }
        setConfiguration('ResidenceType', ResiType);

        const DictUserInfo = miscData.Userinfo;

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
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        this.showAlert(resMessage, 300);
      }
    }
    this.setState({parsingData: false});
  }

  render() {
    return (
      <DarkModeContext.Consumer>
        {() => (
          <View
            style={[
              styles.pageContainer,
              {backgroundColor: getColors().screenBackground},
            ]}>
            <View style={styles.upperView}>
              <Image
                resizeMode="cover"
                source={Assets.addHeaterBG}
                style={styles.upperBGImage}
              />
              <View style={styles.setContentCenter}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtAddHearer,
                    {color: getColors().whiteColor},
                  ]}>
                  Add a heater
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[styles.txtManually, {color: getColors().whiteColor}]}>
                  Manually choose your heater
                </Text>
                <TouchableOpacity
                  onPress={() => this.goToEnterModelNumberScreen()}>
                  <Image
                    resizeMode="contain"
                    source={Assets.Add_btn}
                    style={styles.Add_btn}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lowerView}>
              <View style={styles.setContentCenter}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtAddHearer,
                    {color: getColors().primaryBlackColor},
                  ]}>
                  Scan QR Code
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtManually,
                    {color: getColors().primaryBlackColor},
                  ]}>
                  QR Code is shown on the
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtManually,
                    {color: getColors().primaryBlackColor},
                  ]}>
                  rating plate of the heater
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('ScanQR')}>
                  <Image
                    resizeMode="contain"
                    source={Assets.qrImage}
                    style={styles.Add_btn}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: heightPercentageToDP('2.5%')}} onPress={()=>{this.openDeleteAccountFeedback()}}>
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

            <Image
              resizeMode="contain"
              source={Assets.or}
              style={styles.orImage}
            />
            {this.state.parsingData ? <Activity /> : null}
          </View>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default AddHeaterLoginScreen;
