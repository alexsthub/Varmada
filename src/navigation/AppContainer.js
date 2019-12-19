import React from 'react';
import {Dimensions} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ValidateScreen from '../screens/ValidateScreen';

import MainScreen from '../screens/MainScreen';
import LeftNav from '../components/leftNav';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.83,
  contentComponent: ({navigation}) => {
    return <LeftNav navigation={navigation} />;
  },
};

const MainDrawer = createDrawerNavigator(
  {
    Home: {
      screen: MainScreen,
    },
    Settings: {
      screen: LoginScreen,
      navigationOptions: {header:null}
    }
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
      navigationOptions: {headerTransparent: true}
    },
    ValidateScreen: {
      screen: ValidateScreen,
      navigationOptions: {headerTransparent: true}
    },
    MainDrawer
  },
  {
    initialRouteName: 'LoginScreen',
  },
);
export default createAppContainer(AppNavigator);
