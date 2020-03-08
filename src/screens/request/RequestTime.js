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
    // console.log(this.props.navigation.params)
    const {addressObj, carrier} = this.props.navigation.state.params;
    const date = new Date();
    // console.log(this.props.navigation.getParam("addressObj"));
    this.props.navigation.navigate('Review', {
      addressObj: this.props.navigation.getParam("addressObj"),
      carrier: this.props.navigation.getParam("carrier"),
      // filler for now
      time: `${date.getHours()}:${date.getMinutes()}`,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
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
