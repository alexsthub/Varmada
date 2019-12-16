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
import CustomButton from '../components/general/CustomButton';

const phone = ''
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {phone: '', password: ''};
  }

  

  handleLogin = () => {
    console.log('Trying to Login');
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/loginGradient.jpg')}
        style={styles.background}>
        <View style={styles.container}>
          {/* TODO: Add Image */}
          <View style={{marginTop: 80}}></View>

          <FloatingInput
            ref={r => (this.phone = r)}
            value={this.state.phone}
            label={'Phone'}
            onChangeText={text => this.setState({phone: text})}
            blurOnSubmit={false}
            onSubmitEditing={() => this.password.getInnerRef().focus()}
          />

          <View style={styles.inputDivider}></View>

          <FloatingInput
            ref={r => (this.password = r)}
            value={this.state.password}
            label={'Password'}
            onChangeText={text => this.setState({password: text})}
            blurOnSubmit={false}
            onSubmitEditing={this.handleLogin}
          />

          <View style={styles.inputDivider}></View>

          <CustomButton
            text={'Login'}
            onPress={this.handleLogin}
            textStyle={{color: '#000000'}}
            buttonStyle={{elevation: 10}}
          />

          <TouchableOpacity style={{alignItems: 'flex-end'}}>
            <Text style={styles.clickableText}>Forgot Password?</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 40,
  },
  inputDivider: {
    marginVertical: 10,
  },
  clickableText: {
    color: '#1655F4'
  }
});
