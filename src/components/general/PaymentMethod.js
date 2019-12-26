import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class PaymentMethod extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={{paddingVertical: 20}}
        underlayColor={'lightgray'}
        activeOpacity={0.95}
        onPress={() => {}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <Icon
            name={'cc-visa'}
            size={30}
            style={{color: 'black', paddingRight: 15}}
          />
          <Image
            source={require('../../assets/venmo_icon.png')}
            style={{
              height: 30,
              width: 30,
              paddingRight: 15
            }}
          />
          <Text style={{fontSize: 18}}>Visa ****1832</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
