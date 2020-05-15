import React from 'react';
import AppContainer from './navigation/AppContainer';
import {NavigationActions} from 'react-navigation';
import {StatusBar} from 'react-native';
import {Auth} from 'aws-amplify';


// TODO: Need to do something with refreshing tokens???
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null};
  }

  handleNavigationChange = async () => {
    try {
      await Auth.currentAuthenticatedUser();
    } catch (err) {
      this.navigator &&
        this.navigator.dispatch(
          NavigationActions.navigate({routeName: 'Auth'}),
        );
    }
  };

  render() {
    StatusBar.setBarStyle('default');
    StatusBar.setBackgroundColor('#F8B500');
    return (
      <AppContainer
        ref={r => {
          this.navigator = r;
        }}
        onNavigationStateChange={this.handleNavigationChange}
      />
    );
  }
}
