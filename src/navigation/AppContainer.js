import React from 'react';
import {Dimensions} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ValidateScreen from '../screens/ValidateScreen';
import PickupScreen from '../screens/PickupScreen';

import MainScreen from '../screens/MainScreen';
import LeftNav from '../components/leftNav/leftNav';

import MyPickupScreen from '../screens/navscreens/MyPickupScreen';
import MyAddressScreen from '../screens/navscreens/MyAddressScreen';
import PaymentMethodScreen from '../screens/navscreens/PaymentMethodScreen';
import SettingsScreen from '../screens/navscreens/SettingsScreen';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.5,
  contentComponent: (props) => {
    return <LeftNav {...props}/>;
  },
};

const MainDrawer = createDrawerNavigator(
  {
    Home: {
      screen: MainScreen,
    },
    Pickups: {
      screen: MyPickupScreen
    },
    MyAddresses: {
      screen: MyAddressScreen
    },
    PaymentMethods: {
      screen: PaymentMethodScreen
    },
    AccountSettings: {
      screen: SettingsScreen,
      navigationOptions: {}
    },
  },
  DrawerConfig,
);

const AppNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {header: null},
    },
    SignupScreen: {
      screen: SignupScreen,
      navigationOptions: {headerTransparent: true},
    },
    ValidateScreen: {
      screen: ValidateScreen,
      navigationOptions: {headerTransparent: true},
    },
    MainDrawer: {
      screen: MainDrawer,
      navigationOptions: {header: null},
    },
    PickupScreen: {
      screen: PickupScreen,
      navigationOptions: {headerTransparent: true},
    },
  },
  {
    initialRouteName: 'LoginScreen',
  },
);
export default createAppContainer(AppNavigator);
