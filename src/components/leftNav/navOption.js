import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import PropTypes from 'prop-types';

export default class navOption extends React.Component {
  render() {
    const icon = this.props.icon ? (
      <View style={styles.iconContainer}>
        <FontAwesomeIcon style={this.props.iconStyle} icon={this.props.icon} />
      </View>
    ) : null;

    const content = 
    <View style={styles.container}>
      {icon}
      <Text style={this.props.textStyle}>{this.props.text}</Text>
    </View>;

    const body = this.props.isFooter ? 
    <TouchableOpacity
      style={[styles.container, this.props.containerStyle]}
      onPress={this.props.onPress}>
      {content}
    </TouchableOpacity> :
    <TouchableHighlight
      style={[styles.container, this.props.containerStyle, , {backgroundColor: this.props.active ? 'lightgray': null}]}
      onPress={this.props.onPress}
      underlayColor={'lightgray'}
      activeOpacity={.95}>
        {content}
    </TouchableHighlight>

    return (body);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    paddingRight: 10,
  },
});

navOption.propTypes = {
  icon: PropTypes.object,
  iconStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  onPress: PropTypes.func,
  text: PropTypes.string,
  isFooter: PropTypes.bool,
};

navOption.defaultProps = {
  icon: null,
  iconStyle: {},
  containerStyle: {},
  textStyle: {},
  onPress: () => {},
  text: '',
  isFooter: false
};
