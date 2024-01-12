import { LinearGradient, Stop, Defs } from 'react-native-svg';
import React from 'react';

export const AreaGradient = () => (
  <Defs>

    <LinearGradient id="grad" x1="0%" y1="-70%" x2="0%" y2="43%">
      <Stop offset="0" stopColor="rgb(80, 160, 255)" />
      <Stop offset="1" stopColor="#FFFFFF" />

    </LinearGradient>
  </Defs>
);

export const AreaGradientTemp = () => (
  <Defs>

    <LinearGradient id="gradtemp" x1="0%" y1="-45%" x2="0%" y2="60%">
      <Stop offset="0" stopColor="rgb(214, 232, 254)" />
      <Stop offset="1" stopColor="#FFFFFF" />

    </LinearGradient>
  </Defs>
);
