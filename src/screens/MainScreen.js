import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CustomButton from '../components/general/CustomButton';
import LeftNavButton from '../components/leftNav/leftNavButton';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePress = () => {
    this.props.navigation.navigate('LoginScreen');
  };
  handlePickup = () => {
    console.log('Handling new pickup...');
    this.props.navigation.navigate('PickUpScreen');
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <LeftNavButton navigation={this.props.navigation} />
        <View style={{flex: 1, flexDirection: 'column-reverse'}}>
          <CustomButton
            text={'Request a pickup!'}
            onPress={this.handlePickup}
            textStyle={{color: '#000000'}}
            buttonStyle={{elevation: 10}}
          />
        </View>
      </View>
    );
  }
}
