import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  AsyncStorage,
} from 'react-native';

import Header from '../../components/general/Header';

export default class RequestServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {packaging: null};
  }

  // TODO: If package is received, we need to check to see if async storage was updated and display the change
  componentDidMount = async () => {
    try {
      const requestString = await AsyncStorage.getItem('request');
      if (requestString !== null) {
        this.requestObject = JSON.parse(requestString);
      }
    } catch (error) {
      console.log('oh no...');
    }
    console.log(this.requestObject);
  };

  handleLabels = () => {
    this.props.navigation.navigate('AddLabel');
  };

  handlePackaging = () => {
    this.props.navigation.navigate('Package');
  };

  handleContinue = () => {
    this.props.navigation.navigate('Address');
  };

  render() {
    return (
      <View style={{marginHorizontal: 40}}>
        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Need any extra services?'}
        />

        <View style={{marginTop: 40}}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={this.handleLabels}>
            <View style={styles.box}>
              <Text style={{fontSize: 14}}>Need to print out labels?</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={this.handlePackaging}>
            <View style={styles.box}>
              <Text style={{fontSize: 14}}>Need packaging?</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

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
              marginTop: 40,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Continue</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#f8b500',
    elevation: 10,
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 20,
  },
});
