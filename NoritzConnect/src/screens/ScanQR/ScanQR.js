import React, { Component } from 'react';
import { DarkModeContext } from 'react-native-dark-mode';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { getColors } from '../../services/Color';
import styles from './styles';
import { Header } from '../../components/common';
import { getConfiguration, setConfiguration } from '../../services/configuration';
import { decryptValue, showAlert } from '../../services/Functions';
import Activity from '../../components/ActivityIndicator';

class ScanQRScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serialNumber: '',
      modelNumber: ''
    };
  }

  componentDidMount() {
    setConfiguration('update', '0');
  }

  componentWillUnmount() {
  }

  onSuccess = (e) => {
    const myArray = (e.data).split(',');
    if (myArray.length > 3) {
      let data = getConfiguration('modalDetail');
      data = data.filter((item) => (item.ModelName).includes(myArray[1]));
      if (data.length > 0) {
        this.setState({
          serialNumber: myArray[3],
          modelNumber: data[0].ModelName
        });

        this.props.validateHeater(data[0].ModelName, myArray[3])
          .then(() => this.afterCallValidateHeaterAPI())
          .catch(() => showAlert(e.message, 300));
      }
    }
  }

  activeQR = () => {

  }

  scanAgain = () => {

  }

  async afterCallValidateHeaterAPI() {
    const { response } = this.props.responseValidateHeater;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      var model_name = "";
      var  serialNumber  = "";
        var modelNUmber = "";
        var heaterName = "";
        var selectedHeaterMax = "";
        var selectedHeaterMin = "";
        var resMessage = "";
      if (resCode == 200) {
        resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);

        // var heater_image = await decryptValue(response.image);
        // var gas = await decryptValue(response.gas);
        model_name = await decryptValue(response.model_name);
       serialNumber  = this.state.serialNumber;
       modelNUmber = this.state.modelNumber;
       heaterName = this.state.modelNumber;

       selectedHeaterMax = await decryptValue(response.temperature.MAX);
       selectedHeaterMin = await decryptValue(response.temperature.MIN);

        setConfiguration('serialNumber', serialNumber);
        setConfiguration('modelNUmber', model_name);
        setConfiguration('heaterID', serialNumber);
        setConfiguration('heaterNameNew', model_name);
        setConfiguration('selectedHeaterMax', selectedHeaterMax);
        setConfiguration('selectedHeaterMin', selectedHeaterMin);

        this.props.navigation.goBack();
        this.props.navigation.navigate('Tutorial');
      } else if (resCode == 401) {
        const heater_image = await decryptValue(response.image);
        const gas = await decryptValue(response.gas);
        model_name = await decryptValue(response.model_name);
       serialNumber  = this.state.serialNumber;
        modelNUmber = this.state.modelNumber;
       heaterName = this.state.modelNumber;

        selectedHeaterMax = await decryptValue(response.temperature.MAX);
        selectedHeaterMin = await decryptValue(response.temperature.MIN);

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
          heaterName
        };
        setConfiguration('cheeoseHeaterObj', cheeoseHeaterObj);
        // this.props.navigation.navigate('WarrantyRegistration');
        this.props.navigation.goBack();

        this.props.navigation.navigate('Tutorial');
      } else {
        resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <DarkModeContext.Consumer>
        {() => (
          <SafeAreaView
            style={[
              styles.pageContainer,
              { backgroundColor: getColors().screenBackground },
            ]}
          >
            <Header
              isBack
              nav={this.props.navigation}
              onBackClick={() => this.goBack()}
            />

            <View style={styles.cameraContainer}>
              <QRCodeScanner
                onRead={this.onSuccess}
                flashMode={RNCamera.Constants.FlashMode.auto}
                cameraStyle={{ flex: 1, height: "100%" }}
                topViewStyle={{ flex: 0 }}
                bottomViewStyle={{ flex: 0 }}
                containerStyle={{ flex: 1 }}
                //cameraStyle={{ height: hp('100%'), marginTop: -hp('20%') }}
                showMarker
              // reactivate={true}

              />
            </View>

            {this.props.isBusyValidateHeater ? <Activity /> : null}

          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default ScanQRScreen;
