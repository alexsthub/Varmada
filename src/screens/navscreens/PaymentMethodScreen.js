import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import NavScreenHeader from '../../components/general/NavScreenHeader';

import PaymentMethod from '../../components/general/PaymentMethod';

export default class PaymentMethodScreen extends React.Component {
  render() {
    return (
      <View>
        <NavScreenHeader
          navigation={this.props.navigation}
          title={'Payment Methods'}
        />
        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 15}}>Current Payment Methods</Text>

          <View>
            <PaymentMethod />
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  methodsContainer: {},
});
