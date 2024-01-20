import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Text,
  View,
  BackHandler,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
  Image
} from 'react-native';
import {getColors} from '../../services/Color';
import styles from './styles';
import {Header} from '../../components/common';
import Strings from '../../services/Strings';
import Assets from '../../services/Assets';


class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    setTimeout(() => this.props.navigation.navigate('Login'), 2000);

   
  }

  componentWillUnmount() {
   
  }

  

  render() {
    return (
      <DarkModeContext.Consumer>
        {() => (
          <SafeAreaView
            style={[
              styles.pageContainer,
              {backgroundColor: getColors().screenBackground},
            ]}>
                <Image
              resizeMode="cover"
              source={Assets.background}
              style={styles.imgBackgroundStyle}
            />

            <Image
              resizeMode="contain"
              source={Assets.logo}
              style={styles.imgLogoStyle}
            />
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default AuthLoadingScreen;
