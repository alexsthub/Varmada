import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import IOSIcon from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import {TouchableOpacity} from 'react-native';

const AppNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {header: null},
    },
    MainScreen: {
      screen: MainScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Main',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
            <IOSIcon name="ios-menu" size={30} />
          </TouchableOpacity>
        ),
        headerStyle: {paddingRight: 10, paddingLeft: 15},
      }),
    },
  },
  {
    initialRouteName: 'MainScreen',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
