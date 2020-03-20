import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  AsyncStorage,
} from 'react-native';
import {RadioButton} from 'react-native-paper';

import Header from '../../components/general/Header';

// TODO: Fix this
export default class RequestCarrier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked: ''};
  }

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

  handleContinue = async () => {
    this.requestObject.carrier = 'fedex';
    const objString = JSON.stringify(this.requestObject);
    try {
      await AsyncStorage.setItem('request', objString);
      this.props.navigation.navigate('Services');
    } catch (error) {
      console.log('oh fuck what do i do now.');
    }
  };

  render() {
    const {checked} = this.state;
    return (
      <View style={styles.container}>
        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Select a Carrier'}
        />
        <View style={styles.grid}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            useForeground={true}
            onPress={() => this.setState({checked: 'first'})}>
            <View style={styles.carrier}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.setState({checked: 'first'});
                }}
                color="black"
                uncheckedColor="black"
              />
              <Image
                style={styles.image}
                source={require('../../assets/usps.png')}
              />
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            useForeground={true}
            onPress={() => this.setState({checked: 'second'})}>
            <View style={styles.carrier}>
              <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.setState({checked: 'second'});
                }}
                color="black"
                uncheckedColor="black"
              />
              <Image
                style={styles.image}
                source={require('../../assets/ups.png')}
              />
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            useForeground={true}
            onPress={() => this.setState({checked: 'third'})}>
            <View style={styles.carrier}>
              <RadioButton
                value="third"
                status={checked === 'third' ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.setState({checked: 'third'});
                }}
                color="black"
                uncheckedColor="black"
              />
              <Image
                style={styles.image}
                source={require('../../assets/fedex.png')}
              />
            </View>
          </TouchableNativeFeedback>
        </View>

        <KeyboardAvoidingView
          style={{marginTop: 20, width: '60%', alignSelf: 'center'}}
          behavior={'position'}>
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
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 40,
  },
  grid: {
    height: 450,
    backgroundColor: '#F7F7F7',
    elevation: 5,
  },
  carrier: {
    flex: 1,
    borderColor: 'black',
    flexDirection: 'row',
    height: 150,
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 5,
    height: 140,
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: '#F7F7F7',
  },
});
