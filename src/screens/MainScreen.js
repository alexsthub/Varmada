import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LeftNavButton from '../components/leftNav/leftNavButton';

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
        <LeftNavButton navigation={this.props.navigation} />
        <Text>Hi </Text>
      </View>
    );
  }
}
