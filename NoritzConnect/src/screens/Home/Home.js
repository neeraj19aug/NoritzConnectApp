import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  Switch,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {AreaChart, Grid, YAxis, XAxis} from 'react-native-svg-charts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Slider from 'react-native-slider';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as Animatable from 'react-native-animatable';
import NetInfo from '@react-native-community/netinfo';
import {MaterialIndicator} from 'react-native-indicators';
import {PickerView} from '../../components';
import {Button, Header, SwitchView} from '../../components/common';
import {getColors} from '../../services/Color';
import Assets from '../../services/Assets';
import styles from './styles';
import {DecoratorRed} from '../../services/graphDecorator';
import Fonts from '../../services/Fonts';
import {setConfiguration, getConfiguration} from '../../services/configuration';
import {decryptValue, showAlert} from '../../services/Functions';
import Activity from '../../components/ActivityIndicator';
import {FormField} from '../../components';
import {md5} from '../../services/Functions';
import {TimePickerView} from '../../components';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Strings from '../../services/Strings';
import Moment from 'moment';

class HomeScreen extends Component {
  HomeScreen = Animatable.createAnimatableComponent(HomeScreen);
  handleViewRef = (ref) => (this.view = ref);

  bounceRight = () =>
    this.view
      .bounceInRight(1000)
      .then((endState) =>
        console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'),
      );

  bounceLeft = () =>
    this.view
      .bounceInLeft(1000)
      .then((endState) =>
        console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'),
      );

  constructor(props) {
    super(props);
    this.backPressed = 0;
    this.homeScreenActive = false;
    this.isAddSlot = false;
    this.instantReserveTiming = [
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
    ];

    // Show support button
    props.navigation.setOptions({
      // headerRight: this.supportButton,
    });
    // Set default values of STATE & Variables

    this.showTempErrorMessage = true;
    this.ondemandInterval = null;
    this.state = {
      heaterType: 0,
      isRefreshDone: false,
      ondemandValue: 0,
      ondemandSelMinutes: 0,
      is_recirculation_compatible: 0,
      isShowOndemandRuntimePopup: false,
      video_link: '',
      video_mode: '',
      cross_over: 0,
      enable_dst: '',
      maintainenceRunning: false,
      counter: 30,
      ondemandCounterStart: false,
      ondemandDifference: 0,
      ondemandHours: 0,
      ondemandMinutes: 0,
      ondemandSeconds: 0,

      recircIconShow: false,
      recirculation_description: '',
      mode: 0,
      slots: [],
      heaterCompatible: false,
      symbol_name: '',
      auto_toggle_state: 0,
      auto_toggle_value: 0,
      ondemand_toggle_state: 0,
      ondemand_toggle_value: 0,
      ondemand_running: false,
      ondemand_start_time: '',
      ondemand_duration: 0,
      isRefreshHit: false,
      recirc_toggle_state: 0,
      recirc_toggle_value: 0,
      timer_scale_state: 0,
      sel_timezone: '',
      timer_section: 0,
      isShowStatusUnit: true,
      selectedHours: 0,
      selectedMinutes: 0,
      isVisibleTemperaturePopup: false,
      isVisibleTemperaturePassword: false,
      isVisibleOnSetTimePassword: false,
      isVisibleOffSetTimePassword: false,
      showUnitsPickerView: false,
      unitsArray: [{value: 'Unit #1', label: 'Unit #1'}],
      setPassword: false,
      selectedTabIndex: 0,
      power: false,
      pickerStartDate: '',
      recirculationPower: false,
      preHeatPower: false,
      recirculationTimer: false,
      onDemandPower: false,
      openSettings: false,
      bubbleLeftVal: '0%',
      showTempBubble: false,
      showHeatBubble: false,
      tabViewFlag: 0,
      showEventsPickerView: false,
      showTimePickerView: false,
      enterPassword: '',
      userConnectedHeaters: [],
      heaterName: '',
      thingName: '',
      heater_image: '',
      MRC: '',
      CanadaBit: '',
      WH01: '',
      Temp_block: [],
      sliderKey: 0,
      popupViewText: '',
      txtHeaterStatus: 'Not Connected',
      currentTemperature: '--',
      sliderTemp: '',
      macAddress: '',
      maxValue: 120,
      onSetTimeStart: '',
      onSetTimeEnd: '',
      onStart: '',
      onEnd: '',
      offSetTimeStart: '',
      offSetTimeEnd: '',
      valueInCelcius: false,
      crossoverModeValue: true,
      statusData: [
        {
          icon: Assets.status,
          title: Strings.txtStatus,
          value: Strings.txtConnected,
        },
        {
          icon: Assets.errrorInfo,
          title: Strings.txtErrorInfo,
          value: '',
        },
        {
          icon: Assets.ststusBurnIcon,
          title: Strings.txtBurnTime,
          value: '',
        },
        {
          icon: Assets.pluginTime,
          title: Strings.txtPluginTime,
          value: '',
        },
        {
          icon: Assets.BurnTime,
          title: Strings.txtIgnitionTime,
          value: '',
        },
        {
          icon: Assets.total_usage_icon,
          title: Strings.txtTotalGasUsage,
          value: '',
        },
        {
          icon: Assets.scaleDetection,
          title: Strings.txtScaleBuildDetection,
          value: '',
        },
        {
          icon: Assets.flowRate,
          title: Strings.txtFlowRate,
          value: '',
        },
        {
          icon: Assets.temprature,
          title: Strings.txtInletTemp,
          value: '',
        },

        {
          icon: Assets.statusDate,
          title: Strings.txtLastDescaleDate,
          value: '',
        },
        // {
        //   icon: Assets.BurnTime,
        //   title: 'Pump operational period',
        //   value: 'MM06',
        // },
        // {
        //   icon: Assets.flowRate,
        //   title: 'Pump recirculation flow rate',
        //   value: 'MM17',
        // },
        // {
        //   icon: Assets.flowRate,
        //   title: 'OutdoorTemperature',
        //   value: '50F',
        // },
        {
          title: Strings.txtRefresh,
        },
      ],
      error_code: '',
      EventsArray: [],
      graphData: [],
      heatingValue: 0,
      weekArray: [],
      statusRunning: false,
      systemStatusData: [
        {
          icon: Assets.status,
          title: Strings.txtSystemTotalUnits,
          value: '7 Units',
        },
        {
          icon: Assets.errrorInfo,
          title: Strings.txtSystemMode,
          value: 'Recirculation',
        },
        {
          icon: Assets.ststusBurnIcon,
          title: Strings.txtOnline,
          value: '7 Units',
        },
        {
          icon: Assets.pluginTime,
          title: Strings.txtActive,
          value: '3 Units',
        },
        {
          icon: Assets.BurnTime,
          title: Strings.txtStatus,
          value: '',
        },
        {
          title: Strings.txtRefresh,
        },
      ],
      statusUnitData: [
        {
          icon: Assets.pluginTime,
          title: Strings.txtUnit,
          value: 'Unit #',
        },
        {
          icon: Assets.status,
          title: Strings.txtStatus,
          value: 'Connected',
        },
        {
          icon: Assets.errrorInfo,
          title: Strings.txtErrorInfo,
          value: '',
        },
        {
          icon: Assets.ststusBurnIcon,
          title: Strings.txtBurnTime,
          value: '',
        },
        {
          icon: Assets.pluginTime,
          title: Strings.txtPluginTime,
          value: '',
        },
        {
          icon: Assets.BurnTime,
          title: Strings.txtIgnitionTime,
          value: '',
        },
        {
          icon: Assets.total_usage_icon,
          title: Strings.txtTotalGasUsage,
          value: '',
        },
        {
          icon: Assets.scaleDetection,
          title: Strings.txtScaleBuildDetection,
          value: '',
        },
        {
          icon: Assets.flowRate,
          title: Strings.txtFlowRate,
          value: '',
        },
        {
          icon: Assets.temprature,
          title: Strings.txtInletTemp,
          value: '',
        },

        {
          icon: Assets.statusDate,
          title: Strings.txtLastDescaleDate,
          value: '',
        },
        {
          icon: Assets.BurnTime,
          title: Strings.txtPumpOperationalPeriod,
          value: '',
        },
        {
          icon: Assets.flowRate,
          title: Strings.txtPumpRecirculationFlowRate,
          value: '',
        },
        {
          icon: Assets.flowRate,
          title: Strings.txtOutdoorTemp,
          value: '',
        },
        {
          title: Strings.txtRefresh,
        },
      ],
    };
  }

  componentDidMount() {
    setConfiguration('navigation', this.props.navigation);
    setConfiguration('heaterListUpdated', 'false');

    // setInterval(() => {
    //   this.checkRecircData();
    // }, 10000);

    setTimeout(() => {
      this.checkRecircData();
    }, 2000);

    setInterval(() => {
      this.checkRecircData();
    }, 10000);

    this.focusCall = this.props.navigation.addListener('focus', () => {
      try {
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackButtonClick.bind(this),
        );

        const newHeaterAdded = getConfiguration('newHeaterAdded');
        const slotsUpdated = getConfiguration('slotsUpdated');
        if (newHeaterAdded == 'true' || slotsUpdated == 'true') {
          setConfiguration('newHeaterAdded', 'false');
          setConfiguration('slotsUpdated', 'false');

          this.parseMetadata();
        }

        const heaterListUpdated = getConfiguration('heaterListUpdated');
        if (heaterListUpdated == 'true') {
          this.parseMetadata();
          setConfiguration('heaterListUpdated', 'false');
        }

        this.homeScreenActive = true;
        const selectedHeater = getConfiguration('selectedHeater');
        if (selectedHeater != null && selectedHeater !== '') {
          if (selectedHeater.heater_label !== this.state.heaterName) {
            const user_id = getConfiguration('user_id');
            this.callChangeHeaterWebservice(
              selectedHeater.heater_id,
              user_id,
              selectedHeater,
            );
            const userConnectedHeaters = getConfiguration(
              'userConnectedHeaters',
            );

            this.setState({
              userConnectedHeaters,
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    });

    setConfiguration('homescreenLoaded', 'true');
    this.parseMetadata();
    this.getPastWeek();

    setTimeout(() => {
      if (
        this.state.thingName != '' &&
        this.state.is_recirculation_compatible == 1
      ) {
        this.setState({
          recirc_toggle_state: true,
        });
        setTimeout(() => this.callGetMaintainence(), 2000);
      }
    }, 500);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.focusCall();
  }

  deleteSlot(index) {
    Alert.alert(
      '',
      'Are you sure you want to delete this time slot?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            var tempSlots = [...this.state.slots];
            tempSlots.splice(index, 1);
            this.setState({slots: tempSlots});
          },
        },
      ],
      {cancelable: false},
    );
  }

  checkRecircData() {
    if (
      this.state.thingName != '' &&
      this.state.is_recirculation_compatible == 1
    ) {
      // this.callGetStatusData();

      this.callGetRecircDataAPI(this.state.thingName);
    } else {
      this.setState({
        auto_toggle_state: 0,
        auto_toggle_value: 0,
        ondemand_toggle_state: 0,
        ondemand_toggle_value: 0,
        recirc_toggle_state: 0,
        recirc_toggle_value: 0,
        timer_section: 0,
        timer_scale_state: 0,
        sel_timezone: '',
      });
    }
  }

  handleBackButtonClick() {
    if (this.backPressed > 0) {
      BackHandler.exitApp();
      this.backPressed = 0;
      return true;
    }
    this.backPressed += 1;
    ToastAndroid.show(Strings.txtPressAgainToExit, ToastAndroid.SHORT);
    setTimeout(() => {
      this.backPressed = 0;
    }, 2000);
    return true;
  }

  onPressRefreshButton = () => {
    this.callGetStatusData();
  };

  onSwipeUp() {
    if (this.state.tabViewFlag == 0.5) {
      this.setState({tabViewFlag: 1});
      this.setState({showEventsPickerView: false});
    }

    // this.setState({ myText: 'You swiped up!' });
  }

  onSwipeDown() {
    this.setState({showEventsPickerView: false});
    if (this.state.tabViewFlag === 1) {
      this.setState({tabViewFlag: 0.5});
    } else {
      this.setState({tabViewFlag: 0});
    }
  }

  onSwipeRightSettings() {
    this.setState({openSettings: false});
    this.setState({showEventsPickerView: false});
  }

  getPastWeek() {
    const dayArray = [];

    for (let i = 0; i < 7; i += 1) {
      const date = new Date();
      const last = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);
      dayArray.push(last.getDay());
    }
    dayArray.reverse();
    this.setState({
      weekArray: dayArray,
    });
  }

  getWeekDay(index) {
    if (index === 0) {
      return 'sun';
    }
    if (index === 1) {
      return 'mon';
    }
    if (index === 2) {
      return 'tue';
    }
    if (index === 3) {
      return 'wed';
    }
    if (index === 4) {
      return 'thu';
    }
    if (index === 5) {
      return 'fri';
    }
    if (index === 6) {
      return 'sat';
    }
  }

