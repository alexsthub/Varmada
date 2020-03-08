import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Picker,
} from 'react-native';

import Header from '../../components/general/Header';

export default class RequestReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: 'Venmo',
    };
  }
  render() {
    console.log(this.props.navigation.state.params)
    const {addressObj, carrier, time, date} = this.props.navigation.state.params;
    console.log(addressObj)
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
        <Text>{addressObj.city}, {addressObj.state}</Text>
        <Text>{addressObj.countryCode}</Text>
        <Text style={{fontWeight: 'bold'}}>To</Text>
        <Text>
          {carrier}
        </Text>
        <Picker
          selectedValue={this.state.payment}
          style={{height: 50, width: '100%'}}
          onValueChange={itemValue => this.setState({payment: itemValue})}>
          <Picker.Item label="Venmo" value="Venmo" />
          <Picker.Item label="PayPal" value="PayPal" />
        </Picker>
        <Text>Items (1):</Text>
        <Text>Delivery Fee: </Text>
        <Text>Printing: </Text>
        <Text>Packaging: </Text>
        <Text>Sales Tax: </Text>
        <Text>Order Total: </Text>
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
        <Text style={{textAlign: 'center'}}>
          You won’t be charged until after the pickup has been dropped off.
        </Text>
      </View>
    );
  }
}
