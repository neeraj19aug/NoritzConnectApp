import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {TimePicker} from 'react-native-simple-time-picker';
import Fonts from '../services/Fonts';
import {showAlert} from '../services/Functions';
import {getColors} from '../services/Color';

const TimePickerView = ({
  showPickerView,
  onDonePress,
  onCancelPress,
  startHours,
  endHours,
}) => {
  const [hours, setHours] = useState(
    startHours > 12 ? startHours % 12 : startHours,
  );
  const [minutes, setMinutes] = useState(0);
  const [ampm, setAmPm] = useState(startHours < 12 ? 'am' : 'pm');

  const [hours2, setHours2] = useState(
    endHours > 12 ? endHours % 12 : endHours,
  );

  const [minutes2, setMinutes2] = useState(0);
  const [ampm2, setAmPm2] = useState(endHours < 12 ? 'am' : 'pm');

  const [isAllow, setIsAllow] = useState(true);

  const handleChange = (value: {hours: number, minutes: number}) => {
    console.log('start hours',value.hours, value.ampm );
    setHours(value.hours);
    setMinutes(value.minutes);
    setAmPm(value.ampm);
  };

  const handleChange2 = (value: {hours: number, minutes: number}) => {
    console.log('end hours',value.hours, value.ampm );
    setHours2(value.hours);
    setMinutes2(value.minutes);
    setAmPm2(value.ampm);
  };

  useEffect(() => {});

  return (
    <Animatable.View
      transition="height"
      duration={5000}
      style={{
        width: '100%',
        height: showPickerView ? 350 : 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: getColors().whiteColor,
        flexDirection: 'row',
      }}>
      <View
        style={{
          //   flexDirection: 'row',
          width: '50%',
          height: '100%',
          paddingTop: 40,
          marginTop: 40,
        }}>
        <Text
          style={{
            position: 'absolute',
            left: 0,
            top: 30,
            width: '100%',
            textAlign: 'center',
            fontSize: 12,
            fontFamily: Fonts.oxygenBold,
          }}>
          Start time
        </Text>
        <TimePicker
          value={{hours: hours, minutes: 0, seconds: 0, ampm: ampm}}
          pickerShows={['hours']}
          isAmpm
          onChange={handleChange}
        />
      </View>
      <View
        style={{
          //   flexDirection: 'row',
          width: '50%',
          height: '100%',
          paddingTop: 40,
          marginTop: 40,
        }}>
        <Text
          style={{
            position: 'absolute',
            left: 0,
            top: 30,
            width: '100%',
            textAlign: 'center',
            fontSize: 12,
            fontFamily: Fonts.oxygenBold,
          }}>
          End time
        </Text>
        <TimePicker
          value={{hours: hours2, minutes: 0, seconds: 0, ampm: ampm2}}
          pickerShows={['hours']}
          isAmpm
          onChange={handleChange2}
        />

        <View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 100,
            top: 100,
            width: 0.8,
            backgroundColor: getColors().pickerBG,
          }}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          width: '100%',
          left: 0,
          top: 0,
          height: 45,
          backgroundColor: getColors().pickerBG,
        }}
      />
      <TouchableOpacity
        // onPress={onDonePress}
        onPress={() => {
          let firstTimerHour = hours;
          let firstTimerampm = ampm;

          let secondTimerHour = hours2;
          let secondTimerampm = ampm2;
          // console.log('start time end time',startHours, firstTimerampm, '  ',endHours, secondTimerampm )
          if (firstTimerampm == 'pm' && firstTimerHour != 12) {
            firstTimerHour += 12;
          }
          //  else {
          //   firstTimerampm = 'am';
          // }
          if (secondTimerampm == 'pm' && secondTimerHour != 12) {
            secondTimerHour += 12;
          } 
          // else {
          //   secondTimerampm = 'am';
          // }
          if(firstTimerHour == 12 && firstTimerampm == 'am'){
            firstTimerHour += 12;
          }
          if(secondTimerHour == 12 && secondTimerampm == 'am'){
            secondTimerHour += 12;
          }
          if (secondTimerHour == 0) {
            secondTimerHour = 24;
          }
          // if (secondTimerHour >= firstTimerHour) {
            onDonePress(
              firstTimerHour,
              minutes,
              firstTimerampm,
              secondTimerHour,
              minutes2,
              secondTimerampm,
            );
          // } else {
          //   //showAlertMessage
          //   showAlert('End time should be greater than start time.');
          // }
        }}
        style={{
          width: 100,
          height: 45,
          position: 'absolute',
          right: 0,
          top: 0,
          backgroundColor: getColors().pickerBG,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Text
          allowFontScaling={false}
          style={{
            marginRight: 20,
            // marginTop: 10,
            fontSize: 18,
            fontFamily: Fonts.oxygenRegular,
          }}>
          Confirm
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onCancelPress}
        style={{
          width: 100,
          height: 45,
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundColor: getColors().pickerBG,
          justifyContent: 'center',
        }}>
        <Text
          allowFontScaling={false}
          style={{
            marginLeft: 20,
            // marginTop: 10,
            fontSize: 18,
            fontFamily: Fonts.oxygenRegular,
          }}>
          Cancel
        </Text>
      </TouchableOpacity>

      {/* <Text
        allowFontScaling={false}
        style={{
          marginRight: 20,
          marginTop: 8,
          fontSize: 18,
          width: '100%',
          textAlign: 'center',
          position: 'absolute',
          top: 60,
          fontFamily: Fonts.oxygenBold,
        }}>
        -
      </Text> */}
    </Animatable.View>
  );
};

export {TimePickerView};
