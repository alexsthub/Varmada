import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';


// TODO: Make this a little less shitty. Add icon is really bad
export default class ProfileImage extends React.Component {
  render() {
    let addSize;
    if (this.props.size === 100) {
      addSize = 30;
    } else if (this.props.size === 50) {
      addSize = 20;
    } else {
      addSize = 40
    }
    return (
      <TouchableOpacity
        style={{ elevation: 10 }}
        onPress={this.props.onPress}
        disabled={this.props.disabled}>
        <Image
          source={this.props.image}
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
          <Icon name={'pluscircleo'} size={addSize} style={{ color: 'black' }} />
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
  disabled: PropTypes.bool
};

ProfileImage.defaultProps = {
  size: 100,
  borderWidth: 0,
  backgroundColor: 'white',
  onPress: () => { },
  disabled: false
};
