import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';

const AppNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {header:null}
    }
  },
  {
    initialRouteName: 'MainScreen',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
