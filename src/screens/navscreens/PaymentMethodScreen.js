import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import NavScreenHeader from '../../components/general/NavScreenHeader';

export default class PaymentMethodScreen extends React.Component {
  render() {
    return (
      <View>
        <NavScreenHeader navigation={this.props.navigation} title={'Payment Methods'}/>
      </View>
    );
  }
}