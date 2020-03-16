import React from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';

import PropTypes from 'prop-types';
export default class TimeRange extends React.Component {
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
    return `${start}:00${suffix} - ${end}:00${suffix}`;
  };

  render() {
    const range = this.timesToRange(this.props.startTime, this.props.endTime);
    const selectedContainer = this.props.selected
      ? styles.selectedContainer
      : null;
    const selectedText = this.props.selected ? styles.selectedText : null;
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('lightgray')}
        onPress={this.props.onPress}>
        <View
          style={[
            styles.container,
            this.props.containerStyle,
            selectedContainer,
          ]}>
          <Text style={[styles.text, selectedText]}>{range}</Text>
          <Text
            style={[styles.text, selectedText]}>{`$${this.props.price.toFixed(
            2,
          )}`}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    backgroundColor: '#F7F7F7',
  },
  text: {
    fontWeight: 'bold',
    paddingHorizontal: 15,
    fontSize: 20,
  },
  selectedContainer: {
    backgroundColor: '#5c636e',
  },
  selectedText: {
    color: '#FFFFFF',
  },
});

TimeRange.propTypes = {
  onPress: PropTypes.func,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  price: PropTypes.number,
  selected: PropTypes.bool,
};
