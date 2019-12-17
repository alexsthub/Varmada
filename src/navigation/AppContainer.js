import React from 'react';
import {TouchableOpacity, Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import LeftNav from '../components/leftNav';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.83,
  contentComponent: ({navigation}) => {
    return <LeftNav navigation={navigation} />;
  },
};

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: MainScreen,
    },
    Settings: {
      screen: LoginScreen,
    },
  },
  DrawerConfig,
);

export default createAppContainer(DrawerNavigator);

// const AppNavigator = createStackNavigator(
//   {
//     LoginScreen: {
//       screen: LoginScreen,
//       navigationOptions: {header: null},
//     },
//     MainScreen: {
//       screen: MainScreen,
//       navigationOptions: ({navigation}) => ({
//         title: 'Main',
//         headerLeft: (
//           <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
//             <IOSIcon name="ios-menu" size={30} />
//           </TouchableOpacity>
//         ),
//         headerStyle: {paddingRight: 10, paddingLeft: 15},
//       }),
//     },
//   },
//   {
//     initialRouteName: 'MainScreen',
//   },
// );
// const AppContainer = createAppContainer(AppNavigator);