  settingsView() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <Animatable.View
        transition="width"
        duration={500}
        style={[
          styles.bgSettingsView,
          {width: this.state.openSettings ? wp('100%') : 0},
        ]}>
        <GestureRecognizer
          onSwipeRight={() => this.onSwipeRightSettings()}
          config={config}
          style={styles.containerTxtAddHeater}>
          <TouchableOpacity
            onPress={() => this.openAddHeaterScreen()}
            style={styles.settingsCell}>
            <Text allowFontScaling={false} style={styles.txtSettingsTab}>
              {Strings.txtAddHeater}
            </Text>
            <Image
              resizeMode="contain"
              source={Assets.addBtnWhite}
              style={styles.iconsSettingsTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsCell}
            onPress={() => this.openEditHeaterScreen()}>
            <Text allowFontScaling={false} style={styles.txtSettingsTab}>
              {Strings.txtEditHeaterDetails}
            </Text>
            <Image
              resizeMode="contain"
              source={Assets.editBtnWhite}
              style={styles.iconsSettingsTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsCell}
            onPress={() => this.openEditProfileScreen()}>
            <Text allowFontScaling={false} style={styles.txtSettingsTab}>
              {Strings.txtEditProfile}
            </Text>
            <Image
              resizeMode="contain"
              source={Assets.editBtnWhite}
              style={styles.iconsSettingsTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsCell}
            onPress={() => this.openHelpfulTipsScreen()}>
            <Text allowFontScaling={false} style={styles.txtSettingsTab}>
              {Strings.txtHelpfulTips}
            </Text>
            <Image
              resizeMode="contain"
              source={Assets.helpfulTips}
              style={styles.iconsSettingsTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.openTutorialScreen()}
            style={styles.settingsCell}>
            <Text allowFontScaling={false} style={styles.txtSettingsTab}>
              {Strings.txtWirelessLanSetup}
            </Text>
            <Image
              resizeMode="contain"
              source={Assets.lanSetup}
              style={styles.iconsSettingsTab}
            />
          </TouchableOpacity>
          {this.state.is_recirculation_compatible == 1 ? (
            <TouchableOpacity
              onPress={() => this.openTimeZoneScreen()}
              style={styles.settingsCell}>
              <Text allowFontScaling={false} style={styles.txtSettingsTab}>
                {Strings.txtSelectTimezone}
              </Text>
              <Image
                resizeMode="contain"
                source={Assets.timeZone}
                style={styles.iconsSettingsTab}
              />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={styles.settingsCell}
            onPress={() => this.openTermsAndConditionScreen()}>
            <Text allowFontScaling={false} style={styles.txtSettingsTab}>
              {Strings.txtTermsOfUse}
            </Text>
            <Image
              resizeMode="contain"
              source={Assets.termsBtnWhite}
              style={styles.iconsSettingsTab}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.logoutPress()}
            style={styles.settingsCell}>
            <Text allowFontScaling={false} style={styles.txtSettingsTab}>
              {Strings.txtLogout}
            </Text>
            <Image
              resizeMode="contain"
              source={Assets.logoutBtn}
              style={styles.iconsSettingsTab}
            />
          </TouchableOpacity>
          <View style={styles.connectedView}>
            <Text
              allowFontScaling={false}
              style={[styles.txtConnected, {color: getColors().whiteColor}]}>
              {Strings.txtSettings}
            </Text>
          </View>
        </GestureRecognizer>
      </Animatable.View>
    );
  }

  systemStatusTabView() {
    var statusTable;
    if (this.state.isShowStatusUnit) {
      statusTable = this.state.statusUnitData.map((data) =>
        data.title === 'Error Info' ? (
          <TouchableOpacity
            style={[styles.cellView, {backgroundColor: getColors().whiteColor}]}
            onPress={() => this.openErrorInfoScreen(data.value)}>
            <View style={styles.cellInnerLeftView}>
              <Image
                resizeMode="contain"
                source={data.icon}
                style={styles.cellIcon}
              />
              <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />
              <Text
                style={[styles.txtSetTemperatureControl, styles.setTitleWidth]}
                adjustsFontSizeToFit
                numberOfLines={1}>
                {data.title}
              </Text>
            </View>

            <View style={styles.cellInnerRightView}>
              <Text
                allowFontScaling={false}
                style={[styles.txtSetTemperatureControl]}>
                {data.value}
              </Text>
            </View>
          </TouchableOpacity>
        ) : data.title === 'Status' ? (
          <View
            style={[
              styles.cellView,
              {backgroundColor: getColors().whiteColor},
            ]}>
            <View style={styles.cellInnerLeftView}>
              <Image
                resizeMode="contain"
                source={data.icon}
                style={styles.cellIcon}
              />
              <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />
              <Text
                style={[styles.txtSetTemperatureControl, styles.setTitleWidth]}
                adjustsFontSizeToFit
                numberOfLines={1}>
                {data.title}
              </Text>
            </View>

            <View style={styles.cellInnerRightView}>
              {this.state.isErrorExist ? (
                <Image
                  resizeMode="contain"
                  source={Assets.warning}
                  style={styles.imgWarning}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={Assets.greenDott}
                  style={styles.dotImage}
                />
              )}
            </View>
          </View>
        ) : data.title === 'Refresh' ? (
          <View style={styles.setDirectionRow}>
            <Button
              title={data.title}
              onPress={this.bounceRight}
              textStyle={styles.btnText}
              containerStyle={styles.btnRefreshNew}
            />
            <Button
              title={Strings.txtSystemStatus}
              onPress={() => {
                this.setState({isShowStatusUnit: false});
              }}
              textStyle={[styles.btnText, {color: getColors().redColor}]}
              containerBackgroundColor={getColors().whiteColor}
              containerStyle={styles.btnSystemStatusContainer}
            />
          </View>
        ) : data.title === 'Unit' ? (
          <TouchableOpacity
            style={[styles.cellView, {backgroundColor: getColors().whiteColor}]}
            onPress={() => this.setState({showUnitsPickerView: true})}>
            <View style={styles.cellInnerLeftView}>
              <Image
                resizeMode="contain"
                source={data.icon}
                style={styles.cellIcon}
              />
              <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />
              <Text
                allowFontScaling={false}
                style={[styles.txtSetTemperatureControl, {width: wp('33%')}]}
                adjustsFontSizeToFit
                numberOfLines={1}>
                {data.title}
              </Text>
            </View>

            <View style={styles.cellInnerRightView}>
              <Text
                allowFontScaling={false}
                style={[styles.txtSetTemperatureControl]}>
                {data.value}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View
            style={[
              styles.cellView,
              {backgroundColor: getColors().whiteColor},
            ]}>
            <View style={styles.cellInnerLeftView}>
              <Image
                resizeMode="contain"
                source={data.icon}
                style={styles.cellIcon}
              />
              <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />
              <Text
                style={[styles.txtSetTemperatureControl, styles.pageContainer]}
                adjustsFontSizeToFit
                numberOfLines={1}>
                {data.title}
              </Text>
            </View>

            <View style={[styles.cellInnerRightView]}>
              <Text
                allowFontScaling={false}
                style={[styles.txtSetTemperatureControl]}>
                {data.value}
              </Text>
            </View>
          </View>
        ),
      );
    } else {
      statusTable = this.state.systemStatusData.map((data) =>
        data.title === 'Status' ? (
          <View
            style={[
              styles.cellView,
              {backgroundColor: getColors().whiteColor},
            ]}>
            <View style={styles.cellInnerLeftView}>
              <Image
                resizeMode="contain"
                source={data.icon}
                style={styles.cellIcon}
              />
              <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />
              <Text
                style={[styles.txtSetTemperatureControl, {width: wp('33%')}]}
                adjustsFontSizeToFit
                numberOfLines={1}>
                {data.title}
              </Text>
            </View>

            <View style={styles.cellInnerRightView}>
              {this.state.isErrorExist ? (
                <Image
                  resizeMode="contain"
                  source={Assets.warning}
                  style={styles.imgWarning}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={Assets.greenDott}
                  style={styles.dotImage}
                />
              )}
            </View>
          </View>
        ) : data.title === 'Refresh' ? (
          <View style={styles.setDirectionRow}>
            <Button
              title={data.title}
              textStyle={styles.btnText}
              containerStyle={styles.btnRefreshNew}
            />
            <Button
              title={'Unit Status'}
              onPress={() => {
                this.setState({isShowStatusUnit: true});
              }}
              textStyle={[styles.btnText, {color: getColors().redColor}]}
              containerBackgroundColor={getColors().whiteColor}
              containerStyle={styles.btnUnitStatusStyle}
            />
          </View>
        ) : (
          <View
            style={[
              styles.cellView,
              {backgroundColor: getColors().whiteColor},
            ]}>
            <View style={styles.cellInnerLeftView}>
              <Image
                resizeMode="contain"
                source={data.icon}
                style={styles.cellIcon}
              />
              <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />
              <Text
                style={[styles.txtSetTemperatureControl, styles.pageContainer]}
                adjustsFontSizeToFit
                numberOfLines={1}>
                {data.title}
              </Text>
            </View>

            <View style={[styles.cellInnerRightView]}>
              <Text
                allowFontScaling={false}
                style={[styles.txtSetTemperatureControl]}>
                {data.value}
              </Text>
            </View>
          </View>
        ),
      );
    }

    return (
      <ScrollView
        style={{
          width: '100%',
          height: 'auto',
          marginBottom: this.state.tabViewFlag == 1.0 ? 70 : 20,
        }}>
        {this.state.isShowStatusUnit ? (
          <GestureRecognizer
            onSwipeRight={() => this.bounceLeft()}
            onSwipeLeft={() => this.bounceRight()}>
            {statusTable}
          </GestureRecognizer>
        ) : (
          <View
            onSwipeRight={() => this.bounceLeft()}
            onSwipeLeft={() => this.bounceRight()}>
            {statusTable}
          </View>
        )}
      </ScrollView>
    );
  }

  statusTabView() {
    const statusTable = this.state.statusData.map((data) =>
      data.title === 'Error Info' ? (
        <TouchableOpacity
          style={[styles.cellView, {backgroundColor: getColors().whiteColor}]}
          onPress={() => this.openErrorInfoScreen(data.value)}>
          <View style={styles.cellInnerLeftView}>
            <Image
              resizeMode="contain"
              source={data.icon}
              style={styles.cellIcon}
            />
            <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />
            <Text
              allowFontScaling={false}
              style={[styles.txtSetTemperatureControl, styles.txtStatusTitle]}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {data.title}
            </Text>
          </View>

          <View style={styles.cellInnerRightView}>
            <Text
              allowFontScaling={false}
              style={[styles.txtSetTemperatureControl, {fontSize: wp('4%')}]}>
              {data.value}
            </Text>
          </View>
        </TouchableOpacity>
      ) : data.title === 'Status' ? (
        <View
          style={[styles.cellView, {backgroundColor: getColors().whiteColor}]}>
          <View style={styles.cellInnerLeftView}>
            <Image
              resizeMode="contain"
              source={data.icon}
              style={styles.cellIcon}
            />
            <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />
            <Text
              allowFontScaling={false}
              style={[styles.txtSetTemperatureControl, styles.txtStatusTitle]}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {data.title}
            </Text>
          </View>

          <View style={styles.cellInnerRightView}>
            {this.state.isErrorExist ? (
              <Image
                resizeMode="contain"
                source={Assets.warning}
                style={styles.imgWarning}
              />
            ) : (
              <Image
                resizeMode="contain"
                source={Assets.greenDott}
                style={styles.dotImage}
              />
            )}
          </View>
        </View>
      ) : data.title === 'Refresh' ? (
        <Button
          title={data.title}
          textStyle={styles.btnText}
          onPress={this.onPressRefreshButton}
          containerStyle={styles.setMarginTopTen}
        />
      ) : (
        <View
          style={[styles.cellView, {backgroundColor: getColors().whiteColor}]}>
          <View style={styles.cellInnerLeftView}>
            <Image
              resizeMode="contain"
              source={data.icon}
              style={styles.cellIcon}
            />
            <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />
            <Text
              allowFontScaling={false}
              style={[
                styles.txtSetTemperatureControl,
                styles.statusTabTxtStyle,
              ]}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {data.title}
            </Text>
          </View>

          <View style={[styles.cellInnerRightView]}>
            <Text
              allowFontScaling={false}
              style={[styles.txtSetTemperatureControl, {fontSize: wp('4%')}]}>
              {data.value}
            </Text>
          </View>
        </View>
      ),
    );

    return (
      <ScrollView
        style={{
          width: '100%',
          height: 'auto',
          marginBottom: this.state.tabViewFlag == 1.0 ? 70 : 20,
        }}>
        {statusTable}
      </ScrollView>
    );
  }

  dataUsageTabView() {
    const contentInset = {
      top: 5,
      bottom: 0,
      left: 20,
      right: 20,
    };
    const contentInsetYAxis = {top: 0, bottom: 10, left: 0};
    const contentInsetXAxis = {left: 10, right: 20, top: 10};

    const graphValues = [];

    for (let i = 0; i < this.state.graphData.length; i += 1) {
      let obj = this.state.graphData[i];
      obj = parseInt(obj, 10);
      graphValues.push(obj);
    }

    return (
      <GestureRecognizer
        onSwipeDown={() => this.onSwipeDown()}
        onSwipeUp={() => this.onSwipeUp()}
        style={styles.gestureViewStyle}>
        <TouchableOpacity
          onPress={() => {
            if (graphValues.length > 0) {
              this.setState({showEventsPickerView: true});
            } else {
              this.setState({showEventsPickerView: false});
              showAlert('Events not available.', 300);
            }
          }}
          style={[styles.cellView, {backgroundColor: getColors().whiteColor}]}>
          <View style={styles.cellInnerLeftView}>
            <Image
              resizeMode="contain"
              source={Assets.events_icon}
              style={styles.cellIcon}
            />
            <Text
              allowFontScaling={false}
              style={[styles.txtSetTemperatureControl]}>
              {Strings.txtEvent}
            </Text>
          </View>

          <View style={styles.cellInnerRightView}>
            <Text
              allowFontScaling={false}
              style={[
                styles.txtSetTemperatureControl,
                {color: getColors().redColor},
              ]}>
              {Strings.txtSelect}
            </Text>
          </View>
        </TouchableOpacity>

        {graphValues.length > 0 ? (
          <View style={styles.chartBG}>
            <YAxis
              data={graphValues}
              style={styles.yAxisStyle}
              contentInset={contentInsetYAxis}
              svg={{
                fill: 'grey',
                fontSize: 10,
                fontWeight: '600',
                fontFamily: Fonts.oxygenBold,
              }}
              numberOfTicks={2}
              formatLabel={(value) => `${value}`}
            />

            <AreaChart
              style={styles.areaChartStyle}
              data={graphValues}
              // yMin={0}
              contentInset={contentInset}
              svg={{
                fill: 'rgba(247, 235, 233, 0.8)',
              }}>
              <DecoratorRed />
              <Grid />
            </AreaChart>

            <Text
              allowFontScaling={false}
              style={[styles.txtEvent, styles.txtEventStyle]}>
              {this.state.event}
            </Text>
          </View>
        ) : null}

        {graphValues.length > 0 ? (
          <XAxis
            style={styles.xAxisStyle}
            data={this.state.weekArray}
            formatLabel={(value, index) =>
              this.getWeekDay(this.state.weekArray[index])
            }
            contentInset={contentInsetXAxis}
            svg={{
              // fontSize: 10,
              fill: 'grey',
              fontSize: wp('2.5%'),
              fontWeight: '800',
              fontFamily: Fonts.oxygenBold,
            }}
          />
        ) : null}

        {graphValues.length > 0 ? (
          <Text allowFontScaling={false} style={styles.txtDay}>
            {'Day'}
          </Text>
        ) : null}
      </GestureRecognizer>
    );
  }

  controlTabView() {
    return (
      <ScrollView
        style={{
          width: '100%',
          height: 'auto',
          backgroundColor: getColors().innerViewBackgroundColor,
          marginBottom: this.state.tabViewFlag == 1.0 ? 70 : 20,
        }}>
        <GestureRecognizer
          onSwipeDown={() => this.onSwipeDown()}
          onSwipeUp={() => this.onSwipeUp()}
          style={[styles.pageContainer]}>
          {this.setTemperatureView()}

          {this.state.heaterType == 2 ? this.setTemperatureHeatingView() : null}

          <View
            style={[
              styles.cellView,
              {backgroundColor: getColors().whiteColor, marginBottom: 10},
            ]}>
            <View style={styles.cellInnerLeftView}>
              <Image
                resizeMode="contain"
                source={Assets.powerIcon}
                style={styles.cellIcon}
              />
              <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />

              <Text
                allowFontScaling={false}
                style={[styles.txtSetTemperatureControl]}>
                {Strings.txtPoerOnOff}
              </Text>
            </View>

            <View style={styles.cellInnerRightView}>
              <Switch
                style={styles.switchStyle}
                trackColor={{
                  false:
                    Platform.OS === 'android'
                      ? '#AAAAAA'
                      : getColors().whiteColor,
                  true: getColors().lightRed,
                }}
                thumbColor={
                  this.state.power ? getColors().redColor : getColors().redColor
                }
                onValueChange={(value) => this.clickPowerButton(value)}
                value={this.state.power}
              />
            </View>
          </View>

          {this.state.heaterType == 2 ? (
            <SwitchView
              source={Assets.recirculationIcon}
              recirculationPower={this.state.preHeatPower}
              title={'Preheat'}
              onPress={(value) => {
                this.setState({
                  preHeatPower: !this.state.preHeatPower,
                });
                console.log(value);
              }}
            />
          ) : null}

          {this.state.recirc_toggle_state == 1 ? (
            <TouchableOpacity
              onPress={() => this.openRecirculationTutorialScreen()}
              style={[
                styles.cellView,
                {backgroundColor: getColors().whiteColor, marginTop: 6},
              ]}>
              <View style={styles.cellInnerLeftView}>
                <Image
                  resizeMode="contain"
                  source={Assets.recirculationIcon}
                  style={styles.cellIcon}
                />
                <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />
                <View>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.txtSetTemperatureControl,
                      {padding: 0, marginTop: 7},
                    ]}>
                    {Strings.txtRecirculation}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.txtSetTemperatureControl,
                      {color: 'red', padding: 0, marginTop: -7},
                    ]}>
                    {this.state.mode == 11 || this.state.mode == 21
                      ? 'Auto Mode'
                      : this.state.mode == 12 || this.state.mode == 22
                      ? 'Manual Timer'
                      : this.state.mode == 13 || this.state.mode == 23
                      ? 'Always On'
                      : this.state.mode == 14 || this.state.mode == 24
                      ? 'Always Off'
                      : this.state.mode == 15 || this.state.mode == 25
                      ? 'Title 24'
                      : null}
                  </Text>
                </View>
              </View>

              <View style={styles.cellInnerRightView}>
                <Image
                  resizeMode="contain"
                  source={Assets.arrow}
                  style={styles.arrowStyle}
                />

                {/* <Switch
                  style={styles.switchStyle}
                  trackColor={{
                    false:
                      Platform.OS === 'android'
                        ? '#AAAAAA'
                        : getColors().whiteColor,
                    true: getColors().lightRed,
                  }}
                  thumbColor={
                    this.state.power
                      ? getColors().redColor
                      : getColors().redColor
                  }
                  onValueChange={value => {
                    this.callRecirculationPowerAPI(
                      this.state.thingName,
                      value ? '1' : '0',
                    );
                  }}
                  value={this.state.recirc_toggle_value == 1 ? true : false}
                /> */}
              </View>
            </TouchableOpacity>
          ) : null}

          {this.state.cross_over == 1 &&
          this.state.is_recirculation_compatible == 1 ? (
            <View
              style={[
                styles.cellView,
                {backgroundColor: getColors().whiteColor, marginBottom: 10},
              ]}>
              <View style={styles.cellInnerLeftView}>
                <Image
                  resizeMode="contain"
                  source={Assets.crossOverIcon}
                  style={styles.cellIcon}
                />
                <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />

                <View>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.txtSetTemperatureControl,
                      {padding: 0, marginTop: 7},
                    ]}>
                    {'Crossover Mode'}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.txtSetTemperatureControl,
                      {color: 'red', padding: 0, marginTop: -7},
                    ]}>
                    {'On'}
                  </Text>
                </View>
              </View>

              <View style={styles.cellInnerRightView}>
                <Image
                  resizeMode="contain"
                  source={Assets.greenDott}
                  style={styles.dotImage}
                />
                {/* <Switch
                  style={styles.switchStyle}
                  trackColor={{
                    false:
                      Platform.OS === 'android'
                        ? '#AAAAAA'
                        : getColors().whiteColor,
                    true: getColors().lightRed,
                  }}
                  thumbColor={
                    this.state.crossoverModeValue
                      ? getColors().redColor
                      : getColors().redColor
                  }
                  onValueChange={(value) =>
                    this.setState({
                      crossoverModeValue: this.state.crossoverModeValue,
                    })
                  }
                  value={this.state.crossoverModeValue}
                /> */}
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              </View>
            </View>
          ) : null}

          {/* {this.state.ondemand_toggle_state == 1 ? (
            <View
              style={[
                styles.cellView,
                {backgroundColor: getColors().whiteColor},
              ]}>
              <View style={styles.cellInnerLeftView}>
                <Image
                  resizeMode="contain"
                  source={Assets.onDemand}
                  style={styles.cellIcon}
                />
                <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />

                <Text
                  allowFontScaling={false}
                  style={[styles.txtSetTemperatureControl]}>
                  {Strings.txtOnDemand}
                </Text>
              </View>

              <View style={styles.cellInnerRightView}>
                <Switch
                  style={styles.switchStyle}
                  trackColor={{
                    false:
                      Platform.OS === 'android'
                        ? '#AAAAAA'
                        : getColors().whiteColor,
                    true: getColors().lightRed,
                  }}
                  thumbColor={
                    this.state.power
                      ? getColors().redColor
                      : getColors().redColor
                  }
                  onValueChange={value => {
                    this.callOnDemandPowerAPI(
                      this.state.thingName,
                      value ? '0' : '255',
                    );
                  }}
                  value={this.state.ondemand_toggle_value == 1 ? true : false}
                />
              </View>
            </View>
          ) : null}
 */}

          {(this.state.timer_section == 1 || this.state.timer_section == '1') &&
          true
            ? this.recirculationTimerView()
            : null}

          {this.state.ondemand_toggle_state == 1 ? (
            <View style={{flexDirection: 'row', marginHorizontal: 20}}>
              <Button
                title={Strings.txtOnDemand}
                // disabled={this.state.ondemand_running}
                textStyle={styles.btnText}
                onPress={() => {
                  if (this.state.ondemand_running == true) {
                    let message =
                      'On-Demand is scheduled for ' +
                      this.state.ondemand_duration +
                      ' minutes. This button will be enabled accordingly.';

                    Alert.alert(
                      'Info',
                      message,
                      [
                        {
                          text: Strings.txtOK,
                          onPress: () => console.log('ok'),
                        },
                      ],
                      {cancelable: false},
                    );
                  } else {
                    this.setState({isShowOndemandRuntimePopup: true});
                  }
                  // this.callOnDemandPowerAPI(this.state.thingName, '0');
                }}
                containerStyle={[
                  styles.setMarginTopTen,
                  {
                    width: 'auto',
                    flex: 1,
                    marginLeft: 0,
                    marginRight: 10,
                    marginBottom: 10,
                  },
                ]}
                containerBackgroundColor={
                  this.state.ondemand_running == true ? '#aaaaaa' : 'red'
                }
              />
              <View
                style={[
                  {
                    width: 'auto',
                    flex: 1,
                    borderColor: this.state.maintainenceRunning
                      ? 'transparent'
                      : 'red',
                    borderWidth: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  },
                ]}>
                <Button
                  title={
                    this.state.maintainenceRunning
                      ? Strings.txtRefresh
                      : Strings.txtRefresh
                  }
                  disabled={this.state.maintainenceRunning}
                  textStyle={styles.btnText}
                  onPress={() => {
                    // this.checkRecircData();
                    this.callGetMaintainence();
                  }}
                  textStyle={{
                    color: this.state.maintainenceRunning
                      ? 'transparent'
                      : 'red',
                  }}
                  containerStyle={[
                    styles.setMarginTopTen,
                    {
                      width: 'auto',
                      flex: 1,
                      borderColor: this.state.maintainenceRunning
                        ? '#AAAAAA'
                        : 'red',
                      borderWidth: 1,
                      marginLeft: 10,
                      marginRight: 0,
                      marginBottom: 10,
                    },
                  ]}
                  containerBackgroundColor={'white'}
                />
                {this.state.maintainenceRunning ? (
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 12,
                      bottom: 0,
                      right: 0,
                      flexDirection: 'row',
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={{justifyContent: 'center'}}>
                      <Text
                allowFontScaling={false}
                style={[
                          styles.btnText,
                          {
                            color: '#AAAAAA',
                            fontSize: wp('4%'),
                          },
                        ]}>
                        {'Please Wait... '}
                      </Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      <Text
                        style={[
                          styles.btnText,
                          {
                            color: 'grey',
                            marginTop: -wp('1.7%'),
                          },
                        ]}>
                        {'('}
                      </Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      <Text
                        style={[
                          styles.btnText,
                          {
                            color: 'grey',
                            textAlign: 'center',
                            width: wp('7%'),
                            fontSize: wp('5%'),
                            marginTop: -wp('1.7%'),
                          },
                        ]}>
                        {this.state.counter < 10
                          ? '0' + this.state.counter
                          : this.state.counter}
                      </Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      <Text
                        style={[
                          styles.btnText,
                          {
                            color: 'grey',
                            marginTop: -wp('1.7%'),
                          },
                        ]}>
                        {')'}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          ) : this.state.recirc_toggle_state == 1 ? (
            <View style={{flexDirection: 'row', marginHorizontal: 20}}>
              <Button
                title={this.state.maintainenceRunning ? '' : Strings.txtRefresh}
                disabled={this.state.maintainenceRunning}
                textStyle={styles.btnText}
                onPress={() => {
                  // this.checkRecircData();
                  this.callGetMaintainence();
                }}
                textStyle={{
                  color: this.state.maintainenceRunning ? 'grey' : 'red',
                }}
                containerStyle={[
                  styles.setMarginTopTen,
                  {
                    width: 'auto',
                    flex: 1,
                    borderColor: this.state.maintainenceRunning
                      ? '#AAAAAA'
                      : 'red',
                    borderWidth: 1,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 10,
                  },
                ]}
                containerBackgroundColor={'white'}
              />
              {this.state.maintainenceRunning ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                      <Text
                allowFontScaling={false}
                style={[
                        styles.btnText,
                        {
                          color: '#AAAAAA',
                          fontSize: wp('4%'),
                        },
                      ]}>
                      {'Please Wait... '}
                    </Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={[
                        styles.btnText,
                        {
                          color: 'grey',
                          marginTop: -wp('1.7%'),
                        },
                      ]}>
                      {'('}
                    </Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={[
                        styles.btnText,
                        {
                          color: 'grey',
                          textAlign: 'center',
                          width: wp('7%'),
                          fontSize: wp('5%'),
                          marginTop: -wp('1.7%'),
                        },
                      ]}>
                      {this.state.counter < 10
                        ? '0' + this.state.counter
                        : this.state.counter}
                    </Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={[
                        styles.btnText,
                        {
                          color: 'grey',
                          marginTop: -wp('1.7%'),
                        },
                      ]}>
                      {')'}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          ) : null}

          {this.state.ondemand_toggle_state == 1 &&
          this.state.ondemand_running == true ? (
            <Text
              style={{
                marginLeft: 20,
                width: (wp('100%') - 60) / 2,
                textAlign: 'center',
                color: '#aaaaaa',
                fontFamily: Fonts.oxygenBold,
                fontSize: wp('4%'),
                marginTop: -5,
              }}>
              {'('}
              {this.state.ondemandHours}
              {':'}
              {this.state.ondemandMinutes}
              {':'}
              {this.state.ondemandSeconds}
              {')'}
            </Text>
          ) : null}
        </GestureRecognizer>
      </ScrollView>
    );
  }

  statusActivityIndicatorView() {
    return (
      <View style={styles.loaderContainer}>
        <View style={styles.loaderBGBlack} />

        {/* <MaterialIndicator size={50} color='#ffffff' />
        <Text style={{ color: 'white', fontSize: 25 }}>Usage Data</Text> */}

        <View style={styles.loaderBG}>
          <MaterialIndicator size={50} color={getColors().whiteColor} />
          <Text allowFontScaling={false} style={styles.txtPleaseWait}>
            {Strings.txtPleaseWait}
          </Text>
          <Text allowFontScaling={false} style={styles.txtLoaderDesc}>
            {Strings.txtWaitMessage}
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({statusRunning: false})}
            style={styles.btnCancelStyle}>
            <Text allowFontScaling={false} style={styles.txtCancel}>
              {Strings.txtCancel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  recirculationTimerView() {
    return (
      <View
        style={[
          styles.sliderBackView,
          styles.txtRecircBG,

          // {backgroundColor: getColors().whiteColor},
        ]}>
        <Text
          allowFontScaling={false}
          style={[
            styles.txtSetTemperatureControl,
            {fontFamily: Fonts.oxygenBold},
          ]}>
          {Strings.txtRecirculationTimer}
        </Text>

        {this.state.auto_toggle_state == 1 ||
        this.state.auto_toggle_state == '1' ? (
          <View
            style={[
              styles.cellView,
              {backgroundColor: getColors().whiteColor},
            ]}>
            <View style={styles.cellInnerLeftView}>
              <Image
                resizeMode="contain"
                source={Assets.timerModeIcon}
                style={styles.cellIcon}
              />
              <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />

              <Text
                allowFontScaling={false}
                style={[styles.txtSetTemperatureControl]}>
                {Strings.txtTimerMode}
              </Text>
            </View>

            <View style={[styles.cellInnerRightView, styles.txtAutoContainer]}>
              <Animatable.Text
                transition="opacity"
                duration={500}
                allowFontScaling={false}
                style={[
                  styles.txtSetTemperatureControl,
                  styles.setMarginRight,
                ]}>
                {Strings.txtAuto}
              </Animatable.Text>

              {this.state.auto_toggle_value == 1 ||
              this.state.auto_toggle_value == '1' ? (
                <Image
                  resizeMode="contain"
                  source={Assets.greenDott}
                  style={styles.dotImage}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={Assets.greenDott}
                  style={[styles.dotImage, {tintColor: '#aaaaaa'}]}
                />
              )}

              {/* <Switch
                style={styles.switchStyle}
                trackColor={{
                  false:
                    Platform.OS === 'android'
                      ? '#AAAAAA'
                      : getColors().whiteColor,
                  true: getColors().lightRed,
                }}
                thumbColor={
                  this.state.recirculationTimer
                    ? getColors().redColor
                    : getColors().redColor
                }
                value={
                  this.state.auto_toggle_value == 1 ||
                  this.state.auto_toggle_value == '1'
                    ? true
                    : false
                }
              /> */}
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
            </View>
          </View>
        ) : null}

        {this.state.mode == 12 || this.state.mode == 22 ? (
          <TouchableOpacity
            onPress={() => this.openTimeZoneScreen()}
            style={[
              styles.cellView,
              {backgroundColor: getColors().whiteColor},
            ]}>
            <View style={styles.cellInnerLeftView}>
              <Image
                resizeMode="contain"
                source={Assets.timeZoneIcon}
                style={styles.cellIcon}
              />
              <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />

              <Text
                allowFontScaling={false}
                style={[styles.txtSetTemperatureControl]}>
                {'Timezone'}
              </Text>
            </View>

            <View style={[styles.cellInnerRightView, styles.txtAutoContainer]}>
              <Animatable.Text
                transition="opacity"
                duration={500}
                allowFontScaling={false}
                style={[
                  styles.txtSetTemperatureControl,
                  styles.setMarginRight,
                ]}>
                {this.state.sel_timezone}
              </Animatable.Text>
              <Image
                resizeMode="contain"
                source={Assets.arrow}
                style={styles.arrowStyle}
              />
            </View>
          </TouchableOpacity>
        ) : null}

        {this.state.timer_scale_state == 1 ||
        this.state.timer_scale_state == '1' ? (
          <View style={[styles.cellView, styles.txtTimerModeContainer]}>
            <TouchableOpacity
              style={styles.timePickerContainer}
              onPress={() => {
                setTimeout(() => {
                  // this.setState({showTimePickerView: true});
                  this.openScheduleScreen();
                }, 500);
              }}>
              <View style={[styles.cellInnerLeftView]}>
                <Image
                  resizeMode="contain"
                  source={Assets.scheduleIcon}
                  style={styles.cellIcon}
                />
                <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />
                <View>
                  <Text
                    allowFontScaling={false}
                    style={[styles.txtSetTemperatureControl]}>
                    {Strings.txtOnOffTimer}
                  </Text>

                  {this.state.slots.length <= 0 ? (
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.txtSetTemperatureControl,
                        {color: 'red', padding: 0, marginTop: -7},
                      ]}>
                      No timeslots added yet
                    </Text>
                  ) : null}
                </View>
              </View>

              <View style={[styles.cellInnerRightView, styles.arrowContainer]}>
                <Image
                  resizeMode="contain"
                  source={Assets.arrow}
                  style={styles.arrowStyle}
                />
              </View>
            </TouchableOpacity>

            <Animatable.View
              transition="opacity"
              duration={500}
              style={styles.controlTabTimeZoneBG}>
              <Image
                resizeMode="contain"
                source={Assets.scaleImage}
                style={styles.scaleImageStyle}
              />
              {this.state.slots.map((data) => {
                return (
                  <View
                    style={{
                      position: 'absolute',
                      left: data.start * ((wp('100%') - 70) / 24),
                      top: '69%',
                      height: 2,
                      width: (data.end - data.start) * ((wp('100%') - 70) / 24),
                      backgroundColor: getColors().redColor,
                    }}
                  />
                );
              })}
            </Animatable.View>
          </View>
        ) : null}
      </View>
    );
  }

  onSetTimePassword() {
    return (
      <View style={[styles.temperaturePopup, styles.setAuroHeight]}>
        <Text
          allowFontScaling={false}
          style={[styles.titleTemperaturePopup, {marginTop: 15}]}>
          {Strings.txtSwitchMode}
        </Text>
        <Text
          allowFontScaling={false}
          style={[
            styles.contentTemperaturePopup,
            styles.txtIfYouSet,
            {marginTop: 20, lineHeight: wp('6%')},
          ]}>
          {Strings.switchModeDesc1}
        </Text>

        <Text
          allowFontScaling={false}
          style={[
            styles.contentTemperaturePopup,
            styles.txtSwitchBack,
            {lineHeight: wp('6%'), marginBottom: 10},
          ]}>
          {Strings.switchModeDesc2}
        </Text>

        {this.state.slots.map((data, index) => {
          return (
            <View style={styles.slotListContainer}>
              <Text style={styles.buttonText}>
                {data.start > 12
                  ? data.start - 12
                  : data.start == 0
                  ? 12
                  : data.start}{' '}
                {data.start > 11 && data.start < 24 ? 'PM' : 'AM'} -{' '}
                {data.end > 12 ? data.end - 12 : data.end == 0 ? 12 : data.end}{' '}
                {data.end > 11 && data.end < 24 ? 'PM' : 'AM'}
              </Text>

              <TouchableOpacity
                onPress={() => this.deleteSlot(index)}
                style={styles.trashContainer}>
                <FontAwesomeIcon
                  icon={faTrash}
                  size={wp('5%')}
                  color={getColors().txtBlackColor}
                  style={styles.setTrashMargin}
                />
              </TouchableOpacity>
            </View>
          );
        })}
        <View style={styles.slotListContainer}>
          <Text allowFontScaling={false} style={styles.buttonText}>
            {this.state.onStart > 12
              ? this.state.onStart - 12
              : this.state.onStart == 0
              ? 12
              : this.state.onStart}{' '}
            {this.state.onStart > 11 && this.state.onStart < 24 ? 'PM' : 'AM'} -{' '}
            {this.state.onEnd > 12
              ? this.state.onEnd - 12
              : this.state.onEnd == 0
              ? 12
              : this.state.onEnd}{' '}
            {this.state.onEnd > 11 && this.state.onEnd < 24 ? 'PM' : 'AM'}
          </Text>
          {/* <TouchableOpacity
            style={styles.trashContainer}>
            <FontAwesomeIcon
              icon={faTrash}
              size={wp('5%')}
              color={getColors().txtBlackColor}
              style={styles.setTrashMargin}
            />
          </TouchableOpacity> */}
        </View>
        <FormField
          refer={(instance) => {
            this.passwordField = instance;
          }}
          style={styles.passwordField}
          secureTextEntry={true}
          title={Strings.txtEnterPassword}
          hideTitle
          value={this.state.enterPassword}
          onPress={() => this.passwordField.focus()}
          onChangeText={(enterPassword) => {
            this.setState({enterPassword: enterPassword});
          }}
        />
        <View style={styles.btnsContainerView}>
          <TouchableOpacity
            onPress={() => {
              this.acceptOnTimeSetPassword();
            }}
            style={[
              styles.onTimeSetButton,
              {backgroundColor: getColors().redColor},
            ]}>
            <Text
              allowFontScaling={false}
              style={[styles.buttonText, {color: getColors().whiteColor}]}>
              {Strings.txtAccept}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({isVisibleOnSetTimePassword: false});
            }}
            style={[styles.onTimeSetButton, styles.btnCancelBG]}>
            <Text
              allowFontScaling={false}
              style={[styles.buttonText, {color: getColors().redColor}]}>
              {Strings.txtCancel}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity
          style={styles.cancelPopup}
          onPress={() => this.setState({isVisibleOnSetTimePassword: false})}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().cellTitleColor},
            ]}>
            Cancel
          </Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={{
            position: 'absolute',
            width: 80,
            height: 40,
            right: 10,
            bottom: -10,
          }}
          onPress={() => {
            this.acceptOnTimeSetPassword();
          }}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().redColor},
            ]}>
            Accept
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  passwordView() {
    return (
      <View style={styles.temperaturePopup}>
        <Text allowFontScaling={false} style={styles.titleTemperaturePopup}>
          {Strings.txtSetTempandPower}
        </Text>
        <Text allowFontScaling={false} style={styles.contentTemperaturePopup}>
          {Strings.txtProceedAtRisk}
        </Text>

        <FormField
          refer={(instance) => {
            this.passwordField = instance;
          }}
          style={styles.setMarginTop}
          secureTextEntry={true}
          title={Strings.txtEnterPasswrd}
          hideTitle
          value={this.state.enterPassword}
          onPress={() => this.passwordField.focus()}
          onChangeText={(enterPassword) => {
            this.setState({enterPassword: enterPassword});
          }}
        />

        <TouchableOpacity
          style={styles.cancelPopup}
          onPress={() => this.setState({isVisiblePasswordView: false})}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().cellTitleColor},
            ]}>
            {Strings.txtCancel}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnAcceptStyle}
          onPress={() => {
            this.acceptOffTimeSetPassword();
          }}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().redColor},
            ]}>
            {Strings.txtAccept}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  offSetTimePassword() {
    return (
      <View style={styles.temperaturePopup}>
        <Text allowFontScaling={false} style={styles.titleTemperaturePopup}>
          {Strings.txtPumpOffTime}
        </Text>
        <Text allowFontScaling={false} style={styles.contentTemperaturePopup}>
          {Strings.timerPopupDesc}
        </Text>
        <Text allowFontScaling={false} style={styles.contentTemperaturePopup}>
          {this.state.offSetTimeStart} - {this.state.offSetTimeEnd}
        </Text>

        <FormField
          refer={(instance) => {
            this.passwordField = instance;
          }}
          style={styles.setMarginTop}
          secureTextEntry={true}
          title={Strings.txtEnterPasswrd}
          hideTitle
          value={this.state.enterPassword}
          onPress={() => this.passwordField.focus()}
          onChangeText={(enterPassword) => {
            this.setState({enterPassword: enterPassword});
          }}
        />

        <TouchableOpacity
          style={styles.cancelPopup}
          onPress={() => this.setState({isVisibleOffSetTimePassword: false})}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().cellTitleColor},
            ]}>
            {Strings.txtCancel}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnAcceptStyle}
          onPress={() => {
            this.acceptOffTimeSetPassword();
          }}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().redColor},
            ]}>
            {Strings.txtAccept}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  setTemperatureView() {
    var MaxVal = 0;
    var MinVal = 0;
    if (this.state.Temp_block.length > 0) {
      MaxVal = this.state.Temp_block[this.state.Temp_block.length - 1];
      MinVal = this.state.Temp_block[0];
      if (MaxVal == MinVal) {
        MinVal = 0;
      }
    }

    var difference = MaxVal - MinVal;
    const tempRange = [];
    for (let i = 0; i < this.state.Temp_block.length; i += 1) {
      const val = this.state.Temp_block[i];
      const range = `${(((val - MinVal) / difference) * 100).toString()}%`;
      tempRange.push(range);
    }
    difference = parseInt(MaxVal, 10) - parseInt(MinVal, 10);
    const rangeBlocks = tempRange.map((data, index) => (
      <Image
        resizeMode="contain"
        source={Assets.blackDott}
        style={{
          position: 'absolute',
          left: data,
          top: 0,
          width: 8,
          height: '100%',
        }}
      />
    ));
    return (
      <View
        style={[
          styles.sliderBackView,
          {backgroundColor: getColors().whiteColor},
        ]}>
        <Text
          allowFontScaling={false}
          style={[styles.txtSetTemperatureControl]}>
          {Strings.txtSetTemp}
        </Text>
        <View style={styles.rangeBlockContainer}>
          <View style={styles.rangeBlockBG} />

          {rangeBlocks}
        </View>

        <Slider
          value={this.state.value}
          key={this.state.sliderKey}
          style={styles.sliderStyle}
          steps={1}
          minimumTrackTintColor="rgba(255, 0,0, 0.5)" // {getColors().redColor}
          maximumTrackTintColor="transparent" // {getColors().maximumTrackTintColor}
          onValueChange={(value) => this.changeSliderValue(value)}
          onSlidingComplete={() => this.endDragHandle()}
          thumbStyle={styles.setThumbStyle}
          trackStyle={styles.setTrackHeight}
          // thumbImage={Assets.greenDott}
        />

        <Text allowFontScaling={false} style={[styles.txtMinTemp]}>
          {MinVal}°
        </Text>
        <Text allowFontScaling={false} style={[styles.txtMaxTemp]}>
          {MaxVal}°
        </Text>
        {this.state.showTempBubble ? (
          <View style={styles.bubbleView}>
            <View
              style={{
                width: wp('15.86%'),
                height: wp('15.86%'),
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: this.state.bubbleLeftVal,
              }}>
              <Image
                resizeMode="contain"
                source={Assets.bubble}
                style={styles.bubbleIcon}
              />
              <Text
                allowFontScaling={false}
                style={[styles.txtBubbleTemp, {color: getColors().whiteColor}]}>
                {this.state.sliderTemp}°
              </Text>
            </View>
          </View>
        ) : null}
        {this.state.Temp_block.length == 0 ? (
          <View style={styles.disableView} />
        ) : null}
      </View>
    );
  }

  setTemperatureHeatingView() {
    const MaxVal = this.state.Temp_block[this.state.Temp_block.length - 1];
    const MinVal = this.state.Temp_block[0];
    var difference = MaxVal - MinVal;
    const tempRange = [];
    for (let i = 0; i < this.state.Temp_block.length; i += 1) {
      const val = this.state.Temp_block[i];
      const range = `${(((val - MinVal) / difference) * 100).toString()}%`;
      tempRange.push(range);
    }
    // ((parseInt(data) / difference) * 100).toString() + '%'
    difference = parseInt(MaxVal, 10) - parseInt(MinVal, 10);
    const rangeBlocks = tempRange.map((data) => (
      // <View style={{ width: 20, height: 20 }}></View>
      <Image
        resizeMode="contain"
        source={Assets.blackDott}
        style={{
          position: 'absolute',
          left: data,
          top: 0,
          width: 8,
          height: '100%',
        }}
      />
    ));
    return (
      <View
        style={[
          styles.sliderBackView,
          {backgroundColor: getColors().whiteColor},
        ]}>
        <Text
          allowFontScaling={false}
          style={[styles.txtSetTemperatureControl]}>
          {Strings.setTempForHeating}
        </Text>
        <View style={styles.rangeBlockContainer}>
          <View style={styles.rangeBlockBG} />

          {rangeBlocks}
        </View>

        <Slider
          value={this.state.heatingValue}
          key={this.state.sliderKey}
          style={styles.sliderStyle}
          steps={1}
          minimumTrackTintColor="rgba(255, 0,0, 0.5)" // {getColors().redColor}
          maximumTrackTintColor="transparent" // {getColors().maximumTrackTintColor}
          onValueChange={(value) => this.changeHeatingSliderValue(value)}
          onSlidingComplete={() => this.endHeatTempSlider()}
          thumbStyle={styles.setThumbStyle}
          trackStyle={styles.setTrackHeight}
          // thumbImage={Assets.greenDott}
        />

        <Text allowFontScaling={false} style={[styles.txtMinTemp]}>
          {MinVal}°
        </Text>
        <Text allowFontScaling={false} style={[styles.txtMaxTemp]}>
          {MaxVal}°
        </Text>
        {this.state.showHeatBubble ? (
          <View style={styles.bubbleView}>
            <View
              style={{
                width: wp('15.86%'),
                height: wp('15.86%'),
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: this.state.bubbleLeftVal,
              }}>
              <Image
                resizeMode="contain"
                source={Assets.bubble}
                style={styles.bubbleIcon}
              />
              <Text
                allowFontScaling={false}
                style={[styles.txtBubbleTemp, {color: getColors().whiteColor}]}>
                {this.state.sliderTemp}°
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  }

  bottomTabBar() {
    return (
      <GestureRecognizer
        onSwipeDown={() => this.onSwipeDown()}
        onSwipeUp={() => this.onSwipeUp()}
        style={styles.bottomTabView}>
        <TouchableOpacity
          style={[
            styles.controlTab,
            {width: this.state.heaterCompatible ? '30%' : '50%'},
          ]}
          onPress={() => this.controlTabPressed()}>
          <Text allowFontScaling={false} style={styles.txtTab}>
            {Strings.txtControl}
          </Text>
        </TouchableOpacity>
        <View style={styles.tabBarSeperator} />
        <TouchableOpacity
          style={[
            styles.statusTab,
            {width: this.state.heaterCompatible ? '30%' : '50%'},
          ]}
          onPress={() => this.statusTabPressed()}>
          <Text allowFontScaling={false} style={styles.txtTab}>
            {Strings.txtStatus}
          </Text>
        </TouchableOpacity>
        {this.state.heaterCompatible ? (
          <View style={styles.tabBarSeperator} />
        ) : null}

        {this.state.heaterCompatible ? (
          <TouchableOpacity
            style={styles.dataUsageTab}
            onPress={() => this.dataUsageTabPressed()}>
            <Text allowFontScaling={false} style={styles.txtTab}>
              {Strings.txtUsageData}
            </Text>
          </TouchableOpacity>
        ) : null}
      </GestureRecognizer>
    );
  }

  showTemperaturePopup() {
    this.setState({
      isVisibleTemperaturePopup: true,
      showEventsPickerView: false,
    });
  }

  clickPowerButton(value) {
    if (value === true) {
      this.setState({power: value});

      // call webservice for heater on
      this.callPowerOnOff(this.state.thingName, '1');
    } else {
      this.setState({power: value});
      Alert.alert(
        '',
        Strings.powerAlertDesc,
        [
          {
            text: Strings.txtCancel,
            onPress: () => this.setState({power: this.state.power}),
            style: 'cancel',
          },
          {
            text: Strings.txtOK,
            onPress: () => this.callPowerOnOff(this.state.thingName, '0'),
          },
        ],
        {cancelable: false},
      );

      // call webservice for heater off
    }
  }

  callPowerOnOff(thingName, inStatus) {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.setState({
          powerUnderProcess: true,
        });
        this.props
          .heateronoff(thingName, inStatus, this.state.macAddress)
          .then(() => this.afterPowerOnOffAPI())
          .catch((e) =>
            showAlert(
              'It seems something went wrong on the server. Please try after some time.',
              300,
            ),
          );
      } else {
        showAlert(Strings.networkError, 300);
      }
    });
  }

  async afterPowerOnOffAPI() {
    const {response} = this.props.responseHeaterOnOff;
    setTimeout(() => this.setState({powerUnderProcess: false}), 10000);

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        const {iot_response} = response;
        const rowsAr = iot_response.rows;
        if (rowsAr.length > 0) {
          const rowsArr = rowsAr[0];
          const rst = await decryptValue(rowsArr.rst);
          if (rst === '') {
            const msg = await decryptValue(rowsArr.msg);
            showAlert(msg, 300);
          }
        } else {
          showAlert(Strings.serverError, 300);
        }
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  callRecirculationPowerAPI(thingName, inStatus) {
    this.props
      .recirculationpower(thingName, inStatus)
      .then(() => this.afterCallRecirculationpowerAPI())
      .catch((e) =>
        showAlert(
          'It seems something went wrong on the server. Please try after some time.',
          300,
        ),
      );
  }

  async afterCallRecirculationpowerAPI() {
    const {response} = this.props.responseRecirculationPower;
    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
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

  callInstantReserveAPIDefaultSlots(thingName) {
    let instantTiming = [
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
      'true',
      'false',
      'false',
      'false',
      'false',
      'false',
      'false',
    ];

    console.log('instantTiming -- ', instantTiming);
    this.props
      .setInstantReserve(thingName, instantTiming)
      .then(() => this.afterCallInstantReserveAPI())
      .catch((e) =>
        showAlert(
          'It seems something went wrong on the server. Please try after some time.',
          300,
        ),
      );
  }

  callInstantReserveAPI(thingName) {
    let instantTiming = [...instantReserveTiming];

    for (let i = 0; i < this.state.slots.length; i++) {
      let obj = this.state.slots[i];
      console.log(obj);
      for (let j = obj.start; j < obj.end; j++) {
        instantTiming[j] = 'true';
      }
    }

    if (this.state.onStart == this.state.onEnd) {
      for (let k = 0; k < 24; k++) {
        instantTiming[k] = 'true';
      }
    } else {
      for (let k = this.state.onStart; k < this.state.onEnd; k++) {
        instantTiming[k] = 'true';
      }
    }

    this.props
      .setInstantReserve(thingName, instantTiming)
      .then(() => this.afterCallInstantReserveAPI())
      .catch((e) =>
        showAlert(
          'It seems something went wrong on the server. Please try after some time.',
          300,
        ),
      );
  }

  async afterCallInstantReserveAPI() {
    const {response} = this.props.responseInstantReserve;
    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);

        console.log('resMessage ---', resMessage);

        // this.callGetInstantInfoAPI(this.state.thingName);
        // showAlert(resMessage, 300);
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  callGetInstantInfoAPI(thingName) {
    this.props
      .getInstantInfo(thingName)
      .then(() => this.afterCallGetInstantInfoAPI())
      .catch((e) =>
        showAlert(
          'It seems something went wrong on the server. Please try after some time.',
          300,
        ),
      );
  }

  async afterCallGetInstantInfoAPI() {
    const {response} = this.props.responseGetInstantInfo;
    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        // if (isAddSlot == true) {
        //   this.setState({isVisibleOnSetTimePassword: true});
        //   this.isAddSlot = false;
        // }

        const iot_response = response.iot_response.rows[0];
        var pumpTiming = [];

        pumpTiming.push(await decryptValue(iot_response.Reserveflg1));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg2));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg3));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg4));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg5));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg6));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg7));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg8));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg9));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg10));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg11));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg12));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg13));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg14));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg15));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg16));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg17));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg18));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg19));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg20));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg21));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg22));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg23));
        pumpTiming.push(await decryptValue(iot_response.Reserveflg24));

        let slots = [];
        let checkPump = false;
        let startTime;

        for (let i = 0; i < pumpTiming.length; i++) {
          let obj = pumpTiming[i];

          if (obj == 'true' && checkPump == false) {
            startTime = i;
            checkPump = true;
          } else if (obj == 'false' && checkPump == true) {
            slots.push({start: startTime, end: i});
            checkPump = false;
          } else if (checkPump == true && i == pumpTiming.length - 1) {
            slots.push({start: startTime, end: 24});
            checkPump = false;
          }
        }
        if (checkPump == true) {
          slots.push({start: startTime, end: 24});
          checkPump = false;
        }
        this.setState({slots: slots});

        console.log('slots  -- ', slots);

        // if (slots.length <= 0) {
        //   console.log('slots length -- ', slots.length);

        //   this.callInstantReserveAPIDefaultSlots(this.state.thingName);
        // }

        var hours = new Date().getHours(); //To get the Current Hours

        if (
          pumpTiming[hours] == 'true' &&
          (this.state.mode == 12 || this.state.mode == 22)
        ) {
          this.setState({recircIconShow: true});
        }
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  callOnDemandPowerAPI(thingName, inStatus) {
    this.props
      .ondemandpower(thingName, inStatus)
      .then(() => this.afterCallOndemandpowerAPI(inStatus))
      .catch((e) =>
        showAlert(
          'It seems something went wrong on the server. Please try after some time.',
          300,
        ),
      );
  }

  async afterCallOndemandpowerAPI(minutes) {
    const {response} = this.props.responseOndemandPower;
    this.setState({isShowOndemandRuntimePopup: false});

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);

        this.setState({ondemand_running: true});

        this.setState(
          {
            ondemandCounterStart: true,
            ondemandDifference: minutes * 60,
          },
          () => {
            this.ondemandInterval = setInterval(() => {
              this.onDemandCounter(minutes * 60);
            }, 1000);
          },
        );

        //showAlert(resMessage, 300);
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  callGetRecircDataAPI(thingName) {
    this.props
      .getRecircData(thingName)
      .then(() => this.afterCallGetRecircDataAPI())
      .catch((e) => {
        // showAlert(
        //   'It seems something went wrong on the server. Please try after some time.',
        //   300,
        // );
      });
  }

  async afterCallGetRecircDataAPI() {
    const {response} = this.props.responseGetRecirculationData;
    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        const recirculation = response.recirculation;
        const data = recirculation.data;
        if (data.length != 0) {
          // if (this.state.isRefreshHit == false) {
          const auto_toggle_state = await decryptValue(data.auto_toggle_state);
          const auto_toggle_value = await decryptValue(data.auto_toggle_value);
          const ondemand_toggle_state = await decryptValue(
            data.ondemand_toggle_state,
          );
          const ondemand_toggle_value = await decryptValue(
            data.ondemand_toggle_value,
          );
          const recirc_toggle_state = await decryptValue(
            data.recirc_toggle_state,
          );
          const ondemand_duration = await decryptValue(data.ondemand_duration);
          const ondemand_start_time = await decryptValue(
            data.ondemand_start_time,
          );
          const recirc_toggle_value = await decryptValue(
            data.recirc_toggle_value,
          );
          const timer_scale_state = await decryptValue(data.timer_scale_state);
          const timezone = await decryptValue(data.timezone);
          const timer_section = await decryptValue(data.timer_section);
          const cross_over = await decryptValue(data.cross_over);
          // }
          const enable_dst = await decryptValue(data.enable_dst);
          const mode = await decryptValue(data.mode);
          const video_link = await decryptValue(data.video_link);
          const video_mode = await decryptValue(data.video_mode);
          const description = await decryptValue(data.description);

          if (mode == 13 || mode == 23) {
            this.setState({recircIconShow: true});
          } else if (mode == 14 || mode == 24 || mode == 21 || mode == 11) {
            this.setState({recircIconShow: false});
          } else if (mode == 12 || mode == 22) {
          }

          if (this.state.isRefreshHit == false) {
            this.setState({
              // auto_toggle_state: auto_toggle_state,
              // auto_toggle_value: auto_toggle_value,
              // ondemand_toggle_state: ondemand_toggle_state,
              // ondemand_toggle_value: ondemand_toggle_value,
              recirc_toggle_state: recirc_toggle_state,
              recirc_toggle_value: recirc_toggle_value,
              // timer_section: timer_section,

              // cross_over: cross_over,
              // mode: mode,
            });
          }
          this.setState({
            timer_scale_state: timer_scale_state,
            sel_timezone: timezone,
            video_link: video_link,
            video_mode: video_mode,
            recirculation_description: description,
            enable_dst: enable_dst,
            ondemand_duration: ondemand_duration,
            ondemand_start_time: ondemand_start_time,
          });
        } else {
          this.setState({
            auto_toggle_state: 0,
            auto_toggle_value: 0,
            ondemand_toggle_state: 0,
            ondemand_toggle_value: 0,
            recirc_toggle_state: 0,
            recirc_toggle_value: 0,
            timer_section: 0,
            ondemand_start_time: '',
            ondemand_duration: 0,
          });
        }
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }

    this.checkOndemandButtonState();
  }

  checkOndemandButtonState() {
    if (
      this.state.ondemand_toggle_state == 1 ||
      this.state.ondemand_toggle_state == '1'
    ) {
      var d2 = this.state.ondemand_start_time;
      let arr = d2.split(' ');
      let newDate = new Date(arr[0] + 'T' + arr[1] + 'Z');

      newDate.setMinutes(
        newDate.getMinutes() + parseInt(this.state.ondemand_duration),
      );

      // newDateObj.setTime(oldDateObj.getTime() + (30 * 60 * 1000));

      const now = new Date();
      // UTC Date String
      now.toUTCString(); // "Sun, 30 May 2021 14:59:15 GMT"

      if (newDate > now) {
        this.setState({ondemand_running: true});
      } else {
        this.setState({ondemand_running: false});
        this.setState({
          ondemandCounterStart: false,
        });
      }

      if (this.state.ondemandCounterStart == false) {
        var d2 = this.state.ondemand_start_time;
        let arr = d2.split(' ');
        let newDate = new Date(arr[0] + 'T' + arr[1] + 'Z');

        newDate.setMinutes(
          newDate.getMinutes() + parseInt(this.state.ondemand_duration),
        );

        const now = new Date();
        // UTC Date String
        now.toUTCString(); // "Sun, 30 May 2021 14:59:15 GMT"

        let difference = (newDate - now) / 1000;
        difference = parseInt(difference);

        this.ondemandInterval = setInterval(() => {
          this.onDemandCounter(difference);
        }, 1000);

        this.setState({
          ondemandCounterStart: true,
          ondemandDifference: difference,
        });
      }
      // this.convertUTCToLocalTime(this.state.ondemand_start_time);
    }
  }

  onDemandCounter(seconds) {
    let reaminTime = this.state.ondemandDifference - 1;

    let hours = parseInt(reaminTime / 3600);

    if (hours < 10) {
      hours = '0' + hours;
    }

    let minutes = parseInt(reaminTime / 60) % 60;

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    let sec = reaminTime % 60;
    if (sec < 10) {
      sec = '0' + sec;
    }

    this.setState({
      ondemandDifference: reaminTime,
      ondemandHours: hours,
      ondemandMinutes: minutes,
      ondemandSeconds: sec,
    });

    if (reaminTime < 0) {
      clearInterval(this.ondemandInterval);
      this.setState({ondemand_running: false});
    }
  }

  convertUTCToLocalTime = (dateString) => {
    let date = new Date(dateString);
    const milliseconds = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    );
    const localTime = new Date(milliseconds);

    localTime.getDate(); // local date
    localTime.getHours(); // local hour
  };

  callChangeTemperatureAPI(thingName, inTemperature) {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.props
          .ChangeTemperature(thingName, inTemperature, this.state.macAddress)
          .then(() => this.afterChangeTemperatureAPI())
          .catch((e) =>
            showAlert(
              'It seems something went wrong on the server. Please try after some time.',
              300,
            ),
          );
      } else {
        showAlert(Strings.networkError, 300);
      }
    });
  }

  async afterChangeTemperatureAPI() {
    const {response} = this.props.responseChangeTemperature;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        const error_response = response.error_response;
        if (error_response.length > 0) {
          const message = await decryptValue(error_response[0].message);
          showAlert(message, 300);
        }
        const {iot_response} = response;
        const rowsAr = iot_response.rows;
        if (rowsAr.length > 0) {
          const rowsArr = rowsAr[0];
          const rst = await decryptValue(rowsArr.rst);
          if (rst === '') {
            const msg = await decryptValue(rowsArr.msg);
            showAlert(msg, 300);
          }
        } else {
          showAlert(Strings.serverError, 300);
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
          Set Temperature
        </Text>
        <Text allowFontScaling={false} style={styles.contentTemperaturePopup}>
          {this.state.popupViewText}
        </Text>
        <TouchableOpacity
          style={styles.btnCloseStyle}
          onPress={() => this.setState({isVisibleTemperaturePopup: false})}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().redColor},
            ]}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  temperaturePassword() {
    return (
      <View style={styles.temperaturePopup}>
        <Text allowFontScaling={false} style={styles.titleTemperaturePopup}>
          {Strings.txtSetTemp}
        </Text>
        <Text allowFontScaling={false} style={styles.contentTemperaturePopup}>
          {Strings.TempWarningDesc}
        </Text>

        <FormField
          refer={(instance) => {
            this.passwordField = instance;
          }}
          style={styles.setMarginTop}
          secureTextEntry={true}
          title={Strings.txtEnterPasswrd}
          hideTitle
          value={this.state.enterPassword}
          onPress={() => this.passwordField.focus()}
          onChangeText={(enterPassword) => {
            this.setState({enterPassword: enterPassword});
          }}
        />

        <TouchableOpacity
          style={styles.cancelPopup}
          onPress={() => this.setState({isVisibleTemperaturePassword: false})}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().cellTitleColor},
            ]}>
            {Strings.txtCancel}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnAcceptStyle}
          onPress={() => {
            this.acceptSetPassword();
          }}>
          <Text
            allowFontScaling={false}
            style={[
              styles.closeTemperaturePopup,
              {color: getColors().redColor},
            ]}>
            {Strings.txtAccept}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  async afterGetStatusDataAPI() {
    this.setState({statusRunning: false});

    const {response} = this.props.responseStatusData;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        const {iot_response} = response;

        if (iot_response !== '' && iot_response !== null) {
          const {error_codes} = iot_response;
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
          setConfiguration('errorInfoArray', errorInfoArray);

          var statusDataTemp;
          if (this.state.is_recirculation_compatible == 1) {
            statusDataTemp = [
              {
                icon: Assets.status,
                title: Strings.txtStatus,
                value: 'Connected',
              },
              {
                icon: Assets.errrorInfo,
                title: Strings.txtErrorInfo,
                value: this.state.error_code,
              },
              {
                icon: Assets.ststusBurnIcon,
                title: Strings.txtBurnTime,
                value: await decryptValue(iot_response.burn_time),
              },
              {
                icon: Assets.pluginTime,
                title: Strings.txtPluginTime,
                value: await decryptValue(iot_response.total_plug_in_time),
              },
              {
                icon: Assets.BurnTime,
                title: Strings.txtIgnitionTime,
                value: await decryptValue(iot_response.ignition_time),
              },
              {
                icon: Assets.total_usage_icon,
                title: Strings.txtTotalGasUsage,
                value: await decryptValue(iot_response.total_gas_uses),
              },
              {
                icon: Assets.scaleDetection,
                title: Strings.txtScaleBuildDetection,
                value: await decryptValue(
                  iot_response.scale_build_up_detection,
                ),
              },
              {
                icon: Assets.flowRate,
                title: Strings.txtFlowRate,
                value: await decryptValue(iot_response.flow_rate),
              },
              {
                icon: Assets.temprature,
                title: Strings.txtInletTemp,
                value: await decryptValue(iot_response.inlet_temperature),
              },

              {
                icon: Assets.statusDate,
                title: Strings.txtLastDescaleDate,
                value: await decryptValue(iot_response.last_descale_date), // mm-dd-yy
              },

              {
                icon: Assets.BurnTime,
                title: 'Pump operational period',
                value: await decryptValue(iot_response.pump_operation_period),
              },
              {
                icon: Assets.flowRate,
                title: 'Pump recirculation flow rate',
                value: await decryptValue(
                  iot_response.pump_recirculation_flow_rate,
                ),
              },
              {
                title: Strings.txtRefresh,
              },
            ];
          } else {
            statusDataTemp = [
              {
                icon: Assets.status,
                title: Strings.txtStatus,
                value: 'Connected',
              },
              {
                icon: Assets.errrorInfo,
                title: Strings.txtErrorInfo,
                value: this.state.error_code,
              },
              {
                icon: Assets.ststusBurnIcon,
                title: Strings.txtBurnTime,
                value: await decryptValue(iot_response.burn_time),
              },
              {
                icon: Assets.pluginTime,
                title: Strings.txtPluginTime,
                value: await decryptValue(iot_response.total_plug_in_time),
              },
              {
                icon: Assets.BurnTime,
                title: Strings.txtIgnitionTime,
                value: await decryptValue(iot_response.ignition_time),
              },
              {
                icon: Assets.total_usage_icon,
                title: Strings.txtTotalGasUsage,
                value: await decryptValue(iot_response.total_gas_uses),
              },
              {
                icon: Assets.scaleDetection,
                title: Strings.txtScaleBuildDetection,
                value: await decryptValue(
                  iot_response.scale_build_up_detection,
                ),
              },
              {
                icon: Assets.flowRate,
                title: Strings.txtFlowRate,
                value: await decryptValue(iot_response.flow_rate),
              },
              {
                icon: Assets.temprature,
                title: Strings.txtInletTemp,
                value: await decryptValue(iot_response.inlet_temperature),
              },

              {
                icon: Assets.statusDate,
                title: Strings.txtLastDescaleDate,
                value: await decryptValue(iot_response.last_descale_date), // mm-dd-yy
              },

              {
                title: Strings.txtRefresh,
              },
            ];
          }

          this.setState({
            statusData: statusDataTemp,
          });
        }
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  callGetEventData() {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.props
          .getEventData(this.state.thingName)
          .then(() => this.afterGetEventDataAPI())
          .catch((e) =>
            showAlert(
              'It seems something went wrong on the server. Please try after some time.',
              300,
            ),
          );
      } else {
        showAlert(Strings.networkError, 300);
      }
    });
  }

  async afterGetEventDataAPI() {
    const {response} = this.props.responseEventData;
    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        const error_response = response.error_response;
        if (error_response.length > 0) {
          const message = await decryptValue(error_response[0].message);
          showAlert(message, 300);
        }

        const {iot_response} = response;

        if (iot_response !== '' && iot_response !== null) {
          const EventsArray = [];
          // *********** First Object *************
          const {average_gas_use} = iot_response;
          const symbol_name = await decryptValue(iot_response.symbol_name);
          let datesArr = average_gas_use.dates;
          let valuesArray = average_gas_use.values;
          let {title} = average_gas_use;
          title = await decryptValue(title);

          var dates = [];
          for (let i = 0; i < datesArr.length; i += 1) {
            let date = datesArr[i];
            date = await decryptValue(date);
            dates.push(date);
          }

          var values = [];
          for (let i = 0; i < valuesArray.length; i += 1) {
            let value = valuesArray[i];
            value = await decryptValue(value);
            values.push(value);
          }

          EventsArray.push({
            label: title,
            value: title,
            title,
            values,
            dates,
          });

          // *********** Second Object *************
          const {average_water_use} = iot_response;
          datesArr = average_water_use.dates;
          valuesArray = average_water_use.values;
          title = average_water_use.title;
          title = await decryptValue(title);

          dates = [];
          for (let i = 0; i < datesArr.length; i += 1) {
            let date = datesArr[i];
            date = await decryptValue(date);
            dates.push(date);
          }

          values = [];
          for (let i = 0; i < valuesArray.length; i += 1) {
            let value = valuesArray[i];
            value = await decryptValue(value);
            values.push(value);
          }

          EventsArray.push({
            label: title,
            value: title,
            title,
            values,
            dates,
          });
          setTimeout(() => this.changeEvent('Average Water Used'), 1000);

          // *********** Third Object *************
          const {total_gas_used} = iot_response;
          datesArr = total_gas_used.dates;
          valuesArray = total_gas_used.values;
          title = total_gas_used.title;
          title = await decryptValue(title);

          dates = [];
          for (let i = 0; i < datesArr.length; i += 1) {
            let date = datesArr[i];
            date = await decryptValue(date);
            dates.push(date);
          }

          values = [];
          for (let i = 0; i < valuesArray.length; i += 1) {
            let value = valuesArray[i];
            value = await decryptValue(value);
            values.push(value);
          }

          EventsArray.push({
            label: title,
            value: title,
            values,
            dates,
          });

          this.setState({
            EventsArray,
            symbol_name,
          });
        }
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  controlTabPressed() {
    if (this.state.tabViewFlag === 0) {
      this.setState({tabViewFlag: 0.5});
    } else if (
      this.state.tabViewFlag === 0.5 &&
      this.state.selectedTabIndex === 0
    ) {
      this.setState({tabViewFlag: 0});
    } else if (this.state.tabViewFlag === 1) {
      this.setState({tabViewFlag: 0.5});
    }

    this.setState({
      selectedTabIndex: 0,
      showEventsPickerView: false,
    });
  }

  resetStatusTab() {
    var statusDataTemp;
    if (this.state.is_recirculation_compatible == 1) {
      statusDataTemp = [
        {
          icon: Assets.status,
          title: Strings.txtStatus,
          value: '',
        },
        {
          icon: Assets.errrorInfo,
          title: Strings.txtErrorInfo,
          value: '',
        },
        {
          icon: Assets.ststusBurnIcon,
          title: Strings.txtBurnTime,
          value: '',
        },
        {
          icon: Assets.pluginTime,
          title: Strings.txtPluginTime,
          value: '',
        },
        {
          icon: Assets.BurnTime,
          title: Strings.txtIgnitionTime,
          value: '',
        },
        {
          icon: Assets.total_usage_icon,
          title: Strings.txtTotalGasUsage,
          value: '',
        },
        {
          icon: Assets.scaleDetection,
          title: Strings.txtScaleBuildDetection,
          value: '',
        },
        {
          icon: Assets.flowRate,
          title: Strings.txtFlowRate,
          value: '',
        },
        {
          icon: Assets.temprature,
          title: Strings.txtInletTemp,
          value: '',
        },

        {
          icon: Assets.statusDate,
          title: Strings.txtLastDescaleDate,
          value: '', // mm-dd-yy
        },

        {
          icon: Assets.BurnTime,
          title: 'Pump operational period',
          value: '',
        },
        {
          icon: Assets.flowRate,
          title: 'Pump recirculation flow rate',
          value: '',
        },
        {
          title: Strings.txtRefresh,
        },
      ];
    } else {
      statusDataTemp = [
        {
          icon: Assets.status,
          title: Strings.txtStatus,
          value: '',
        },
        {
          icon: Assets.errrorInfo,
          title: Strings.txtErrorInfo,
          value: '',
        },
        {
          icon: Assets.ststusBurnIcon,
          title: Strings.txtBurnTime,
          value: '',
        },
        {
          icon: Assets.pluginTime,
          title: Strings.txtPluginTime,
          value: '',
        },
        {
          icon: Assets.BurnTime,
          title: Strings.txtIgnitionTime,
          value: '',
        },
        {
          icon: Assets.total_usage_icon,
          title: Strings.txtTotalGasUsage,
          value: '',
        },
        {
          icon: Assets.scaleDetection,
          title: Strings.txtScaleBuildDetection,
          value: '',
        },
        {
          icon: Assets.flowRate,
          title: Strings.txtFlowRate,
          value: '',
        },
        {
          icon: Assets.temprature,
          title: Strings.txtInletTemp,
          value: '',
        },

        {
          icon: Assets.statusDate,
          title: Strings.txtLastDescaleDate,
          value: '', // mm-dd-yy
        },

        {
          title: Strings.txtRefresh,
        },
      ];
    }

    this.setState({
      statusData: statusDataTemp,
    });
  }
  statusTabPressed() {
    if (this.state.tabViewFlag === 0) {
      this.setState({tabViewFlag: 0.5});
      this.resetStatusTab();
      this.callGetStatusData();
    } else if (
      this.state.tabViewFlag === 0.5 &&
      this.state.selectedTabIndex === 1
    ) {
      this.setState({tabViewFlag: 0});
    } else if (
      this.state.tabViewFlag === 0.5 &&
      this.state.selectedTabIndex !== 1
    ) {
      this.resetStatusTab();
      this.callGetStatusData();
    } else if (this.state.tabViewFlag === 1) {
      this.setState({tabViewFlag: 0.5});
    }
    this.setState({
      selectedTabIndex: 1,
      showEventsPickerView: false,
    });
  }

  async acceptSetPassword() {
    if (this.state.enterPassword == '') {
      showAlert(Strings.enterPassword, 300);
      return;
    }
    this.setState({isVisibleTemperaturePassword: false});

    const output = await md5(this.state.enterPassword);
    const serverPassword = getConfiguration('serverPassword');

    if (output == serverPassword) {
      this.setState({setPassword: true});
      setTimeout(() => this.setState({setPassword: false}), 900000);

      this.callChangeTemperatureAPI(
        this.state.thingName,
        this.state.sliderTemp,
      );
    } else {
      showAlert(Strings.invalidPassword, 300);
    }
  }

  async acceptOnTimeSetPassword() {
    if (this.state.enterPassword == '') {
      showAlert(Strings.enterPassword, 300);
      return;
    }
    const output = await md5(this.state.enterPassword);
    const serverPassword = getConfiguration('serverPassword');

    if (output == serverPassword) {
      this.setState({isVisibleOnSetTimePassword: false});
      this.callInstantReserveAPI(this.state.thingName);
      //  this.setState({setPassword: true});
      //  setTimeout(() => this.setState({setPassword: false}), 900000);
    } else {
      showAlert(Strings.invalidPassword, 300);
    }
  }

  async acceptOffTimeSetPassword() {
    if (this.state.enterPassword == '') {
      showAlert(Strings.enterPassword, 300);
      return;
    }
    const output = await md5(this.state.enterPassword);
    const serverPassword = getConfiguration('serverPassword');

    if (output == serverPassword) {
      this.setState({isVisibleOffSetTimePassword: false});

      //  this.setState({setPassword: true});
      //  setTimeout(() => this.setState({setPassword: false}), 900000);
    } else {
      showAlert(Strings.invalidPassword, 300);
    }
  }
  dataUsageTabPressed() {
    if (this.state.tabViewFlag === 0) {
      this.setState({tabViewFlag: 0.5, graphData: []});
      this.callGetEventData();
    } else if (
      this.state.tabViewFlag === 0.5 &&
      this.state.selectedTabIndex === 2
    ) {
      this.setState({tabViewFlag: 0});
    } else if (
      this.state.tabViewFlag === 0.5 &&
      this.state.selectedTabIndex !== 2
    ) {
      this.setState({graphData: []});
      this.callGetEventData();
    } else if (this.state.tabViewFlag === 1) {
      this.setState({tabViewFlag: 0.5});
    }
    this.setState({
      selectedTabIndex: 2,
      showEventsPickerView: false,
    });
  }

  callGetMaintainence() {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.setState({maintainenceRunning: true, counter: 30});
        let myInterval = setInterval(() => {
          if (this.state.counter > 0 && this.state.maintainenceRunning) {
            this.setState({
              counter: this.state.counter - 1,
            });
          }
        }, 1000);
        this.props
          .getMaintainenceData(
            this.state.thingName,
            this.state.WH01,
            this.state.MRC,
            this.state.CanadaBit,
          )
          .then(() => {
            clearInterval(myInterval);
            this.afterGetMaintainenceDataAPI();
          })
          .catch(() => {
            clearInterval(myInterval);
            this.setState({maintainenceRunning: false});
          });
      } else {
        showAlert(Strings.networkError, 300);
      }
    });
  }
  async afterGetMaintainenceDataAPI() {
    this.setState({maintainenceRunning: false});

    const {response} = this.props.responseMaintainenceData;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        const recirculation = response.recirculation;
        const data = recirculation.data;
        if (data.length != 0) {
          const auto_toggle_state = await decryptValue(data.auto_toggle_state);
          const auto_toggle_value = await decryptValue(data.auto_toggle_value);
          const ondemand_toggle_state = await decryptValue(
            data.ondemand_toggle_state,
          );
          const ondemand_toggle_value = await decryptValue(
            data.ondemand_toggle_value,
          );
          const recirc_toggle_state = await decryptValue(
            data.recirc_toggle_state,
          );
          const recirc_toggle_value = await decryptValue(
            data.recirc_toggle_value,
          );

          const ondemand_duration = await decryptValue(data.ondemand_duration);
          const ondemand_start_time = await decryptValue(
            data.ondemand_start_time,
          );

          const timer_scale_state = await decryptValue(data.timer_scale_state);

          //  const timezone = await decryptValue(data.timezone);

          const timer_section = await decryptValue(data.timer_section);

          const cross_over = await decryptValue(data.cross_over);
          //  const enable_dst = await decryptValue(data.enable_dst);
          const mode = await decryptValue(data.recirculation_mode);
          //   const video_link = await decryptValue(data.video_link);
          //   const video_mode = await decryptValue(data.video_mode);
          //   const description = await decryptValue(data.description);

          if (mode == 13 || mode == 23) {
            this.setState({recircIconShow: true});
          } else if (mode == 14 || mode == 24 || mode == 21 || mode == 11) {
            this.setState({recircIconShow: false});
          } else if (mode == 12 || mode == 22) {
          }

          this.setState({
            auto_toggle_state: auto_toggle_state,
            auto_toggle_value: auto_toggle_value,
            ondemand_toggle_state: ondemand_toggle_state,
            ondemand_toggle_value: ondemand_toggle_value,
            recirc_toggle_state: recirc_toggle_state,
            recirc_toggle_value: recirc_toggle_value,
            timer_section: timer_section,
            ondemand_duration: ondemand_duration,
            ondemand_start_time: ondemand_start_time,
            isRefreshHit: true,
            timer_scale_state: timer_scale_state,
            // sel_timezone: timezone,
            cross_over: cross_over,
            mode: mode,
            isRefreshDone: true,
            // video_link: video_link,
            // video_mode: video_mode,
            // recirculation_description: description,
            // enable_dst: enable_dst,
          });

          this.callGetInstantInfoAPI(this.state.thingName);
        } else {
          this.setState({
            auto_toggle_state: 0,
            auto_toggle_value: 0,
            ondemand_toggle_state: 0,
            ondemand_toggle_value: 0,
            recirc_toggle_state: 0,
            recirc_toggle_value: 0,
            timer_section: 0,
          });
        }
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }

    // if (response != null) {
    //   let resCode = response.responseCode;
    //   resCode = await decryptValue(resCode);
    //   if (resCode == 200) {
    //     console.log('afterGetMaintainenceDataAPI response--', response);

    //     this.checkRecircData();
    //   } else {
    //     let resMessage = response.responseMessage;
    //     resMessage = await decryptValue(resMessage);
    //     showAlert(resMessage, 300);
    //   }
    // }
  }

  callGetStatusData() {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.setState({statusRunning: true});
        this.props
          .getStatusData(
            this.state.thingName,
            this.state.WH01,
            this.state.MRC,
            this.state.CanadaBit,
          )
          .then(() => this.afterGetStatusDataAPI())
          .catch(() => this.setState({statusRunning: false}));
      } else {
        showAlert(Strings.networkError, 300);
      }
    });
  }

  async afterGetConfigdataAPI() {
    const {response} = this.props.responseGetConfig;
    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        const {iot_response} = response;
        const MRC = await decryptValue(iot_response.MRC);
        const CanadaBit = await decryptValue(iot_response.CanadaBit);
        const MaxTempSet = await decryptValue(iot_response.MaxTempSet);
        const MinTempSet = await decryptValue(iot_response.MinTempSet);
        const WH01 = await decryptValue(iot_response.WH01);
        const {Temp_block} = iot_response;

        setConfiguration('WH01', WH01);
        setConfiguration('selectedHeaterMax', MaxTempSet);
        setConfiguration('selectedHeaterMin', MinTempSet);

        const tempArray = [];
        for (let i = 0; i < Temp_block.length; i += 1) {
          const val = await decryptValue(Temp_block[i]);
          tempArray.push(val);
        }

        this.setState({
          MRC,
          CanadaBit,
          WH01,
          Temp_block: tempArray,
        });

        if (CanadaBit === '0' || (WH01 === 'WZ' && MRC === 'VV')) {
          this.setState({
            maxValue: 120,
            valueInCelcius: false,
            popupViewText:
              '120°F is the recommended temp. setting. Increasing the temp. will not provide hot water faster to any fixture. Raising the temp. will reduce the overall performance of your tankless.\nHot Water Heater temperatures over 125°F (52°C) can cause severe burns instantly or even critical scalding.',
          });
        } else {
          // celcius
          this.setState({
            maxValue: 55,
            valueInCelcius: true,
            popupViewText:
              '55°C is the recommended temp. setting. Increasing the temp. will not provide hot water faster to any fixture. Raising the temp. will reduce the overall performance of your tankless.\nHot Water Heater temperatures over 125°F (52°C) can cause severe burns instantly or even critical scalding.',
          });
        }

        const error_response = response.error_response;
        if (error_response.length > 0) {
          const message = await decryptValue(error_response[0].message);
          showAlert(message, 300);
        }
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  callGetConfig(thingName) {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.props
          .getConfigdata(thingName)
          .then(() => this.afterGetConfigdataAPI())
          .catch((e) =>
            showAlert(
              'It seems something went wrong on the server. Please try after some time.',
              300,
            ),
          );
      } else {
        showAlert(Strings.networkError, 300);
      }
    });
  }

  async parseMetadata() {
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
        let heaterName = '';
        let thingName = '';
        let heater_image = '';
        let macAddress = '';
        let is_recirculation_compatible = 0;

        const Heater_modelsArr = miscData.Heater_models;
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
            macAddress: await decryptValue(dict.macAddress),
            is_usage_data_compatible: await decryptValue(
              dict.is_usage_data_compatible,
            ),

            is_recirculation_compatible: await decryptValue(
              dict.is_recirculation_compatible,
            ),
          };

          if (Last_connected === '1') {
            setConfiguration('selectedHeater', objHeater);
            heaterName = await decryptValue(dict.heater_label);
            thingName = await decryptValue(dict.inThing);
            setConfiguration('thingName', thingName);
            macAddress = await decryptValue(dict.macAddress);
            let is_usage_data_compatible = await decryptValue(
              dict.is_usage_data_compatible,
            );

            heater_image = await decryptValue(dict.image);

            is_recirculation_compatible = await decryptValue(
              dict.is_recirculation_compatible,
            );

            this.setState({
              macAddress: macAddress,
            });
            this.setState({
              heaterName,
              thingName,
              heater_image,
              is_recirculation_compatible,
              heaterCompatible:
                is_usage_data_compatible == 1 || is_usage_data_compatible == '1'
                  ? true
                  : false,
            });
          }

          userConnectedHeaters.push(objHeater);
        }

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
            body: await decryptValue(dict.text),
            expanded: false,
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
        setConfiguration('userConnectedHeaters', userConnectedHeaters);
        this.setState({
          userConnectedHeaters,
        });

        this.callGetConfig(thingName);
        if (is_recirculation_compatible == 1) {
          this.isAddSlot = false;
          this.callGetInstantInfoAPI(thingName);
        }
        setTimeout(() => this.callGetCurrentTemp(), 3000);
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  callGetCurrentTemp() {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (this.homeScreenActive) {
          this.props
            .getCurrentTemperature(this.state.thingName)
            .then(() => this.afterGetCurrentTemperatureAPI())
            .catch(() => setTimeout(() => this.callGetCurrentTemp(), 1000));
        } else {
          setTimeout(() => this.callGetCurrentTemp(), 10000);
        }
      } else {
        if (this.homeScreenActive) {
          showAlert(Strings.networkError, 300);
        }
      }
    });
  }

  async afterGetCurrentTemperatureAPI() {
    const {response} = this.props.responseGetCUrrentTemp;
    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        var connection_status = await decryptValue(response.connection_status);
        var error_code = await decryptValue(response.error_code);
        const error_status = await decryptValue(response.error_status);

        if (connection_status === '0') {
          this.setState({
            txtHeaterStatus: 'Not Connected',
          });
        } else {
          this.setState({
            txtHeaterStatus: 'Connected',
          });
        }

        if (error_status === '0') {
          this.setState({
            isErrorExist: true,
          });
        } else {
          this.setState({
            isErrorExist: false,
          });
        }
        const iotResponse = response.iot_response;
        const rowsAr = iotResponse.rows;
        if (rowsAr.length > 0) {
          const rowsArr = rowsAr[0];

          const CanadaBit = await decryptValue(rowsArr.CanadaBit);

          if (
            CanadaBit === '0' ||
            (this.state.WH01 === 'WZ' && this.state.MRC === 'VV')
          ) {
            this.setState({
              popupViewText:
                '120°F is the recommended temp. setting. Increasing the temp. will not provide hot water faster to any fixture. Raising the temp. will reduce the overall performance of your tankless.\nHot Water Heater temperatures over 125°F (52°C) can cause severe burns instantly or even critical scalding.',
            });
          } else {
            // celcius
            this.setState({
              popupViewText:
                '55°C is the recommended temp. setting. Increasing the temp. will not provide hot water faster to any fixture. Raising the temp. will reduce the overall performance of your tankless.\nHot Water Heater temperatures over 125°F (52°C) can cause severe burns instantly or even critical scalding.',
            });
          }

          const HotWaterTemp = await decryptValue(rowsArr.HotWaterTemp);

          this.setState({
            currentTemperature: HotWaterTemp,
          });

          const OperatingState = await decryptValue(rowsArr.OperatingState);

          if (this.state.powerUnderProcess) {
          } else if (OperatingState == '1') {
            this.setState({
              power: true,
            });
          } else {
            this.setState({
              power: false,
            });
          }
          let value = 0;
          if (this.state.Temp_block.length > 0) {
            const MaxVal =
              this.state.Temp_block[this.state.Temp_block.length - 1];
            let MinVal = this.state.Temp_block[0];
            if (MaxVal == MinVal) {
              MinVal = 0;
            }
            const difference = MaxVal - MinVal;

            const current = HotWaterTemp - MinVal;
            value = current / difference;
          }

          this.setState({
            value,
            error_code,
            sliderKey: this.state.sliderKey + 1,
          });
        }

        const error_response = response.error_response;
        if (error_response.length > 0) {
          const message = await decryptValue(error_response[0].message);
          if (this.showTempErrorMessage == true) {
            this.showTempErrorMessage = false;
            showAlert(message, 300);
          }
        }

        // if (this.state.is_recirculation_compatible == 1) {
        //   const recirculation = response.recirculation;
        //   const data = recirculation.data;
        //   if (data.length != 0) {
        //     console.log('recirculation --', data);
        //     const auto_toggle_state = await decryptValue(
        //       data.auto_toggle_state,
        //     );
        //     const auto_toggle_value = await decryptValue(
        //       data.auto_toggle_value,
        //     );
        //     const ondemand_toggle_state = await decryptValue(
        //       data.ondemand_toggle_state,
        //     );
        //     const ondemand_toggle_value = await decryptValue(
        //       data.ondemand_toggle_value,
        //     );
        //     const recirc_toggle_state = await decryptValue(
        //       data.recirc_toggle_state,
        //     );
        //     const recirc_toggle_value = await decryptValue(
        //       data.recirc_toggle_value,
        //     );
        //     const timer_section = await decryptValue(data.timer_section);
        //     console.log('auto_toggle_state--', auto_toggle_state);
        //     console.log('auto_toggle_value--', auto_toggle_value);
        //     console.log('ondemand_toggle_state--', ondemand_toggle_state);
        //     console.log('ondemand_toggle_value--', ondemand_toggle_value);
        //     console.log('recirc_toggle_state--', recirc_toggle_state);
        //     console.log('recirc_toggle_value--', recirc_toggle_value);
        //     console.log('timer_section--', timer_section);

        //     this.setState({
        //       auto_toggle_state: auto_toggle_state,
        //       auto_toggle_value: auto_toggle_value,
        //       ondemand_toggle_state: ondemand_toggle_state,
        //       ondemand_toggle_value: ondemand_toggle_value,
        //       recirc_toggle_state: recirc_toggle_state,
        //       recirc_toggle_value: recirc_toggle_value,
        //       timer_section: timer_section,
        //     });
        //   } else {
        //     console.log('recirculation empty --', data);
        //   }
        // } else {
        //   this.setState({
        //     auto_toggle_state: 0,
        //     auto_toggle_value: 0,
        //     ondemand_toggle_state: 0,
        //     ondemand_toggle_value: 0,
        //     recirc_toggle_state: 0,
        //     recirc_toggle_value: 0,
        //     timer_section: 0,
        //   });
        // }
      } else {
        this.setState({
          txtHeaterStatus: Strings.txtNotConnected,
        });
      }
    }

    setTimeout(() => this.callGetCurrentTemp(), 10000);
  }

  bottomView() {
    return (
      <Animatable.View
        transition="height"
        style={{
          height:
            this.state.tabViewFlag === 0.5
              ? hp('45%')
              : this.state.tabViewFlag === 1
              ? hp('84.04%')
              : 0,
          backgroundColor: getColors().innerViewBackgroundColor,
        }}>
        {this.state.selectedTabIndex <= 1 ? (
          <View
            style={{
              overflow: 'hidden',
              height:
                this.state.tabViewFlag === 0.5
                  ? hp('45%')
                  : this.state.tabViewFlag === 1
                  ? hp('84.04%')
                  : 0,
            }}>
            <View style={styles.tabbarUnderline}>
              <View
                style={{
                  width: this.state.heaterCompatible
                    ? this.state.selectedTabIndex === 0 ||
                      this.state.selectedTabIndex === 1
                      ? '30%'
                      : '40%'
                    : '50%',
                  height: '100%',
                  backgroundColor: getColors().redColor,
                  position: 'absolute',
                  top: 0,
                  left: this.state.heaterCompatible
                    ? this.state.selectedTabIndex * wp('30%')
                    : this.state.selectedTabIndex * wp('50%'),
                }}
              />
            </View>

            {this.state.selectedTabIndex === 0 ? this.controlTabView() : null}
            <Animatable.View ref={this.handleViewRef}>
              {this.state.selectedTabIndex === 1
                ? this.state.heaterType == 0
                  ? this.statusTabView()
                  : this.systemStatusTabView()
                : null}
            </Animatable.View>
            {/* {this.state.selectedTabIndex === 2 ? this.dataUsageTabView() : null} */}
          </View>
        ) : (
          <GestureRecognizer
            onSwipeDown={() => this.onSwipeDown()}
            onSwipeUp={() => this.onSwipeUp()}
            style={{
              overflow: 'hidden',
              height:
                this.state.tabViewFlag === 0.5
                  ? hp('45%')
                  : this.state.tabViewFlag === 1
                  ? hp('84.04%')
                  : 0,
            }}>
            <View style={styles.tabbarUnderline}>
              <View
                style={{
                  width:
                    this.state.selectedTabIndex === 0 ||
                    this.state.selectedTabIndex === 1
                      ? '30%'
                      : '40%',
                  height: '100%',
                  backgroundColor: getColors().redColor,
                  position: 'absolute',
                  top: 0,
                  left: this.state.selectedTabIndex * wp('30%'),
                }}
              />
            </View>

            {this.state.selectedTabIndex === 0 ? this.controlTabView() : null}
            {this.state.selectedTabIndex === 2 ? this.dataUsageTabView() : null}
          </GestureRecognizer>
        )}
      </Animatable.View>
    );
  }

  changeSliderValue(value) {
    let leftVal = value * 100;
    leftVal -= wp('2%');
    // if (leftVal < 10) {
    //   leftVal = 10
    // }
    if (leftVal > 90) {
      leftVal = 90;
    }

    leftVal = `${leftVal.toString()}%`;

    this.setState({
      bubbleLeftVal: leftVal,
      showTempBubble: true,
    });

    const MaxVal = this.state.Temp_block[this.state.Temp_block.length - 1];
    const MinVal = this.state.Temp_block[0];
    const difference = MaxVal - MinVal;
    let value2 = difference * value;
    value2 = parseInt(MinVal, 10) + value2;
    value2 = parseInt(value2, 10);

    for (let j = this.state.Temp_block.length - 1; j >= 0; j -= 1) {
      const obj = this.state.Temp_block[j];

      if (value2 >= obj) {
        value2 = obj;
        break;
      }
    }
    this.setState({sliderTemp: value2});
  }

  changeHeatingSliderValue(value) {
    let leftVal = value * 100;
    leftVal -= wp('2%');
    // if (leftVal < 10) {
    //   leftVal = 10
    // }
    if (leftVal > 90) {
      leftVal = 90;
    }

    leftVal = `${leftVal.toString()}%`;

    this.setState({
      bubbleLeftVal: leftVal,
      showHeatBubble: true,
      heatingValue: value,
    });

    const MaxVal = this.state.Temp_block[this.state.Temp_block.length - 1];
    const MinVal = this.state.Temp_block[0];
    const difference = MaxVal - MinVal;
    let value2 = difference * value;
    value2 = parseInt(MinVal, 10) + value2;
    value2 = parseInt(value2, 10);

    for (let j = this.state.Temp_block.length - 1; j >= 0; j -= 1) {
      const obj = this.state.Temp_block[j];

      if (value2 >= obj) {
        value2 = obj;
        break;
      }
    }
    this.setState({sliderTemp: value2});
  }

  endHeatTempSlider() {
    this.setState({
      showHeatBubble: false,
      enterPassword: '',
      isVisiblePasswordView: true,
    });
  }

  endDragHandle() {
    this.setState({
      showTempBubble: false,
      enterPassword: '',
    });
    if (
      parseInt(this.state.sliderTemp, 10) > this.state.maxValue &&
      this.state.setPassword == false
    ) {
      if (
        parseInt(this.state.currentTemperature, 10) >
        parseInt(this.state.sliderTemp, 10)
      ) {
        this.callChangeTemperatureAPI(
          this.state.thingName,
          this.state.sliderTemp,
        );

        return;
      }
      this.setState({isVisibleTemperaturePassword: true});
    } else {
      this.callChangeTemperatureAPI(
        this.state.thingName,
        this.state.sliderTemp,
      );
    }
  }

  openHelpfulTipsScreen() {
    this.props.navigation.navigate('HelpfulTips');
    this.homeScreenActive = false;
    this.setState({showEventsPickerView: false});
  }

  openRecirculationTutorialScreen() {
    setConfiguration('video_link', this.state.video_link);
    setConfiguration('video_mode', this.state.video_mode);
    setConfiguration('mode', this.state.mode);
    setConfiguration(
      'recirculation_description',
      this.state.recirculation_description,
    );

    this.props.navigation.navigate('RecirculationTutorial');
    this.homeScreenActive = false;
    this.setState({showEventsPickerView: false});
  }

  openTermsAndConditionScreen() {
    this.props.navigation.navigate('TermsAndCondition');
    this.homeScreenActive = false;
    this.setState({showEventsPickerView: false});
  }

  logoutPress() {
    Alert.alert(
      '',
      Strings.logoutWarning,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            this.props.navigation.navigate('Login');
            this.homeScreenActive = false;
          },
        },
      ],
      {cancelable: false},
    );

    this.setState({showEventsPickerView: false});
  }

  openEditProfileScreen() {
    this.props.navigation.navigate('EditProfile');
    this.homeScreenActive = false;
    this.setState({showEventsPickerView: false});
  }

  openEditHeaterScreen() {
    this.props.navigation.navigate('EditHeaterDetails');
    this.homeScreenActive = false;
    this.setState({showEventsPickerView: false});
  }

  openAddHeaterScreen() {
    this.props.navigation.navigate('AddHeater');
    this.homeScreenActive = false;
    this.setState({showEventsPickerView: false});
  }

  openTimeZoneScreen() {
    setConfiguration('selTimeZone', this.state.sel_timezone);
    if (this.state.enable_dst == 1) {
      setConfiguration('enable_dst', true);
    } else {
      setConfiguration('enable_dst', false);
    }

    //enable_dst
    this.props.navigation.navigate('TimeZone');
    this.homeScreenActive = false;
    this.setState({showEventsPickerView: false});
  }

  openScheduleScreen() {
    this.props.navigation.navigate('Schedule');
    this.homeScreenActive = false;
    this.setState({showEventsPickerView: false});
  }

  openTutorialScreen() {
    const selectedHeater = getConfiguration('selectedHeater');
    setConfiguration('isComeFromSettings', true);
    setConfiguration('heaterNameNew', selectedHeater.model_name);
    setConfiguration('heaterID', selectedHeater.serial_number);

    setConfiguration('update', '1');
    this.props.navigation.navigate('Tutorial');
    this.homeScreenActive = false;
    this.setState({showEventsPickerView: false});
  }

  openErrorInfoScreen(error) {
    if (error !== '' && error !== null && error !== 'Normal') {
      this.props.navigation.navigate('ErrorInfo');
      this.homeScreenActive = false;
      this.setState({showEventsPickerView: false});
    }
  }

  changeHeater(selectedHeater) {
    this.setState({
      is_recirculation_compatible: 0,
      video_link: '',
      video_mode: '',
      cross_over: 0,
      recircIconShow: false,
      recirculation_description: '',
      mode: 0,
      slots: [],
      heaterCompatible: false,
      symbol_name: '',
      auto_toggle_state: 0,
      auto_toggle_value: 0,
      ondemand_toggle_state: 0,
      ondemand_toggle_value: 0,
      recirc_toggle_state: 0,
      recirc_toggle_value: 0,
      timer_scale_state: 0,
      sel_timezone: '',
      timer_section: 0,
    });

    this.setState({tabViewFlag: 0});
    const user_id = getConfiguration('user_id');
    this.callChangeHeaterWebservice(
      selectedHeater.heater_id,
      user_id,
      selectedHeater,
    );
    // this.showAlert(user_id, 300);
  }

  changeEvent(event) {
    let graphData = [];
    for (let i = 0; i < this.state.EventsArray.length; i += 1) {
      const objEvent = this.state.EventsArray[i];
      if (objEvent.label === event) {
        graphData = objEvent.values;
        break;
      }
    }
    this.setState({
      event,
      graphData,
    });
  }

  callChangeHeaterWebservice(heater_id, user_id, selectedHeater) {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.props
          .changeHeater(heater_id, user_id)
          .then(() => this.afterChangeHeaterAPI(selectedHeater))
          .catch((e) =>
            showAlert(
              'It seems something went wrong on the server. Please try after some time.',
              300,
            ),
          );
      } else {
        showAlert(Strings.networkError, 300);
      }
    });
  }

  getOndemandSliderValue(value) {
    let val = parseInt(value);
    this.setState({
      ondemandValue: value,
      ondemandSelMinutes: val,
    });
  }

  async afterChangeHeaterAPI(selectedHeater) {
    const {response} = this.props.responseChangeHeater;

    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        setConfiguration('selectedHeater', selectedHeater);

        const heater_image = selectedHeater.image;
        const heaterName = selectedHeater.heater_label;
        const thingName = selectedHeater.inThing;
        const macAddressUpdated = selectedHeater.macAddress;

        const is_usage_data_compatible =
          selectedHeater.is_usage_data_compatible;

        const is_recirculation_compatible =
          selectedHeater.is_recirculation_compatible;

        this.setState({
          macAddress: macAddressUpdated,
          is_recirculation_compatible: is_recirculation_compatible,
          heaterCompatible:
            is_usage_data_compatible == 1 || is_usage_data_compatible == '1'
              ? true
              : false,
        });

        this.setState({
          heater_image,
          heaterName,
          thingName,
        });

        const {iot_response} = response;

        const MRC = await decryptValue(iot_response.MRC);
        const WH01 = await decryptValue(iot_response.WH01);
        const {Temp_block} = iot_response;
        setConfiguration('WH01', WH01);

        const tempArray = [];
        for (let i = 0; i < Temp_block.length; i += 1) {
          const val = await decryptValue(Temp_block[i]);
          tempArray.push(val);
        }

        this.setState({
          MRC,
          WH01,
          Temp_block: tempArray,
        });

        setTimeout(() => this.checkRecircData(), 1000);

        if (is_recirculation_compatible == 1) {
          this.setState({
            recirc_toggle_state: true,
          });
          setTimeout(() => this.callGetMaintainence(), 500);
        }
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
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
              isBack={this.state.openSettings}
              onBackClick={() => this.setState({openSettings: false})}
              nav={this.props.navigation}
              heaterName={this.state.heaterName}
              heater_image={this.state.heater_image}
              heater_list={this.state.userConnectedHeaters}
              onClick={(selectedHeater) => this.changeHeater(selectedHeater)}
              userConnectedHeaters={this.state.userConnectedHeaters}
            />
            <GestureRecognizer
              onSwipeDown={() => this.onSwipeDown()}
              onSwipeUp={() => this.onSwipeUp()}
              style={[styles.innerContainer]}>
              <Image
                resizeMode="cover"
                source={Assets.homeBG}
                style={styles.homeBGImage}
              />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: this.state.tabViewFlag == 0 ? -100 : 0,
                }}>
                <Animatable.View
                  transition="opacity"
                  duration={500}
                  style={{
                    flexDirection: 'row',
                    opacity: this.state.openSettings ? 0.1 : 1.0,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtTemperature}>
                    {this.state.currentTemperature}
                  </Text>
                  {this.state.currentTemperature !== '--' &&
                  this.state.currentTemperature != null ? (
                    <Text allowFontScaling={false} style={styles.txtDegree}>
                      °
                    </Text>
                  ) : null}
                </Animatable.View>
                {!this.state.openSettings && this.state.tabViewFlag == 0 ? (
                  <TouchableOpacity onPress={() => this.showTemperaturePopup()}>
                    <Image
                      resizeMode="contain"
                      source={Assets.imgSetTemperature}
                      style={styles.setTemperatureImage}
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.blankViewStyle} />
                )}
              </View>
              {!this.state.openSettings ? (
                <View style={styles.connectedView}>
                  <Image
                    resizeMode="contain"
                    source={Assets.greenDott}
                    style={styles.dotImage}
                  />
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.txtConnected,
                      {color: getColors().whiteColor},
                    ]}>
                    {this.state.txtHeaterStatus}
                  </Text>
                </View>
              ) : null}

              <View style={styles.burnView}>
                {this.state.isErrorExist ? (
                  <View style={styles.statusView}>
                    <Image
                      resizeMode="contain"
                      source={Assets.warning}
                      style={styles.btnSettings}
                    />
                  </View>
                ) : (
                  <View style={styles.statusView}>
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.txtConnected,
                        {color: getColors().whiteColor},
                      ]}>
                      Status :
                    </Text>
                    <Image
                      resizeMode="contain"
                      source={Assets.greenDott}
                      style={styles.dotImage}
                    />
                  </View>
                )}

                <View style={{flexDirection: 'row'}}>
                  {(this.state.cross_over == 1 ||
                    this.state.cross_over == '1') &&
                  this.state.is_recirculation_compatible == 1 ? (
                    <Image
                      resizeMode="contain"
                      source={Assets.cov}
                      style={[styles.btnSettings, {marginRight: 20}]}
                    />
                  ) : null}

                  {this.state.power ? (
                    <Image
                      resizeMode="contain"
                      source={Assets.hotIcon}
                      style={styles.btnSettings}
                    />
                  ) : null}

                  {this.state.recircIconShow == true ? (
                    <Image
                      resizeMode="contain"
                      source={Assets.recirc}
                      style={[styles.btnSettings, {marginLeft: 20}]}
                    />
                  ) : null}
                </View>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      openSettings: !this.state.openSettings,
                    });
                    this.onSwipeDown();
                  }}
                  style={styles.settingsBtn}>
                  <Image
                    resizeMode="contain"
                    source={Assets.settingsIcon}
                    style={styles.btnSettings}
                  />
                </TouchableOpacity>
              </View>

              {this.settingsView()}
            </GestureRecognizer>
            {this.bottomTabBar()}
            {this.bottomView()}

            <PickerView
              refer={(instance) => {
                this.statePicker = instance;
              }}
              data={this.state.EventsArray}
              selectedValue={this.state.event}
              onValueChange={(itemValue) => this.changeEvent(itemValue)}
              showPickerView={this.state.showEventsPickerView}
              onDonePress={() => this.setState({showEventsPickerView: false})}
            />

            <PickerView
              refer={(instance) => {
                this.unitPicker = instance;
              }}
              data={this.state.unitsArray}
              selectedValue={this.state.event}
              // onValueChange={itemValue => this.changeEvent(itemValue)}
              showPickerView={this.state.showUnitsPickerView}
              onDonePress={() => this.setState({showUnitsPickerView: false})}
            />

            <TimePickerView
              refer={(instance) => {
                this.statePicker = instance;
              }}
              showPickerView={this.state.showTimePickerView}
              onCancelPress={() => this.setState({showTimePickerView: false})}
              onDonePress={(hours, minutes, ampm, hours2, minutes2, ampm2) => {
                this.setState({showTimePickerView: false});

                this.setState({
                  onSetTimeStart: hours + ' ' + ampm.toUpperCase(),
                  onSetTimeEnd: hours2 + ' ' + ampm2.toUpperCase(),
                  onStart: hours,
                  onEnd: hours2,
                });
                this.setState({
                  isVisibleOnSetTimePassword: true,
                  enterPassword: '',
                });
                // this.isAddSlot = true;
                //this.callGetInstantInfoAPI(this.state.thingName);
              }}
            />

            <Dialog
              visible={this.state.isVisibleTemperaturePopup}
              rounded={false}
              onTouchOutside={() => {
                this.setState({isVisibleTemperaturePopup: false});
              }}>
              <DialogContent style={styles.setPadding}>
                {this.temperaturePopupContent()}
              </DialogContent>
            </Dialog>

            <Dialog
              visible={this.state.isVisibleTemperaturePassword}
              rounded={false}
              onTouchOutside={() => {
                this.setState({isVisibleTemperaturePassword: false});
              }}>
              <DialogContent style={styles.setPadding}>
                {this.temperaturePassword()}
              </DialogContent>
            </Dialog>

            <Dialog
              visible={this.state.isVisibleOnSetTimePassword}
              rounded={false}
              onTouchOutside={() => {
                this.setState({isVisibleOnSetTimePassword: false});
              }}>
              <DialogContent style={styles.setPaddingZero}>
                {this.onSetTimePassword()}
              </DialogContent>
            </Dialog>

            <Dialog
              visible={this.state.isVisibleOffSetTimePassword}
              rounded={false}
              onTouchOutside={() => {
                this.setState({isVisibleOffSetTimePassword: false});
              }}>
              <DialogContent style={styles.setPadding}>
                {this.offSetTimePassword()}
              </DialogContent>
            </Dialog>

            <Dialog
              visible={this.state.isVisiblePasswordView}
              rounded={false}
              onTouchOutside={() => {
                this.setState({isVisiblePasswordView: false});
              }}>
              <DialogContent style={styles.setPadding}>
                {this.passwordView()}
              </DialogContent>
            </Dialog>

            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: 'black',
                opacity: 0.3,
                height: this.state.isShowOndemandRuntimePopup ? hp('100%') : 0,
              }}></View>
            <Animatable.View
              transition="height"
              duration={500}
              style={{
                width: '100%',
                height: this.state.isShowOndemandRuntimePopup ? 300 : 0,
                position: 'absolute',
                bottom: 0,
                left: 0,
                backgroundColor: getColors().screenBackground,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  resizeMode="contain"
                  source={Assets.ondemandTimerIcon}
                  style={[
                    {
                      width: wp('5%'),
                      height: wp('5%'),
                      marginLeft: 20,
                      marginTop: 20,
                    },
                  ]}
                />

                <Text
                  allowFontScaling={false}
                  style={[
                    styles.titleTemperaturePopup,
                    {marginHorizontal: 20},
                  ]}>
                  On Demand Mode
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: wp('100%') - 40,
                  marginLeft: 20,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    resizeMode="contain"
                    source={Assets.timerModeIcon}
                    style={[styles.cellIcon, {marginTop: 25, marginLeft: 0}]}
                  />
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.titleTemperaturePopup,
                      {marginTop: 25, marginLeft: 10, textAlign: 'right'},
                    ]}>
                    Timer
                  </Text>
                </View>

                <Text
                  allowFontScaling={false}
                  style={[
                    styles.titleTemperaturePopup,
                    {marginTop: 25, textAlign: 'right', color: 'red'},
                  ]}>
                  {this.state.ondemandSelMinutes}m
                </Text>
              </View>
              <Slider
                value={this.state.ondemandValue}
                key={this.state.sliderKey}
                style={styles.ondemandSliderStyle}
                step={5}
                maximumValue={120}
                minimumTrackTintColor="rgba(255, 0,0, 1.0)" // {getColors().redColor}
                maximumTrackTintColor="rgba(255, 0,0,0.2)" // {getColors().maximumTrackTintColor}
                onValueChange={(value) => this.getOndemandSliderValue(value)}
                // onSlidingComplete={(value) =>
                //   this.getOndemandSliderValue(value)
                // }
                // onSlidingComplete={() => this.endDragHandle()}
                thumbStyle={styles.setThumbStyle}
                trackStyle={styles.setTrackHeight}
                // thumbImage={Assets.greenDott}
              />
              <View
                style={{
                  flexDirection: 'row',
                  width: wp('70%'),
                  marginLeft: wp('30%') - 20,
                  marginTop: 20,
                }}>
                <Button
                  title={'Cancel'}
                  textStyle={[styles.btnText, {color: 'red'}]}
                  onPress={() => {
                    this.setState({isShowOndemandRuntimePopup: false});
                  }}
                  containerStyle={[
                    styles.setMarginTopTen,
                    {
                      width: 'auto',
                      flex: 1,
                      marginLeft: 0,
                      marginRight: 10,
                      marginBottom: 10,
                      alignItems: 'flex-end',
                    },
                  ]}
                  containerBackgroundColor={'transparent'}
                />
                <View
                  style={[
                    {
                      width: 'auto',
                      flex: 1,

                      borderWidth: 0,
                      marginLeft: 0,
                      marginRight: 0,
                      marginBottom: 0,
                    },
                  ]}>
                  <Button
                    title={'Continue'}
                    disabled={this.state.ondemandSelMinutes == 0 ? true : false}
                    textStyle={styles.btnText}
                    onPress={() => {
                      let val = this.state.ondemandSelMinutes;
                      val = val.toString();
                      this.callOnDemandPowerAPI(this.state.thingName, val);

                      // this.checkRecircData();
                      // this.callGetMaintainence();
                    }}
                    containerStyle={[
                      styles.setMarginTopTen,
                      {
                        width: 'auto',
                        flex: 1,

                        borderWidth: 0,
                        marginLeft: 10,
                        marginRight: 0,
                        marginBottom: 10,
                        borderRadius: 10,
                      },
                    ]}
                    containerBackgroundColor={
                      this.state.ondemandSelMinutes == 0 ? '#aaaaaa' : 'red'
                    }
                  />
                  {this.state.maintainenceRunning ? (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 12,
                        bottom: 0,
                        right: 0,
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}>
                      <View style={{justifyContent: 'center'}}>
                        <Text
                allowFontScaling={false}
                style={[
                            styles.btnText,
                            {
                              color: '#AAAAAA',
                              fontSize: wp('4%'),
                            },
                          ]}>
                          {'Please Wait... '}
                        </Text>
                      </View>
                      <View style={{justifyContent: 'center'}}>
                        <Text
                          allowFontScaling={false}
                          style={[
                            styles.btnText,
                            {
                              color: 'grey',
                              marginTop: -wp('1.7%'),
                            },
                          ]}>
                          {'('}
                        </Text>
                      </View>
                      <View style={{justifyContent: 'center'}}>
                        <Text
                          allowFontScaling={false}
                          style={[
                            styles.btnText,
                            {
                              color: 'grey',
                              textAlign: 'center',
                              width: wp('7%'),
                              fontSize: wp('5%'),
                              marginTop: -wp('1.7%'),
                            },
                          ]}>
                          {this.state.counter < 10
                            ? '0' + this.state.counter
                            : this.state.counter}
                        </Text>
                      </View>
                      <View style={{justifyContent: 'center'}}>
                        <Text
                          allowFontScaling={false}
                          style={[
                            styles.btnText,
                            {
                              color: 'grey',
                              marginTop: -wp('1.7%'),
                            },
                          ]}>
                          {')'}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            </Animatable.View>

            {/* {this.props.isBusyEventData ||
            this.props.isBusyChangeHeater ||
            this.props.isBusyChangeTemperature ||
            this.props.isBusyHeaterOnOff ||
            this.props.isBusyOndemandPower ||
            this.state.currentTemperature == '--' ? (
              <Activity />
            ) : null} */}
            {this.state.statusRunning
              ? this.statusActivityIndicatorView()
              : null}
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default HomeScreen;
