import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {getColors} from '../../services/Color';
import Fonts from '../../services/Fonts';

/** *********  Properties Information ****************************
    onPress    : action to be performed on press of Button
    buttonStyle : style object to be applied on container of Button
************************************************************************ */
const Button = ({
  onPress,
  title,
  containerBackgroundColor,
  textStyle,
  disabled,
  containerStyle,
}) => {
  const {callBtn, btnText} = styles;

  return (
    <TouchableOpacity
      // rippleSize={10}
      // rippleCentered={true}
      onPress={onPress}
      disabled={disabled}
      style={[
        callBtn,
        containerStyle != null ? containerStyle : null,
        {
          backgroundColor:
            containerBackgroundColor != null
              ? containerBackgroundColor
              : getColors().redColor,
        },
      ]}>
      <Text
        allowFontScaling={false}
        style={[btnText, textStyle != null ? textStyle : null]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  callBtn: {
    width: '90%',
    height: wp('13.88%'),
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColors().redColor,
  },
  btnText: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('5.07%'),
    color: 'white',
  },
};

export {Button};
