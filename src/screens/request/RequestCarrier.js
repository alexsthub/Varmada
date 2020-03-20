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
  Animated,
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

export default class RequestCarrier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedCarrierID: null, fadeValue: new Animated.Value(0)};
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

  componentDidUpdate = (prevProps, prevState) => {
    if (!prevState.selectedCarrierID && this.state.selectedCarrierID) {
      this.renderAnimation(150);
    } else if (prevState.selectedCarrierID && !this.state.selectedCarrierID) {
      this.renderAnimation(0);
    }
  };

  renderAnimation = toValue => {
    Animated.timing(this.state.fadeValue, {
      toValue: toValue,
      duration: 300,
    }).start();
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
    const animatedBackground = this.state.fadeValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['#FFFFFF', '#F8B500'],
    });
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
              <CarrierContainer
                selected={this.state.selectedCarrierID === item.id}
                image={item.image}
                onPress={() => this.setState({selectedCarrierID: item.id})}
              />
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
            onPress={this.handleContinue}
            disabled={!this.state.selectedCarrierID}>
            <Animated.View
              style={{
                backgroundColor: animatedBackground,
                borderWidth: !this.state.selectedCarrierID ? 1 : null,
                borderColor: !this.state.title ? '#F8B500' : null,
                elevation: 10,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Continue</Text>
            </Animated.View>
          </TouchableNativeFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

class CarrierContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fadeValue: new Animated.Value(0)};
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.selected && !prevProps.selected) {
      this.renderAnimation(150);
    } else if (!this.props.selected && prevProps.selected) {
      this.renderAnimation(0);
    }
  };

  renderAnimation = toValue => {
    Animated.timing(this.state.fadeValue, {
      toValue: toValue,
      duration: 300,
    }).start();
  };

  render() {
    const animatedBackground = this.state.fadeValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['#F7F7F7', '#5c636e'],
    });
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('lightgray')}
        onPress={this.props.onPress}
        useForeground={true}>
        <Animated.View
          style={[
            styles.imageContainer,
            {backgroundColor: animatedBackground},
          ]}>
          <Image style={styles.image} source={this.props.image} />
        </Animated.View>
      </TouchableNativeFeedback>
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
    paddingHorizontal: 10,
  },
  image: {
    flex: 1,
    height: 120,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
});
