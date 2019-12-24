import React from 'react';
import {
  ImageBackground,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import styles from '../constants/styles/loginStyles';

import FloatingInput from '../components/general/FloatingInput';
import CustomButton from '../components/general/CustomButton';
import {faPhone, faLock} from '@fortawesome/free-solid-svg-icons';

// TODO: Cannot click on login while keyboard is open. Scrollview takes priority. Keyboardshouldpersisttaps
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {phone: '', password: '', keyboardOpen: false};
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    if (this.keyboardDidShowListener) {
      this.keyboardDidShowListener.remove();
    }
    if (this.keyboardDidHideListener) {
      this.keyboardDidHideListener.remove();
    }
  }

  keyboardDidShow = () => {
    this.setState({keyboardOpen: true});
  };

  keyboardDidHide = () => {
    this.setState({keyboardOpen: false});
  };

  onChangePhone = (text) => {
    let input = text.replace(/[(\-) ]/g,'');
    const size = input.length;
    if (input === '(') {
      input = '';
    } else if (size == 0) {
      input = input;
    } else if (size < 4) {
      input = '(' + input;
    } else if (size < 7) {
      input = '(' + input.substring(0,3) + ') ' + input.substring(3,6);
    } else {
      input = '(' + input.substring(0,3) + ') ' + input.substring(3,6) + '-' + input.substring(6,10);
    }
    this.setState({phone: input});
  }

  handleLogin = () => {
    console.log('Trying to Login');
    this.props.navigation.navigate('MainDrawer');
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
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.container}>

            {logoContainer}

            <View style={{marginTop: 80}}></View>

            <FloatingInput
              ref={r => (this.phone = r)}
              value={this.state.phone}
              label={'Phone'}
              keyboardType={'numeric'}
              maxLength={14}
              labelColorBlur={'#FFFFFF'}
              onChangeText={this.onChangePhone}
              blurOnSubmit={false}
              icon={faPhone}
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
              icon={faLock}
              showPasswordIcon={true}
              secureText={true}
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
