import React from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class ReviewHeader extends React.Component {
  render() {
    const {request} = this.props;
    const {address, carrier, time, date} = request;

    let subtitle;
    if (address.name !== address.address) {
      subtitle = `${address.address} ${address.city}, ${address.state} `;
    } else {
      subtitle = `${address.city}, ${address.state}`;
    }
    return (
      <View style={this.props.containerStyle}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgray')}
          onPress={this.props.touchDateTime}>
          <View style={{paddingVertical: 8}}>
            <Text style={styles.pickupText}>
              Pickup: {date}, {time}
            </Text>
          </View>
        </TouchableNativeFeedback>
        <View style={{flexDirection: 'row'}}>
          <View style={{alignItems: 'center', paddingVertical: 10}}>
            <View style={[styles.circle]} />
            <LinearGradient
              style={styles.gradient}
              colors={['#F8B500', '#B52323']}
              pointerEvents={'none'}
            />
            <View style={[styles.circle, {backgroundColor: '#B52323'}]} />
          </View>
          <View style={{marginLeft: 15, width: '100%'}}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('lightgray')}
              onPress={this.props.touchAddress}>
              <View style={{paddingVertical: 5, marginRight: 40}}>
                <Text style={{fontWeight: 'bold'}}>From:</Text>
                <Text>{address.name}</Text>
                <Text>{subtitle}</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={{marginVertical: 3}} />

            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('lightgray')}
              onPress={this.props.touchCarrier}>
              <View style={{paddingVertical: 5, marginRight: 40}}>
                <Text style={{fontWeight: 'bold'}}>To:</Text>
                <Text>{carrier}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickupText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  circle: {
    height: 15,
    width: 15,
    borderRadius: 7,
    backgroundColor: '#F8B500',
    elevation: 5,
    borderWidth: 1,
  },
  gradient: {
    flex: 1,
    width: 1,
  },
});
