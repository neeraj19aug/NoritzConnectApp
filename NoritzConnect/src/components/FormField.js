import React, {useState} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {getColors} from '../services/Color';
import Fonts from '../services/Fonts';

const FormField = ({
  refer,
  style,
  title,
  value,
  onPress,
  editable = true,
  onChangeText,
  onKeyPress,
  onFocus,
  missingField,
  multiline = false,
  numberOfLines = 1,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
  hideTitle,
  maxLength,
}) => {
  const [isFocused, setFocusState] = useState(false);
  const {
    topContainer,
    container,
    titleTextStyle,
    line,
    mainContainer,
    textInputStyle,
  } = styles;

  const onItemClick = () => {
    if (onPress !== undefined) {
      onPress();
    }
  };

  const getColor = () =>
    isFocused ? getColors().primaryColor : getColors().primaryDarkColor;

  return (
    <TouchableOpacity style={[topContainer, style]} onPress={onItemClick}>
      <View style={container}>
        <View
          style={[
            mainContainer,
            {
              paddingBottom: hideTitle ? 0 : 0,
              borderColor:
                missingField != null && missingField == true
                  ? getColors().redColor
                  : getColors().textInputTitleColor,
            },
          ]}>
          <TextInput
            allowFontScaling={false}
            ref={instance => instance && refer && refer(instance)}
            style={[
              textInputStyle,

              {
                color: getColor(),
                width: hideTitle ? '100%' : 'auto',
                maxWidth: hideTitle ? wp('90%') : wp('40%'),
                paddingLeft: hideTitle ? 0 : 5,
              },
            ]}
            editable={editable}
            value={value}
            placeholder={hideTitle ? title : ''}
            multiline={multiline}
            numberOfLines={numberOfLines}
            placeholderTextColor={getColors().placeholder}
            onChangeText={onChangeText}
            onKeyPress={onKeyPress}
            maxLength={maxLength}
            onFocus={() => {
              setFocusState(true);
              onFocus && onFocus();
            }}
            onBlur={() => setFocusState(false)}
            autoCorrect={false}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
          />
          {!hideTitle ? (
            <Text
              allowFontScaling={false}
              style={[
                titleTextStyle,
                {
                  color: getColors().textInputTitleColor,
                  marginLeft: value.length > 0 ? 8 : -15,
                },
              ]}>
              {title}
            </Text>
          ) : null}
        </View>
      </View>
      <View
        style={[
          line,
          {
            backgroundColor: isFocused
              ? getColors().primaryColor
              : getColors().blurPrimaryColor,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = {
  topContainer: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginTop: 8,
  },
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  line: {
    height: 0.5,
    alignSelf: 'stretch',
  },
  titleTextStyle: {
    fontSize: wp('4.2%'),
    fontFamily: Fonts.oxygenRegular,
    marginLeft: 10,
    // backgroundColor: 'red',
  },
  discloserIndicatorStyle: {
    height: 13,
    width: 8,
    alignSelf: 'center',
    marginRight: 10,
  },
  mainContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderBottomWidth: 1.0,
    marginHorizontal: 20,
    // backgroundColor: 'yellow',
    flex: 1,
  },
  textInputStyle: {
    // alignSelf: 'baseline',
    fontSize: wp('4.2%'),
    paddingHorizontal: 10,
    maxWidth: wp('40%'),
    fontFamily: Fonts.SpectralRegular,
    // paddingLeft: 10,
    // textAlignVertical: 'bottom',
    height: 40,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    // backgroundColor: 'blue',
  },
};

export {FormField};
