import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Image,
} from 'react-native';

import Header from '../../components/general/Header';
import ReviewHeader from '../../components/general/ReviewHeader';

export default class RequestReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: 'Venmo',
    };
  }

  choosePayment = () => {
    this.props.navigation.navigate('Payment');
  };

  render() {
    const addressObj = {
      address: '4105 Brooklyn Ave NE',
      city: 'Seattle',
      countryCode: ' USA',
      name: 'Levere Apartments',
      placeID: 'ChIJyZCbd_MUkFQRXA53DSuvSns',
      state: 'WA',
      zip: '98105',
    };
    const carrier = 'FedEx';
    const time = '8:00AM - 10:00AM';
    const date = '3/22/2020';

    const requestObject = {
      address: addressObj,
      carrier: carrier,
      time: time,
      date: date,
    };
    return (
      <View style={{flex: 1, marginHorizontal: 40}}>
        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Review and pay'}
        />
        <ReviewHeader
          request={requestObject}
          containerStyle={{marginVertical: 15}}
          touchDateTime={() => console.log('go to time picker')}
          touchAddress={() => console.log('go to address picker')}
          touchCarrier={() => console.log('go to carrier')}
        />

        <Text style={{fontWeight: 'bold'}}>Pay With:</Text>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgray')}
          onPress={this.choosePayment}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              borderWidth: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
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

        <View style={styles.container}>
          <Text>Items (1):</Text>
          <Text>$3.00</Text>
        </View>
        <View style={styles.container}>
          <Text>Delivery Fee:</Text>
          <Text>$1.00</Text>
        </View>
        <View style={styles.container}>
          <Text>Printing:</Text>
          <Text>$0.50</Text>
        </View>
        <View style={styles.container}>
          <Text>Packaging:</Text>
          <Text>$2.00</Text>
        </View>
        <View style={styles.container}>
          <Text>Sales Tax:</Text>
          <Text>$0.75</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.orderTotal}>Order Total:</Text>
          <Text style={[styles.orderTotal, styles.price]}>$7.25</Text>
        </View>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgray')}
          // onPress={this.handleContinue}
        >
          <View
            style={{
              backgroundColor: '#F8B500',
              elevation: 10,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Confirm Request
            </Text>
          </View>
        </TouchableNativeFeedback>
        <Text style={styles.warning}>
          You won’t be charged until after the pickup has been dropped off.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderTotal: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 15,
  },
  price: {
    color: '#f8b500',
  },
  warning: {
    textAlign: 'center',
    marginVertical: 10,
  },
});
