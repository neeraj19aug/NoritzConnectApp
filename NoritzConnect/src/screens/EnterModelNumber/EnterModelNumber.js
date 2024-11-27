import React, {Component, createRef} from 'react';
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
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {getColors} from '../../services/Color';
import styles from './styles';
import {Header, Button, HeaterCell} from '../../components/common';
import {FormField} from '../../components';
import {getConfiguration, setConfiguration} from '../../services/configuration';
import {decryptValue, showAlert} from '../../services/Functions';
import Activity from '../../components/ActivityIndicator';
import { RNCamera } from 'react-native-camera';
import TextRecognizer from '@react-native-ml-kit/text-recognition';
import RNQRGenerator from 'rn-qr-generator';
import { Image } from 'react-native-animatable';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Assets from '../../services/Assets';
import { isIOS } from '../../services/Utils';

class EnterModelNumberScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    backPressed = 0;
    this.submitButtonPressed = false;


    this.camera = null;
    this.takePicture = this.takePicture.bind(this);


    this.state = {
      modelNumber: '', // 'N-0631S',
      serialNumber: '', // '2020.09-000002',
      heatersArray: [],
      heatersArrayyMain: [],
      showSuggestion: false,
      InputField1: '',
      InputField2: '',
      InputField3: '',
      FieldPattern2: '',
      heaterType: 1,
      ocrResult: '',
      isCameraVisible: false,
      loading: false,
      serialNumberFormat: "",
      loading:false,
      flashMode:'no',
      FocusedTextInput:null,
      selectionInputField2: { start: 0, end: 0 },
      beforeCursorInputField2: '',
      afterCursorInputField2: '',

      selectionInputField3: { start: 0, end: 0 },
      beforeCursorInputField3: null,
      afterCursorInputField3: '',

     
    };

      this.InputField1Ref = createRef();
        this.InputField2Ref = createRef();
    this.InputField3Ref = createRef();
    this.cameraRef = createRef();

  }

//   handleFieldValueChange = (text, index) => {
//     if (index === 1) {
//         this.setState({ InputField1: text }, () => {
//             if (text.length === 4) this.InputField2Ref.current.focus();
//         });
//     } else if (index === 2) {
//         this.setState({ InputField2: text }, () => {
//             if (text.length === 2) this.InputField3Ref.current.focus();
//             else if (text.length === 0) this.InputField1Ref.current.focus();
//         });
//     } else if (index === 3) {
//         this.setState({ InputField3: text }, () => {
//             if (text.length === 0) this.InputField2Ref.current.focus();
//         });
//     }
// };


updateCursorValues2 = (text, selectionInputField2) => {
  const { start } = selectionInputField2;
  this.setState({
    beforeCursorInputField2:start,
   // afterCursorInputField2: text.substring(start),
  });
  
 
  //  console.log("afterCursor++++++++",this.state. afterCursorInputField2)
  //  console.log("beforeCursor++++++++",this.state.beforeCursorInputField2)
    


  
};


updateCursorValues3 = (ext, selectionInputField3) => {
  const { start } = selectionInputField3;
  console.log('startstartstartstartstart-------',start)
  this.setState({
    beforeCursorInputField3: start,
  
  }, () => {
    console.log("beforeCursor++++++++------------",typeof(this.state.beforeCursorInputField3))

  });
  

   // console.log("afterCursor++++++++",this.state.afterCursorInputField3)
    
 
 
   
    


  
};




