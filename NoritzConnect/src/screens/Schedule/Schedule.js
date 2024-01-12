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
  Alert,
  TouchableOpacity,
} from 'react-native';
import {getColors} from '../../services/Color';
import styles from './styles';
import {Header, SwitchView} from '../../components/common';
import Assets from '../../services/Assets';
import {setConfiguration, getConfiguration} from '../../services/configuration';
import {decryptValue, showAlert} from '../../services/Functions';
import {TimePickerView} from '../../components';
import {md5} from '../../services/Functions';
import Activity from '../../components/ActivityIndicator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import Strings from '../../services/Strings';
import Fonts from '../../services/Fonts';
import {Button} from '../../components/common';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FormField} from '../../components';

class Schedule extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.tempInstantReserveTiming = [
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
    instantReserveTiming = [
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

    this.state = {
      slots: [],
      tempOldSolts: [],
      isEdit: false,
      showTimePickerView: false,
      newSlots: [],
      tempNewSolts: [],
      onStart: '',
      onEnd: '',
      enterPassword: '',
      thingName: '',
      startHours: 1,
      endHours: 2,
      isEdit: false,
      editArray: [],
      editIndex: -1,
      deleteSlot: '',
      slotType: '',
      isScheduleChanged: false,
      isNewScheduleAdded: false,
    };

    this.scrollView = null;
    this.passwordField = null;
  }

  componentDidMount() {
    const thingName = getConfiguration('thingName');

    console.log('thingName -- ', thingName);
    this.callGetInstantInfoAPI(thingName);

    this.setState({
      thingName: thingName,
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

  goBack() {
    this.state.isScheduleChanged
      ? Alert.alert(
          '',
          'Are you sure you want to go back, this will discard all your changes?',
          [
            {
              text: 'No',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => {
                this.setState({isEdit: false});
                this.setState(
                  {
                    isScheduleChanged: false,
                    slots: this.state.tempOldSolts,
                    newSlots: this.state.tempNewSolts,
                  },
                  () => {
                    this.setState({
                      tempNewSolts: [],
                      tempOldSolts: [],
                    });
                  },
                );
                this.props.navigation.navigate('Home');
              },
            },
          ],
          {cancelable: false},
        )
      : this.state.isNewScheduleAdded
      ? Alert.alert(
          '',
          'Are you sure you want to go back, this will discard all your changes?',
          [
            {
              text: 'No',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => {
                this.setState({isNewScheduleAdded: false});
                // this.setState({isEdit: false});
                // this.setState(
                //   {
                //     isScheduleChanged: false,
                //     slots: this.state.tempOldSolts,
                //     newSlots: this.state.tempNewSolts,
                //   },
                //   () => {
                //     this.setState({
                //       tempNewSolts: [],
                //       tempOldSolts: [],
                //     });
                //   },
                // );
                this.props.navigation.navigate('Home');
              },
            },
          ],
          {cancelable: false},
        )
      : this.setState(
          {
            isEdit: false,
            tempNewSolts: [],
            tempOldSolts: [],
          },
          () => {
            this.props.navigation.navigate('Home');
          },
        );
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
    console.log('afterCallGetInstantInfoAPI schedule', response);
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
        console.log('pumpTiming', pumpTiming);

        for (let i = 0; i < pumpTiming.length; i++) {
          let obj = pumpTiming[i];
          console.log('pumpTiming in loop', obj, i, checkPump);

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
        console.log('slots', slots);
        this.setState({slots: slots});

        var hours = new Date().getHours(); //To get the Current Hours

        console.log('I am calling this...');
        if (
          pumpTiming[hours] == 'true' &&
          (this.state.mode == 12 || this.state.mode == 22)
        ) {
          this.setState({recircIconShow: true});
        }

        let slotLength = this.state.slots.length

        if(slotLength > 1) {
            let temp  = [...this.state.slots]
          if(temp[0].start == 0 && temp[slotLength-1].end == 24){
            // let temp  = [...this.state.slots]
            temp[0].start = temp[slotLength-1].start;
            temp.splice(slotLength-1, 1);
            this.setState({slots: temp}, ()=>{console.log('merging slot result', this.state.slots)})
          }
          else {}
        }
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  deleteSlot(index, slotType) {
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
            this.setState({isScheduleChanged: true});
            var tempSlots = [];
            if (slotType == 'new') {
              tempSlots = [...this.state.newSlots];
              tempSlots.splice(index, 1);
              console.log('new slots --- ', tempSlots);
              this.setState({newSlots: tempSlots});
            } else {
              tempSlots = [...this.state.slots];
              tempSlots.splice(index, 1);
              console.log('new slots --- ', tempSlots);
              this.setState({slots: tempSlots});
            }
          },
        },
      ],
      {cancelable: false},
    );
  }

  async saveSlots() {
    if (this.state.enterPassword == '') {
      showAlert(Strings.enterPassword, 300);
      return;
    }
    this.setState({isVisibleTemperaturePassword: false});

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

  callInstantReserveAPI(thingName) {
    let instantTiming = [...instantReserveTiming];
    // console.log('instantTiming -- ', instantTiming);
    console.log('slots -- ', this.state.slots);

    for (let i = 0; i < this.state.slots.length; i++) {
      let obj = this.state.slots[i];
      if (obj.start > obj.end) {
        for (let j = obj.start; j < 24; j++) {
          instantTiming[j] = 'true';
        }
        for (let j = 0; j < obj.end; j++) {
          instantTiming[j] = 'true';
        }
      } else {
        for (let j = obj.start; j < obj.end; j++) {
          instantTiming[j] = 'true';
        }
      }
    }
    // console.log('instantTiming -- ', instantTiming);

    console.log('this.state.onStart -- ', this.state.onStart);
    console.log('this.state.onEnd -- ', this.state.onEnd);

    for (let i = 0; i < this.state.newSlots.length; i++) {
      let obj = this.state.newSlots[i];
      if (obj.start > obj.end) {
        for (let j = obj.start; j < 24; j++) {
          instantTiming[j] = 'true';
        }
        for (let j = 0; j < obj.end; j++) {
          instantTiming[j] = 'true';
        }
      } else {
        for (let j = obj.start; j < obj.end; j++) {
          instantTiming[j] = 'true';
        }
      }
    }

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

  async afterCallInstantReserveAPI() {
    const {response} = this.props.responseInstantReserve;
    console.log('responseInstantReserve', response);
    if (response != null) {
      let resCode = response.responseCode;
      resCode = await decryptValue(resCode);
      if (resCode == 200) {
        setConfiguration('slotsUpdated', 'true');

        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        this.props.navigation.goBack();
        //this.callGetInstantInfoAPI(this.state.thingName);
        //showAlert(resMessage, 300);
      } else {
        let resMessage = response.responseMessage;
        resMessage = await decryptValue(resMessage);
        showAlert(resMessage, 300);
      }
    }
  }

  makeTempReserveTime() {
    let newInstantTiming = [...this.tempInstantReserveTiming];
    console.log('slots -- ', this.state.slots);

    for (let i = 0; i < this.state.slots.length; i++) {
      let obj = this.state.slots[i];

      if (obj.start > obj.end) {
        for (let j = obj.start; j < 24; j++) {
          newInstantTiming[j] = 'true';
        }
        for (let j = 0; j < obj.end; j++) {
          newInstantTiming[j] = 'true';
        }
      } else {
        for (let j = obj.start; j < obj.end; j++) {
          newInstantTiming[j] = 'true';
        }
      }
    }
    console.log('newInstantTiming -- ', newInstantTiming);

    for (let i = 0; i < this.state.newSlots.length; i++) {
      let obj = this.state.newSlots[i];
      if (obj.start > obj.end) {
        for (let j = obj.start; j < 24; j++) {
          newInstantTiming[j] = 'true';
        }
        for (let j = 0; j < obj.end; j++) {
          newInstantTiming[j] = 'true';
        }
      } else {
        for (let j = obj.start; j < obj.end; j++) {
          newInstantTiming[j] = 'true';
        }
      }
    }

    return newInstantTiming;
  }

  render() {
    let length = this.state.slots.length + this.state.newSlots.length;
    return (
      <DarkModeContext.Consumer>
        {() => (
          <SafeAreaView
            style={[
              styles.pageContainer,
              {backgroundColor: getColors().timeZoneBGColor},
            ]}>
            <Header
              isBack
              nav={this.props.navigation}
              onBackClick={() => this.goBack()}
            />
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              style={[styles.pageContainer, {marginBottom: 80}]}>
              <View
                style={[
                  styles.pageContainer,
                  {backgroundColor: getColors().timeZoneBGColor},
                ]}>
                <View style={[styles.innerContainer]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.txtHeading,
                        {color: getColors().cellTitleColor},
                        {fontSize: wp('5%')},
                      ]}>
                      {'Current Schedule'}
                    </Text>

                    {this.state.isEdit ? (
                      <View
                        style={{
                          height: wp('8%'),
                          width: wp('16%'),
                          overflow: 'hidden',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          resizeMode="stretch"
                          source={Assets.rect}
                          style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                          }}
                        />
                        <Text
                          allowFontScaling={false}
                          style={[
                            styles.txtHeading,
                            {
                              color: getColors().redColor,
                              marginLeft: 0,
                              fontSize: wp('4%'),
                            },
                          ]}>
                          {'Back'}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            {
                              this.state.isScheduleChanged
                                ? Alert.alert(
                                    '',
                                    'Are you sure you want to go back, this will discard all your changes?',
                                    [
                                      {
                                        text: 'No',
                                        style: 'cancel',
                                      },
                                      {
                                        text: 'Yes',
                                        onPress: () => {
                                          this.setState({isEdit: false});
                                          this.setState(
                                            {
                                              isScheduleChanged: false,
                                              slots: this.state.tempOldSolts,
                                              newSlots: this.state.tempNewSolts,
                                            },
                                            () => {
                                              this.setState({
                                                tempNewSolts: [],
                                                tempOldSolts: [],
                                              });
                                            },
                                          );
                                        },
                                      },
                                    ],
                                    {cancelable: false},
                                  )
                                : this.setState({
                                    isEdit: false,
                                    tempNewSolts: [],
                                    tempOldSolts: [],
                                  });
                            }
                          }}
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                          }}></TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={{
                          height: wp('8%'),
                          width: wp('16%'),
                          overflow: 'hidden',
                          flexDirection: 'row',
                        }}>
                        <Image
                          resizeMode="stretch"
                          source={Assets.rect}
                          style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                          }}
                        />
                        <TouchableOpacity
                          disabled={length > 0 ? false : true}
                          onPress={() => {
                            let oldSlot = [...this.state.slots];
                            let newSlot = [...this.state.newSlots];
                            this.setState({
                              isEdit: true,
                              tempOldSolts: oldSlot,
                              tempNewSolts: newSlot,
                            });
                          }}
                          style={{
                            width: '50%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            resizeMode="contain"
                            source={Assets.editSchedule}
                            style={{
                              width: '50%',
                              height: '50%',
                              opacity: length > 0 ? 1 : 0.3,
                            }}
                          />
                        </TouchableOpacity>

                        <Image
                          resizeMode="stretch"
                          source={Assets.seprat}
                          style={{
                            width: 0.7,
                            height: '100%',
                          }}
                        />

                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              showTimePickerView: true,
                              startHours: 1,
                              endHours: 2,
                            });
                          }}
                          style={{
                            width: '50%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            resizeMode="contain"
                            source={Assets.addSchedule}
                            style={{
                              width: '50%',
                              height: '50%',
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      // height: wp('36.1%'),
                      height:
                        length >= 4
                          ? wp('66.1%')
                          : length <= 2
                          ? wp('33.1%')
                          : length * wp('16.55%'),
                      width: '100%',
                      marginTop: 20,
                      shadowColor: '#000000',
                      shadowOffset: {
                        width: 0,
                        height: 0,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 1.84,
                      elevation: 1,
                    }}>
                    <ScrollView
                      ref={(val) => (this.scrollView = val)}
                      style={{
                        position: 'absolute',
                        left: 10,
                        top: 0,
                        right: 10,
                        bottom: 0,
                      }}>
                      {this.state.slots.map((data, index) => {
                        return (
                          <View style={[styles.slotListContainer]}>
                            {this.state.isEdit ? (
                              <TouchableOpacity
                                onPress={() =>
                                  this.deleteSlot(index, 'existing')
                                }
                                style={styles.trashContainer}>
                                <Image
                                  resizeMode="contain"
                                  source={Assets.removeIcon}
                                  style={{width: wp('5%'), height: wp('5%')}}
                                />
                              </TouchableOpacity>
                            ) : null}

                            <TouchableOpacity
                              style={{flex: 1}}
                              onPress={() => {
                                if (this.state.isEdit == false) {
                                  return;
                                }
                                console.log('Clicked!!!', data.start, data.end);
                                this.setState({
                                  showTimePickerView: true,
                                  startHours: data.start,
                                  endHours: data.end,
                                  editArray: [...this.state.slots],
                                  editIndex: index,
                                  slotType: 'old',
                                });
                              }}>
                              <Text style={styles.buttonText}>
                                {/* {data.start > 10
                                ? '0' + data.start - 12 + ':00 '
                                : data.start == 0 || data.start == 12
                                ? 12
                                : '0' + data.start + ':00'}{' '} */}
                                {data.start >= 0 && data.start < 10
                                  ? '0' + data.start + ':00'
                                  : data.start >= 13 && data.start < 22
                                  ? '0' + (data.start - 12) + ':00'
                                  : data.start > 12
                                  ? data.start - 12 + ':00'
                                  : data.start + ':00'}
                                {data.start >= 12 && data.start < 24
                                  ? ' PM'
                                  : ' AM'}{' '}
                                -{' '}
                                {data.end >= 0 && data.end < 10
                                  ? '0' + data.end + ':00'
                                  : data.end >= 13 && data.end < 22
                                  ? '0' + (data.end - 12) + ':00'
                                  : data.end > 12
                                  ? data.end - 12 + ':00'
                                  : data.end + ':00'}
                                {data.end >= 12 && data.end < 24
                                  ? ' PM'
                                  : ' AM'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                      {this.state.newSlots.map((data, index) => {
                        return (
                          <View
                            style={[
                              styles.slotListContainer,
                              this.state.newSlots.length - 1 == index
                                ? {borderBottomWidth: 0}
                                : {borderBottomWidth: 0.7},
                            ]}>
                            {this.state.isEdit ? (
                              <TouchableOpacity
                                onPress={() => this.deleteSlot(index, 'new')}
                                style={styles.trashContainer}>
                                <Image
                                  resizeMode="contain"
                                  source={Assets.removeIcon}
                                  style={{width: wp('5%'), height: wp('5%')}}
                                />
                              </TouchableOpacity>
                            ) : null}

                            <TouchableOpacity
                              style={{flex: 1}}
                              onPress={() => {
                                if (this.state.isEdit == false) {
                                  return;
                                }
                                console.log('Clicked!!!', data.start, data.end);
                                this.setState({
                                  showTimePickerView: true,
                                  startHours: data.start,
                                  endHours: data.end,
                                  editArray: [...this.state.newSlots],
                                  editIndex: index,
                                  slotType: 'new',
                                });
                              }}>
                              <Text style={styles.buttonText}>
                                {data.start >= 0 && data.start < 10
                                  ? '0' + data.start + ':00'
                                  : data.start >= 13 && data.start < 22
                                  ? '0' + (data.start - 12) + ':00'
                                  : data.start > 12
                                  ? data.start - 12 + ':00'
                                  : data.start + ':00'}
                                {data.start >= 12 && data.start < 24
                                  ? ' PM'
                                  : ' AM'}{' '}
                                -{' '}
                                {data.end >= 0 && data.end < 10
                                  ? '0' + data.end + ':00'
                                  : data.end >= 13 && data.end < 22
                                  ? '0' + (data.end - 12) + ':00'
                                  : data.end > 12
                                  ? data.end - 12 + ':00'
                                  : data.end + ':00'}
                                {data.end >= 12 && data.end < 24
                                  ? ' PM'
                                  : ' AM'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                      {this.state.slots.length + this.state.newSlots.length <=
                      0 ? (
                        <Text
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            marginTop: wp('16%'),
                            fontFamily: Fonts.oxygenLight,
                            color: '#aaaaaa',
                          }}>
                          No timeslots added yet
                        </Text>
                      ) : null}
                    </ScrollView>
                    {length > 4 && (
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          bottom: 10,
                          right: 20,
                          height: 40,
                          width: 40,
                          borderRadius: 20,
                          backgroundColor: getColors().timeZoneBGColor,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          this.scrollView.scrollToEnd();
                        }}>
                        <Image
                          resizeMode="contain"
                          source={Assets.backArrow}
                          style={{
                            marginTop: 5,
                            transform: [{rotate: '90deg'}],
                            width: 40,
                            height: 20,
                            // tintColor: getColors().redColor
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.txtHeading,
                      {color: getColors().cellTitleColor, marginTop: 15},
                    ]}>
                    {'Switch Mode'}
                  </Text>

                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.contentTemperaturePopup,
                      styles.txtIfYouSet,
                      {marginTop: 20, lineHeight: wp('6.7%')},
                    ]}>
                    {Strings.switchModeDesc1}
                  </Text>

                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.contentTemperaturePopup,
                      styles.txtSwitchBack,
                      {lineHeight: wp('6.7%'), marginTop: 14, marginBottom: 10},
                    ]}>
                    {Strings.switchModeDesc2}
                  </Text>

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

                  <Text style={[styles.infoTextStyle]}>
                    Please enter password to save any changes.
                  </Text>

                  {/* <TouchableOpacity
                    onPress={() => {
                      this.saveSlots();
                    }}
                    style={[
                      styles.callBtn,
                      {backgroundColor: getColors().redColor},
                    ]}>
                    <Text allowFontScaling={false} style={styles.btnText}>
                      {'Save'}
                    </Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </KeyboardAwareScrollView>

            <View
              style={{
                position: 'absolute',
                bottom: 20,
                width: '90%',
                right: '5%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.saveSlots();
                }}
                style={[
                  styles.callBtn,
                  {backgroundColor: getColors().redColor},
                ]}>
                <Text allowFontScaling={false} style={styles.btnText}>
                  {'Save'}
                </Text>
              </TouchableOpacity>
            </View>

            {this.state.showTimePickerView ? (
              <TimePickerView
                refer={(instance) => {
                  this.statePicker = instance;
                }}
                showPickerView={this.state.showTimePickerView}
                startHours={this.state.startHours}
                endHours={this.state.endHours}
                onCancelPress={() => this.setState({showTimePickerView: false})}
                onDonePress={(
                  hours,
                  minutes,
                  ampm,
                  hours2,
                  minutes2,
                  ampm2,
                ) => {
                  this.setState({showTimePickerView: false});
                  console.log(
                    'timeRange --',
                    hours,
                    minutes,
                    ampm,
                    hours2,
                    minutes2,
                    ampm2,
                  );
                  if (this.state.isEdit) {
                    this.setState({isScheduleChanged: true});
                    let slots = [...this.state.editArray];
                    // let newInstantTiming = this.makeTempReserveTime()
                    let newInstantTiming = [...this.tempInstantReserveTiming];
                    console.log('slots -- ', this.state.slots);

                    if (hours == hours2) {
                      Alert.alert(
                        '',
                        'Start time and end time can not be same.',
                        [
                          {
                            text: 'Okay',
                            style: 'cancel',
                          },
                        ],
                        {cancelable: false},
                      );
                      return;
                    }

                    if (this.state.slotType == 'new') {
                      for (let i = 0; i < this.state.slots.length; i++) {
                        let obj = this.state.slots[i];
                        if (obj.start > obj.end) {
                          for (let j = obj.start; j < 24; j++) {
                            newInstantTiming[j] = 'true';
                          }
                          for (let j = 0; j < obj.end; j++) {
                            newInstantTiming[j] = 'true';
                          }
                        } else {
                          for (let j = obj.start; j < obj.end; j++) {
                            newInstantTiming[j] = 'true';
                          }
                        }
                      }
                      console.log('newInstantTiming -- ', newInstantTiming);

                      for (let i = 0; i < this.state.newSlots.length; i++) {
                        if (i == this.state.editIndex) {
                          continue;
                        }
                        let obj = this.state.newSlots[i];
                        console.log(obj);
                        if (obj.start > obj.end) {
                          for (let j = obj.start; j < 24; j++) {
                            newInstantTiming[j] = 'true';
                          }
                          for (let j = 0; j < obj.end; j++) {
                            newInstantTiming[j] = 'true';
                          }
                        } else {
                          for (let j = obj.start; j < obj.end; j++) {
                            newInstantTiming[j] = 'true';
                          }
                        }
                      }
                    } else {
                      for (let i = 0; i < this.state.slots.length; i++) {
                        if (i == this.state.editIndex) {
                          continue;
                        }
                        let obj = this.state.slots[i];
                        console.log(obj);

                        if (obj.start > obj.end) {
                          for (let j = obj.start; j < 24; j++) {
                            newInstantTiming[j] = 'true';
                          }
                          for (let j = 0; j < obj.end; j++) {
                            newInstantTiming[j] = 'true';
                          }
                        } else {
                          for (let j = obj.start; j < obj.end; j++) {
                            newInstantTiming[j] = 'true';
                          }
                        }
                      }
                      console.log('newInstantTiming -- ', newInstantTiming);

                      for (let i = 0; i < this.state.newSlots.length; i++) {
                        let obj = this.state.newSlots[i];
                        console.log(obj);

                        if (obj.start > obj.end) {
                          for (let j = obj.start; j < 24; j++) {
                            newInstantTiming[j] = 'true';
                          }
                          for (let j = 0; j < obj.end; j++) {
                            newInstantTiming[j] = 'true';
                          }
                        } else {
                          for (let j = obj.start; j < obj.end; j++) {
                            newInstantTiming[j] = 'true';
                          }
                        }
                      }
                    }

                    if (hours > hours2) {
                      for (let j = hours; j < 24; j++) {
                        if (newInstantTiming[j] == 'true') {
                          showAlert(Strings.correctSchedule, 300);
                          return;
                        }
                      }
                      for (let j = 0; j < hours2; j++) {
                        if (newInstantTiming[j] == 'true') {
                          showAlert(Strings.correctSchedule, 300);
                          return;
                        }
                      }
                    } else {
                      for (let j = hours; j < hours2; j++) {
                        if (newInstantTiming[j] == 'true') {
                          showAlert(Strings.correctSchedule, 300);
                          return;
                        }
                      }
                    }

                    slots[this.state.editIndex] = {start: hours, end: hours2};

                    if (hours > hours2) {
                      for (let j = hours; j < 24; j++) {
                        newInstantTiming[j] = 'true';
                      }
                      for (let j = 0; j < hours2; j++) {
                        newInstantTiming[j] = 'true';
                      }
                    } else {
                      for (let j = hours; j < hours2; j++) {
                        newInstantTiming[j] = 'true';
                      }
                    }

                    this.setState({
                      onStart: hours,
                      onEnd: hours2,
                    });
                    if (this.state.slotType == 'new') {
                      this.setState({
                        newSlots: slots,
                      });
                    } else {
                      this.setState({
                        slots: slots,
                      });
                    }

                    this.setState({
                      isVisibleOnSetTimePassword: true,
                      enterPassword: '',
                    });
                  } else {
                    let slots = [...this.state.newSlots];
                    let newInstantTiming = this.makeTempReserveTime();

                    // let newInstantTiming = [...this.tempInstantReserveTiming];

                    // console.log('slots -- ', this.state.slots);

                    // for (let i = 0; i < this.state.slots.length; i++) {
                    //   let obj = this.state.slots[i];
                    //   console.log(obj);
                    //   for (let j = obj.start; j < obj.end; j++) {
                    //     newInstantTiming[j] = 'true';
                    //   }
                    // }
                    // console.log('newInstantTiming -- ', newInstantTiming);

                    // for (let i = 0; i < this.state.newSlots.length; i++) {
                    //   let obj = this.state.newSlots[i];
                    //   console.log(obj);
                    //   for (let j = obj.start; j < obj.end; j++) {
                    //     newInstantTiming[j] = 'true';
                    //   }
                    // }

                    if (hours == hours2) {
                      Alert.alert(
                        '',
                        'Start time and end time can not be same.',
                        [
                          {
                            text: 'Okay',
                            style: 'cancel',
                          },
                        ],
                        {cancelable: false},
                      );
                      return;
                    }

                    console.log('newTempTiming', newInstantTiming);
                    console.log('booked slots', this.state.slots);
                    if (hours == 24) {
                      hours = 0;
                    }
                    if (hours > hours2) {
                      for (let j = hours; j < 24; j++) {
                        if (newInstantTiming[j] == 'true') {
                          showAlert(Strings.correctSchedule, 300);
                          return;
                        }
                      }
                      for (let j = 0; j < hours2; j++) {
                        if (newInstantTiming[j] == 'true') {
                          showAlert(Strings.correctSchedule, 300);
                          return;
                        }
                      }
                    } else {
                      for (let j = hours; j < hours2; j++) {
                        if (newInstantTiming[j] == 'true') {
                          showAlert(Strings.correctSchedule, 300);
                          return;
                        }
                      }
                    }

                    // for (let i = 0; i < this.state.slots.length; i++) {
                    //   let obj = this.state.slots[i];
                    //   let j;
                    //   if(obj.start == 24){
                    //     j = 0 ;
                    //   } else {
                    //     j = obj.start
                    //   }
                    //   if(start == 24){
                    //     start = 0
                    //   }
                    //   if(end == 24){
                    //     end = 0
                    //   }
                    //   if(obj.start > obj.end){
                    //      for(; j <= 24 ; j++){
                    //       if(start == j || hours2 == j+1 || (start <= j && hours2 >= j)){
                    //       console.log('matched first hours', hours, 'matched second hours', hours2, "previous booked hours", j)
                    //       showAlert(Strings.correctSchedule, 300);
                    //       return;
                    //     }
                    //      }
                    //   } else {
                    //   for (;j < obj.end; j++) {
                    //     if(start == j || hours2 == j+1 || (start <= j && end >= j)){
                    //       console.log('matched first hours', hours, 'matched second hours', hours2, "previous booked hours", j)
                    //       showAlert(Strings.correctSchedule, 300);
                    //       return;
                    //     }
                    //   }
                    //   }
                    // }
                    // for (let i = 0; i < slots.length; i++) {
                    //   let obj = slots[i];
                    //   for (let j = obj.start; j < obj.end; j++) {
                    //     if(hours == j || hours2 == j || (hours <= j && hours2 >= j)){
                    //       console.log('matched first hours', hours, 'matched second hours', hours2, "previous booked hours", j)
                    //       showAlert(Strings.correctSchedule, 300);
                    //       return;
                    //     }
                    //   }
                    // }
                    slots.push({start: hours, end: hours2});
                    if (hours > hours2) {
                      for (let j = hours; j < 24; j++) {
                        newInstantTiming[j] = 'true';
                      }
                      for (let j = 0; j < hours2; j++) {
                        newInstantTiming[j] = 'true';
                      }
                    } else {
                      for (let j = hours; j < hours2; j++) {
                        newInstantTiming[j] = 'true';
                      }
                    }
                    this.setState(
                      {
                        onStart: hours,
                        onEnd: hours2,
                        newSlots: slots,
                        isNewScheduleAdded: true,
                      },
                      () => {
                        console.log('new slots --', this.state.newSlots);
                      },
                    );
                    this.setState({
                      isVisibleOnSetTimePassword: true,
                      enterPassword: '',
                    });
                  }
                }}
              />
            ) : null}

            {this.props.isBusyInstantReserve ||
            this.props.isBusyGetInstantInfo ? (
              <Activity />
            ) : null}
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default Schedule;
