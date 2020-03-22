import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  AsyncStorage,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';

import Header from '../../components/general/Header';
import ReviewHeader from '../../components/general/ReviewHeader';

// TODO: Use packaging price if exists
// TODO: Show packaging if it exists and make it editable.
export default class RequestReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: 'Venmo',
      request: null,
    };
  }

  getRequestFromStorage = async () => {
    try {
      const requestString = await AsyncStorage.getItem('request');
      if (requestString !== null) {
        const requestObject = JSON.parse(requestString);
        this.setState({request: requestObject});
      }
    } catch (error) {
      console.log('oh no...');
    }
  };

  choosePayment = () => {
    this.props.navigation.navigate('Payment');
  };

  editCarrier = () => {
    this.props.navigation.navigate('Carrier', {edit: true});
  };

  editDateTime = () => {
    this.props.navigation.navigate('Time', {edit: true});
  };

  editTitle = () => {
    console.log('reditting');
    this.props.navigation.navigate('Title', {edit: true});
  };

  editAddress = () => {
    this.props.navigation.navigate('Address', {edit: true});
  };

  handleConfirm = () => {
    console.log('confirming...');
  };

  render() {
    return (
      <View style={{flex: 1, marginHorizontal: 40}}>
        <NavigationEvents onWillFocus={this.getRequestFromStorage} />

        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Review and pay'}
        />
        <ReviewHeader
          request={this.state.request}
          containerStyle={{marginVertical: 15}}
          touchTitle={this.editTitle}
          touchDateTime={this.editDateTime}
          touchAddress={this.editAddress}
          touchCarrier={this.editCarrier}
        />

        <Text style={{fontWeight: 'bold'}}>Pay With:</Text>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgray')}
          onPress={this.choosePayment}>
          <View style={styles.payContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../assets/venmo_icon.png')}
                style={{width: 25, height: 25}}
                resizeMode={'stretch'}
              />
              <Text style={{fontSize: 18, marginLeft: 15}}>Venmo</Text>
            </View>
            <Text>></Text>
          </View>
        </TouchableNativeFeedback>

        <View style={styles.orderDetails}>
          <View style={styles.lineContainer}>
            <Text>Items (1):</Text>
            <Text>$3.00</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text>Delivery Fee:</Text>
            <Text>$1.00</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text>Printing:</Text>
            <Text>$0.50</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text>Packaging:</Text>
            <Text>$2.00</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text>Sales Tax:</Text>
            <Text>$0.75</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.orderTotal}>Order Total:</Text>
            <Text style={[styles.orderTotal, styles.price]}>$7.25</Text>
          </View>
        </View>

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgray')}
          onPress={this.handleConfirm}>
          <View style={styles.continueButton}>
            <Text style={styles.continueText}>Confirm Request</Text>
          </View>
        </TouchableNativeFeedback>
        {/* <Text style={styles.warning}>
          You won’t be charged until after the pickup has been dropped off.
        </Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDetails: {
    marginVertical: 10,
  },
  orderTotal: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
  },
  price: {
    color: '#f8b500',
  },
  warning: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
  },
  payContainer: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#F8B500',
    elevation: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
