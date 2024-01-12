import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import NetInfo from '@react-native-community/netinfo';
import {
  Text,
  View,
  Image,
  ScrollView,
  BackHandler,
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
import Activity from '../../components/ActivityIndicator';

class EditHeaterDetailsScreen extends Component {
  constructor(props) {
    super(props);

    backPressed = 0;
    _menuHeaters = null;

    this.state = {
      modelNumber: '',
      gasType: '',
      serialNumber: '',
      heaterFriendlyName: '',
      dateOfInstall: '',
      defaultHeaterFlag: '',
      companyName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      installerName: '',
      licenceNumber: '',
      phone: '',
      faxNumber: '',
      placeOfPurchase: '',
      installationType: '',
      residenceType: '',
      isVisibleTemperaturePopup: false,
      heater_label: '',
      installerInfoArray: [],
      installerInfoArrayMain: [],
      SearChText: '',
      showSuggestion: false,
      installerNames: [],
      userConnectedHeaters: [],
      company_id: '0',
      preferred_contractor_id: '0',
      isEditing: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick.bind(this),
    );

    const selectedHeater = getConfiguration('selectedHeater');
    this.setState({
      modelNumber: selectedHeater.model_name,
      gasType: selectedHeater.gas_name,
      serialNumber: selectedHeater.serial_number,
      heaterFriendlyName: selectedHeater.heater_friendly_name,
      dateOfInstall: selectedHeater.installation_date,
      defaultHeaterFlag: selectedHeater.heater_flag,
      companyName: selectedHeater.company_name,
      address: selectedHeater.address,
      city: selectedHeater.city,
      state: selectedHeater.state_name,
      zip: selectedHeater.zip,
      installerName: selectedHeater.installer_name,
      licenceNumber: selectedHeater.license_number,
      phone: selectedHeater.phone,
      faxNumber: selectedHeater.fax,
      placeOfPurchase: selectedHeater.place_of_purchase,
      installationType: selectedHeater.installation_type_text,
      residenceType: selectedHeater.residence_type_text,
      isVisibleTemperaturePopup: false,
      heater_label: selectedHeater.heater_label,
      company_id: selectedHeater.company_id,
      preferred_contractor_id: selectedHeater.preferred_contractor_id,
    });

    const userConnectedHeaters = getConfiguration('userConnectedHeaters');
    const tempUserConnectedHeaters = [];

    for (let i = 0; i < userConnectedHeaters.length; i += 1) {
      const objHeater = userConnectedHeaters[i];
      const obj = {
        value: objHeater.heater_id,
        label: objHeater.heater_label,
      };
      tempUserConnectedHeaters.push(obj);
    }

    this.setState({
      userConnectedHeaters: tempUserConnectedHeaters,
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
          'It seems some problem in network connectivity. Please try again after some time.',
          300,
        );
      }
    });
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
      address: branch.address,
      city: branch.city,
      state: branch.state,
      zip: branch.zip,
      showSuggestion: false,
      companyName: branch.branch_name,
      installerNames,
      installerName: '',
    });
  }

  setTemperatureRef = ref => {
    this._menuHeaters = ref;
  };

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
    if (!this.state.isEditing) {
      this.props.navigation.goBack();
      return;
    }

    const selectedHeater = getConfiguration('selectedHeater');
    const loginUser = getConfiguration('loginUser');

    Keyboard.dismiss();

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.props
          .EditHeater(
            selectedHeater.heater_id,
            this.state.heaterFriendlyName,
            this.state.preferred_contractor_id,
            loginUser.iot_user_id,
            this.state.company_id,
          )
          .then(() => this.afterCallEditHeaterAPI())
          .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
      } else {
        showAlert(
          'It seems some problem in network connectivity. Please try again after some time.',
          300,
        );
      }
    });

    // (heater_id, heater_friendly_name, preferred_contractor_id, iot_user_id, company_id)
    // this.props.navigation.goBack();
  }

  openChangePasswordScreen() {
    this.props.navigation.navigate('ChangePassword');
  }

  removeSelectedHeater() {
    this.setState({isVisibleTemperaturePopup: false});

    const selectedHeater = getConfiguration('selectedHeater');

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.props
          .DeleteHeater(selectedHeater.heater_id)
          .then(() => this.afterCallDeleteHeaterAPI())
          .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
      } else {
        showAlert(
          'It seems some problem in network connectivity. Please try again after some time.',
          300,
        );
      }
    });
  }

  async afterCallDeleteHeaterAPI() {
    const {response} = this.props.responseDeleteHeater;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        const user_id = getConfiguration('loginUser');
        this.callMetaDataAPI(user_id.iot_user_id);
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  callMetaDataAPI(user_id) {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.props
          .getMetadata(user_id)
          .then(() => this.afterCallMetadataAPI())
          .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
      } else {
        showAlert(
          'It seems some problem in network connectivity. Please try again after some time.',
          300,
        );
      }
    });
  }

  async afterCallMetadataAPI() {
    const {response} = this.props.responseMetadata;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        const miscData = response.MiscData;
        setConfiguration('heaterListUpdated', 'true');

        let thingName = '';

        const Heater_modelsArr = miscData.Heater_models;
        const userConnectedHeaters = [];

        if (Heater_modelsArr.length > 0) {
          for (let i = 0; i < Heater_modelsArr.length; i += 1) {
            const dict = Heater_modelsArr[i];
            const Last_connected = await decryptValue(dict.Last_connected);

            const objHeater = {
              Last_connected,
              heater_label: await decryptValue(dict.heater_label),
              MaxTempSet: await decryptValue(dict.MaxTempSet),
              MinTempSet: await decryptValue(dict.MinTempSet),
              Unit_form_id: await decryptValue(dict.Unit_form_id),
              address: await decryptValue(dict.address),
              city: await decryptValue(dict.city),
              company_name: await decryptValue(dict.company_name),
              company_id: await decryptValue(dict.company_id),
              current_status: await decryptValue(dict.current_status),
              current_temperature: await decryptValue(dict.current_temperature),
              fax: await decryptValue(dict.fax),
              gas_id: await decryptValue(dict.gas_id),
              gas_name: await decryptValue(dict.gas_name),
              heater_flag: await decryptValue(dict.heater_flag),
              heater_friendly_name: await decryptValue(
                dict.heater_friendly_name,
              ),
              heater_id: await decryptValue(dict.heater_id),
              inThing: await decryptValue(dict.inThing),
              installation_date: await decryptValue(dict.installation_date),
              installation_type: await decryptValue(dict.installation_type),
              installation_type_text: await decryptValue(
                dict.installation_type_text,
              ),
              installer_name: await decryptValue(dict.installer_name),
              last_error_code: await decryptValue(dict.last_error_code),
              license: await decryptValue(dict.license),
              license_number: await decryptValue(dict.license_number),
              model_id: await decryptValue(dict.model_id),
              model_name: await decryptValue(dict.model_name),
              phone: await decryptValue(dict.phone),
              place_of_purchase: await decryptValue(dict.place_of_purchase),
              router_serial_num: await decryptValue(dict.router_serial_num),
              serial_num_id: await decryptValue(dict.serial_num_id),
              serial_number: await decryptValue(dict.serial_number),
              state_name: await decryptValue(dict.state_name),
              status_name: await decryptValue(dict.status_name),
              title: await decryptValue(dict.title),
              user_id: await decryptValue(dict.user_id),
              zip: await decryptValue(dict.zip),
              residence_type: await decryptValue(dict.residence_type),
              residence_type_text: await decryptValue(dict.residence_type_text),
              error_status: await decryptValue(dict.error_status),
              image: await decryptValue(dict.image),
              preferred_contractor_id: await decryptValue(
                dict.preferred_contractor_id,
              ),
               is_usage_data_compatible: await decryptValue(
              dict.is_usage_data_compatible,
            ),

            is_recirculation_compatible: await decryptValue(
              dict.is_recirculation_compatible,
            ),
            };

            if (Last_connected === '1') {
             console.log('Afer edit selected heater--',objHeater);

              setConfiguration('selectedHeater', objHeater);
              heaterName = await decryptValue(dict.heater_label);
              thingName = await decryptValue(dict.inThing);
              setConfiguration('thingName', thingName);

              heater_image = await decryptValue(dict.image);
            }

            userConnectedHeaters.push(objHeater);
          }

          const obj = userConnectedHeaters[0];
          const selectedHeater = obj;
              console.log('Afer edit selected heater--',selectedHeater);
          setConfiguration('selectedHeater', selectedHeater);
          this.setState({
            modelNumber: selectedHeater.model_name,
            gasType: selectedHeater.gas_name,
            serialNumber: selectedHeater.serial_number,
            heaterFriendlyName: selectedHeater.heater_friendly_name,
            dateOfInstall: selectedHeater.installation_date,
            defaultHeaterFlag: selectedHeater.heater_flag,
            companyName: selectedHeater.company_name,
            address: selectedHeater.address,
            city: selectedHeater.city,
            state: selectedHeater.state_name,
            zip: selectedHeater.zip,
            installerName: selectedHeater.installer_name,
            licenceNumber: selectedHeater.license_number,
            phone: selectedHeater.phone,
            faxNumber: selectedHeater.fax,
            placeOfPurchase: selectedHeater.place_of_purchase,
            installationType: selectedHeater.installation_type_text,
            residenceType: selectedHeater.residence_type_text,
            isVisibleTemperaturePopup: false,
            heater_label: selectedHeater.heater_label,
          });

          const tempUserConnectedHeaters = [];

          for (let i = 0; i < userConnectedHeaters.length; i += 1) {
            const objHeater = userConnectedHeaters[i];
            const objVal = {
              value: objHeater.heater_id,
              label: objHeater.heater_label,
            };
            tempUserConnectedHeaters.push(objVal);
          }

          this.setState({
            userConnectedHeaters: tempUserConnectedHeaters,
          });
        } else {
          this.props.navigation.navigate('AddHeaterLogin');
        }
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  temperaturePopupContent() {
    return (
      <View style={styles.temperaturePopup}>
        <Text allowFontScaling={false} style={styles.titleTemperaturePopup}>
          Are you sure you want to remove this heater?
        </Text>
        <Text allowFontScaling={false} style={styles.contentTemperaturePopup}>
          If you remove this heater you will have to register and restart the
          setup process to re-enable control and online connectivity.
        </Text>
        <TouchableOpacity
          style={styles.cancelPopup}
          onPress={() => this.setState({isVisibleTemperaturePopup: false})}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().cellTitleColor},
            ]}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeTemperaturePopup}
          onPress={() => this.removeSelectedHeater()}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().redColor},
            ]}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  removeHeater() {
    this.setState({
      isVisibleTemperaturePopup: true,
    });
  }

  changeCompanyName(companyName) {
    this.setState({companyName});
    if (companyName !== '') {
      if (companyName.length === 3) {
        if (companyName == this.state.SearChText) {
          this.showSuggestionData();
        } else {
          this.getInstallerInfo(companyName);
        }
      } else if (companyName.length > 3) {
        let data = [...this.state.installerInfoArrayMain];
        data = data.filter(item => item.branch_name.includes(companyName));

        this.setState({installerInfoArray: data});

        if (data.length > 0) {
          this.showSuggestionData();
        } else {
          this.hideSuggestionData();
        }
      } else {
        this.hideSuggestionData();
      }
    } else {
      this.hideSuggestionData();
    }
  }

  async afterGetInstallerInfoAPI() {
    const {response} = this.props.responseInstallerInfo;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
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
        let resMessage = response.responseMessage;
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

  doneHeaterPicker() {
    this.setState({showHeaterPickerView: false});
    if (
      this.state.heater_label === '' &&
      this.state.userConnectedHeaters.length > 0
    ) {
      const obj = this.state.userConnectedHeaters[0];
      this.setState({heater_label: obj.heater_label});
    }
  }

  openInstallerPickerInfo() {
    if (this.state.installerNames.length > 0) {
      Keyboard.dismiss();
      this.setState({
        showInstallerPickerView: true,
      });
    }
  }

  changeHeater(itemValue) {
    const userConnectedHeaters = getConfiguration('userConnectedHeaters');

    for (let i = 0; i < userConnectedHeaters.length; i += 1) {
      const obj = userConnectedHeaters[i];
      if (obj.heater_label === itemValue) {
        const selectedHeater = obj;
        setConfiguration('selectedHeater', selectedHeater);

        this.setState({
          modelNumber: selectedHeater.model_name,
          gasType: selectedHeater.gas_name,
          serialNumber: selectedHeater.serial_number,
          heaterFriendlyName: selectedHeater.heater_friendly_name,
          dateOfInstall: selectedHeater.installation_date,
          defaultHeaterFlag: selectedHeater.heater_flag,
          companyName: selectedHeater.company_name,
          address: selectedHeater.address,
          city: selectedHeater.city,
          state: selectedHeater.state_name,
          zip: selectedHeater.zip,
          installerName: selectedHeater.installer_name,
          licenceNumber: selectedHeater.license_number,
          phone: selectedHeater.phone,
          faxNumber: selectedHeater.fax,
          placeOfPurchase: selectedHeater.place_of_purchase,
          installationType: selectedHeater.installation_type_text,
          residenceType: selectedHeater.residence_type_text,
          isVisibleTemperaturePopup: false,
          heater_label: selectedHeater.heater_label,
        });

        break;
      }
    }
  }

  async afterCallEditHeaterAPI() {
    const {response} = this.props.responseEditHeater;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        const Heater_modelsArr = response.Heater_models;
        const userConnectedHeaters = [];
        for (let i = 0; i < Heater_modelsArr.length; i += 1) {
          const dict = Heater_modelsArr[i];
          const Last_connected = await decryptValue(dict.Last_connected);

          const objHeater = {
            Last_connected,
            heater_label: await decryptValue(dict.heater_label),
            MaxTempSet: await decryptValue(dict.MaxTempSet),
            MinTempSet: await decryptValue(dict.MinTempSet),
            Unit_form_id: await decryptValue(dict.Unit_form_id),
            address: await decryptValue(dict.address),
            city: await decryptValue(dict.city),
            company_name: await decryptValue(dict.company_name),
            company_id: await decryptValue(dict.company_id),
            current_status: await decryptValue(dict.current_status),
            current_temperature: await decryptValue(dict.current_temperature),
            fax: await decryptValue(dict.fax),
            gas_id: await decryptValue(dict.gas_id),
            gas_name: await decryptValue(dict.gas_name),
            heater_flag: await decryptValue(dict.heater_flag),
            heater_friendly_name: await decryptValue(dict.heater_friendly_name),
            heater_id: await decryptValue(dict.heater_id),
            inThing: await decryptValue(dict.inThing),
            installation_date: await decryptValue(dict.installation_date),
            installation_type: await decryptValue(dict.installation_type),
            installation_type_text: await decryptValue(
              dict.installation_type_text,
            ),
            installer_name: await decryptValue(dict.installer_name),
            last_error_code: await decryptValue(dict.last_error_code),
            license: await decryptValue(dict.license),
            license_number: await decryptValue(dict.license_number),
            model_id: await decryptValue(dict.model_id),
            model_name: await decryptValue(dict.model_name),
            phone: await decryptValue(dict.phone),
            place_of_purchase: await decryptValue(dict.place_of_purchase),
            router_serial_num: await decryptValue(dict.router_serial_num),
            serial_num_id: await decryptValue(dict.serial_num_id),
            serial_number: await decryptValue(dict.serial_number),
            state_name: await decryptValue(dict.state_name),
            status_name: await decryptValue(dict.status_name),
            title: await decryptValue(dict.title),
            user_id: await decryptValue(dict.user_id),
            zip: await decryptValue(dict.zip),
            residence_type: await decryptValue(dict.residence_type),
            residence_type_text: await decryptValue(dict.residence_type_text),
            error_status: await decryptValue(dict.error_status),
            image: await decryptValue(dict.image),
            preferred_contractor_id: await decryptValue(
              dict.preferred_contractor_id,
            ),
                is_usage_data_compatible: await decryptValue(
              dict.is_usage_data_compatible,
            ),

            is_recirculation_compatible: await decryptValue(
              dict.is_recirculation_compatible,
            ),
          };

          if (Last_connected === '1') {
            setConfiguration('selectedHeater', objHeater);
            const thingName = await decryptValue(dict.inThing);
            setConfiguration('thingName', thingName);
          }

          userConnectedHeaters.push(objHeater);
        }
        // this.setState({
        //   userConnectedHeaters: userConnectedHeaters
        // });
        setConfiguration('userConnectedHeaters', userConnectedHeaters);

        this.props.navigation.navigate('Home');
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  render() {
    const predictions = this.state.installerInfoArray.map(branch => (
      <View>
        <View
          style={styles.branchPredBG}
        />
        <TouchableOpacity
          style={styles.branchContainer}
          onPress={() => this.setCompanyName(branch)}>
          <Text
            allowFontScaling={false}
            style={styles.txtFirstName}>
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
              style={styles.setFullView}>
              {this.state.userConnectedHeaters.length > 1 ? (
                <TouchableOpacity
                  onPress={() => this.setState({showHeaterPickerView: true})}
                  style={[
                    styles.cellView,
                    {backgroundColor: getColors().whiteColor},
                  ]}>
                  <View style={styles.cellInnerLeftView}>
                    <Image
                      resizeMode="contain"
                      source={Assets.heater_icon}
                      style={styles.cellIcon}
                    />
                    <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />

                    <Text
                      allowFontScaling={false}
                      style={[styles.txtHeaterName]}>
                      {this.state.heater_label}
                    </Text>
                  </View>
                  <View style={styles.cellInnerRightView}>
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.txtHeaterName,
                        {color: getColors().redColor},
                      ]}>
                      Select
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View
                  onPress={() => this.setState({showHeaterPickerView: true})}
                  style={[
                    styles.cellView,
                    {backgroundColor: getColors().whiteColor},
                  ]}>
                  <View style={[styles.cellInnerLeftView, styles.setBlockWidth]}>
                    <Image
                      resizeMode="contain"
                      source={Assets.heater_icon}
                      style={styles.cellIcon}
                    />
                    <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />

                    <Text
                      allowFontScaling={false}
                      style={[styles.txtHeaterName, styles.setHeaterLabelWidth]}
                      adjustsFontSizeToFit
                      numberOfLines={1}>
                      {this.state.heater_label}
                    </Text>
                  </View>
                </View>
              )}

              <View
                style={[styles.innerContainer, styles.shadow, styles.setMarginTop]}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtHeading,
                    {color: getColors().cellTitleColor},
                  ]}>
                  Heater Information
                </Text>

                <FormField
                  refer={instance => (this.modelNumberField = instance)}
                  style={styles.fullNameStyle}
                  title="Model Number"
                  value={this.state.modelNumber}
                  editable={false}
                  onPress={() => this.modelNumberField.focus()}
                  onChangeText={modelNumber => this.setState({modelNumber})}
                />

                <FormField
                  refer={instance => (this.gasTypeField = instance)}
                  style={styles.fullNameStyle}
                  title="Gas Type"
                  value={this.state.gasType}
                  editable={false}
                  onPress={() => this.gasTypeField.focus()}
                  onChangeText={gasType => this.setState({gasType})}
                />
                <FormField
                  refer={instance => (this.serialNumberField = instance)}
                  style={styles.fullNameStyle}
                  title="Serial Number"
                  value={this.state.serialNumber}
                  editable={false}
                  onPress={() => this.serialNumberField.focus()}
                  onChangeText={serialNumber => this.setState({serialNumber})}
                />

                <FormField
                  refer={instance => (this.heaterFriendlyNameField = instance)}
                  style={styles.fullNameStyle}
                  title="Heater Friendly Name"
                  value={this.state.heaterFriendlyName}
                  onPress={() => this.heaterFriendlyNameField.focus()}
                  onChangeText={heaterFriendlyName => {
                    this.setState({heaterFriendlyName});
                    this.setState({isEditing: true});
                  }}
                />

                <FormField
                  refer={instance => (this.dateOfInstallField = instance)}
                  style={styles.fullNameStyle}
                  title="Date of Install"
                  value={this.state.dateOfInstall}
                  editable={false}
                  onPress={() => this.dateOfInstallField.focus()}
                  onChangeText={dateOfInstall => this.setState({dateOfInstall})}
                />
                <FormField
                  refer={instance => (this.defaultHeaterFlagField = instance)}
                  style={styles.fullNameStyle}
                  title="Default Heater Flag"
                  value={this.state.defaultHeaterFlag}
                  editable={false}
                  onPress={() => this.defaultHeaterFlagField.focus()}
                  onChangeText={defaultHeaterFlag =>
                    this.setState({defaultHeaterFlag})
                  }
                />
              </View>

              <View
                style={[styles.innerContainer, styles.shadow, styles.setMarginTopZero]}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtHeading,
                    {color: getColors().cellTitleColor},
                  ]}>
                  Installer Information
                </Text>

                <FormField
                  refer={instance => (this.companyNameField = instance)}
                  style={styles.fullNameStyle}
                  title="Company Name"
                  value={this.state.companyName}
                  onPress={() => this.companyNameField.focus()}
                  onChangeText={companyName => {
                    this.changeCompanyName(companyName);
                    this.setState({isEditing: true});
                  }}
                />

                {this.state.showSuggestion ? (
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    scrollEnabled
                    style={styles.scrollViewPredBG}>
                    {predictions}
                  </ScrollView>
                ) : null}

                <FormField
                  refer={instance => (this.addressField = instance)}
                  style={styles.fullNameStyle}
                  title="Address"
                  editable={false}
                  value={this.state.address}
                  onPress={() => this.addressField.focus()}
                  onChangeText={address => this.setState({address})}
                />

                <FormField
                  refer={instance => (this.cityField = instance)}
                  style={styles.fullNameStyle}
                  title="City"
                  editable={false}
                  value={this.state.city}
                  onFocus={this.textFieldGetFoucus}
                  onPress={() => this.cityField.focus()}
                  onChangeText={city => this.setState({city})}
                />
                <FormField
                  refer={instance => (this.stateField = instance)}
                  style={styles.fullNameStyle}
                  title="State"
                  editable={false}
                  value={this.state.state}
                  onFocus={this.textFieldGetFoucus}
                  onPress={() => this.stateField.focus()}
                  onChangeText={state => this.setState({state})}
                />
                <FormField
                  refer={instance => (this.zipField = instance)}
                  style={styles.fullNameStyle}
                  title="Zip"
                  editable={false}
                  value={this.state.zip}
                  onFocus={this.textFieldGetFoucus}
                  onPress={() => this.zipField.focus()}
                  onChangeText={zip => this.setState({zip})}
                />
                <View>
                  <FormField
                    refer={instance => (this.installerNameField = instance)}
                    style={styles.fullNameStyle}
                    title="Installer Name"
                    value={this.state.installerName}
                    onPress={() => this.installerNameField.focus()}
                    onChangeText={installerName =>
                      this.setState({installerName})
                    }
                  />

                  <TouchableOpacity
                    onPress={() => {
                      this.openInstallerPickerInfo();
                    }}
                    style={styles.installerPickerBG}>
                    {this.state.installerNames.length > 0 ? (
                      <Image
                        resizeMode="contain"
                        source={Assets.drop_icon}
                        style={styles.dropIcon}
                      />
                    ) : null}
                  </TouchableOpacity>
                </View>

                <FormField
                  refer={instance => (this.licenceNumberField = instance)}
                  style={styles.fullNameStyle}
                  title="License Number"
                  editable={false}
                  value={this.state.licenceNumber}
                  onPress={() => this.licenceNumberField.focus()}
                  onChangeText={licenceNumber => this.setState({licenceNumber})}
                />
                <FormField
                  refer={instance => (this.phoneField = instance)}
                  style={styles.fullNameStyle}
                  title="Phone Number"
                  editable={false}
                  value={this.state.phone}
                  onPress={() => this.phoneField.focus()}
                  onChangeText={phone => this.setState({phone})}
                />

                <FormField
                  refer={instance => (this.faxNumberField = instance)}
                  style={styles.fullNameStyle}
                  title="Fax Number"
                  editable={false}
                  value={this.state.faxNumber}
                  onPress={() => this.faxNumberField.focus()}
                  onChangeText={faxNumber => this.setState({faxNumber})}
                />

                <FormField
                  refer={instance => (this.placeOfPurchaseField = instance)}
                  style={styles.fullNameStyle}
                  title="Place of Purchase"
                  editable={false}
                  value={this.state.placeOfPurchase}
                  onPress={() => this.placeOfPurchaseField.focus()}
                  onChangeText={placeOfPurchase =>
                    this.setState({placeOfPurchase})
                  }
                />
              </View>

              <View
                style={[styles.innerContainer, styles.shadow, styles.setMarginTopZero]}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtHeading,
                    {color: getColors().cellTitleColor},
                  ]}>
                  Installation Information
                </Text>

                <FormField
                  refer={instance => (this.installationTypeField = instance)}
                  style={styles.fullNameStyle}
                  title="Installation Type"
                  value={this.state.installationType}
                  editable={false}
                  onPress={() => this.installationTypeField.focus()}
                  onChangeText={installationType =>
                    this.setState({installationType})
                  }
                />

                <FormField
                  refer={instance => (this.residenceTypeField = instance)}
                  style={styles.fullNameStyle}
                  title="Residence Type"
                  editable={false}
                  value={this.state.residenceType}
                  onPress={() => this.residenceTypeField.focus()}
                  onChangeText={residenceType => this.setState({residenceType})}
                />
              </View>
              <TouchableOpacity
                onPress={() => this.removeHeater()}
                style={[
                  styles.callBtn,
                  {backgroundColor: getColors().redColor},
                ]}>
                <Text allowFontScaling={false} style={styles.btnText}>
                  Remove Heater
                </Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
            <Dialog
              visible={this.state.isVisibleTemperaturePopup}
              rounded={false}
              onTouchOutside={() => {
                this.setState({isVisibleTemperaturePopup: false});
              }}>
              <DialogContent style={styles.setPaddingZero}>
                {this.temperaturePopupContent()}
              </DialogContent>
            </Dialog>

            <PickerView
              refer={instance => (this.installerNamePicker = instance)}
              data={this.state.installerNames}
              selectedValue={this.state.installerName}
              onValueChange={itemValue => {
                this.setState({installerName: itemValue});
                this.setState({isEditing: true});
              }}
              showPickerView={this.state.showInstallerPickerView}
              onDonePress={() => this.doneInstallerNamePicker()}
            />

            <PickerView
              refer={instance => (this.connectedHeaterPicker = instance)}
              data={this.state.userConnectedHeaters}
              selectedValue={this.state.heater_label}
              onValueChange={itemValue => {
                this.setState({heater_label: itemValue});
                this.changeHeater(itemValue);
              }}
              showPickerView={this.state.showHeaterPickerView}
              onDonePress={() => this.doneHeaterPicker()}
            />
            {this.props.isBusyDeleteHeater ||
            this.props.isBusyMetadata ||
            this.props.isBusyEditHeater ||
            this.props.isBusyInstallerInfo ? (
              <Activity />
            ) : null}
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default EditHeaterDetailsScreen;
