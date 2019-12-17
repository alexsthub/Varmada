import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import FloatingInput from '../components/general/FloatingInput';
import CustomButton from '../components/general/CustomButton';
import Header from '../components/general/Header';

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSignin = () => {
    this.props.navigation.navigate('LoginScreen');
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/loginGradient.jpg')}
        style={styles.background}>
        <View style={styles.container}>

          <Header
            headerText={'Create Account'}
            subHeaderText={'Join the community'}
          />

          {/* TODO: Add textfields and button here */}

          <View style={styles.signUpContainer}>
            <TouchableOpacity onPress={this.handleSignin}>
              <Text style={{color: 'white'}}>
                Already An Account?{' '}
                <Text style={{color: 'white'}}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>

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
});
