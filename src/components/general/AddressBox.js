import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Animated,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export default class Address extends React.Component {
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
    }).start();
  };

  render() {
    const addressObj = this.props.address;
    const {address, city, name, state} = addressObj;
    let subText;
    if (name.split(' ')[0] === address.split(' ')[0]) {
      subText = `${city},  ${state}`;
    } else {
      subText = `${address} ${city}, ${state}`;
    }

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
            <EntypoIcon
              style={{color: this.props.selected ? 'white' : 'black'}}
              name={'location-pin'}
              size={40}
            />
          </View>
          <View style={{flexDirection: 'column', paddingLeft: 10}}>
            <Text
              style={[
                {fontWeight: 'bold'},
                {color: this.props.selected ? 'white' : 'black'},
              ]}>
              {name}
            </Text>
            <Text style={{color: this.props.selected ? '#F7F7F7' : 'gray'}}>
              {subText}
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
