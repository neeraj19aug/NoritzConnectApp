import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Text,
  View,
  BackHandler,
  LayoutAnimation,
  Platform,
  Image,
  ScrollView,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import {getColors} from '../../services/Color';
import styles from './styles';
import {Header, SwitchView} from '../../components/common';
import Assets from '../../services/Assets';
import {getConfiguration} from '../../services/configuration';
import {decryptValue, showAlert} from '../../services/Functions';
import Strings from '../../services/Strings';
import Fonts from '../../services/Fonts';
import {Button} from '../../components/common';


class TimeZoneScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      dayLightSaving: false,
      selectedTimeZone: '',
      statusData: [
        {
          icon: Assets.status,
          title: 'Pacific Standard Time',
          value: 'PST',
        },
        {
          icon: Assets.status,
          title: 'Newfoundland Standard Time',
          value: 'NST',
        },
        {
          icon: Assets.status,
          title: 'Atlantic Standard Time',
          value: 'AST',
        },
        {
          icon: Assets.status,
          title: 'Eastern Standard Time',
          value: 'EST',
        },
        {
          icon: Assets.status,
          title: 'Central Standard Time',
          value: 'CST',
        },
        {
          icon: Assets.status,
          title: 'Mountain Standard Time',
          value: 'MST',
        },
        {
          icon: Assets.status,
          title: 'Alaska Standard Time',
          value: 'AKST',
        },
        {
          icon: Assets.status,
          title: 'Hawaii-Aleutian Standard Time',
          value: 'HAST',
        },

        
      ],
    };
  }

  componentDidMount() {
    this.callGetTimeZoneAPI();
    var selTimeZone = getConfiguration('selTimeZone');
    var enable_dst = getConfiguration('enable_dst');
    this.setState({
      selectedTimeZone : selTimeZone,
      dayLightSaving: enable_dst
      });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick.bind(this),
    );
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

  callGetTimeZoneAPI() {
    this.props
      .getTimeZone(getConfiguration('thingName'))
      .then(() => this.afterCallGetTimeZoneAPI())
      .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
  }

  async afterCallGetTimeZoneAPI() {
    const {response} = this.props.responseGetTimeZone;
    console.log('afterCallGetTimeZoneAPI', response);
    // if (response != null) {
    //   let resCode = response.responseCode;
    //   resCode = await decryptValue(resCode);
    //   if (resCode == 200) {
    //     let resMessage = response.responseMessage;
    //     resMessage = await decryptValue(resMessage);
    //     showAlert(resMessage, 300);
    //   } else {
    //     let resMessage = response.responseMessage;
    //     resMessage = await decryptValue(resMessage);
    //     showAlert(resMessage, 300);
    //   }
    // }
  }

  callSetTimeZoneAPI(TimeZoneID, dayLightSaving) {
    const inThing = getConfiguration('thingName');
    const inTimeZoneID = TimeZoneID;
    const inEnableDST = dayLightSaving ? 'true' : 'false';

    console.log('inThing', inThing);
        console.log('inTimeZoneID', inTimeZoneID);
    console.log('inEnableDST', inEnableDST);



    this.props
      .setTimeZone(inThing, inTimeZoneID, inEnableDST)
      .then(() => this.afterCallSetTimeZoneAPI(TimeZoneID, dayLightSaving))
      .catch(e => showAlert('It seems something went wrong on the server. Please try after some time.', 300));
  }

  async afterCallSetTimeZoneAPI(TimeZoneID, dayLightSaving) {
    const {response} = this.props.responseSetTimeZone;
    console.log('afterCallSetTimeZoneAPI', response);
    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        this.setState({
          selectedTimeZone: TimeZoneID,
          dayLightSaving,
        });

        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  goBack() {
    this.props.navigation.navigate('Home');
  }

  onPressSaveButton = () => {
    this.callSetTimeZoneAPI(
                    this.state.selectedTimeZone,
                    this.state.dayLightSaving,
                  );
  }

  render() {
    const statusTable = this.state.statusData.map(data => (
      <TouchableOpacity
        style={[styles.cellView]}
        onPress={() => {
          this.setState({
          selectedTimeZone: data.value,
        });
          //this.callSetTimeZoneAPI(data.title, this.state.dayLightSaving);
        }}>
        <View style={styles.cellInnerLeftView}>
          <Text
            allowFontScaling={false}
            style={[
              styles.txtSetTemperatureControl,
              {
                fontFamily:
                  this.state.selectedTimeZone == data.value
                    ? Fonts.oxygenBold
                    : Fonts.oxygenRegular,
                color: this.state.selectedTimeZone == data.value
                    ? getColors().redColor
                    : getColors().txtBlackColor
              },
            ]}>
            {data.value}
          </Text>

          <View style={[styles.tabBarSeperator, {marginLeft: 20, backgroundColor: 'transparent'}]} />
          <Text
            allowFontScaling={false}
            style={[
              styles.txtSetTemperatureControl,
              {
                
                fontFamily:
                  this.state.selectedTimeZone == data.value
                    ? Fonts.oxygenBold
                    : Fonts.oxygenRegular,
                color: this.state.selectedTimeZone == data.value
                    ? getColors().redColor
                    : getColors().txtBlackColor
              },
            ]}
            adjustsFontSizeToFit
            numberOfLines={1}>
            {data.title}
          </Text>
        </View>

        <View style={[styles.cellInnerRightView]}>
        <Image
            resizeMode="contain"
            source={this.state.selectedTimeZone == data.value ? Assets.red_check : Assets.grey_check}
            style={styles.cellIcon}
          />
                  </View>
      </TouchableOpacity>
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
            <View style={[styles.pageContainer, {backgroundColor: getColors().timeZoneBGColor}]}>
            
              <View style={[styles.innerContainer]}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.txtHeading,
                    {color: getColors().cellTitleColor},
                  ]}>
                  {Strings.txtSelectTimezone}
                </Text>

                <ScrollView
                  style={{
                    width: '100%',
                    height: 'auto',
                    marginTop: 10
                  }}>
                  {statusTable}
                </ScrollView>
              </View>

              <SwitchView
                // source={Assets.recirculationIcon}
                recirculationPower={this.state.dayLightSaving}
                title={Strings.txtDayLightSave}
                value={this.state.dayLightSaving}
                onPress={value => {
                  console.log(value);
                  this.setState({dayLightSaving : value});
                  // this.callSetTimeZoneAPI(
                  //   this.state.selectedTimeZone,
                  //   !this.state.dayLightSaving,
                  // );
                }}
              />

              <Button
              title={'Save'}
              textStyle={styles.btnText}
               onPress={this.onPressSaveButton}
              containerStyle={styles.btnSignInStyle}
              />

            </View>
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default TimeZoneScreen;
