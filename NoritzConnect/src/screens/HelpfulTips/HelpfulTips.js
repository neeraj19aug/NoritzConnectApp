import React, {Component} from 'react';
import {DarkModeContext} from 'react-native-dark-mode';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Text,
  View,
  Image,
  ScrollView,
  BackHandler,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import {getColors} from '../../services/Color';
import Assets from '../../services/Assets';
import styles from './styles';
import {Header} from '../../components/common';
import {getConfiguration} from '../../services/configuration';

class Accordion extends Component {
  constructor() {
    super();

    this.state = {
      modifiedHeight: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.expanded) {
      this.setState(() => ({
        modifiedHeight: null,
      }));
    } else {
      this.setState(() => ({
        modifiedHeight: 0,
      }));
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.item.expanded !== this.props.item.expanded) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View style={styles.btnTextHolder}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClick}
          style={[styles.cellView]}>
          {/* <Text style={styles.btnText}>{this.props.item.title} </Text> */}

          <View style={styles.cellInnerLeftView}>
            <Image
              resizeMode="contain"
              source={Assets.tipsIcon}
              style={styles.cellIcon}
            />
            <View style={[styles.tabBarSeperator, styles.setMarginLeft]} />
            <Text
              allowFontScaling={false}
              style={[
                styles.txtSetTemperatureControl,
                {
                  color: getColors().cellTitleColor,
                  opacity: this.props.item.expanded ? 0.7 : 1,
                },
              ]}>
              {' '}
              {this.props.item.title}{' '}
            </Text>
          </View>

          <View style={styles.cellInnerRightView}>
            <Image
              resizeMode="contain"
              source={Assets.drop_icon}
              style={styles.dropIcon}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: this.state.modifiedHeight,
            overflow: 'hidden',
            backgroundColor: getColors().whiteColor,
          }}>
          <Text allowFontScaling={false} style={styles.cellContent}>
            {this.props.item.body}
          </Text>
        </View>
      </View>
    );
  }
}

class HelpfulTipsScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    backPressed = 0;

    this.state = {
      AccordionData: [],
    };
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick.bind(this),
    );

    let array = [];
    let heaterTips = [];

    try {
      heaterTips = getConfiguration('heaterTips');
    } catch (e) {
      heaterTips = [];
    }
    array = heaterTips;

    this.setState({
      AccordionData: array,
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('Home');
    return true;
  }

  changeLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const array = this.state.AccordionData.map(item => {
      const newItem = {...item};

      newItem.expanded = false;

      return newItem;
    });

    array[index].expanded = true;

    this.setState(() => ({
      AccordionData: array,
    }));
  };

  goBack() {
    this.props.navigation.navigate('Home');
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
            <Header
              isBack
              nav={this.props.navigation}
              onBackClick={() => this.goBack()}
            />
            <View style={[styles.innerContainer]}>
              <ScrollView
                contentContainerStyle={styles.scrollViewContainer}>
                {this.state.AccordionData.map((item, key) => (
                  <Accordion
                    key={key}
                    onClick={this.changeLayout.bind(this, key)}
                    item={item}
                  />
                ))}
              </ScrollView>
            </View>
          </SafeAreaView>
        )}
      </DarkModeContext.Consumer>
    );
  }
}

export default HelpfulTipsScreen;
