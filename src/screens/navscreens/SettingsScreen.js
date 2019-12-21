import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import NavScreenHeader from '../../components/general/NavScreenHeader';

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <View>
        <NavScreenHeader navigation={this.props.navigation} title={'Account Settings'}/>
      </View>
    );
  }
}