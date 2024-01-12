/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getColors} from '../services/Color';
import styles from './styles';
import HomeScreen from '../screens/Home';
import ErrorInfoScreen from '../screens/ErrorInfo';
import HelpfulTipsScreen from '../screens/HelpfulTips';
import TermsAndConditionScreen from '../screens/TermsAndCondition';
import EditProfileScreen from '../screens/EditProfile';
import ChangePasswordScreen from '../screens/ChangePassword';
import EditHeaterDetailsScreen from '../screens/EditHeaterDetails';
import AddHeaterScreen from '../screens/AddHeater';
import EnterModelNumberScreen from '../screens/EnterModelNumber';
import WarrantyRegistrationScreen from '../screens/WarrantyRegistration';
import RouterSetupScreen from '../screens/RouterSetupNew';
import WPSSetupScreen from '../screens/WPSSetup';
import ManualRouterSetupScreen from '../screens/ManualRouterSetup';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import AddHeaterLoginScreen from '../screens/AddHeaterLogin';
import ScanQRScreen from '../screens/ScanQR';
import WifiSetupScreen from '../screens/WifiSetup';
import TimeZoneScreen from '../screens/TimeZone';
import Schedule from '../screens/Schedule';
import DeleteAccount from '../screens/deleteAccount';
import DeleteAccountConfirmation from '../screens/deleteAccountConfirmation';
import RecirculationTutorialScreen from '../screens/RecirculationTutorial';
import RemoveAccountAccess from '../screens/removeAccessProcess/RemoveAccessProcess';
//Schedule
const EditProfileStack = createStackNavigator();

function EditProfile(){
  return(
    <EditProfileStack.Navigator
      headerMode="none"
      screenOptions={{
        headerStyle: [
          styles.headerStyle,
          {backgroundColor: getColors().screenBackground},
        ],
        headerTitleStyle: [
          styles.headerTitle,
          {color: getColors().primaryDarkColor},
        ],
        headerTitleAlign: 'center',
        gestureEnabled: false,
      }}>
        <EditProfileStack.Screen name="EditProfile">
          {(props)=> {<EditProfileScreen {...props}/>}}
        </EditProfileStack.Screen>
      </EditProfileStack.Navigator>
  )
}

const HomeStack = createStackNavigator();
// Home screns stack
function Home() {
  return (
    <HomeStack.Navigator
      headerMode="none"
      screenOptions={{
        headerStyle: [
          styles.headerStyle,
          {backgroundColor: getColors().screenBackground},
        ],
        headerTitleStyle: [
          styles.headerTitle,
          {color: getColors().primaryDarkColor},
        ],
        headerTitleAlign: 'center',
        gestureEnabled: false,
      }}>
      <HomeStack.Screen name="Home">
        {(props) => <HomeScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="ErrorInfo">
        {(props) => <ErrorInfoScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="HelpfulTips">
        {(props) => <HelpfulTipsScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="TermsAndCondition">
        {(props) => <TermsAndConditionScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="RecirculationTutorial">
        {(props) => <RecirculationTutorialScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="EditProfile">
      {(props) => <EditProfileScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="DeleteAccountFeedback">
      {(props) => <DeleteAccount {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="DeleteAccountConfirmation">
      {(props) => <DeleteAccountConfirmation {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="RemoveAccountAccess">
      {(props) => <RemoveAccountAccess {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="TimeZone">
        {(props) => <TimeZoneScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Schedule">
        {(props) => <Schedule {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="ChangePassword">
        {(props) => <ChangePasswordScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="EditHeaterDetails">
        {(props) => <EditHeaterDetailsScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="AddHeater">
        {(props) => <AddHeaterScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="ScanQR">
        {(props) => <ScanQRScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="EnterModelNumber">
        {(props) => <EnterModelNumberScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="WarrantyRegistration">
        {(props) => <WarrantyRegistrationScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Tutorial">
        {(props) => <WifiSetupScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="RouterSetup">
        {(props) => <RouterSetupScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="WPSSetup">
        {(props) => <WPSSetupScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="ManualRouterSetup">
        {(props) => <ManualRouterSetupScreen {...props} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        headerMode="none"
        screenOptions={{
          headerStyle: [
            styles.headerStyle,
            {backgroundColor: getColors().screenBackground},
          ],
          headerTitleStyle: [
            styles.headerTitle,
            {color: getColors().primaryDarkColor},
          ],
          headerTitleAlign: 'center',
          gestureEnabled: false,
        }}>
        <HomeStack.Screen name="Login">
          {(props) => <LoginScreen {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="Register">
          {(props) => <RegisterScreen {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="AddHeaterLogin">
          {(props) => <AddHeaterLoginScreen {...props} />}
        </HomeStack.Screen>

        <HomeStack.Screen name="ScanQR">
          {(props) => <ScanQRScreen {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="EnterModelNumber">
          {(props) => <EnterModelNumberScreen {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="WarrantyRegistration">
          {(props) => <WarrantyRegistrationScreen {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="Tutorial">
          {(props) => <WifiSetupScreen {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="RouterSetup">
          {(props) => <RouterSetupScreen {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="WPSSetup">
          {(props) => <WPSSetupScreen {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="ManualRouterSetup">
          {(props) => <ManualRouterSetupScreen {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="TermsAndCondition">
          {(props) => <TermsAndConditionScreen {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="DeleteAccountFeedback">
      {(props) => <DeleteAccount {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="DeleteAccountConfirmation">
      {(props) => <DeleteAccountConfirmation {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="RemoveAccountAccess">
      {(props) => <RemoveAccountAccess {...props} />}
      </HomeStack.Screen>

        <MainStack.Screen name="Home" component={Home} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
