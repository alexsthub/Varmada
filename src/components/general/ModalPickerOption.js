import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

export default class ModalPickerOption extends React.Component {
  handlePress = () => {
    this.props.onPress(this.props.title);
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={'lightgray'}
        activeOpacity={0.95}
        onPress={this.handlePress}>
        <View style={styles.container}>
          <View style={[styles.circle, {backgroundColor: this.props.active ? '#F8B500' : null}]}/>
          <Text style={{fontSize: 24}}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center'
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft: 20,
    marginRight: 10
  }
});

ModalPickerOption.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

ModalPickerOption.defaultProps = {
  title: '',
  onPress: () => {},

}
