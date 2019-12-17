import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const AppNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {header:null}
    },
    SignupScreen: {
      screen: SignupScreen,
      navigationOptions: {headerTransparent: true}
    }
  },
  {
    initialRouteName: 'LoginScreen',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
