import React from 'react';
import {StyleSheet} from 'react-native';
import IOSIcon from 'react-native-vector-icons/Ionicons';

export default class LeftNavButton extends React.Component {
  render() {
    return (
      <IOSIcon
        name="ios-menu"
        size={30}
        onPress={() => this.props.navigation.toggleDrawer()}
      />
    );
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    left: 20,
  },
});
