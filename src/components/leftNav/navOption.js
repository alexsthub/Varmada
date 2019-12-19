import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import PropTypes from 'prop-types';

export default class navOption extends React.Component {
  render() {
    const icon = this.props.icon ? 
      <View style={styles.iconContainer}>
        <FontAwesomeIcon style={this.props.iconStyle} icon={this.props.icon}/> 
      </View> : null;
    return (
      <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={this.props.onPress}> 
        {icon}
        <Text style={this.props.textStyle}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1
  },
  iconContainer: {
    paddingRight: 10
  }
})

navOption.propTypes = {
  icon: PropTypes.object,
  iconStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  onPress: PropTypes.func,
  text: PropTypes.string
};

navOption.defaultProps = {
  icon: null,
  iconStyle: {},
  containerStyle: {},
  textStyle: {},
  onPress: () => {},
  text: ''
};