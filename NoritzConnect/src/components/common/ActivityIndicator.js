import React from 'react';
import {
  View
} from 'react-native';
import {
  MaterialIndicator
} from 'react-native-indicators';
import {getColors} from '../../services/Color';

const Activity = (props) => (

  <View style={{
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColors().transparentColor,
    overflow: 'hidden',
    zIndex: 1

  }}
  >

    <View style={{
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: getColors().transparentColor,
    }}
    />

    <MaterialIndicator size={25} color="#AAAAAA" trackWidth={2} />

  </View>

);

export default Activity;
