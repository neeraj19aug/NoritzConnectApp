import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {getColors} from '../../services/Color';
import Fonts from '../../services/Fonts';
import Activity from './ActivityIndicator';

/** *********  Properties Information ****************************
    onPress    : action to be performed on press of Button
    buttonStyle : style object to be applied on container of Button
************************************************************************ */
const HeaterCell = ({onPress, heaterName, ModelImage}) => {
  const [isFocused, setFocusState] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.collectionCellView, styles.shadow]}>
      <View style={{alignItems: 'center'}}>
        <FastImage
          onLoadStart={() => setFocusState(true)}
          onLoadEnd={() => setFocusState(false)}
          resizeMode={FastImage.resizeMode.contain}
          source={{uri: ModelImage}}
          style={styles.cellIcon}
        />
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          // adjustsFontSizeToFit={true}
          style={[styles.cellTitle, {color: getColors().primaryBlackColor}]}
          adjustsFontSizeToFit>
          {heaterName}
        </Text>
      </View>
      {isFocused ? <Activity /> : null}
    </TouchableOpacity>
  );
};

const styles = {
  collectionCellView: {
    // flex: 1,
    height: wp('43%'),
    width: (wp('100%') - 60) / 2.0,
    backgroundColor: 'white',
    margin: 10,
    padding: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.84,
    elevation: 5,
  },
  cellIcon: {
    width: wp('22%'),
    height: wp('22%'),
  },
  cellTitle: {
    fontSize: wp('5%'),
    marginTop: 15,
    fontFamily: Fonts.oxygenRegular,
  },
};

export {HeaterCell};
