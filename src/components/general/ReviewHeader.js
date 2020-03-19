import React from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

export default class ReviewHeader extends React.Component {
  timesToRange = (start, end) => {
    let suffix;
    if (start >= 12) {
      suffix = 'PM';
      start = start % 12;
      end = end % 12;
      if (start === 0) {
        start = 12;
      }
      if (end === 0) {
        end = 12;
      }
    } else {
      suffix = 'AM';
    }
    return `${start}${suffix} - ${end}${suffix}`;
  };

  render() {
    if (!this.props.request) {
      return null;
    }
    const {address, carrier, time, date, title, image} = this.props.request;
    let subtitle;
    if (address.name !== address.address) {
      subtitle = `${address.address} ${address.city}, ${address.state} `;
    } else {
      subtitle = `${address.city}, ${address.state}`;
    }

    const dateString = moment(date).format('dddd, MMMM Do');
    const timeString = this.timesToRange(time.startTime, time.endTime);
    return (
      <View style={this.props.containerStyle}>
        <Text>{title}</Text>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgray')}
          onPress={this.props.touchDateTime}>
          <View style={{paddingVertical: 8, flexDirection: 'row'}}>
            <Text style={[styles.pickupText, {fontWeight: 'bold'}]}>
              Pickup:{' '}
            </Text>
            <Text style={styles.pickupText}>
              {dateString}, {timeString}
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
    fontSize: 16,
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
