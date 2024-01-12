import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Text,
  View,
  Keyboard,
  ScrollView,
  FlatList,
  Platform,
  UIManager,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {getColors} from '../../services/Color';
import styles from './styles';
import {Header, Button, HeaterCell} from '../../components/common';
import {FormField} from '../../components';
import {getConfiguration, setConfiguration} from '../../services/configuration';
import {decryptValue, showAlert} from '../../services/Functions';
import Activity from '../../components/ActivityIndicator';

class EnterModelNumberScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    backPressed = 0;
    this.submitButtonPressed = false;
    this.state = {
      modelNumber: '', // 'N-0631S',
      serialNumber: '', // '2020.09-000002',
      heatersArray: [],
      heatersArrayyMain: [],
      showSuggestion: false,
    };
  }

  componentDidMount() {
    setConfiguration('update', '0');
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick.bind(this),
    );

    const heaters = getConfiguration('modalDetail');
    this.setState({
      heatersArrayyMain: heaters,
      heatersArray: heaters,
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

  onPressSubmitButton = () => {
    if(this.submitButtonPressed == true)
    {
      return;
    }

    this.submitButtonPressed = true;
    setTimeout(() => this.submitButtonPressed = false, 500);



    Keyboard.dismiss();
    if (this.state.modelNumber !== '' && this.state.serialNumber !== '') {
      this.props
        .validateHeater(this.state.modelNumber, this.state.serialNumber)
        .then(() => this.afterCallValidateHeaterAPI())
        .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
    } else if (this.state.modelNumber === '') {
      showAlert('Please enter model number.', 300);
    } else if (this.state.serialNumber === '') {
      showAlert('Please enter serial number.', 300);
    }
  };

  onKeyPress(keyPress) {
    let newString = keyPress;
    if (newString.length == 4) {
      newString += '.';
    } else if (newString.length == 5 || newString.length == 8) {
      newString = newString.substring(0, newString.length - 2);
    } else if (newString.length == 7) {
      newString += '-';
    } else if (newString.length == 15) {
      return;
    }

    if (this.state.serialNumber == newString) {
      newString = newString.substring(0, newString.length - 2);
    }

    this.setState({serialNumber: newString});

    // return;
    // if (keyPress != ' ' && keyPress != 'Backspace') {
    //   // eslint-disable-next-line react/no-access-state-in-setstate
    //   let newSerialNumber = this.state.serialNumber;
    //   newSerialNumber += keyPress;
    //   if (newSerialNumber.length == 4) {
    //     newSerialNumber += '.';
    //   } else if (newSerialNumber.length == 7) {
    //     newSerialNumber += '-';
    //   } else if (newSerialNumber.length > 14) {
    //     return;
    //   }
    //   this.setState({ serialNumber: newSerialNumber });
    // } else if (keyPress == 'Backspace') {
    //   // eslint-disable-next-line react/no-access-state-in-setstate
    //   let newSerialNumber = this.state.serialNumber;
    //   if (newSerialNumber.length == 9) {
    //     newSerialNumber = newSerialNumber.substring(0, newSerialNumber.length - 2);
    //   } else if (newSerialNumber.length == 6) {
    //     newSerialNumber = newSerialNumber.substring(0, newSerialNumber.length - 2);
    //   } else {
    //     newSerialNumber = newSerialNumber.substring(0, newSerialNumber.length - 1);
    //   }

    //   this.setState({ serialNumber: newSerialNumber });
    // } else {
    //   // eslint-disable-next-line react/no-access-state-in-setstate
    //   let newSerialNumber = this.state.serialNumber;
    //   newSerialNumber += keyPress;
    //   this.setState({ serialNumber: newSerialNumber });

    // }
  }

  setHeaterName(heater) {
    this.setState({
      modelNumber: heater.ModelName,
    });

    let data = [...this.state.heatersArrayyMain];
    data = data.filter(item => item.ModelName.includes(heater.ModelName));
    if (data.length > 0) {
      this.setState({heatersArray: data});
    }
    this.hideSuggestionData();
  }

  async afterCallValidateHeaterAPI() {
    var response = this.props.responseValidateHeater.response;
    console.log('validate heater response--', response);

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      // resCode = 401;
      if (resCode == 200) {
        const model_name = await decryptValue(response.model_name);
        const {serialNumber} = this.state;

        const selectedHeaterMax = await decryptValue(response.temperature.MAX);
        const selectedHeaterMin = await decryptValue(response.temperature.MIN);

        setConfiguration('serialNumber', serialNumber);
        setConfiguration('modelNUmber', model_name);
        setConfiguration('heaterID', serialNumber);
        setConfiguration('heaterNameNew', model_name);
        setConfiguration('selectedHeaterMax', selectedHeaterMax);
        setConfiguration('selectedHeaterMin', selectedHeaterMin);

        this.props.navigation.navigate('Tutorial');
      } else if (resCode == 401) {
        const heater_image = await decryptValue(response.image);
        const gas = await decryptValue(response.gas);
        const model_name = await decryptValue(response.model_name);
        const {serialNumber} = this.state;
        const modelNUmber = this.state.modelNumber;
        const heaterName = this.state.modelNumber;

        const selectedHeaterMax = await decryptValue(response.temperature.MAX);
        const selectedHeaterMin = await decryptValue(response.temperature.MIN);

        setConfiguration('serialNumber', serialNumber);
        setConfiguration('modelNUmber', model_name);
        setConfiguration('heaterID', serialNumber);
        setConfiguration('heaterNameNew', model_name);
        setConfiguration('selectedHeaterMax', selectedHeaterMax);
        setConfiguration('selectedHeaterMin', selectedHeaterMin);

        const cheeoseHeaterObj = {
          heater_image,
          gas,
          model_name,
          serialNumber,
          modelNUmber,
          heaterName,
        };
        setConfiguration('cheeoseHeaterObj', cheeoseHeaterObj);
        this.props.navigation.navigate('WarrantyRegistration');
        // this.props.navigation.navigate('Tutorial');
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

  changeModelNumber(modelNumber) {
    this.setState({modelNumber});
    // eslint-disable-next-line no-param-reassign
    modelNumber = modelNumber.trim();

    if (modelNumber !== '') {
      let data = [...this.state.heatersArrayyMain];
      data = data.filter(item => item.ModelName.includes(modelNumber));

      if (data.length > 0) {
        this.setState({heatersArray: data});
        this.showSuggestionData();
      } else {
        this.setState({heatersArray: []});
        this.hideSuggestionData();
      }
    } else {
      this.hideSuggestionData();
    }
  }

  cellPress(item) {
    this.setState({
      modelNumber: item.ModelName,
    });
    this.hideSuggestionData();
  }

  goBack() {
    this.props.navigation.goBack();
  }

  hideSuggestionData() {
    this.setState({showSuggestion: false});
  }

  render() {
    const predictions = this.state.heatersArray.map(heater => (
      <View>
        <View
          style={styles.predBG}
        />
        <TouchableOpacity
          style={styles.containerTxtModelName}
          onPress={() => this.setHeaterName(heater)}>
          <Text
            allowFontScaling={false}
            style={styles.txtModelName}>
            {heater.ModelName}
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
            <View
              style={[
                styles.innerContainer,
                this.props.isBusyValidateHeater && Platform.OS === 'android'
                  ? null
                  : styles.shadow,
              ]}>
              <Text
                allowFontScaling={false}
                style={[
                  styles.txtHeading,
                  {color: getColors().cellTitleColor},
                ]}>
                Enter Data
              </Text>

              <FormField
                refer={instance => {
                  this.modelNumberField = instance;
                }}
                style={styles.fullNameStyle}
                title="Enter Model Number"
                hideTitle
                value={this.state.modelNumber}
                autoCapitalize="characters"
                onPress={() => this.modelNumberField.focus()}
                onChangeText={modelNumber =>
                  this.changeModelNumber(modelNumber)
                }
              />

              <FormField
                refer={instance => {
                  this.serialNumberField = instance;
                }}
                style={styles.fullNameStyle}
                title="Enter Serial Number"
                keyboardType="number-pad"
                hideTitle
                value={this.state.serialNumber}
                onPress={() => this.serialNumberField.focus()}
                onChangeText={keyPress => {
                  this.onKeyPress(keyPress);
                }}
                // onKeyPress={keyPress => {
                //   return;
                //   console.log(
                //     'this.state.serialNumber --',
                //     this.state.serialNumber,
                //   );
                //   if (
                //     (this.state.serialNumber.length == 5 ||
                //       this.state.serialNumber.length == 8) &&
                //     keyPress.nativeEvent.key == 'Backspace'
                //   ) {
                //     let str = this.state.serialNumber;
                //     str = str.substring(0, str.length - 2);
                //     console.log('str --', str);

                //     this.setState({serialNumber: str});
                //   } else if (keyPress.nativeEvent.key != 'Backspace') {
                //     let str =
                //       this.state.serialNumber + keyPress.nativeEvent.key;
                //     this.onKeyPress(str);
                //   } else if (keyPress.nativeEvent.key == 'Backspace') {
                //     let str = this.state.serialNumber;
                //     str = str.substring(0, str.length - 1);
                //     console.log('str --', str);

                //     this.setState({serialNumber: str});
                //   }
                //   console.log('onKeyPress --', keyPress.nativeEvent.key);
                // }}
              />
              <Button
                title="Submit Data"
                onPress={this.onPressSubmitButton}
                textStyle={styles.btnText}
              />

              {this.state.showSuggestion ? (
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  scrollEnabled
                  style={styles.predScrollView}>
                  {predictions}
                </ScrollView>
              ) : null}
            </View>

            <View style={[styles.innerContainer, styles.collectionBG]}>
              <FlatList
                // columnWrapperStyle={{ justifyContent: 'center' }}
                keyboardShouldPersistTaps="handled"
                data={this.state.heatersArray}
                numColumns={2}
                renderItem={({item}) => (
                  <HeaterCell
                    textStyle={styles.btnText}
                    heaterName={item.ModelName}
                    onPress={() => this.cellPress(item)}
                    ModelImage={item.ModelImage}
                  />
                )}
              />
            </View>
            {this.props.isBusyValidateHeater ? <Activity /> : null}
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default EnterModelNumberScreen;
