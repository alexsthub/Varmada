import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  FlatList,
  AsyncStorage,
} from 'react-native';

import {NavigationEvents} from 'react-navigation';

import Header from '../../components/general/Header';

const carriers = [
  {
    name: 'USPS',
    image: require('../../assets/usps.png'),
    id: 1,
  },
  {
    name: 'FedEx',
    image: require('../../assets/fedex.png'),
    id: 2,
  },
  {
    name: 'UPS',
    image: require('../../assets/ups.png'),
    id: 3,
  },
];

// TODO: Animate the background color?
export default class RequestCarrier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedCarrierID: null};
  }

  getRequestFromStorage = async () => {
    try {
      const requestString = await AsyncStorage.getItem('request');
      if (requestString !== null) {
        this.requestObject = JSON.parse(requestString);
        if (this.requestObject.carrier) {
          this.setState({selectedCarrierID: this.requestObject.carrier.id});
        }
      }
    } catch (error) {
      console.log('oh no...');
    }
  };

  handleContinue = async () => {
    const carrierName = carriers.find(
      c => c.id === this.state.selectedCarrierID,
    ).name;
    this.requestObject.carrier = {
      name: carrierName,
      id: this.state.selectedCarrierID,
    };
    const objString = JSON.stringify(this.requestObject);
    try {
      await AsyncStorage.setItem('request', objString);
      this.props.navigation.navigate('Services');
    } catch (error) {
      console.log('oh fuck what do i do now.');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.getRequestFromStorage} />
        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Select a Carrier'}
        />

        <View style={{marginTop: 20}}>
          <FlatList
            data={carriers}
            renderItem={({item}) => (
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('lightgray')}
                onPress={() => this.setState({selectedCarrierID: item.id})}
                useForeground={true}>
                <View
                  style={[
                    styles.imageContainer,
                    this.state.selectedCarrierID === item.id
                      ? styles.selected
                      : null,
                  ]}>
                  <Image style={styles.image} source={item.image} />
                </View>
              </TouchableNativeFeedback>
            )}
            keyExtractor={item => item.name}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{marginVertical: 8}} />}
          />
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
  imageContainer: {
    flexDirection: 'row',
    elevation: 4,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 10,
  },
  image: {
    flex: 1,
    height: 120,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  selected: {
    backgroundColor: '#5c636e',
  },
});
