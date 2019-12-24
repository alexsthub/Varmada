import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import NavScreenHeader from '../../components/general/NavScreenHeader';

export default class MyAddressScreen extends React.Component {
  render() {
    return (
      <View>
        <NavScreenHeader navigation={this.props.navigation} title={'My Addresses'}/>
      </View>
    );
  }
}