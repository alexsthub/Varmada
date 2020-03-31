import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import styles from '../constants/styles/loginStyles';
import {Auth} from 'aws-amplify';

import FloatingInput from '../components/general/FloatingInput';
import CustomButton from '../components/general/CustomButton';
import {faPhone, faLock} from '@fortawesome/free-solid-svg-icons';

// TODO: Probably handle the keyboard is showing a little better. I want it centered in the screen
// TODO: Textinput is a little low in comparison to ICON + LABEL
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {phone: '', password: '', keyboardOpen: false};
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
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

  onChangePhone = text => {
    let input = text.replace(/[(\-) ]/g, '');
    const size = input.length;
    if (input === '(') {
      input = '';
    } else if (size == 0) {
      input = input;
    } else if (size < 4) {
      input = '(' + input;
    } else if (size < 7) {
      input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
    } else {
      input =
        '(' +
        input.substring(0, 3) +
        ') ' +
        input.substring(3, 6) +
        '-' +
        input.substring(6, 10);
    }
    this.setState({phone: input});
  };

  // TODO: Handle errors too
  handleLogin = () => {
    Auth.signIn({
      username: '+1' + this.state.phone.replace(/[(\-) ]/g, ''),
      password: this.state.password,
    })
      .then(user => {
        console.log(user.attributes);
        this.props.navigation.navigate('MainDrawer');
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSignup = () => {
    this.props.navigation.navigate('SignupScreen');
  };

  render() {
    const logoContainer = !this.state.keyboardOpen ? (
      <View style={{marginTop: 100, alignItems: 'center'}}>
        <Text style={{fontSize: 60, fontWeight: 'bold', fontStyle: 'italic'}}>
          Varmada
        </Text>
      </View>
    ) : null;

    // TODO: Google image is pretty messed up.
    const googleSignIn = !this.state.keyboardOpen ? (
      <TouchableOpacity style={{alignItems: 'center', marginTop: 20}}>
        <Image
          style={{height: 53, overflow: 'hidden'}}
          source={require('../assets/googleSigninButton.png')}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    ) : null;

    return (
      <View style={{flex: 1, backgroundColor: '#F8B500'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.container}>
            {logoContainer}

            <View style={{marginTop: 40}}></View>

            <FloatingInput
              ref={r => (this.phone = r)}
              value={this.state.phone}
              label={'Phone'}
              keyboardType={'numeric'}
              maxLength={14}
              labelColorBlur={'#000000'}
              labelColorFocus={'#000000'}
              labelStyle={{fontWeight: 'bold'}}
              fieldStyle={{borderBottomWidth: 1}}
              onChangeText={this.onChangePhone}
              blurOnSubmit={false}
              icon={faPhone}
              returnKeyType={'next'}
              onSubmitEditing={() => this.password.getInnerRef().focus()}
            />

            <View style={styles.inputDivider}></View>

            <FloatingInput
              ref={r => (this.password = r)}
              value={this.state.password}
              label={'Password'}
              labelColorBlur={'#000000'}
              labelColorFocus={'#000000'}
              labelStyle={{fontWeight: 'bold'}}
              fieldStyle={{borderBottomWidth: 1}}
              onChangeText={text => this.setState({password: text})}
              blurOnSubmit={false}
              icon={faLock}
              showPasswordIcon={true}
              autoCapitalize={'none'}
              secureText={true}
              onSubmitEditing={this.handleLogin}
            />
            <TouchableOpacity style={{alignItems: 'flex-end'}}>
              <Text style={styles.clickableText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.inputDivider}></View>

            <CustomButton
              text={'Login'}
              onPress={this.handleLogin}
              buttonStyle={{elevation: 10}}
              containerStyle={{width: '60%', alignSelf: 'center'}}
            />

            {googleSignIn}
          </View>
        </ScrollView>

        <View style={styles.signUpContainer}>
          <TouchableOpacity onPress={this.handleSignup}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Don't Have An Account?{' '}
              <Text style={{color: 'white', fontWeight: 'bold'}}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
