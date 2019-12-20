import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CustomButton from '../components/general/CustomButton';
import LeftNavButton from '../components/leftNav/leftNavButton';

export default class PickupScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text> Hi </Text>
        <LeftNavButton navigation={this.props.navigation} />
      </View>
    );
  }
}
