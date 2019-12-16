import React from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';

import FloatingInput from '../components/general/FloatingInput';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {phone: '', password: ''};
  }

  render() {
    return (
      <View>
        <FloatingInput
          ref={r => (this.phone = r)}
          value={this.state.phone}
          label={'Phone'}
          onChangeText={text => this.setState({phone: text})}
          blurOnSubmit={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    
  }
});