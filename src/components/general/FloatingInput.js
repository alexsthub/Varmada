import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// TODO: Box shadows
// TODO: Add X button to clear text
// TODO: What happens if I want to make this a little bigger?
export default class FloatingInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      secureTextEntry: this.props.secureText,
      fadeValue: new Animated.Value(0),
      labelSlideValue: new Animated.Value(150),
    };
  }

  getInnerRef = () => this.ref;

  componentDidMount() {
    if (this.props.value != '') {
      this.setState({active: true});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.active && this.state.active) {
      this.focusAnimation();
    } else if (prevState.active && !this.state.active) {
      this.blurAnimation();
    }
  }

  blurAnimation = () => {
    if (this.props.value.length === 0) {
      Animated.timing(this.state.fadeValue, {
        toValue: 0,
        duration: 300,
      }).start();

      Animated.timing(this.state.labelSlideValue, {
        toValue: 150,
        duration: 150,
      }).start();
    }
  };

  focusAnimation = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 150,
      duration: 300,
    }).start();

    Animated.timing(this.state.labelSlideValue, {
      toValue: 0,
      duration: 150,
    }).start();
  };

  handleBlur = () => {
    if (this.props.value === '') {
      this.setState({active: false});
    }
  };

  handleFocus = () => {
    this.setState({active: true});
  };

  toggleSecureText = () => {
    this.setState({secureTextEntry: !this.state.secureTextEntry});
  };

  render() {
    const interpolateColor = this.state.fadeValue.interpolate({
      inputRange: [0, 150],
      outputRange: [this.props.rgbaBackgroundColorBlur, this.props.rgbaBackgroundColorFocus],
    });
    const animatedBackground = {backgroundColor: interpolateColor};

    const interpolateTop = this.state.labelSlideValue.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 18],
    });
    const animatedTop = {top: interpolateTop};
    return (
      <View>
        {this.props.error ? (
          <View style={styles.error}>
            <Text style={styles.errorText}>{this.props.error}</Text>
          </View>
        ) : null}

        <Animated.View
          style={[styles.field, this.props.error ? styles.errorField : null, animatedBackground,]}>
          {this.props.icon ? (
            <View style={{justifyContent: 'center', marginLeft: 10}}>
              <FontAwesomeIcon icon={this.props.icon} />
            </View>
          ) : null}

          <Animated.View
            style={[
              styles.label,
              animatedTop,
              {left: this.props.icon ? 40 : 16},
            ]}>
            <Text
              style={{
                fontSize: !this.state.active
                  ? this.props.labelSizeBlur
                  : this.props.labelSizeFocus,
                color: !this.state.active
                  ? this.props.labelColorBlur
                  : this.props.labelColorFocus,
              }}>
              {this.props.label}
            </Text>
          </Animated.View>
          <TextInput
            ref={r => (this.ref = r)}
            style={[
              styles.input,
              this.state.active ? styles.activeInput : null,
            ]}
            value={this.props.value}
            keyboardType={this.props.keyboardType}
            onChangeText={this.props.onChangeText}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            blurOnSubmit={this.props.blurOnSubmit}
            secureTextEntry={this.state.secureTextEntry}
            {...this.props}
          />
          {this.props.showPasswordIcon ? (
            <TouchableOpacity
              onPress={this.toggleSecureText}
              style={styles.iconContainer}>
              <FontAwesomeIcon
                icon={this.state.secureTextEntry ? faEyeSlash : faEye}
              />
            </TouchableOpacity>
          ) : null}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  field: {
    height: 56,
    flexDirection: 'row',
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
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5,
  },
  errorField: {
    borderColor: '#B52323',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  error: {
    borderWidth: 1,
    borderColor: '#B52323',
    paddingVertical: 5,
    paddingLeft: 5,
  },
  errorText: {
    color: '#B52323',
  },
});

FloatingInput.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChangeText: PropTypes.func,
  blurOnSubmit: PropTypes.bool,
  labelSizeBlur: PropTypes.number,
  labelSizeFocus: PropTypes.number,
  labelColorBlur: PropTypes.string,
  labelColorFocus: PropTypes.string,
  rgbaBackgroundColorBlur: PropTypes.string,
  rgbaBackgroundColorFocus: PropTypes.string,
  showPasswordIcon: PropTypes.bool,
  secureText: PropTypes.bool
};

FloatingInput.defaultProps = {
  value: '',
  label: 'Default Label',
  onChangeText: () => {},
  blurOnSubmit: false,
  labelSizeBlur: 16,
  labelSizeFocus: 14,
  labelColorBlur: '#000000',
  labelColorFocus: '#83a4d4',
  rgbaBackgroundColorBlur: 'rgba(92,99,110,0.7)',
  rgbaBackgroundColorFocus: 'rgba(255,255,255,1)',
  showPasswordIcon: false,
  secureText: false
};
