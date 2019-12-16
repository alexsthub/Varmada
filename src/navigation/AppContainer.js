import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';

const AppNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {header:null}
    }
  },
  {
    initialRouteName: 'LoginScreen',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
