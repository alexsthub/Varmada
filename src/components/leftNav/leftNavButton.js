import React from 'react';
import {StyleSheet} from 'react-native';
import IOSIcon from 'react-native-vector-icons/Ionicons';

export default class LeftNavButton extends React.Component {
  render() {
    return (
      <IOSIcon
        name="ios-menu"
        size={40}
        onPress={() => this.props.navigation.toggleDrawer()}
      />
    );
  }
}
