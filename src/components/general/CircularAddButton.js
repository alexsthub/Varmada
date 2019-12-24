import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class CirculerAddButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={[
          styles.CircleShapeView,
          {
            width: this.props.size,
            height: this.props.size,
            borderRadius: this.props.size / 2,
            backgroundColor: this.props.backgroundColor,
          },
        ]}>
        <Text style={{fontSize: this.props.size / 2}}>+</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CircleShapeView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

CirculerAddButton.propTypes = {
  size: PropTypes.number,
  backgroundColor: PropTypes.string,
};

CirculerAddButton.defaultProps = {
  size: 30,
  backgroundColor: '#F8B500',
};
