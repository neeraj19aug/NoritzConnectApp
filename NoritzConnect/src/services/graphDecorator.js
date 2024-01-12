import React from 'react';
import {
  Circle, G
} from 'react-native-svg';

export const Decorator = ({ x, y, data }) => data.map((value, index) => (
  // <G
  // // x={ 50 }
  // >
  <G
    x={x(index)}
    key={index}
    y={y(value) + 30}
    r={4}
    // stroke={ 'rgb(0, 0, 0)' }
    fill="white"
  />

  // </G>
));

export const DecoratorRed = ({ x, y, data }) => data.map((value, index) => (
  <G
    x={x(index)}
    y={y(value)}
    key={index}
    r={3}
    // stroke={ 'rgb(0, 0, 0)' }
    fill="white"
  >
    <Circle
      cx={0}
      cy={0}
      r={3}
      stroke="#9b9b9b"
      strokeWidth={2}
      fill="white"
    />

  </G>
));

export const DecoratorBlack = ({ x, y, data }) => data.map((value, index) => (
  <G
    x={x(index)}
    y={y(-50)}
    key={index}
    r={3}
    // stroke={ 'rgb(0, 0, 0)' }
    fill="white"
  >
    <Circle
      cx={0}
      cy={0}
      r={3}
      stroke="#9b9b9b"
      strokeWidth={5}
      fill="white"
    />

  </G>
));
