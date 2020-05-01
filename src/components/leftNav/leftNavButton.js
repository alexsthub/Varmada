import React from 'react';
import IOSIcon from 'react-native-vector-icons/Ionicons';

export default class LeftNavButton extends React.Component {
  render() {
    return (
      <IOSIcon
        name="ios-menu"
        style={{fontSize: 25}}
        onPress={
          this.props.disableIconPress
            ? null
            : () => this.props.navigation.openDrawer()
        }
      />
    );
  }
}
