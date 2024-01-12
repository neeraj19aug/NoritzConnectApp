import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import call from 'react-native-phone-call';
import {
  Text,
  View,
  Image,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import {getColors} from '../../services/Color';
import Assets from '../../services/Assets';
import styles from './styles';
import {Header} from '../../components/common';
import {getConfiguration} from '../../services/configuration';
import {decryptValue, showAlert} from '../../services/Functions';
import Activity from '../../components/ActivityIndicator';

class Accordion extends Component {
  constructor() {
    super();

    this.state = {
      modifiedHeight: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.expanded) {
      this.setState(() => ({
        modifiedHeight: null,
      }));
    } else {
      this.setState(() => ({
        modifiedHeight: 0,
      }));
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.item.expanded !== this.props.item.expanded) {
      return true;
    }
    return false;
  }

  callNoritz(number) {
    const args = {number, prompt: false};
    call(args).catch();
  }

  render() {
    return (
      <View style={styles.btnTextHolder}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClick}
          style={[styles.cellView]}>
          <View style={styles.cellInnerLeftView}>
            <Image
              resizeMode="contain"
              source={Assets.status}
              style={styles.cellIcon}
            />
            <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />
            <Text
              allowFontScaling={false}
              style={[
                styles.txtSetTemperatureControl,
                {
                  color: this.props.item.expanded
                    ? getColors().redColor
                    : getColors().cellTitleColor,
                },
              ]}>
              {this.props.item.Title}
            </Text>
          </View>

          <View style={styles.cellInnerRightView}>
            <Image
              resizeMode="contain"
              source={Assets.drop_icon}
              style={styles.dropIcon}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: this.state.modifiedHeight,
            overflow: 'hidden',
            backgroundColor: getColors().whiteColor,
          }}>
          <Text allowFontScaling={false} style={styles.cellContent}>
            {this.props.item.Description}
          </Text>
          <TouchableOpacity
            onPress={() => this.callNoritz(this.props.item.Number)}
            style={[styles.callBtn, {backgroundColor: getColors().redColor}]}>
            <Text allowFontScaling={false} style={styles.btnText}>
              Call Noritz
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class ErrorInfoScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    backPressed = 0;

    this.state = {AccordionData: []};
  }

  componentDidMount() {
    this.setState({
      AccordionData: [],
    });

    this.callGetErrorInfoAPI();
  }

  componentWillUnmount() {}

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

  callGetErrorInfoAPI() {

    console.log('error info thingName---', getConfiguration('thingName'));
    console.log('error info user_id---', getConfiguration('user_id'));
    console.log('error info WH01 ---', getConfiguration('WH01'));
    console.log('error info device_token---', getConfiguration('device_token'));
    

    this.props
      .getErrorInfo(
        getConfiguration('thingName'),
        getConfiguration('user_id'),
        getConfiguration('WH01'),
        getConfiguration('device_token'),
      )
      .then(() => this.afterGetErrorInfoAPI())
      .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
  }

  async afterGetErrorInfoAPI() {
    const {response} = this.props.responseErrorInfo;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);

      console.log('error info resCode---', resCode);

      if (resCode == 200) {
        const {error_codes} = response.iot_response;
        const errorInfoArray = [];

        for (let i = 0; i < error_codes.length; i += 1) {
          const obj = error_codes[i];
          const objErrorInfo = {
            Call: await decryptValue(obj.Call),
            Description: await decryptValue(obj.Description),
            Number: await decryptValue(obj.Number),
            Title: await decryptValue(obj.Title),
            Value: await decryptValue(obj.Value),
          };
          errorInfoArray.push(objErrorInfo);
        }

        this.setState({
          AccordionData: errorInfoArray,
        });
      } else {
        let resMessage = response.responseMessage;
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
              {backgroundColor: getColors().screenBackground},
            ]}>
            <Header
              isBack
              nav={this.props.navigation}
              onBackClick={() => this.goBack()}
            />
            <View style={[styles.innerContainer]}>
              <ScrollView
                contentContainerStyle={styles.scrollViewContainerStyle}>
                {this.state.AccordionData.map((item, key) => (
                  <Accordion
                    key={key}
                    onClick={this.changeLayout.bind(this, key)}
                    item={item}
                  />
                ))}
              </ScrollView>
            </View>

            {this.props.isBusyErrorInfo ? <Activity /> : null}
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default ErrorInfoScreen;
