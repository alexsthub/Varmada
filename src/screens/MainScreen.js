import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePress = () => {
    this.props.navigation.navigate('LoginScreen');
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Hi </Text>
      </View>
    );
  }
}
