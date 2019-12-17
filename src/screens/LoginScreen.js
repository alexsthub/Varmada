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

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {phone: '', password: '', keyboardOpen: false};
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  // TODO: This doesn't work. Throwing warnings
  componentWillUnmount() {
    if (this.keyboardDidShowListener || this.keyboardDidHideListener) {
      Keyboard.removeAllListeners('keyboardDidShow');
    }
  }

  keyboardDidShow = () => {
    this.setState({keyboardOpen: true});
  };

  keyboardDidHide = () => {
    this.setState({keyboardOpen: false});
  };

  handleLogin = () => {
    console.log('Trying to Login');
  };

  handleSignup = () => {
    this.props.navigation.navigate('SignupScreen');
  }

  render() {
    const logoContainer = !this.state.keyboardOpen ? 
      <View style={styles.logoContainer}>
        <View style={styles.logo}/>
      </View> : null;

    const orText = !this.state.keyboardOpen ? 
     <View style={{alignItems: 'center', marginVertical: 10}}>
        <Text style={{fontSize: 24, color: '#FFFFFF'}}>--OR--</Text>
      </View> : null

    // TODO: Google image is pretty messed up.
    const googleSignIn = !this.state.keyboardOpen ?
      <TouchableOpacity style={{alignItems: 'center'}}>
        <Image 
          style={{height: 53, overflow: 'hidden'}} 
          source={require('../assets/googleSigninButton.png')}
          resizeMode={'contain'}/>
      </TouchableOpacity> : null

    return (
      <ImageBackground
        source={require('../assets/loginGradient.jpg')}
        style={styles.background}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'never'}>
          <View style={styles.container}>

            {logoContainer}

            <View style={{marginTop: 80}}></View>

            <FloatingInput
              ref={r => (this.phone = r)}
              value={this.state.phone}
              label={'Phone'}
              keyboardType={'numeric'}
              labelColorBlur={'#FFFFFF'}
              onChangeText={text => this.setState({phone: text})}
              blurOnSubmit={false}
              onSubmitEditing={() => this.password.getInnerRef().focus()}
            />

            <View style={styles.inputDivider}></View>

            <FloatingInput
              ref={r => (this.password = r)}
              value={this.state.password}
              label={'Password'}
              labelColorBlur={'#FFFFFF'}
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

            {orText}
            {googleSignIn}

          </View>
        </ScrollView>

        <View style={styles.signUpContainer}>
          <TouchableOpacity onPress={this.handleSignup}>
            <Text style={{color: 'white'}}>
              Don't Have An Account?{' '}
              <Text style={{color: 'white'}}>Sign Up</Text>
            </Text>
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
  logoContainer: {
    alignItems: 'center',
    marginTop: 40
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'gray'
  },
  inputDivider: {
    marginVertical: 10,
  },
  clickableText: {
    color: 'white',
  },
  signUpContainer: {
    position: 'absolute',
    bottom: 15,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
});
