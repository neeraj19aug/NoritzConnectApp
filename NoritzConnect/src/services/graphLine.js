import { Path } from 'react-native-svg';
import React from 'react';
// import colors from '../Constants/Colors';

export const Line = ({ line }) => (
  <Path
    d={line}
    stroke="rgb(31, 142, 250)"
    strokeWidth={1}
    fill="none"
  />
);

export const LineRed = ({ line }) => (
  <Path
    d={line}
    stroke="rgb(255, 0, 0)"
    strokeWidth={1}
    fill="none"
  />
);

export const LineBlack = ({ line }) => (
  <Path
    d={line}
    stroke="#000000"
    strokeWidth={1}
    fill="none"
  />
);
// export default Line;
