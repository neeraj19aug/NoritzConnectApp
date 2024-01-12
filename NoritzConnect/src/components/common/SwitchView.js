import React from 'react';
import {Text, View, Image, Switch} from 'react-native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {getColors} from '../../services/Color';
import Fonts from '../../services/Fonts';

/** *********  Properties Information ****************************
    onPress    : action to be performed on press of Button
    buttonStyle : style object to be applied on container of Button
************************************************************************ */
const SwitchView = ({
  onPress,
  title,
  recirculationPower,
  source,
}) => {
  return (
    <View style={[styles.cellView, {backgroundColor: getColors().whiteColor}]}>
      <View style={styles.cellInnerLeftView}>
        {source != null ? (
          <Image resizeMode="contain" source={source} style={styles.cellIcon} />
        ) : null}
        {source != null ? (
          <View style={[styles.tabBarSeperator, {marginLeft: 20}]} />
        ) : null}

        <Text
          allowFontScaling={false}
          style={[styles.txtSetTemperatureControl]}>
          {title}
        </Text>
      </View>

      <View style={styles.cellInnerRightView}>
        <Switch
          style={{
            borderColor: getColors().redColor,
            borderWidth: 2,
            borderRadius: 15,
          }}
          trackColor={{
            false:
              Platform.OS === 'android' ? '#AAAAAA' : getColors().whiteColor,
            true: getColors().lightRed,
          }}
          thumbColor={
            recirculationPower ? getColors().redColor : getColors().redColor
          }
          onValueChange={onPress}
          value={recirculationPower}
        />
      </View>
    </View>
  );
};

const styles = {
  cellView: {
    width: 'auto',
    height: wp('18.05%'),
    marginTop: 16,
    marginHorizontal: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 2,
  },
  cellInnerLeftView: {
    width: '80%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBarSeperator: {
    height: '70%',
    width: 0.5,
    backgroundColor: '#86929D',
    opacity: 0.7,
  },
  txtSetTemperatureControl: {
    fontFamily: Fonts.oxygenRegular,
    fontSize: wp('4.5%'),
    marginLeft: 20,
    color: '#000000',
  },
  cellInnerRightView: {
    width: '20%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  cellIcon: {
    width: wp('7%'),
    height: wp('7%'),
    marginLeft: 20,
  },
};

export {SwitchView};
