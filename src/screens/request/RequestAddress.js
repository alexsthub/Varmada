import React from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';

import Header from '../../components/general/Header';

export default class RequestAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addAddress = () => {
    this.props.navigation.navigate('AddAddress');
  };

  render() {
    return (
      <View style={{marginHorizontal: 40, flex: 1}}>
        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Select a pickup address'}
        />

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgray')}
          onPress={this.addAddress}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              backgroundColor: '#F7F7F7',
              elevation: 10,
              padding: 10,
            }}>
            <Text style={{fontWeight: 'bold'}}>Add a new address</Text>
            <View style={{}}>
              <Text>></Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
