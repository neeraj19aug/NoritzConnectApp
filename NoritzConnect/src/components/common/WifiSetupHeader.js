import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Assets from '../../services/Assets';
import Fonts from '../../services/Fonts';
import {getColors} from '../../services/Color';

import * as Animatable from 'react-native-animatable';

const WifiSetupHeader = ({
  stepNumber,
}) => {

  return (
    <View>
      <View style={[styles.headerContainerStyle]}>
        {stepNumber == 0 ? (
          <Text allowFontScaling={false} style={[styles.title]}>
            WiFi Setup
          </Text>
        ) : (
          <Text allowFontScaling={false} style={[styles.title]}>
            {'WiFi Setup - Step '}
            <Text
              allowFontScaling={false}
              style={[styles.title, {color: getColors().redColor}]}>
              {stepNumber}
            </Text>
            {' of 5'}
          </Text>
        )}

        <Image
          resizeMode="contain"
          source={Assets.logo}
          style={styles.logoStyle}
        />

        <View
          style={{
            width: '100%',
            height: 1,
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundColor: getColors().headerBaseLine,
          }}>
          <Animatable.View
            duration={300}
            transition="width"
            style={{
              width: stepNumber * wp('20%'),
              height: '100%',
              backgroundColor: getColors().redColor,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerStyle: {
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('100%'),
    height: hp('7.8%'),
    backgroundColor: getColors().whiteColor,
  },
  logoStyle: {
    height: wp('7.97%'),
    marginLeft: -1,
    width: wp('22.22%'),
    marginTop: -3,
    position: 'absolute',
    right: 15,
  },
  title: {
    fontFamily: Fonts.oxygenBold,
    // fontWeight: '400',
    fontSize: wp('4.34%'),
  },


});

export {WifiSetupHeader};
