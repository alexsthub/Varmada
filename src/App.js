import React from 'react';
import AppContainer from './navigation/AppContainer';
import {StatusBar} from 'react-native';

export default class App extends React.Component {
  render() {
    StatusBar.setBarStyle('default');
    StatusBar.setBackgroundColor('#F8B500');
    return <AppContainer />;
  }
}
