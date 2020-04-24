import React from 'react';
import {Dimensions} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {fromRight} from 'react-navigation-transitions';
import {enableScreens} from 'react-native-screens';

// Loading Screen
import LoadingScreen from '../screens/LoadingScreen';

// Auth Screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ValidateScreen from '../screens/ValidateScreen';

// Main Screens
import MainScreen from '../screens/MainScreen';
import LeftNav from '../components/leftNav/leftNav';

// Nav Screens
import MyPickupScreen from '../screens/navscreens/MyPickupScreen';
import PickupDetailsScreen from '../screens/navscreens/PickupDetailsScreen';
import MyAddressScreen from '../screens/navscreens/MyAddressScreen';
import PaymentMethodScreen from '../screens/navscreens/PaymentMethodScreen';
import PaymentAddScreen from '../screens/PaymentAddScreen';
import SettingsScreen from '../screens/navscreens/SettingsScreen';
import EditAccountScreen from '../screens/navscreens/EditAccountScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
import SecuritySettingsScreen from '../screens/SecuritySettingsScreen';

// Request Screens
import RequestTitle from '../screens/request/RequestTitle';
import RequestImage from '../screens/request/RequestImage';
import RequestCarrier from '../screens/request/RequestCarrier';
import RequestServices from '../screens/request/RequestServices';
import RequestPackage from '../screens/request/RequestPackage';
import RequestAddress from '../screens/request/RequestAddress';
import RequestAdditional from '../screens/request/RequestAdditional';
import RequestTime from '../screens/request/RequestTime';
import RequestReview from '../screens/request/RequestReview';
import RequestAddLabel from '../screens/request/RequestAddLabel';

import EditNameScreen from '../screens/editfieldscreens/EditNameScreen';
import EditPhoneScreen from '../screens/editfieldscreens/EditPhoneScreen';
import EditEmailScreen from '../screens/editfieldscreens/EditEmailScreen';
import EditPasswordScreen from '../screens/editfieldscreens/EditPasswordScreen';

enableScreens();
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

const RequestNavigator = createStackNavigator(
  {
    Title: {
      screen: RequestTitle,
      navigationOptions: {headerTransparent: true},
    },
    Image: {
      screen: RequestImage,
      navigationOptions: {headerTransparent: true},
    },
    Carrier: {
      screen: RequestCarrier,
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
    Address: {
      screen: RequestAddress,
      navigationOptions: {headerTransparent: true},
    },
    AddLabel: {
      screen: RequestAddLabel,
      navigationOptions: {headerTransparent: true},
    },
    Additional: {
      screen: RequestAdditional,
      navigationOptions: {headerTransparent: true},
    },
    Time: {
      screen: RequestTime,
      navigationOptions: {headerTransparent: true},
    },
    Review: {
      screen: RequestReview,
      navigationOptions: {headerTransparent: true},
    },
    Payment: {
      screen: PaymentMethodScreen,
      navigationOptions: {headerTransparent: true},
    },
    AddPayment: {
      screen: PaymentAddScreen,
      navigationOptions: {headerTransparent: true},
    }
  },
  {
    // initialRouteName: 'Review',
    transitionConfig: () => fromRight(500),
  },
);

const AuthStack = createStackNavigator(
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
  },
  {
    initialRouteName: 'LoginScreen',
  },
);

const MainStack = createStackNavigator(
  {
    MainDrawer: {
      screen: MainDrawer,
      navigationOptions: {header: null},
    },
    EditAccountScreen: {
      screen: EditAccountScreen,
      navigationOptions: {title: 'Edit Profile'},
    },
    EditNameScreen: {
      screen: EditNameScreen,
      navigationOptions: {headerTransparent: true},
    },
    EditPhoneScreen: {
      screen: EditPhoneScreen,
      navigationOptions: {headerTransparent: true},
    },
    EditEmailScreen: {
      screen: EditEmailScreen,
      navigationOptions: {headerTransparent: true},
    },
    EditPasswordScreen: {
      screen: EditPasswordScreen,
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
      navigationOptions: {header: null},
    },
    PickupDetails: {
      screen: PickupDetailsScreen,
      navigationOptions: {headerTransparent: true},
    }
  },
  {
    initialRouteName: 'MainDrawer',
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Loading: {
      screen: LoadingScreen,
      navigationOptions: {header: null},
    },
    Auth: {
      screen: AuthStack,
      navigationOptions: {header: null},
    },
    Main: {
      screen: MainStack,
      navigationOptions: {header: null},
    },
  },
  {
    initialRouteName: 'Loading',
  },
);

export default createAppContainer(AppNavigator);
