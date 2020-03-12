import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Picker,
} from 'react-native';

import Header from '../../components/general/Header';
import {TextInput} from 'react-native-gesture-handler';

export default class RequestReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: 'Venmo',
    };
  }
  render() {
    const {
      addressObj,
      carrier,
      time,
      date,
    } = this.props.navigation.state.params;
    return (
      <View style={{marginHorizontal: 40}}>
        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Review and pay'}
        />
        <Text style={{fontWeight: 'bold'}}>
          Pickup: {date}, {time}
        </Text>
        <Text style={{fontWeight: 'bold'}}>From</Text>
        <Text>{addressObj.address}</Text>
        <Text>
          {addressObj.city}, {addressObj.state}
        </Text>
        <Text>{addressObj.countryCode}</Text>
        <Text style={{fontWeight: 'bold'}}>To</Text>
        <Text>{carrier}</Text>
        <TextInput
          placeholder="Special Instructions (Optional)"
          style={styles.instructions}
        />
        <Text style={{fontWeight: 'bold'}}>Pay With:</Text>
        <Picker
          selectedValue={this.state.payment}
          style={{height: 50, width: '100%'}}
          onValueChange={itemValue => this.setState({payment: itemValue})}>
          <Picker.Item label="Venmo" value="Venmo" />
        </Picker>
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
    color: '#f8b500'
  },
  warning: {
    textAlign: 'center',
    marginVertical: 10,
  },
  instructions: {
    backgroundColor: 'grey',
    paddingHorizontal: 10,
  },
});
