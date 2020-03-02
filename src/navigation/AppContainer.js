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
import PaymentAddScreen from '../screens/PaymentAddScreen';
import SettingsScreen from '../screens/navscreens/SettingsScreen';
import EditAccountScreen from '../screens/navscreens/EditAccountScreen';
import EditFieldScreen from '../screens/navscreens/EditFieldScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
import SecuritySettingsScreen from '../screens/SecuritySettingsScreen';

// Request Screens
import RequestTitle from '../screens/request/RequestTitle';
import RequestImage from '../screens/request/RequestImage';
import RequestServices from '../screens/request/RequestServices';
import RequestPackage from '../screens/request/RequestPackage';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.5,
  contentComponent: props => {
    return <LeftNav {...props} />;
  },
};

const MainDrawer = createDrawerNavigator(
  {
    Home: {
      screen: MainScreen,
    },
    Pickups: {
      screen: MyPickupScreen,
    },
    MyAddresses: {
      screen: MyAddressScreen,
    },
    PaymentMethods: {
      screen: PaymentMethodScreen,
    },
    AccountSettings: {
      screen: SettingsScreen,
      navigationOptions: {},
    },
  },
  DrawerConfig,
);

const RequestNavigator = createStackNavigator({
  Title: {
    screen: RequestTitle,
    navigationOptions: {headerTransparent: true},
  },
  Image: {
    screen: RequestImage,
    navigationOptions: {headerTransparent: true},
  },
  Services: {
    screen: RequestServices,
    navigationOptions: {headerTransparent: true},
  },
  Package: {
    screen: RequestPackage,
    navigationOptions: {headerTransparent: true},
  },
});

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
    EditAccountScreen: {
      screen: EditAccountScreen,
      navigationOptions: {title: 'Edit Profile'},
    },
    EditFieldScreen: {
      screen: EditFieldScreen,
      navigationOptions: {headerTransparent: true},
    },
    NotificationSettingsScreen: {
      screen: NotificationSettingsScreen,
      navigationOptions: {title: 'Notification Settings'},
    },
    SecuritySettingsScreen: {
      screen: SecuritySettingsScreen,
      navigationOptions: {title: 'Security'},
    },
    PaymentAddScreen: {
      screen: PaymentAddScreen,
      navigationOptions: {headerTransparent: true},
    },
    Request: {
      screen: RequestNavigator,
      navigationOptions: {headerTransparent: true},
    },
  },
  {
    initialRouteName: 'LoginScreen',
  },
);
export default createAppContainer(AppNavigator);
