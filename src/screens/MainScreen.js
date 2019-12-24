import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CustomButton from '../components/general/CustomButton';
import LeftNavButton from '../components/leftNav/leftNavButton';

// TODO: Make the button bigger. CustomButton needs to be more flexible.
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePress = () => {
    this.props.navigation.navigate('LoginScreen');
  };
  handlePickup = () => {
    this.props.navigation.navigate('PickupScreen');
  };

  //how do i space this text apart.
  render() {
    return (
      <View style={{flex: 1}}>
        <LeftNavButton navigation={this.props.navigation} />
        <View style={{justifyContent: 'space-between'}}>
          <Text style={{textAlign: 'center', fontSize: 30}}>Hi, Alex</Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20, marginTop: 30
            }}>
            You don't have any pickups scheduled right now
          </Text>
        </View>

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
