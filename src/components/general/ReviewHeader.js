import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

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
    const {address, carrier, time, date, title, packaging} = this.props.request;
    let subtitle;
    if (address.name.split(' ')[0] !== address.address.split(' ')[0]) {
      subtitle = `${address.address} ${address.city}, ${address.state} `;
    } else {
      subtitle = `${address.city}, ${address.state}`;
    }

    const dateString = moment(date).format('dddd, MMMM Do');
    const timeString = this.timesToRange(time.startTime, time.endTime);

    let packageElementContent;
    if (packaging) {
      packageElementContent = (
        <View style={styles.packageView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{height: 30, width: 30, marginRight: 10}}
              source={
                packaging.type === 'mailer'
                  ? require('../../assets/packaging/mailer.png')
                  : require('../../assets/packaging/box.png')
              }
            />
            <Text>
              {packaging.name} ({packaging.dimensions})
            </Text>
          </View>
          <FeatherIcon name={'edit'} size={20} />
        </View>
      );
    } else {
      packageElementContent = (
        <View style={styles.packageView}>
          <View>
            <Text>No extra packaging selected.</Text>
            <Text style={{color: 'gray'}}>Press to add a container</Text>
          </View>
          <MaterialIcon name={'add'} size={20} />
        </View>
      );
    }

    return (
      <View style={this.props.containerStyle}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgray')}
          onPress={this.props.touchTitle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{title}</Text>
          </View>
        </TouchableNativeFeedback>
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
                <Text>{carrier.name}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={{fontWeight: 'bold'}}>Extra Packaging:</Text>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={this.props.touchPackage}>
            {packageElementContent}
          </TouchableNativeFeedback>
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
  packageView: {
    // height: 50,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#F7F7F7',
    justifyContent: 'space-between',
  },
});
