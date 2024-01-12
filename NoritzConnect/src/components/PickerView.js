import React from 'react';
import {Text, TouchableOpacity, Platform} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {getColors} from '../services/Color';
import {Picker} from '@react-native-picker/picker';

const PickerView = ({
  data,
  selectedValue,
  onValueChange,
  showPickerView,
  onDonePress,
}) => {
  // const pickerData = data.map(item => (
  //   <Picker.Item label={item.label} value={item.label} />
  //   ));

  const androidWheelData = [];
  for (let i = 0; i < data.length; i += 1) {
    androidWheelData.push(data[i].label);
  }
  if (androidWheelData.length === 0) {
    androidWheelData.push('No data available');
  }

  return Platform.OS === 'android'  ? (
    <Animatable.View
      transition="height"
      duration={500}
      style={{
        width: '100%',
        height: showPickerView ? 250 : 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: getColors().pickerBG,
      }}>
      <WheelPicker
        // selectedItem={0}
        style={{height: '100%', width: '100%', marginTop: 80}}
        data={androidWheelData}
        onItemSelected={index => onValueChange(androidWheelData[index])}
      />
      <TouchableOpacity
        onPress={onDonePress}
        style={{
          width: '100%',
          height: 50,
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundColor: getColors().pickerBG,
          alignItems: 'flex-end',
        }}>
        <Text
          allowFontScaling={false}
          style={{
            marginRight: 20,
            marginTop: 10,
            fontWeight: '500',
            color: getColors().txtBlackColor,
            fontSize: 18,
          }}>
          Done
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  ) : (
    <Animatable.View
      transition="height"
      duration={500}
      style={{
        width: '100%',
        height: showPickerView ? 250 : 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: getColors().pickerBG,
      }}>
      {/* <Picker
        selectedValue={selectedValue}
        style={{height: '100%', width: '100%'}}
        onValueChange={onValueChange}
          useNativeAndroidPickerStyle={false}
        >
        {pickerData}
      </Picker> */}
        

      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
  
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <Picker.Item label={item.label} value={item.label} />
      ))}
        </Picker>
      <TouchableOpacity
        onPress={onDonePress}
        style={{
          width: '100%',
          height: 50,
          position: 'absolute',
          left: 0,
          top: 0,
          // backgroundColor: getColors().pickerBG,
          alignItems: 'flex-end',
        }}>
        <Text
          allowFontScaling={false}
          style={{
            marginRight: 20,
            marginTop: 10,
            fontWeight: '500',
            // color: getColors().txtBlackColor,
            fontSize: 18,
          }}>
          Done
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export {PickerView};
