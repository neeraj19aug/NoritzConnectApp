import React, {useState} from 'react';
import {Image, View, TouchableOpacity, TextInput, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getColors} from '../services/Color';
import Fonts from '../services/Fonts';

const LoginFormField = ({
  refer,
  style,
  title,
  value,
  onPress,
  icon,
  editable = true,
  onChangeText,
  onFocus,
  multiline = false,
  numberOfLines = 1,
  keyboardType,
  secureTextEntry,
  hideTitle,
}) => {
  const [isFocused, setFocusState] = useState(false);
  const {topContainer, container, line, mainContainer, textInputStyle} = styles;

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
            },
          ]}>
          <Image
            resizeMode="contain"
            source={icon}
            style={{
              width: wp('5%'),
              height: '100%',
              marginTop: Platform.OS === 'android' ? -3 : 0,
            }}
          />

          <TextInput
            allowFontScaling={false}
            ref={instance => instance && refer && refer(instance)}
            style={[
              textInputStyle,

              {
                color: getColor(),
                width: '90%',
                paddingTop:
                  Platform.OS === 'android' && secureTextEntry ? 10 : 0,
              },
              editable ? {} : {color: getColors().placeholder},
            ]}
            editable={editable}
            value={value}
            placeholder={hideTitle ? title : ''}
            multiline={multiline}
            numberOfLines={numberOfLines}
            placeholderTextColor="#4A4A4A"
            onChangeText={onChangeText}
            onFocus={() => {
              setFocusState(true);
              onFocus && onFocus();
            }}
            onBlur={() => setFocusState(false)}
            autoCorrect={false}
            keyboardType={keyboardType}
            autoCapitalize={'none'}
            secureTextEntry={secureTextEntry}
          />
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
    marginTop: Platform.OS === 'android' ? 5 : 5,
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
    fontSize: hp('2.0%'),
    fontFamily: Fonts.oxygenRegular,
    alignSelf: 'stretch',
    marginLeft: 10,
    // backgroundColor: 'red',
  },
  mainContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderBottomWidth: 2.0,
    borderColor: getColors().primaryBlackColor,
    marginHorizontal: 20,
    flex: 1,
    height: 50,
  },

  textInputStyle: {
    // alignSelf: 'stretch',
    fontSize: wp('5%'),
    // paddingHorizontal: 10,

    fontFamily: Fonts.oxygenRegular,
    paddingLeft: 15,
    color: '#4A4A4A',
    height: 50,
    marginTop: 0,
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 3 : 0,
    // paddingBottom: Platform.OS === 'ios' ? 7 : 0,
    // marginTop: Platform.OS === 'ios' ? 0 : 20,
    // marginBottom: Platform.OS === 'ios' ? 0 : 0
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    // backgroundColor: 'blue',
  },
};

export {LoginFormField};
