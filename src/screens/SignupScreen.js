import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Auth} from 'aws-amplify';

import styles from '../constants/styles/loginStyles';

import FloatingInput from '../components/general/FloatingInput';
import CustomButton from '../components/general/CustomButton';
import Header from '../components/general/Header';

// TODO: Handle errors
// TODO: Implement my own error handling. (Start with first name and last name)

// TODO: Go back to signin isn't actually at the bottom because of the goddamn scrollview.
// TODO: Do a check if all textvalues are valid, otherwise show error above
// TODO: Way to fix the laggy input change is to put an invisible textinput right on top and the main one will only show the value.
// TODO: Country code for phones
export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      errors: ['', '', '', ''],
    };
  }

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

  returnToSignin = () => {
    this.props.navigation.navigate('LoginScreen');
  };

  checkFieldErrors = () => {
    let errors = this.state.errors;
    if (this.state.firstName === '') {
      errors[0] = 'Please enter your first name';
    }
    if (this.state.lastName === '') {
      errors[1] = 'Please enter your last name';
    }
  };

  handleSignup = () => {
    const phoneNumber = '+1' + this.state.phone.replace(/[(\-) ]/g, '');
    this.checkFieldErrors();
    Auth.signUp({
      username: phoneNumber,
      password: this.state.password,
      attributes: {
        phone_number: phoneNumber,
        name: this.state.firstName,
        family_name: this.state.lastName,
      },
    })
      .then(user => {
        console.log(user);
        this.props.navigation.navigate('ValidateScreen', {user: user});
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/loginGradient.jpg')}
        style={styles.background}>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.container}>
            <Header
              headerText={'Create Account'}
              subHeaderText={'Join the community'}
            />

            <View style={styles.inputDivider}></View>

            <FloatingInput
              ref={r => (this.firstName = r)}
              value={this.state.firstName}
              label={'First Name'}
              labelColorBlur={'#FFFFFF'}
              onChangeText={text => this.setState({firstName: text})}
              onSubmitEditing={() => this.lastName.getInnerRef().focus()}
              returnKeyType={'next'}
              blurOnSubmit={false}
              error={this.state.errors[0] !== '' ? this.state.errors[0] : null}
            />

            <View style={styles.inputDivider}></View>

            <FloatingInput
              ref={r => (this.lastName = r)}
              value={this.state.lastName}
              label={'Last Name'}
              labelColorBlur={'#FFFFFF'}
              onChangeText={text => this.setState({lastName: text})}
              onSubmitEditing={() => this.phone.getInnerRef().focus()}
              returnKeyType={'next'}
              blurOnSubmit={false}
              error={this.state.errors[1] !== '' ? this.state.errors[1] : null}
            />

            <View style={styles.inputDivider}></View>

            <FloatingInput
              ref={r => (this.phone = r)}
              value={this.state.phone}
              label={'Phone Number'}
              keyboardType={'numeric'}
              maxLength={14}
              labelColorBlur={'#FFFFFF'}
              onChangeText={this.onChangePhone}
              blurOnSubmit={false}
              onSubmitEditing={() => this.password.getInnerRef().focus()}
              returnKeyType={'next'}
            />

            <View style={styles.inputDivider}></View>

            <FloatingInput
              ref={r => (this.password = r)}
              value={this.state.password}
              label={'Password'}
              labelColorBlur={'#FFFFFF'}
              secureText={true}
              showPasswordIcon={true}
              onChangeText={text => this.setState({password: text})}
              blurOnSubmit={false}
              onSubmitEditing={this.handleSignup}
            />

            <View style={styles.inputDivider}></View>

            <View style={styles.noticeContainer}>
              <Text>By clicking Sign Up, you agree to Varmada's </Text>
              <TouchableOpacity>
                <Text style={styles.highlightText}>Terms of Service</Text>
              </TouchableOpacity>
              <Text> and acknowledge Varmada's </Text>
              <TouchableOpacity>
                <Text style={styles.highlightText}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputDivider}></View>

            <CustomButton
              text={'Sign Up'}
              onPress={this.handleSignup}
              buttonStyle={{elevation: 10}}
            />

            <View style={styles.inputDivider}></View>

            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <TouchableOpacity onPress={this.returnToSignin}>
                <Text style={{color: 'white'}}>
                  Already An Account?{' '}
                  <Text style={{color: 'white'}}>Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
