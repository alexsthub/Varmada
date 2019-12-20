import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';

export default class ProfileImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity
        style={{elevation: 10, marginTop: 20}}
        onPress={this.props.onPress}>
        <Image
          source={require('../../assets/defaultProfile.png')}
          style={{
            height: this.props.size,
            width: this.props.size,
            borderRadius: this.props.size / 2,
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: this.props.backgroundColor,
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            backgroundColor: '#F8B500',
            borderRadius: 50,
          }}>
          <Icon name={'pluscircleo'} size={30} style={{color: 'black'}} />
        </View>
      </TouchableOpacity>
    );
  }
}

ProfileImage.propTypes = {
  size: PropTypes.number,
  borderWidth: PropTypes.number,
  backgroundColor: PropTypes.string,
  onPress: PropTypes.func,
};

ProfileImage.defaultProps = {
  size: 100,
  borderWidth: 0,
  backgroundColor: 'white',
  onPress: () => {},
};