handleFieldValueChange = (text, index) => {
  if (index === 1) {
      if(text.length <= 4){ 
        this.setState({ InputField1: text }, () => {

          if (text.length === 4) this.InputField2Ref.current.focus();
      });
     

      }
      // else{
      //   this.InputField2Ref.current.focus();
        
      // }
    
  } else if (index === 2) {
    if(text.length <= 2){

      this.setState({ InputField2: text }, () => {
        this.updateCursorValues2(text, this.state.selectionInputField2);

        if (text.length === 2) this.InputField3Ref.current.focus();
        else if (text.length === 0) this.InputField1Ref.current.focus();
    });


     }
    //  else{
    // //  this.InputField3Ref.current.focus();
    //  }
     
  } else if (index === 3) {
      this.setState({ InputField3: text }, () => {
        this.updateCursorValues3(text, this.state.selectionInputField3);

          if (text.length === 0) this.InputField2Ref.current.focus();
      });
  }
};




handleFieldPattern2Change = (text) => {
    this.setState({ FieldPattern2: text });
};

  componentDidMount() {
    setConfiguration('update', '0');
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick.bind(this),
    );

    const heaters = getConfiguration('modalDetail');
    console.log('heatersheatersheatersheatersheatersheaters-------',heaters)
    this.setState({
      heatersArrayyMain: heaters,
      heatersArray: heaters,
      
      // heatersArrayyMain: this.state.TEMP_DATA,
      // heatersArray: this.state.TEMP_DATA,

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
    // if (this.state.modelNumber !== '' && this.state.serialNumber !== '') {
    //   this.props
    //     .validateHeater(this.state.modelNumber, this.state.serialNumber)
    //     .then(() => this.afterCallValidateHeaterAPI())
    //     .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
    // } else if (this.state.modelNumber === '') {
    //   showAlert('Please enter model number.', 300);
    // } else if (this.state.serialNumber === '') {
    //   showAlert('Please enter serial number.', 300);
    // }



    if (this.state.modelNumber !== '') {
      if (this.state.serialNumberFormat !== '' && this.state.serialNumberFormat == 1) {
        if (this.state.InputField1.length < 4 || this.state.InputField2.length < 2 || this.state.InputField3.length < 6) {
          showAlert('Please enter a valid serial number.', 300);
        } else {
          const completeNumber = this.state.InputField1 + '.' + this.state.InputField2 + '-' + this.state.InputField3;
          this.setState({serialNumber : completeNumber})
          console.log('completeNumber--------',completeNumber)
          this.props
              .validateHeater(this.state.modelNumber, completeNumber)
              .then(() => this.afterCallValidateHeaterAPI())
              .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
        }
        
        
      } else if (this.state.serialNumberFormat !== '' && this.state.serialNumberFormat == 2) {
        if (this.state.FieldPattern2.length < 9) {
          showAlert('Please enter a valid serial number.', 300);
        } else {
          const completeNumber = this.state.FieldPattern2;
          this.setState({serialNumber : completeNumber})
          console.log('completeNumber--------',completeNumber)

          this.props
          .validateHeater(this.state.modelNumber, completeNumber)
          .then(() => this.afterCallValidateHeaterAPI())
          .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
        }
        

      }
      
    } else {
      showAlert('Please enter model number.', 300);
    }

  };


  checkingProceed = () => {
    if (this.state.modelNumber !== '') {
      this.setState({ isCameraVisible: true })

    } else {
      showAlert("Please select model number.")
    }
  }
  




  onKeyPressX =({ nativeEvent: { key: keyValue } }) => {
    console.log('External keypress------',keyValue)

    setTimeout(() => {




    if(this.state.InputField2.length == 0 && keyValue == 'Backspace' &&  this.state.FocusedTextInput == 2){
      console.log(' if(this.state.InputField2.length == 0 && keyValue == Backspace &&  this.state.FocusedTextInput == 2)============1')
      this.InputField1Ref.current.focus();
      
    }
    else if(this.state.InputField3.length == 0 && keyValue == 'Backspace'  && this.state.FocusedTextInput == 3 ){
      console.log('else if(this.state.InputField3.length == 0 && keyValue == Backspace  && this.state.FocusedTextInput == 3 ) =============2')
      this.InputField2Ref.current.focus();
      
    }
    else if (this.state.FocusedTextInput == 2 && this.state.InputField2.length == 2 &&  keyValue !==  'Backspace' ){
      this.InputField3Ref.current.focus();
      console.log(' else if (this.state.FocusedTextInput == 2 && this.state.InputField2.length == 2 &&  keyValue !==  Backspace )===============3')
      if(this.state.InputField3.length < 6){
        console.log('this.state.InputField3.length < 6====================4')
        this.state.InputField3 = this.state.InputField3 + keyValue;


      }
    }
    else if (this.state.FocusedTextInput == 1 && this.state.InputField1.length == 4 && keyValue !==  'Backspace'){
      console.log(' else if (this.state.FocusedTextInput == 1 && this.state.InputField1.length == 4 && keyValue !==  Backspace)===============5')

      this.InputField2Ref.current.focus();
      if( this.state.InputField2.length < 2){
        console.log('this.state.InputField2.length < 2===================6')
        this.state.InputField2 = this.state.InputField2 + keyValue;
        this.InputField2Ref.current.focus();

      }
      else if ( this.state.InputField3.length < 6){
        console.log('this.state.InputField3.length < 6==================7')
        this.state.InputField3 = this.state.InputField3 + keyValue;
        this.InputField3Ref.current.focus();

      }

    } 
    else if (this.state.FocusedTextInput == 2 && this.state.beforeCursorInputField2 == 0 && this.state.InputField2.length != 0){
      this.InputField1Ref.current.focus();

      console.log('this.state.FocusedTextInput == 2 && this.state.beforeCursorInputField2.length == 0 && this.state.InputField2.length != 0==================8')
      
    }
    else if (this.state.FocusedTextInput == 3){
      if( this.state.beforeCursorInputField3 == 0 && this.state.InputField3.length != 0)
        {
          this.InputField2Ref.current.focus();
          console.log("beforeCursor++++++++------------",this.state.beforeCursorInputField3)
          console.log('this.state.FocusedTextInput == 3 && this.state.beforeCursorInputField3.length == 0 && this.state.InputField3.length != 0 ============9')
        }

    }
      
    }, 200);

      
  }








  // onKeyPressX = ({ nativeEvent: { key: keyValue } }) => {
  //   console.log('External keypress------', keyValue);
  
  //   const { InputField1, InputField2, InputField3, FocusedTextInput, beforeCursorInputField2, beforeCursorInputField3 } = this.state;
  
  //   if (InputField2.length === 0 && keyValue === 'Backspace' && FocusedTextInput === 2) {
  //     console.log('Condition 1');
  //     this.InputField1Ref.current.focus();
  //   } else if (InputField3.length === 0 && keyValue === 'Backspace' && FocusedTextInput === 3) {
  //     console.log('Condition 2');
  //     this.InputField2Ref.current.focus();
  //   } else if (FocusedTextInput === 2 && InputField2.length === 2 && keyValue !== 'Backspace') {
  //     console.log('Condition 3');
  //     this.InputField3Ref.current.focus();
  //     if (InputField3.length < 6) {
  //       this.setState({ InputField3: InputField3 + keyValue });
  //     }
  //   } else if (FocusedTextInput === 1 && InputField1.length === 4 && keyValue !== 'Backspace') {
  //     console.log('Condition 4');
  //     this.InputField2Ref.current.focus();
  //     if (InputField2.length < 2) {
  //       this.setState({ InputField2: InputField2 + keyValue });
  //     } else if (InputField3.length < 6) {
  //       this.setState({ InputField3: InputField3 + keyValue });
  //     }
  //   } else if (FocusedTextInput === 2 && beforeCursorInputField2.length === 1 && InputField2.length !== 0) {
  //     console.log('Condition 5');
  //     this.InputField1Ref.current.focus();
  //   } else if (FocusedTextInput === 3 && beforeCursorInputField3.length === 1 && InputField3.length !== 0) {
  //     console.log('Condition 6');
  //     this.InputField2Ref.current.focus();
  //   }
  // }
  











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


    if(heater.ModelName !== this.state.modelNumber){

      this.setState({
        InputField1: '',
        InputField2 :'',
        InputField3 :'',
        FieldPattern2 :''
        
      });
      // if(heater.serialNumberFormat == '1'){
      // setTimeout(() => {
      //   this.InputField1Ref.current.focus();

      // }, 500);
      // }
    }
   



    this.setState({
      modelNumber: heater.ModelName,
      serialNumberFormat :heater.serialNumberFormat,
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
        const  serialNumberFormat = this.state.serialNumberFormat;

        const selectedHeaterMax = await decryptValue(response.temperature.MAX);
        const selectedHeaterMin = await decryptValue(response.temperature.MIN);

        setConfiguration('serialNumber', serialNumber);
        setConfiguration('modelNUmber', model_name);
        setConfiguration('heaterID', serialNumber);
        setConfiguration('heaterNameNew', model_name);
        setConfiguration('selectedHeaterMax', selectedHeaterMax);
        setConfiguration('selectedHeaterMin', selectedHeaterMin);
      //  setConfiguration('serialNumberFormat',serialNumberFormat)

        const cheeoseHeaterObj = {
          heater_image,
          gas,
          model_name,
          serialNumber,
          modelNUmber,
          heaterName,
          serialNumberFormat
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
    if(item.ModelName !== this.state.modelNumber){

      this.setState({
        InputField1: '',
        InputField2 :'',
        InputField3 :'',
        FieldPattern2 :''
        
      });
      // if(item.serialNumberFormat == '1'){
      //   setTimeout(() => {
      //     this.InputField1Ref.current.focus();
  
      //   }, 500);

      // }


    }
   


    this.setState({
      modelNumber: item.ModelName,
      serialNumberFormat:item.serialNumberFormat,
    });
    this.hideSuggestionData();
  }

  handleFocus = (inputNumber) => {
    this.setState({ FocusedTextInput:inputNumber});
  };


  goBack() {
    this.props.navigation.goBack();
  }

  hideSuggestionData() {
    this.setState({showSuggestion: false});
  }

  renderPlaceholder = () => {
    const { InputField1, InputField2, InputField3 } = this.state;
    if (!InputField1 && !InputField2 && !InputField3) {
        return (
            <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>Enter Serial Number</Text>
            </View>
        );
    }
    return null;
  };


//   async handleImageCapture() { 
//     if (this.cameraRef.current) {
//         const options = { quality: 0.5, base64: true };
//        // this.setState({ loading: true });
//         const data = await this.cameraRef.current.takePictureAsync(options);
//         const source = { uri: data.uri };
//         this.setState({ isCameraVisible: false });
//        // this.performOCR(source.uri);
//     }
  // };
  




  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.setState({ isCameraVisible: false });
     // this.setState({loading:true})
      this.performOCR(data.uri);

    }
  }



  async performOCR(uri) {
    try {
        this.setState({ loading: true });
        const visionResponse = await TextRecognizer.recognize(uri);
        console.log('Recognized Text:', visionResponse.text);
        this.setState({ ocrResult: visionResponse.text });

        if (this.state.serialNumberFormat === '1') {
            const match = visionResponse.text.match(/\b\d{4}\.\s?\d{2}\s?-\s?[a-zA-Z0-9]{6}\b/);
            if (match) {
                const recognizedText = match[0].replace(/[^a-zA-Z0-9]/g, '');
                console.log('recognizedText OCR----', recognizedText);

                if (recognizedText.length === 12) {
                    this.setState({
                      InputField1: recognizedText.slice(0, 4),
                      InputField2: recognizedText.slice(4, 6),
                      InputField3: recognizedText.slice(6, 12),
                      loading: false,
                    });
                } else {
                    this.handleQRCodeDetection(uri);
                }
            } else {
                this.handleQRCodeDetection(uri);
            }
        } else {
            const matches = visionResponse.text.match(/\b\d{9}\b/g);

            if (matches) {
                this.setState({ FieldPattern2: matches[0] });
                this.setState({ loading: false });
            } else {
                this.setState({ loading: false });
                console.log("Pattern not found");
               // Alert.alert('No Result found', 'Please try again');
               showAlert('Unable to recognize the serial number. Please try again.')
            }
        }
    } catch (e) {
        console.error('Error recognizing text:', e);
        showAlert('Unable to recognize the serial number. Please try again.')
        this.setState({ loading: false });
    }
  };


  handleSelectionChange2 = ({ nativeEvent: { selection } }) => {
    this.setState({ selectionInputField2: selection }, () => {
      this.updateCursorValues2(this.state.InputField2, selection);
    });
  };
  handleSelectionChange3 = ({ nativeEvent: { selection } }) => {
    this.setState({ selectionInputField3: selection }, () => {
      this.updateCursorValues3(this.state.InputField3, selection);
    });
  }; 



  FlashManage = () => {

    console.log('flash@@@@@@@@@@@@',this.state.flashMode)

    if(this.state.flashMode === 'on'){
      this.setState({flashMode:'off'})

    }else{
      this.setState({flashMode:'on'})
    }




  }

  handleQRCodeDetection = (uri) => {
    console.log('QR DETECTION');
    RNQRGenerator.detect({ uri })
        .then(response => {
            const { values } = response;
            const match = values && values.length > 0 && values[0].match(/\b\d{4}\.\s?\d{2}\s?-\s?[a-zA-Z0-9]{6}\b/);

            if (match) {
                const recognizedText = match[0].replace(/[^a-zA-Z0-9]/g, '');
                console.log('recognizedText QR-----', recognizedText);
                if (recognizedText.length === 12) {
                    this.setState({
                      InputField1: recognizedText.slice(0, 4),
                      InputField2: recognizedText.slice(4, 6),
                      InputField3: recognizedText.slice(6, 12),
                      loading: false,
                    });
                 // showAlert('qr scanned')
                } else {
                    console.log("Unexpected length of recognized text:", recognizedText.length);
                   // Alert.alert('Invalid OCR result', 'The recognized text does not match the expected format.');
                    this.setState({ loading: false });
                    showAlert('Unable to recognize the serial number. Please try again.')
                }
            } else {
                this.setState({ loading: false });
                showAlert('Unable to recognize the serial number. Please try again.')
                console.log("Pattern not found");
             //   Alert.alert('No Result found', 'Please try again');
            }
        })
        .catch(error => console.log('Cannot detect QR code in image', error));
};
  




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

    const { InputField1, InputField2, InputField3, FieldPattern2, heaterType, isCameraVisible, loading } = this.state;
    return (
      <DarkModeContext.Consumer>
        {() => (

isCameraVisible ?
          
(




  




<RNCamera
          ref={ref => {
            this.camera = ref;
          }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              captureAudio={false}
              flashMode= {this.state.flashMode}
          >
              <View style={styles.captureContainer}>



              <TouchableOpacity onPress={this.FlashManage}>
                  {
                    this.state.flashMode === 'on' ? <Image source={require('../../assets/image/flashOn.png')}  style={styles.flashImg}></Image> : <Image source={require('../../assets/image/flashOff.png')} style={styles.flashImg}></Image>
                  }

  </TouchableOpacity>
            



                  <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
                      <Text style={styles.captureText}> Capture </Text>
                  </TouchableOpacity>



                  <TouchableOpacity  onPress={()=>  this.setState({ isCameraVisible: false })}>
              <Image source={require('../../assets/image/Ximage.png')} style={styles.XImg}>

              </Image>
              </TouchableOpacity>

                
              </View>
          </RNCamera>
  

       
 
  
      
        
      )
          
        :  ( <SafeAreaView
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

             
              
              { this.state.serialNumberFormat === "1" || this.state.serialNumberFormat === "" ? (
                <>
                  <View style={styles.outerMain}>
                    <View style={styles.main}>
                    {this.renderPlaceholder()}
                      <View style={styles.inputContainer}>
                        <View style={styles.box1}>
                         <TextInput
                         allowFontScaling={false}
                             ref={this.InputField1Ref}
                             value={InputField1}
                             onChangeText={(text) => this.handleFieldValueChange(text, 1)}
                            maxLength={4}
                             keyboardType={ isIOS ?'numbers-and-punctuation' : 'visible-password'}
                            autoCorrect={false}
                              autoCapitalize="characters"
                            spellCheck={false}
                             onFocus={() => this.handleFocus(1)}
                             // secureTextEntry={true}
                             style={[styles.input,{ textAlign: 'center',}]}
                             onKeyPress={this.onKeyPressX}
                         />
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                         <Text style={styles.separatorDot}>.</Text>
                        </View>
                        <View style={styles.box2}>
                         <TextInput
                         allowFontScaling={false}
                             ref={this.InputField2Ref}
                             onFocus={() => this.handleFocus(2)}
                             onSelectionChange={this.handleSelectionChange2}


                             value={InputField2}
                             onChangeText={(text) => this.handleFieldValueChange(text, 2)}
                            maxLength={2}
                           onKeyPress={this.onKeyPressX}
                             keyboardType={ isIOS ?'numbers-and-punctuation' : 'visible-password'}
                            autoCorrect={false}
                              autoCapitalize="characters"
                            spellCheck={false}
                            style={[styles.input, { textAlign: 'center',}]}
                         />
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                         <Text style={styles.separator}>-</Text>
                        </View>
                        <View style={styles.box3}>
                         <TextInput
                         allowFontScaling={false}
                             ref={this.InputField3Ref}
                             value={InputField3}
                             onChangeText={(text) => this.handleFieldValueChange(text, 3)}
                             onFocus={() => this.handleFocus(3)}
                              onSelectionChange={this.handleSelectionChange3}
                              autoCorrect={false}
                              keyboardType={ isIOS ?'default' : 'visible-password'}
                              autoCapitalize="characters"
                            spellCheck={false}
                             maxLength={6}
                             onKeyPress={this.onKeyPressX}
                            style={[styles.input, { textAlign: 'center', }]}
                           
                         />
                        </View>
                      </View>
                    </View>

                    {loading ?
                      <View style={styles.loadingIndicator}>
                       <ActivityIndicator size="large" color="red" />
                       </View>
                       :
                      <TouchableOpacity onPress={this.checkingProceed}>
                      <View style={styles.ScanImg}>
                      <Image source={Assets.ScanImg} style={{ width: wp('11%'),
                        height: wp('11%'),}}></Image>
                      </View>
                    </TouchableOpacity>}
                  </View>
              </>





                        ) : (
                  <View style={styles.boxLarge}>
                      <View style={styles.innerLargeBox}>
                                <TextInput
                                    value={FieldPattern2}
                                    maxLength={9}
                                    style={[styles.input]}
                                    onChangeText={this.handleFieldPattern2Change}
                        placeholder='Enter Serial Number'
                        placeholderTextColor={'#9B9B9B'}
                        keyboardType='numeric'/>
                    
                    </View>
                    <View>
                      { loading ? 
                        <View style={styles.loadingIndicator1}>
                        <ActivityIndicator size="large" color="red" />
                        </View> :
                        
                        
                        
                        <TouchableOpacity onPress={this.checkingProceed}>
                      
                        <View style={styles.ScanImg1}>
                            <Image source={Assets.ScanImg} style={{ width: wp('11%'),
                            height: wp('11%'),}} ></Image>
                        </View>
            </TouchableOpacity>}
                      </View>

                    
                  </View>
                        )}



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
          </SafeAreaView>)
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default EnterModelNumberScreen;
