import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Animated,
} from 'react-native';

import Header from '../../components/general/Header';

// TODO: Fill this shit out
export default class RequestTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleContinue = () => {
    this.props.navigation.navigate('Review', {
      time: "some-time",
      date: "some-date",
    });
  };

  render() {
    return (
      <View style={{marginHorizontal: 40}}>
        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Date and time'}
        />

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
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Continue</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
