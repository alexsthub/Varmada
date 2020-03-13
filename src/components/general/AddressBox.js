import React from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export default class Address extends React.Component {
  render() {
    const addressObj = this.props.address;
    const {address, city, name, state} = addressObj;
    let subText;
    if (name === address) {
      subText = `${city},  ${state}`;
    } else {
      subText = `${address} ${city}, ${state}`;
    }

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('lightgray')}
        onPress={e => this.props.onPress(e, this.props.index)}>
        <View style={styles.container}>
          <View style={{paddingHorizontal: 10}}>
            <EntypoIcon style={styles.icon} name={'location-pin'} size={40} />
          </View>
          <View style={{flexDirection: 'column', paddingLeft: 10}}>
            <Text style={{fontWeight: 'bold'}}>{name}</Text>
            <Text style={{color: 'gray'}}>{subText}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    elevation: 5,
    backgroundColor: '#F7F7F7',
  },
  icon: {
    color: '#000000',
  },
});
