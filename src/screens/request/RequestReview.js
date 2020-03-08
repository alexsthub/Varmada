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
    const {time, date} = this.props.navigation.state.params;
    return (
      <View style={{marginHorizontal: 40}}>
        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Review and pay'}
        />
        <Text style={{fontWeight: 'bold'}}>
          Pickup: {date}, {time}
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
      </View>
    );
  }
}
