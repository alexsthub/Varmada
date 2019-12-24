import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity } from 'react-native';

// TODO: Container style override.
export default class CustomButton extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={[styles.container, this.props.containerStyle]}>
        <TouchableOpacity style={[styles.button, this.props.buttonStyle]} onPress = {this.props.onPress}>
          <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 0.5,
    backgroundColor: '#F8B500',
    opacity: 0.8,
    padding : 10
  },
  text: {
    color: '#000000',
    fontSize: 24
  }
})