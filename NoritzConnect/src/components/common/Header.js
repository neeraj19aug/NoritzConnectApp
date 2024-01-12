import React, { useRef, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import Menu from 'react-native-material-menu';
import Assets from '../../services/Assets';
import Fonts from '../../services/Fonts';
import { getColors } from '../../services/Color';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

const Header = ({
  isBack,
  onBackClick,
  heaterName,
  heater_image,
  heater_list,
  onClick,
  isHeaterImage = true,
}) => {
  const _menuLocation = useRef(null);
  let heaters = [];

  if (heater_list != null) {
    heaters = heater_list.map((unit, index) => (
      <View key={index}>
        <TouchableOpacity
          style={{
            backgroundColor: getColors().btnDisableColor,
            width: wp('60%'),
            height: 40,
            borderBottomColor: getColors().txtBlackColor,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 0.7,
          }}
          onPress={() => {
            setTimeout(() => onClick(unit), 500);
            hideMenu()
          }}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.menuText, { maxWidth: wp('55%') }]}>
            {unit.heater_label}
          </Text>
        </TouchableOpacity>
      </View>
    ));
  }


  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);


  return (
    <View>
      <View style={[styles.headerContainerStyle, styles.shadow]}>
        {!isBack ? (
          heater_list != null && heater_list.length > 1 ? (
            <TouchableOpacity
              onPress={showMenu}
              style={styles.myHeatersView}>
              <View style={styles.heaterImage}>
                <Image
                  resizeMode="contain"
                  source={{ uri: heater_image }}
                  style={{ width: '75%', height: '75%' }}
                />
              </View>
              <Text
                allowFontScaling={false}
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  fontFamily: Fonts.oxygenRegular,
                  fontSize: wp('4.8%'),
                  color: getColors().txtBlackColor,
                  marginLeft: 10,
                  maxWidth: wp('45%'),
                }}>
                {heaterName}
              </Text>
            </TouchableOpacity>
          ) : (
            isHeaterImage && (
              <View style={styles.myHeatersView}>
                <View style={styles.heaterImage}>
                  <Image
                    resizeMode="contain"
                    source={{ uri: heater_image }}
                    style={{ width: '75%', height: '75%' }}
                  />
                </View>
                <Text
                  allowFontScaling={false}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{
                    fontFamily: Fonts.oxygenRegular,
                    fontSize: wp('4.8%'),
                    color: getColors().txtBlackColor,
                    marginLeft: 10,
                    maxWidth: wp('45%'),
                  }}>
                  {heaterName}
                </Text>
              </View>
            )
          )
        ) : (
          <TouchableOpacity style={{ width: wp('25%') }} onPress={onBackClick}>
            <Image
              resizeMode="contain"
              source={Assets.back_btn}
              style={{ width: wp('8%'), height: wp('8%') }}
            />
          </TouchableOpacity>
        )}

        <Image
          resizeMode="contain"
          source={Assets.logo}
          style={{
            width: wp('27.777%'),
            height: wp('19.806%'),
            marginLeft: -1,
            marginTop: -3,
            position: 'absolute',
            right: 15,
          }}
        />

        
        <Menu
          style={{
            backgroundColor: getColors().whiteColor,
            marginTop: 27,
            marginLeft: -wp('30%'),
            width: wp('60%'),
          }}
        visible={visible}
        // anchor={<Text onPress={showMenu}>Show menu</Text>}
        onRequestClose={hideMenu}
      >
     
          {heaters}

      </Menu>


        {/* {heater_list != null && heater_list.length > 1 ? (
          <Menu
            style={{
              backgroundColor: getColors().whiteColor,
              marginTop: 27,
              marginLeft: -wp('30%'),
              width: wp('60%'),
            }}
            ref={_menuLocation}
          >
            {heaters}
          </Menu>
        ) : null} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerStyle: {
    width: wp('100%'),
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp('8.92%'),
    backgroundColor: getColors().whiteColor,
  },
  shadow: {
    shadowColor: getColors().txtBlackColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 2,
    shadowRadius: 2.84,
  },
  myHeatersView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  heaterImage: {
    height: wp('13.88%'),
    width: wp('13.88%'),
    backgroundColor: getColors().btnDisableColor,
    borderRadius: wp('6.94%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: getColors().menuTextColor,
    fontFamily: Fonts.oxygenBold,
    fontSize: wp('3.86%'),
  },
});

export { Header };
