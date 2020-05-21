import React from 'react';
import {StyleSheet, TextInput, Animated} from 'react-native';

export default class DigitInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(0),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== '') {
      Animated.timing(this.state.fadeValue, {
        toValue: 150,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (
      (!prevProps.edit && this.props.edit) ||
      (prevProps.value !== '' && this.props.value === '')
    ) {
      Animated.timing(this.state.fadeValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }

  focus() {
    this.refs.digitInput.focus();
  }

  render() {
    const interpolateBackground = this.state.fadeValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgba(57, 62, 70, 0.6)', 'rgba(57, 62, 70, .05)'],
    });
    const background = {backgroundColor: interpolateBackground};
    return (
      <Animated.View
        style={[styles.viewStyle, background]}
        pointerEvents={this.props.edit ? 'auto' : 'none'}>
        <TextInput
          ref="digitInput"
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          onKeyPress={this.props.onKeyPress}
          blurOnSubmit={this.props.blurOnSubmit}
          selection={this.props.selection}
          maxLength={1}
          keyboardType="numeric"
          style={styles.textInput}
          autoFocus={this.props.autoFocus}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    borderColor: 'black',
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  textInput: {
    fontSize: 30,
    textAlign: 'center',
  },
});
