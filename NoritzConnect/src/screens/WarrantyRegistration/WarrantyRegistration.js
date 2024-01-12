import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import NetInfo from '@react-native-community/netinfo';
import DatePicker from 'react-native-datepicker';
import {
  Text,
  View,
  Keyboard,
  Image,
  ScrollView,
  Platform,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import {getColors} from '../../services/Color';
import Assets from '../../services/Assets';
import styles from './styles';
import {Header, Button} from '../../components/common';
import {FormField, PickerView} from '../../components';
import {decryptValue, showAlert} from '../../services/Functions';
import Activity from '../../components/ActivityIndicator';
import {getConfiguration} from '../../services/configuration';
import Strings from '../../services/Strings';

class WarrantyRegistrationScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    that = this;
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      city: '',
      state: '',
      zip: '',
      fax: '',
      email: '',
      installationType: '',
      residenceType: '',
      companyName: '',
      companyAddress: '',
      companyCity: '',
      companyState: '',
      companyZip: '',
      installerName: '',
      licenseNumber: '',
      companyPhone: '',
      companyFax: '',
      placeOfPurchase: '',
      gasType: '',
      serialNumber: '',
      dateOfInstall: '',
      serialNumberYear: '',
      serialNumberMonth: '',
      serialNumberValue: '',
      showStatePickerView: false,
      showInstallationTypePickerView: false,
      showResidenceTypePickerView: false,
      showCompanyStatePickerView: false,
      showGasTypePickerView: false,
      showModelPickerView: false,
      showInstallerPickerView: false,
      selectedModel: '',
      SearChText: '',
      showSuggestion: false,
      stateData: [],
      gasData: [],
      installationData: [],
      residenceData: [],
      modalDetail: [],
      installerInfoArray: [],
      installerInfoArrayMain: [],
      installerNames: [],
      firstNameMissing: false,
      lastNameMissing: false,
      addressMissing: false,
      cityMissing: false,
      zipMissing: false,
      phoneMissing: false,
      emailMissing: false,
      serialYearMissing: false,
      serialMonthMissing: false,
      serialValueMissing: false,
      stateMissing: false,
      installationTypeMissing: false,
      selectedModelMissing: false,
      gasTypeMissing: false,
      dateOfInstallMissing: false,
    };
  }

  componentDidMount() {
    const states = getConfiguration('states');
    const gasDetails = getConfiguration('gasDetails');
    const installationType = getConfiguration('installationType');
    const ResidenceType = getConfiguration('ResidenceType');
    const modalDetail = getConfiguration('modalDetail');
    const cheeoseHeaterObj = getConfiguration('cheeoseHeaterObj');
    const loginUser = getConfiguration('loginUser');
    this.setState({
      firstName: loginUser.first_name,
      lastName: loginUser.last_name,
      address: loginUser.address,
      phone: loginUser.phone,
      city: loginUser.city,
      state: loginUser.state_name,
      zip: loginUser.zip,
      email: loginUser.email,
    });

    console.log('gasDetails --', gasDetails);
    let serial = cheeoseHeaterObj.serialNumber;
    this.setState({
      stateData: states,
      gasData: gasDetails,
      installationData: installationType,
      residenceData: ResidenceType,
      modalDetail,
      selectedModel: cheeoseHeaterObj.model_name,
      gasType: cheeoseHeaterObj.gas,
      serialNumber: cheeoseHeaterObj.serialNumber,
      serialNumberYear: serial.substring(0, 4),
      serialNumberMonth: serial.substring(5, 7),
      serialNumberValue: serial.substring(8, serial.length),
    });
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    that.setState({
      showStatePickerView: false,
      showInstallationTypePickerView: false,
      showResidenceTypePickerView: false,
      showCompanyStatePickerView: false,
      showGasTypePickerView: false,
      showModelPickerView: false,
      showInstallerPickerView: false,
    });
  }

  _keyboardDidHide() {}

  goBack() {
    this.props.navigation.goBack();
  }

  // Perform action on click of Next button on Keyboard Assessory view
  nextTextInputButtonClicked = () => {
    if (this.firstNameField.isFocused()) {
      this.lastNameField.focus();
    } else if (this.lastNameField.isFocused()) {
      this.addressField.focus();
    } else if (this.addressField.isFocused()) {
      this.cityField.focus();
    } else if (this.cityField.isFocused()) {
      this.zipField.focus();
    } else if (this.zipField.isFocused()) {
      this.phoneField.focus();
    } else if (this.phoneField.isFocused()) {
      this.faxField.focus();
    } else if (this.faxField.isFocused()) {
      this.emailField.focus();
    } else if (this.emailField.isFocused()) {
      this.companyNameField.focus();
    } else if (this.companyNameField.isFocused()) {
      this.companyAddressField.focus();
    } else if (this.companyAddressField.isFocused()) {
      this.companyCityField.focus();
    } else if (this.companyCityField.isFocused()) {
      this.companyZipField.focus();
    } else if (this.companyZipField.isFocused()) {
      this.licenseNumberField.focus();
    } else if (this.licenseNumberField.isFocused()) {
      this.companyPhoneField.focus();
    } else if (this.companyPhoneField.isFocused()) {
      this.companyFaxField.focus();
    } else if (this.companyFaxField.isFocused()) {
      this.placeOfPurchaseField.focus();
    } else if (this.placeOfPurchaseField.isFocused()) {
      this.serialNumberFieldYear.focus();
    } else if (this.serialNumberFieldYear.isFocused()) {
      this.serialNumberFieldMonth.focus();
    } else if (this.serialNumberFieldMonth.isFocused()) {
      this.serialNumberValueField.focus();
    }

    // this.textFieldGetFoucus();
  };

  // Perform action on click of Previous button on Keyboard Assessory view
  previousTextInputButtonClicked = () => {
    if (this.serialNumberValueField.isFocused()) {
      this.serialNumberFieldMonth.focus();
    } else if (this.serialNumberFieldMonth.isFocused()) {
      this.serialNumberFieldYear.focus();
    } else if (this.serialNumberFieldYear.isFocused()) {
      this.placeOfPurchaseField.focus();
    } else if (this.placeOfPurchaseField.isFocused()) {
      this.companyFaxField.focus();
    } else if (this.companyFaxField.isFocused()) {
      this.companyPhoneField.focus();
    } else if (this.companyPhoneField.isFocused()) {
      this.licenseNumberField.focus();
    } else if (this.licenseNumberField.isFocused()) {
      this.companyZipField.focus();
    } else if (this.companyZipField.isFocused()) {
      this.companyCityField.focus();
    } else if (this.companyCityField.isFocused()) {
      this.companyAddressField.focus();
    } else if (this.companyAddressField.isFocused()) {
      this.companyNameField.focus();
    } else if (this.companyNameField.isFocused()) {
      this.emailField.focus();
    } else if (this.emailField.isFocused()) {
      this.faxField.focus();
    } else if (this.faxField.isFocused()) {
      this.phoneField.focus();
    } else if (this.phoneField.isFocused()) {
      this.zipField.focus();
    } else if (this.zipField.isFocused()) {
      this.cityField.focus();
    } else if (this.cityField.isFocused()) {
      this.addressField.focus();
    } else if (this.addressField.isFocused()) {
      this.lastNameField.focus();
    } else if (this.lastNameField.isFocused()) {
      this.firstNameField.focus();
    }
  };

  onPressSubmitButton = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        if (
          this.state.firstName == '' ||
          this.state.lastName == '' ||
          this.state.address == '' ||
          this.state.city == '' ||
          this.state.zip == '' ||
          this.state.phone == '' ||
          this.state.email == '' ||
          this.state.serialNumberYear == '' ||
          this.state.serialNumberMonth == '' ||
          this.state.serialNumberValue == '' ||
          this.state.state == '' ||
          this.state.installationType == '' ||
          this.state.selectedModel == '' ||
          this.state.gasType == '' ||
          this.state.dateOfInstall == ''
        ) {
          showAlert(Strings.txtPleaseFillAllFields, 300);
          this.showMandatoryFields();
        } else {
          this.callWebservicWarrantyRegistration();
        }
      } else {
        showAlert(
          Strings.networkError,
          300,
        );
      }
    });
  };

  showMandatoryFields() {
    if (this.state.dateOfInstall == '') {
      this.setState({dateOfInstallMissing: true});
    }
    if (this.state.gasType == '') {
      this.setState({gasTypeMissing: true});
    }
    if (this.state.selectedModel == '') {
      this.setState({selectedModelMissing: true});
    }
    if (this.state.installationType == '') {
      this.setState({installationTypeMissing: true});
    }
    if (this.state.state == '') {
      this.setState({stateMissing: true});
    }
    if (this.state.serialNumberValue == '') {
      this.setState({serialValueMissing: true});
    }
    if (this.state.serialNumberMonth == '') {
      this.setState({serialMonthMissing: true});
    }
    if (this.state.serialNumberYear == '') {
      this.setState({serialYearMissing: true});
    }
    if (this.state.email == '') {
      this.setState({emailMissing: true});
    }
    if (this.state.phone == '') {
      this.setState({phoneMissing: true});
    }
    if (this.state.zip == '') {
      this.setState({zipMissing: true});
    }
    if (this.state.city == '') {
      this.setState({cityMissing: true});
    }
    if (this.state.address == '') {
      this.setState({addressMissing: true});
    }
    if (this.state.lastName == '') {
      this.setState({lastNameMissing: true});
    }
    if (this.state.firstName == '') {
      this.setState({firstNameMissing: true});
    }
  }

  callWebservicWarrantyRegistration() {
    const DataArrayJson = [];
    let serial =
      this.state.serialNumberYear +
      '.' +
      this.state.serialNumberMonth +
      '-' +
      this.state.serialNumberValue;

    const TempDic = {
      model: this.state.selectedModel,
      uniquekey: '123',
      gas: this.state.gasType,
      number: serial,
      first_name: this.state.firstName,
      last_name: this.state.last_name,
      address: this.state.address,
      city: this.state.city,
      zip: this.state.zip,
      country: '1',
      state: this.state.state,
      phone: this.state.phone,
      fax: this.state.fax,
      email: this.state.email,
      installation_date: this.state.dateOfInstall,
      installation_type: this.state.installationType,
      residence_type: this.state.residence_type,
      inst_company: this.state.companyName,
      inst_address: this.state.companyAddress,
      inst_city: this.state.companyCity,
      inst_state: this.state.companyState,
      inst_zip: this.state.companyZip,
      license_number: this.state.license_number,
      inst_phone: this.state.companyPhone,
      inst_fax: this.state.companyFax,
      place: this.state.placeOfPurchase,
    };

    DataArrayJson.push(TempDic);
    const jsonString = JSON.stringify(DataArrayJson);

    this.props
      .warrantyRegister(jsonString)
      .then(() => this.afterWarrantyRegisterAPI())
      .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
  }

  async afterWarrantyRegisterAPI() {
    const response = this.props.responseWarrantyRegister.response['123'];

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        var resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);

        this.props.navigation.navigate('Tutorial');
      } else {
        resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  setStateValue(itemValue) {
    this.setState({state: itemValue});
  }

  changeCompanyName(companyName) {
    this.setState({companyName});
    if (companyName !== '') {
      if (companyName.length === 3) {
        if (companyName === this.state.SearChText) {
          this.showSuggestionData();
        } else {
          this.getInstallerInfo(companyName);
        }
      } else if (companyName.length > 3) {
        let data = [...this.state.installerInfoArrayMain];
        data = data.filter(item => item.branch_name.includes(companyName));

        this.setState({installerInfoArray: data});

        this.showSuggestionData();
      } else {
        this.hideSuggestionData();
      }
    } else {
      this.hideSuggestionData();
    }
  }

  getInstallerInfo(branch_name) {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.setState({SearChText: branch_name});
        this.props
          .getInstallerInfo(branch_name)
          .then(() => this.afterGetInstallerInfoAPI())
          .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
      } else {
        showAlert(
          Strings.networkError,
          300,
        );
      }
    });
  }

  async afterGetInstallerInfoAPI() {
    const {response} = this.props.responseInstallerInfo;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        var resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        const installerInfoArray = [];
        const branchArr = response.branch_detail;

        for (let i = 0; i < branchArr.length; i += 1) {
          const dict = branchArr[i];
          const installerArr = dict.installers;
          const installers = [];
          for (let j = 0; j < installerArr.length; j += 1) {
            const obj = installerArr[j];
            const objInstaller = {
              id: await decryptValue(obj.id),
              name: await decryptValue(obj.name),
            };
            installers.push(objInstaller);
          }
          const objBranchDetail = {
            address: await decryptValue(dict.address),
            branch_id: await decryptValue(dict.branch_id),
            branch_name: await decryptValue(dict.branch_name),
            city: await decryptValue(dict.city),
            fax: await decryptValue(dict.fax),
            phone: await decryptValue(dict.phone),
            state: await decryptValue(dict.state),
            zip: await decryptValue(dict.zip),
            installers,
          };
          installerInfoArray.push(objBranchDetail);
        }

        this.setState({
          installerInfoArray,
          installerInfoArrayMain: installerInfoArray,
        });
        this.showSuggestionData();
      } else {
        resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  showSuggestionData() {
    this.setState({showSuggestion: true});
  }

  hideSuggestionData() {
    this.setState({showSuggestion: false});
  }

  doneInstallerNamePicker() {
    this.setState({showInstallerPickerView: false});
    if (
      this.state.installerName === '' &&
      this.state.installerNames.length > 0
    ) {
      const obj = this.state.installerNames[0];
      this.setState({installerName: obj.label});
    }
  }

  doneModelPicker() {
    this.setState({showModelPickerView: false});
  }

  doneGasPicker() {
    this.setState({showGasTypePickerView: false});
  }

  doneCompanyStatePicker() {
    this.setState({showCompanyStatePickerView: false});
    if (this.state.companyState === '' && this.state.stateData.length > 0) {
      const obj = this.state.stateData[0];
      this.setState({companyState: obj.label});
    }
  }

  doneResidenceTypePicker() {
    this.setState({showResidenceTypePickerView: false});
    if (
      this.state.residenceType === '' &&
      this.state.residenceData.length > 0
    ) {
      const obj = this.state.residenceData[0];
      this.setState({residenceType: obj.label});
    }
  }

  doneInstallationTypePicker() {
    this.setState({showInstallationTypePickerView: false});
    if (
      this.state.installationType === '' &&
      this.state.installationData.length > 0
    ) {
      const obj = this.state.installationData[0];
      this.setState({installationType: obj.label});
    }
  }

  doneStatePicker() {
    this.setState({showStatePickerView: false});
    if (this.state.state === '' && this.state.stateData.length > 0) {
      const obj = this.state.stateData[0];
      this.setState({state: obj.label});
    }
  }

  setCompanyName(branch) {
    const installerNames = [];
    for (let i = 0; i < branch.installers.length; i += 1) {
      const obj = branch.installers[i];
      const installer = {
        value: obj.name,
        label: obj.name,
        id: obj.id,
        name: obj.name,
      };
      installerNames.push(installer);
    }

    this.setState({
      companyAddress: branch.address,
      companyCity: branch.city,
      companyState: branch.state,
      companyZip: branch.zip,
      showSuggestion: false,
      companyName: branch.branch_name,
      installerNames,
    });
  }

  render() {
    const predictions = this.state.installerInfoArray.map(branch => (
      <View>
        <View
          style={styles.predictionContainer}
        />
        <TouchableOpacity
          style={styles.branchNameContainer}
          onPress={() => this.setCompanyName(branch)}>
          <Text
            allowFontScaling={false}
            style={styles.txtBranchName}>
            {branch.branch_name}
          </Text>
        </TouchableOpacity>
      </View>
    ));
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
              behavior={Platform.OS == 'ios' ? 'padding' : null}
              automaticallyAdjustContentInsets={false}
              style={styles.innerViewStyle}>
              <Text
                allowFontScaling={false}
                style={[
                  styles.txtHeading,
                  {color: getColors().cellTitleColor},
                ]}>
                {Strings.txtCustomerInfo}
              </Text>

              <FormField
                refer={instance => (this.firstNameField = instance)}
                style={styles.fullNameStyle}
                missingField={this.state.firstNameMissing}
                title={Strings.txtFirstName}
                hideTitle
                value={this.state.firstName}
                onPress={() => this.firstNameField.focus()}
                onChangeText={firstName => {
                  this.setState({firstName});
                  if (firstName != '') {
                    this.setState({firstNameMissing: false});
                  } else {
                    this.setState({firstNameMissing: true});
                  }
                }}
              />
              <FormField
                refer={instance => (this.lastNameField = instance)}
                style={styles.fullNameStyle}
                title={Strings.txtLastName}
                missingField={this.state.lastNameMissing}
                hideTitle
                value={this.state.lastName}
                onPress={() => this.lastNameField.focus()}
                onChangeText={lastName => {
                  this.setState({lastName});
                  if (lastName != '') {
                    this.setState({lastNameMissing: false});
                  } else {
                    this.setState({lastNameMissing: true});
                  }
                }}
              />
              <FormField
                refer={instance => (this.addressField = instance)}
                style={styles.fullNameStyle}
                title={Strings.txtAddress}
                missingField={this.state.addressMissing}
                hideTitle
                value={this.state.address}
                onPress={() => this.addressField.focus()}
                onChangeText={address => {
                  this.setState({address});
                  if (address != '') {
                    this.setState({addressMissing: false});
                  } else {
                    this.setState({addressMissing: true});
                  }
                }}
              />
              <FormField
                refer={instance => (this.cityField = instance)}
                style={styles.fullNameStyle}
                title={Strings.txtCity}
                missingField={this.state.cityMissing}
                hideTitle
                value={this.state.city}
                onPress={() => this.cityField.focus()}
                onChangeText={city => {
                  this.setState({city});
                  if (city != '') {
                    this.setState({cityMissing: false});
                  } else {
                    this.setState({cityMissing: true});
                  }
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showStatePickerView: true,
                    showInstallationTypePickerView: false,
                    showResidenceTypePickerView: false,
                    showCompanyStatePickerView: false,
                    showGasTypePickerView: false,
                    showModelPickerView: false,
                  });
                  Keyboard.dismiss();
                }}
                style={[
                  styles.cellView,
                  {backgroundColor: getColors().whiteColor},
                ]}>
                <View style={styles.cellInnerLeftView}>
                  <Image
                    resizeMode="contain"
                    source={Assets.location_icon}
                    style={styles.cellIcon}
                  />
                  <View style={[styles.tabBarSeperator]} />

                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.cellTitle,
                      {
                        color: this.state.stateMissing
                          ? getColors().redColor
                          : getColors().txtBlackColor,
                      },
                    ]}>
                    {this.state.state !== '' ? this.state.state : Strings.txtStates}
                  </Text>
                </View>

                <View style={styles.cellInnerRightView}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.cellTitle, {color: getColors().redColor}]}>
                    {Strings.txtSelect}
                  </Text>
                </View>
              </TouchableOpacity>

              <FormField
                refer={instance => (this.zipField = instance)}
                style={styles.fullNameStyle}
                title={Strings.txtZipCode}
                missingField={this.state.zipMissing}
                hideTitle
                value={this.state.zip}
                onPress={() => this.zipField.focus()}
                onChangeText={zip => {
                  this.setState({zip});
                  if (zip != '') {
                    this.setState({zipMissing: false});
                  } else {
                    this.setState({zipMissing: true});
                  }
                }}
              />

              <FormField
                refer={instance => (this.phoneField = instance)}
                style={styles.fullNameStyle}
                title={Strings.txtPhone}
                missingField={this.state.phoneMissing}
                hideTitle
                value={this.state.phone}
                keyboardType="phone-pad"
                onPress={() => this.phoneField.focus()}
                onChangeText={phone => {
                  this.setState({phone});
                  if (phone != '') {
                    this.setState({phoneMissing: false});
                  } else {
                    this.setState({phoneMissing: true});
                  }
                }}
              />
              <FormField
                refer={instance => (this.faxField = instance)}
                style={styles.fullNameStyle}
                title={Strings.txtFax}
                keyboardType="phone-pad"
                hideTitle
                value={this.state.fax}
                onPress={() => this.faxField.focus()}
                onChangeText={fax => this.setState({fax})}
              />
              <FormField
                refer={instance => (this.emailField = instance)}
                style={styles.fullNameStyle}
                title={Strings.txtEmail}
                missingField={this.state.emailMissing}
                keyboardType="email-address"
                hideTitle
                value={this.state.email}
                onPress={() => this.emailField.focus()}
                onChangeText={email => {
                  this.setState({email});
                  if (email != '') {
                    this.setState({emailMissing: false});
                  } else {
                    this.setState({emailMissing: true});
                  }
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showStatePickerView: false,
                    showInstallationTypePickerView: true,
                    showResidenceTypePickerView: false,
                    showCompanyStatePickerView: false,
                    showGasTypePickerView: false,
                    showModelPickerView: false,
                  });
                  Keyboard.dismiss();
                }}
                style={[
                  styles.cellView,
                  {backgroundColor: getColors().whiteColor},
                ]}>
                <View style={styles.cellInnerLeftView}>
                  <Image
                    resizeMode="contain"
                    source={Assets.install_icon}
                    style={styles.cellIcon}
                  />
                  <View style={[styles.tabBarSeperator]} />

                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.cellTitle,
                      {
                        color: this.state.installationTypeMissing
                          ? getColors().redColor
                          : getColors().txtBlackColor,
                      },
                    ]}>
                    {this.state.installationType !== ''
                      ? this.state.installationType
                      : Strings.txtInstallationType}
                  </Text>
                </View>

                <View style={styles.cellInnerRightView}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.cellTitle, {color: getColors().redColor}]}>
                    {Strings.txtSelect}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showStatePickerView: false,
                    showInstallationTypePickerView: false,
                    showResidenceTypePickerView: true,
                    showCompanyStatePickerView: false,
                    showGasTypePickerView: false,
                    showModelPickerView: false,
                  });
                  Keyboard.dismiss();
                }}
                style={[
                  styles.cellView,
                  {backgroundColor: getColors().whiteColor},
                ]}>
                <View style={styles.cellInnerLeftView}>
                  <Image
                    resizeMode="contain"
                    source={Assets.home_icon}
                    style={styles.cellIcon}
                  />
                  <View style={[styles.tabBarSeperator]} />

                  <Text allowFontScaling={false} style={[styles.cellTitle]}>
                    {' '}
                    {this.state.residenceType !== ''
                      ? this.state.residenceType
                      : Strings.txtResidenceType}
                  </Text>
                </View>

                <View style={styles.cellInnerRightView}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.cellTitle, {color: getColors().redColor}]}>
                    {Strings.txtSelect}
                  </Text>
                </View>
              </TouchableOpacity>

              <Text
                allowFontScaling={false}
                style={[
                  styles.txtHeading,
                  {color: getColors().cellTitleColor},
                ]}>
                {Strings.txtInstallationCompany}
              </Text>

              <FormField
                refer={instance => (this.companyNameField = instance)}
                style={styles.fullNameStyle}
                title={Strings.txtCompanyName}
                hideTitle
                value={this.state.companyName}
                onPress={() => this.companyNameField.focus()}
                onChangeText={companyName =>
                  this.changeCompanyName(companyName)
                }
              />

              {this.state.showSuggestion ? (
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  scrollEnabled
                  style={styles.predScrollStyle}>
                  {predictions}
                </ScrollView>
              ) : null}

              <FormField
                refer={instance => (this.companyAddressField = instance)}
                style={styles.fullNameStyle}
                title="Address"
                hideTitle
                value={this.state.companyAddress}
                onPress={() => this.companyAddressField.focus()}
                onChangeText={companyAddress => this.setState({companyAddress})}
              />
              <FormField
                refer={instance => (this.companyCityField = instance)}
                style={styles.fullNameStyle}
                title="City"
                hideTitle
                value={this.state.companyCity}
                onPress={() => this.companyCityField.focus()}
                onChangeText={companyCity => this.setState({companyCity})}
              />

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showStatePickerView: false,
                    showInstallationTypePickerView: false,
                    showResidenceTypePickerView: false,
                    showCompanyStatePickerView: true,
                    showGasTypePickerView: false,
                    showModelPickerView: false,
                  });
                  Keyboard.dismiss();
                }}
                style={[
                  styles.cellView,
                  {backgroundColor: getColors().whiteColor},
                ]}>
                <View style={styles.cellInnerLeftView}>
                  <Image
                    resizeMode="contain"
                    source={Assets.location_icon}
                    style={styles.cellIcon}
                  />
                  <View style={[styles.tabBarSeperator]} />

                  <Text allowFontScaling={false} style={[styles.cellTitle]}>
                    {this.state.companyState !== ''
                      ? this.state.companyState
                      : 'State'}
                  </Text>
                </View>

                <View style={styles.cellInnerRightView}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.cellTitle, {color: getColors().redColor}]}>
                    {Strings.txtSelect}
                  </Text>
                </View>
              </TouchableOpacity>

              <FormField
                refer={instance => (this.companyZipField = instance)}
                style={styles.fullNameStyle}
                title="Zip code"
                hideTitle
                value={this.state.companyZip}
                onPress={() => this.companyZipField.focus()}
                onChangeText={companyZip => this.setState({companyZip})}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showStatePickerView: false,
                    showInstallationTypePickerView: false,
                    showResidenceTypePickerView: false,
                    showCompanyStatePickerView: false,
                    showGasTypePickerView: false,
                    showModelPickerView: false,
                  });
                  Keyboard.dismiss();
                  if (this.state.installerNames.length > 0) {
                    this.setState({
                      showInstallerPickerView: true,
                    });
                  }
                }}
                style={[
                  styles.cellView,
                  {backgroundColor: getColors().whiteColor},
                ]}>
                <View style={styles.cellInnerLeftView}>
                  <Image
                    resizeMode="contain"
                    source={Assets.model_number_icon}
                    style={styles.cellIcon}
                  />
                  <View style={[styles.tabBarSeperator]} />
                  <Text allowFontScaling={false} style={[styles.cellTitle]}>
                    {this.state.installerName !== ''
                      ? this.state.installerName
                      : Strings.txtInstallerName}
                  </Text>
                </View>

                <View style={styles.cellInnerRightView}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.cellTitle, {color: getColors().redColor}]}>
                    {Strings.txtSelect}
                  </Text>
                </View>
              </TouchableOpacity>
              <FormField
                refer={instance => (this.licenseNumberField = instance)}
                style={styles.fullNameStyle}
                title={Strings.txtLicenceNumber}
                hideTitle
                value={this.state.licenseNumber}
                onPress={() => this.licenseNumberField.focus()}
                onChangeText={licenseNumber => this.setState({licenseNumber})}
              />
              <FormField
                refer={instance => (this.companyPhoneField = instance)}
                style={styles.fullNameStyle}
                title="Phone"
                keyboardType="phone-pad"
                hideTitle
                value={this.state.companyPhone}
                onPress={() => this.companyPhoneField.focus()}
                onChangeText={companyPhone => this.setState({companyPhone})}
              />
              <FormField
                refer={instance => (this.companyFaxField = instance)}
                style={styles.fullNameStyle}
                title="Fax"
                keyboardType="phone-pad"
                hideTitle
                value={this.state.companyFax}
                onPress={() => this.companyFaxField.focus()}
                onChangeText={companyFax => this.setState({companyFax})}
              />
              <FormField
                refer={instance => (this.placeOfPurchaseField = instance)}
                style={styles.fullNameStyle}
                title={Strings.txtPlaceOfPurchase}
                hideTitle
                value={this.state.placeOfPurchase}
                onPress={() => this.placeOfPurchaseField.focus()}
                onChangeText={placeOfPurchase =>
                  this.setState({placeOfPurchase})
                }
              />

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showStatePickerView: false,
                    showInstallationTypePickerView: false,
                    showResidenceTypePickerView: false,
                    showCompanyStatePickerView: false,
                    showGasTypePickerView: false,
                    showInstallerPickerView: false,
                    showModelPickerView: true,
                  });
                  Keyboard.dismiss();
                }}
                style={[
                  styles.cellView,
                  {backgroundColor: getColors().whiteColor},
                ]}>
                <View style={styles.cellInnerLeftView}>
                  <Image
                    resizeMode="contain"
                    source={Assets.model_number_icon}
                    style={styles.cellIcon}
                  />
                  <View style={[styles.tabBarSeperator]} />

                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.cellTitle,
                      {
                        color: this.state.selectedModelMissing
                          ? getColors().redColor
                          : getColors().txtBlackColor,
                      },
                    ]}>
                    {' '}
                    {this.state.selectedModel !== ''
                      ? this.state.selectedModel
                      : Strings.txtModelNumber}
                  </Text>
                </View>

                <View style={styles.cellInnerRightView}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.cellTitle, {color: getColors().redColor}]}>
                    {Strings.txtSelect}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showStatePickerView: false,
                    showInstallationTypePickerView: false,
                    showResidenceTypePickerView: false,
                    showCompanyStatePickerView: false,
                    showGasTypePickerView: true,
                    showModelPickerView: false,
                  });
                  Keyboard.dismiss();
                }}
                style={[
                  styles.cellView,
                  {backgroundColor: getColors().whiteColor},
                ]}>
                <View style={styles.cellInnerLeftView}>
                  <Image
                    resizeMode="contain"
                    source={Assets.gas_icon}
                    style={styles.cellIcon}
                  />
                  <View style={[styles.tabBarSeperator]} />

                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.cellTitle,
                      {
                        color: this.state.gasTypeMissing
                          ? getColors().redColor
                          : getColors().txtBlackColor,
                      },
                    ]}>
                    {' '}
                    {this.state.gasType !== ''
                      ? this.state.gasType
                      : Strings.txtGasType}
                  </Text>
                </View>

                <View style={styles.cellInnerRightView}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.cellTitle, {color: getColors().redColor}]}>
                    {Strings.txtSelect}
                  </Text>
                </View>
              </TouchableOpacity>
              {/* <FormField
                refer={instance => (this.serialNumberField = instance)}
                style={styles.fullNameStyle}
                title="Serial#"
                hideTitle
                value={this.state.serialNumber}
                onPress={() => this.serialNumberField.focus()}
                onChangeText={serialNumber => this.setState({serialNumber})}
              /> */}
              <View
                style={styles.txtModelNumberContainer}>
                <View style={styles.setModelMonthWidth}>
                  <FormField
                    refer={instance => (this.serialNumberFieldYear = instance)}
                    title="Serial#"
                    missingField={this.state.serialYearMissing}
                    style={styles.fullNameStyle}
                    hideTitle
                    keyboardType={'number-pad'}
                    maxLength={4}
                    value={this.state.serialNumberYear}
                    onPress={() => this.serialNumberFieldYear.focus()}
                    onChangeText={serialNumberYear => {
                      this.setState({serialNumberYear});
                      if (serialNumberYear.length >= 4) {
                        this.serialNumberFieldMonth.focus();
                      }
                      if (serialNumberYear != '') {
                        this.setState({serialYearMissing: false});
                      } else {
                        this.setState({serialYearMissing: true});
                      }
                    }}
                  />
                </View>
                <Text>.</Text>
                <View style={styles.setModelMonthWidth}>
                  <FormField
                    refer={instance => (this.serialNumberFieldMonth = instance)}
                    title=""
                    maxLength={2}
                    style={styles.fullNameStyle}
                    hideTitle
                    missingField={this.state.serialMonthMissing}
                    keyboardType={'number-pad'}
                    value={this.state.serialNumberMonth}
                    onPress={() => this.serialNumberFieldMonth.focus()}
                    onChangeText={serialNumberMonth => {
                      this.setState({serialNumberMonth});
                      if (serialNumberMonth.length >= 2) {
                        this.serialNumberValueField.focus();
                      } else if (serialNumberMonth.length == 0) {
                        this.serialNumberFieldYear.focus();
                      }
                      if (serialNumberMonth != '') {
                        this.setState({serialMonthMissing: false});
                      } else {
                        this.setState({serialMonthMissing: true});
                      }
                    }}
                  />
                </View>
                <Text>-</Text>
                <View style={styles.setModelNumberWidth}>
                  <FormField
                    refer={instance => (this.serialNumberValueField = instance)}
                    title=""
                    maxLength={6}
                    missingField={this.state.serialValueMissing}
                    style={styles.fullNameStyle}
                    hideTitle
                    keyboardType={'number-pad'}
                    value={this.state.serialNumberValue}
                    onPress={() => this.serialNumberValueField.focus()}
                    onChangeText={serialNumberValue => {
                      this.setState({serialNumberValue});
                      if (serialNumberValue.length == 0) {
                        this.serialNumberFieldMonth.focus();
                      }
                      if (serialNumberValue != '') {
                        this.setState({serialValueMissing: false});
                      } else {
                        this.setState({serialValueMissing: true});
                      }
                    }}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.cellView,
                  {backgroundColor: getColors().whiteColor},
                ]}>
                <View style={styles.cellInnerLeftView}>
                  <Image
                    resizeMode="contain"
                    source={Assets.events_icon}
                    style={styles.cellIcon}
                  />
                  <View style={[styles.tabBarSeperator]} />

                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.cellTitle,
                      {
                        color: this.state.dateOfInstallMissing
                          ? getColors().redColor
                          : getColors().txtBlackColor,
                      },
                    ]}>
                    {this.state.dateOfInstall !== ''
                      ? this.state.dateOfInstall
                      : Strings.txtDateOfInstall}
                  </Text>
                </View>

                <View style={styles.cellInnerRightView}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.cellTitle, {color: getColors().redColor}]}>
                    {Strings.txtSelect}
                  </Text>
                </View>

                <DatePicker
                  style={styles.datePickerStyle}
                  date={this.state.dateOfInstall}
                  mode="date"
                  placeholder={Strings.txtSelectDate}
                  format="MM-DD-YY"
                  minDate="01-01-00"
                  maxDate={new Date()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: styles.dateIconStyle,
                    dateInput: {
                      marginLeft: 36,
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={date => {
                    this.setState({
                      dateOfInstall: date,
                      dateOfInstallMissing: false,
                    });
                  }}
                />
              </TouchableOpacity>

              <Button
                title={Strings.txtSubmitWarranty}
                onPress={this.onPressSubmitButton}
                textStyle={styles.btnText}
              />
            </KeyboardAwareScrollView>

            <KeyboardAccessoryNavigation
              onNext={this.nextTextInputButtonClicked}
              onPrevious={this.previousTextInputButtonClicked}
              onDone={this.doneTextInputButtonClicked}
              nextDisabled={this.state.isNextDisabled}
              previousDisabled={this.state.isPreviousDisabled}
              androidAdjustResize
              inSafeAreaView={true}
              bumperHeight={30}
            />

            <PickerView
              refer={instance => (this.statePicker = instance)}
              data={this.state.stateData}
              selectedValue={this.state.state}
              onValueChange={itemValue =>
                this.setState({
                  state: itemValue,
                  stateMissing: false,
                })
              }
              showPickerView={this.state.showStatePickerView}
              onDonePress={() => {
                this.doneStatePicker();
                this.setState({
                  stateMissing: false,
                });
              }}
            />
            <PickerView
              refer={instance => (this.installationPicker = instance)}
              data={this.state.installationData}
              selectedValue={this.state.installationType}
              onValueChange={itemValue =>
                this.setState({
                  installationType: itemValue,
                  installationTypeMissing: false,
                })
              }
              showPickerView={this.state.showInstallationTypePickerView}
              onDonePress={() => {
                this.doneInstallationTypePicker();
                this.setState({
                  installationTypeMissing: false,
                });
              }}
            />
            <PickerView
              refer={instance => (this.installationPicker = instance)}
              data={this.state.residenceData}
              selectedValue={this.state.residenceType}
              onValueChange={itemValue =>
                this.setState({residenceType: itemValue})
              }
              showPickerView={this.state.showResidenceTypePickerView}
              onDonePress={() => this.doneResidenceTypePicker()}
            />
            <PickerView
              refer={instance => (this.showCompanyStatePickerView = instance)}
              data={this.state.stateData}
              selectedValue={this.state.companyState}
              onValueChange={itemValue =>
                this.setState({companyState: itemValue})
              }
              showPickerView={this.state.showCompanyStatePickerView}
              onDonePress={() => this.doneCompanyStatePicker()}
            />
            <PickerView
              refer={instance => (this.installationPicker = instance)}
              data={this.state.gasData}
              selectedValue={this.state.gasType}
              onValueChange={itemValue =>
                this.setState({
                  gasType: itemValue,
                  gasTypeMissing: false,
                })
              }
              showPickerView={this.state.showGasTypePickerView}
              onDonePress={() => this.doneGasPicker()}
            />
            <PickerView
              refer={instance => (this.modelPicker = instance)}
              data={this.state.modalDetail}
              selectedValue={this.state.selectedModel}
              onValueChange={itemValue =>
                this.setState({
                  selectedModel: itemValue,
                  selectedModelMissing: false,
                })
              }
              showPickerView={this.state.showModelPickerView}
              onDonePress={() => this.doneModelPicker()}
            />
            <PickerView
              refer={instance => (this.installerNamePicker = instance)}
              data={this.state.installerNames}
              selectedValue={this.state.installerName}
              onValueChange={itemValue =>
                this.setState({installerName: itemValue})
              }
              showPickerView={this.state.showInstallerPickerView}
              onDonePress={() => this.doneInstallerNamePicker()}
            />

            {this.props.isBusyInstallerInfo ||
            this.props.isBusyWarrantyRegister ? (
              <Activity />
            ) : null}
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default WarrantyRegistrationScreen;
