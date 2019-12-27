import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

// TODO: Make sure the icon sizes will be equal throughout (increase height ceiling for images)
// TODO: Make sure the heights will be equal throughout

// TODO: Change for adding payment
export default class PaymentMethod extends React.Component {
  render() {
    let image;
    if (this.props.type === 'venmo') {
      image = (
        <Image
          source={require('../../assets/venmo_icon.png')}
          style={styles.imageIcon}
          resizeMode={'stretch'}
        />
      );
    } else if (this.props.type === 'Add') {
      image = <Icon name={'credit-card'} style={styles.vectorIcon} size={30} />;
    } else {
      image = <Icon name={'cc-visa'} style={styles.vectorIcon} size={30} />;
    }

    let textContent;
    const type = this.props.type;
    if (this.props.type === 'venmo') {
      textContent = (
        <View>
          <Text style={{fontSize: 18}}>Venmo</Text>
          <Text style={{fontSize: 14, color: 'gray'}}>{this.props.username}</Text>
        </View>
      );
    } else if (this.props.type === 'Add') {
      textContent = (
        <Text style={{fontSize: 18}}>Credit or Debit Card</Text>
      );
    } else {
      textContent = (
        <Text style={{fontSize: 18}}>
          {type.charAt(0).toUpperCase() + type.slice(1)}{' '}
          {this.props.cardNumber}
        </Text>
      );
    }

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('lightgray')}
        onPress={this.props.onPress}>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>{image}</View>
          <View style={styles.textContainer}>{textContent}</View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    flex: 1,
  },
  imageIcon: {
    flex: 1,
    width: null,
    height: null,
  },
  vectorIcon: {
    color: 'black',
  },
  imageContainer: {
    flex: 1,
  },
  textContainer: {
    marginLeft: 15,
    flex: 7,
  },
});
