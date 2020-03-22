import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  AsyncStorage,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';

import Header from '../../components/general/Header';

// TODO: Same goes for labels
export default class RequestServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {request: null};
  }

  // Get request object from async storage and save to state
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

  // Remove packaging attribute from request object and save to async storage
  removePackaging = async () => {
    const request = this.state.request;
    if (request.packaging) {
      delete request.packaging;
    }
    this.setState({request: request}, async () => {
      const objString = JSON.stringify(request);
      try {
        await AsyncStorage.setItem('request', objString);
      } catch (error) {
        console.log('oh fuck what do i do now.');
      }
    });
  };

  // Navigate to label screen
  handleLabels = () => {
    this.props.navigation.navigate('AddLabel');
  };

  // Navigate to package screen
  handlePackaging = () => {
    this.props.navigation.navigate('Package');
  };

  // Navigate to address screen
  handleContinue = () => {
    this.props.navigation.navigate('Address');
  };

  render() {
    const request = this.state.request;
    const packagingElement =
      request && request.packaging ? (
        <View style={styles.packageBox}>
          <View
            style={{
              paddingLeft: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 50, width: 50}}
              source={
                request.packaging.type === 'mailer'
                  ? require('../../assets/packaging/mailer.png')
                  : require('../../assets/packaging/box.png')
              }
            />
            <View style={{paddingLeft: 20, flex: 1}}>
              <Text>{request.packaging.name}</Text>
              <Text>{request.packaging.dimensions}</Text>
              <Text>{'$' + request.packaging.price.toFixed(2).toString()}</Text>
            </View>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('lightgray')}
              onPress={this.removePackaging}>
              <View
                style={{
                  justifyContent: 'flex-end',
                  padding: 15,
                  backgroundColor: 'red',
                }}>
                <Text>Remove</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      ) : (
        <View style={styles.box}>
          <Text style={{fontSize: 14}}>Need packaging?</Text>
        </View>
      );
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
            {packagingElement}
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
  packageBox: {
    backgroundColor: '#f8b500',
    elevation: 10,
    paddingVertical: 15,
    marginBottom: 20,
  },
});
