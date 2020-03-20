import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  AsyncStorage,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';

import Header from '../../components/general/Header';

// TODO: If packaging is in use, show it and add the option to remove it
// TODO: Same goes for labels
export default class RequestServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {request: null};
  }

  getRequestFromStorage = async () => {
    try {
      const requestString = await AsyncStorage.getItem('request');
      if (requestString !== null) {
        const requestObject = JSON.parse(requestString);
        console.log(requestObject);
        this.setState({request: requestObject});
      }
    } catch (error) {
      console.log('oh no...');
    }
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
        <NavigationEvents onWillFocus={this.getRequestFromStorage} />
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
