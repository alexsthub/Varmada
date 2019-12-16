import React from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Animated} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

export default class FloatingInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      secureTextEntry: this.props.label === 'Password',
      fadeValue: new Animated.Value(0),
      labelSlideValue: new Animated.Value(150),
    };
  }

  getInnerRef = () => this.ref;

  handleBlur = () => {
    if (this.props.value.length === 0) {
      Animated.timing(this.state.fadeValue, {
        toValue: 0,
        duration: 300,
      }).start();

      Animated.timing(this.state.labelSlideValue, {
        toValue: 150,
        duration: 150,
      }).start();
      this.setState({active: false});
    }
  };

  handleFocus = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 150,
      duration: 300,
    }).start();

    Animated.timing(this.state.labelSlideValue, {
      toValue: 0,
      duration: 150,
    }).start();
    this.setState({active: true});
  };

  toggleSecureText = () => {
    this.setState({secureTextEntry : !this.state.secureTextEntry});
  }

  render() {
    const interpolateColor = this.state.fadeValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgba(220,220,220, 0.4)', 'rgba(255,255,255,1)'],
    });
    const animatedBackground = {backgroundColor: interpolateColor};

    const interpolateTop = this.state.labelSlideValue.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 18],
    });
    const animatedTop = {top: interpolateTop};
    return (
      <Animated.View style={[styles.field, animatedBackground]}>
        <Animated.View style={[styles.label, animatedTop]}>
          <Text
            style={{fontSize: !this.state.active ? 16 : 14, color: !this.state.active ? 'white' : '#83a4d4',}}>{this.props.label}</Text>
        </Animated.View>
        <TextInput
          ref={r => (this.ref = r)}
          style={[styles.input, this.state.active ? styles.activeInput : null]}
          value={this.props.value}
          keyboardType={this.props.keyboardType}
          onChangeText={this.props.onChangeText}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit={this.props.blurOnSubmit}
          secureTextEntry={this.state.secureTextEntry}
          {...this.props}
        />
        {this.props.label === 'Password' ? 
        <TouchableOpacity onPress={this.toggleSecureText} style={styles.iconContainer}>
          <FontAwesomeIcon icon={this.state.secureTextEntry ? faEyeSlash : faEye}/>
        </TouchableOpacity> : null}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  field: {
    borderRadius: 5,
    height: 56,
    flexDirection: 'row'
  },
  input: {
    flex: 8,
    paddingVertical: 0,
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  activeInput: {
    paddingTop: 24,
    paddingBottom: 8,
  },
  label: {
    position: 'absolute',
    left: 16,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5
  }
});
