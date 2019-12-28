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
import CustomButton from '../components/general/CustomButton';
import LeftNavButton from '../components/leftNav/leftNavButton';

import styles from '../constants/styles/loginStyles';

// TODO: Make the button bigger. CustomButton needs to be more flexible.
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  // handlePress = () => {
  //   this.props.navigation.navigate('LoginScreen');
  // };
  handlePickup = () => {
    this.props.navigation.navigate('PickupScreen');
  };
  handleMyPickups = () => {
    this.props.navigation.navigate('Pickups');
  };


  //how do i space this text apart.
  render() {
    return (
      <ImageBackground
        source={require('../assets/loginGradient.jpg')}
        style={styles.background}>

      <View style={{flex: 1}}>
        <LeftNavButton navigation={this.props.navigation} />
        <View style={{justifyContent: 'space-between'}}>
          <Text style={{textAlign: 'center', fontSize: 30}}>Sup Bitch</Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20, marginTop: 30
            }}>
            You don't have any pickups scheduled right now
          </Text>
        </View>
        
        <View style={styles.inputDivider}></View>

          <CustomButton
            text={'Request a pickup!'}
            onPress={this.handlePickup}
            textStyle={{color: '#000000'}}
            buttonStyle={{elevation: 10}}
          />

        <View style={styles.inputDivider}></View>

          <CustomButton
            text={'Pickup History'}
            onPress={this.handleMyPickups}
            textStyle={{color: '#000000'}}
            buttonStyle={{elevation: 10}}
          />

      </View>
      </ImageBackground>
    );
  }
}
