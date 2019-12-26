import React from 'react';
import {StyleSheet, View, Text, Image, TouchableNativeFeedback} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

// TODO: Make sure the icon sizes will be equal throughout (increase height ceiling for images)
// TODO: Change text on venmo
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
    } else {
      image = <Icon name={'cc-visa'} size={30} style={styles.vectorIcon} />;
    }

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('lightgray')}
        onPress={this.props.onPress}>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>{image}</View>
          <View style={styles.textContainer}>
            <Text style={{fontSize: 18}}>Visa ****1832</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      // <TouchableHighlight
      //   style={{paddingVertical: 15}}
      //   underlayColor={'lightgray'}
      //   activeOpacity={0.95}
      //   onPress={this.props.onPress}>
      //   <View style={styles.contentContainer}>
      //     <View style={styles.imageContainer}>{image}</View>
      //     <View style={styles.textContainer}>
      //       <Text style={{fontSize: 18}}>Visa ****1832</Text>
      //     </View>
      //   </View>
      // </TouchableHighlight>
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
    height: null
    // height: 30,
    // width: 30,
  },
  vectorIcon: {
    color: 'black',
  },
  imageContainer: {
    flex: 1,
  },
  textContainer: {
    marginLeft: 15,
    flex: 7
  }
});
