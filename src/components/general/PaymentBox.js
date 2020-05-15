import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Animated,
} from 'react-native';


export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fadeValue: new Animated.Value(0)};
  }

  componentDidMount() {
    if (this.props.selected) {
      this.renderAnimation(150);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.selected && !prevProps.selected) {
      this.renderAnimation(150);
    } else if (!this.props.selected && prevProps.selected) {
      this.renderAnimation(0);
    }
  };

  renderAnimation = toValue => {
    Animated.timing(this.state.fadeValue, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const paymentObj = this.props.payment;
    const {cardNumber, expirationDate} = paymentObj;

    const animatedBackground = this.state.fadeValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['#F7F7F7', '#5c636e'],
    });

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('lightgray')}
        onPress={e => this.props.onPress(e, this.props.index)}>
        <Animated.View
          style={[styles.container, {backgroundColor: animatedBackground}]}>
          <View style={{paddingHorizontal: 10}}>
            <Text style={{ color: 'blue', fontWeight: 'bold', backgroundColor: 'white', width: 80, fontSize:20, paddingLeft:15}}>VISA</Text>
          </View>
          <View style={{flexDirection: 'column', paddingLeft: 10}}>
            <Text
              style={[
                {fontWeight: 'bold'},
                {color: this.props.selected ? 'white' : 'black'},
              ]}>
              {cardNumber}
            </Text>
            <Text style={{color: this.props.selected ? '#F7F7F7' : 'gray'}}>
              {"Expires " + expirationDate}
            </Text>
          </View>
        </Animated.View>
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
  },
  icon: {
    color: '#000000',
  },
});
