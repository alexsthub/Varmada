import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../../constants/styles';

export default class AddressBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.addressBoxView}>
        <View style={{marginHorizontal: 30, backgroundColor: 'green'}}>
          <Text style={{fontWeight: 'bold'}}>{this.props.addressTitle}</Text>
          <Text>{this.props.street}</Text>
          {this.props.apartment ? <Text>{this.props.apartment}</Text> : null}
          <Text>
            {this.props.city}, {this.props.state} {this.props.zipcode}
          </Text>
          {this.props.isDefault ? null : (
            <TouchableOpacity
              style={[styles.button, this.props.buttonStyle]}
              onPress={this.props.onPress}>
              <Text style={styles.text}>Set As Default</Text>
            </TouchableOpacity>
          )}
          <View style={styles.addressButtonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.props.onPress}>
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={this.props.onPress}>
              <Text style={styles.text}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addressBoxView: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    borderWidth: 0.5,
    backgroundColor: Colors.boldColor,
    opacity: 0.8,
    padding: 10,
  },
  text: {
    color: Colors.defaultColor,
    fontSize: 24,
  },
  addressButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

AddressBox.propTypes = {
  size: PropTypes.number,
  backgroundColor: PropTypes.string,
};

AddressBox.defaultProps = {
  size: 30,
  backgroundColor: Colors.boldColor,
};
