import React from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';

import Header from '../../components/general/Header';

export default class RequestAdditional extends React.Component {
  handleAnotherPackage = () => {
    console.log('Oh no...');
  };

  handleContinue = () => {
    console.log('good idea');
    this.props.navigation.navigate('Review');
  };

  render() {
    return (
      <View style={{flex: 1, marginHorizontal: 40}}>
        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Need to deliver another package?'}
        />

        <View style={{marginTop: 20}}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={this.handleContinue}>
            <View
              style={{
                backgroundColor: '#F8B500',
                elevation: 10,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                No, continue to checkout
              </Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={this.handleAnotherPackage}>
            <View
              style={{
                backgroundColor: '#F8B500',
                elevation: 10,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Yes, I have another package
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}
