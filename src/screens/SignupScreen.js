import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import FloatingInput from '../components/general/FloatingInput';
import CustomButton from '../components/general/CustomButton';
import Header from '../components/general/Header';

// TODO: Handle the absolute bottom
// TODO: Do a check if all textvalues are valid, otherwise show error above
export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {firstName: '', lastName: '', phone: '', password: ''};
  }

  handleSignin = () => {
    this.props.navigation.navigate('LoginScreen');
  };

  handleSignup = () => {
    this.props.navigation.navigate('ValidateScreen', {phone: this.state.phone});
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/loginGradient.jpg')}
        style={styles.background}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>

            <Header
              headerText={'Create Account'}
              subHeaderText={'Join the community'}
            />

            <View style={styles.inputDivider}></View>

            {/* TODO: Add textfields and button here */}
            <FloatingInput
              ref={r => (this.firstName = r)}
              value={this.state.phone}
              label={'First Name'}
              labelColorBlur={'#FFFFFF'}
              onChangeText={text => this.setState({firstName: text})}
              onSubmitEditing={() => this.lastName.getInnerRef().focus()}
            />

            <View style={styles.inputDivider}></View>

            <FloatingInput
              ref={r => (this.lastName = r)}
              value={this.state.phone}
              label={'Last Name'}
              labelColorBlur={'#FFFFFF'}
              onChangeText={text => this.setState({lastName: text})}
              onSubmitEditing={() => this.phone.getInnerRef().focus()}
            />

            <View style={styles.inputDivider}></View>

            <FloatingInput
              ref={r => (this.phone = r)}
              value={this.state.phone}
              label={'Phone Number'}
              labelColorBlur={'#FFFFFF'}
              onChangeText={text => this.setState({phone: text})}
              onSubmitEditing={() => this.password.getInnerRef().focus()}
            />

            <View style={styles.inputDivider}></View>

            <FloatingInput
              ref={r => (this.password = r)}
              value={this.state.password}
              label={'Password'}
              labelColorBlur={'#FFFFFF'}
              onChangeText={text => this.setState({password: text})}
              onSubmitEditing={this.handleSignup}
            />

            <View style={styles.inputDivider}></View>

            <View style={styles.noticeContainer}>
              <Text>By clicking Sign Up, you agree to Varmada's{' '}</Text>
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
              textStyle={{color: '#000000'}}
              buttonStyle={{elevation: 10}}
            />

            <View style={styles.inputDivider}></View>

          </View>
        </ScrollView>

        {/* TODO: This needs to be fixed at the bottom of scrollview. */}
        <View style={styles.signUpContainer}>
          <TouchableOpacity onPress={this.handleSignin}>
            <Text style={{color: 'white'}}>
              Already An Account? <Text style={{color: 'white'}}>Sign In</Text>
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
    marginHorizontal: 45,
    flex: 1,
  },
  signUpContainer: {
    position: 'absolute',
    bottom: 15,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  inputDivider: {
    marginVertical: 10,
  },
  noticeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  highlightText: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
});
