import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import CustomButton from '../components/general/CustomButton';
import LeftNavButton from '../components/leftNav/leftNavButton';

import Header from '../components/general/Header';

// TODO: Make the button bigger. CustomButton needs to be more flexible.
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePress = () => {
    this.props.navigation.navigate('LoginScreen');
  };
  handlePickup = () => {
    this.props.navigation.navigate('Request');
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 6, backgroundColor: 'lightgray'}}>
          <LeftNavButton navigation={this.props.navigation} />  
          <Image source={{uri: 'https://cdn4.iconfinder.com/data/icons/logistics-55/50/1-512.png'}} style={{width: 400, height: 400, alignSelf: 'center'}} />
        </View>
        <View style={{flex: 5, elevation: 10}}>
          <Header
            headerText={'Hello Alex,'}
            subHeaderText={"Here's your most recent pickup:"}
            containerStyle={{marginTop: 20, paddingLeft: 20}}
            headerStyle={{fontSize: 18}}
          />
          <View style={{marginHorizontal: 40, marginTop: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 80, height: 80, backgroundColor: 'gray'}} />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  paddingLeft: 15,
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  Laptop Charger
                </Text>
                <Text style={{fontSize: 16}}>
                  Sent on January 13, 2020 to Fedex
                </Text>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: 'darkgray'}}>
                  In Progress
                </Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'column-reverse'}}>
            <CustomButton
              text={'Request a pickup'}
              onPress={this.handlePickup}
              textStyle={{color: '#000000'}}
              buttonStyle={{elevation: 10, backgroundColor: '#F8B500'}}
              containerStyle={{
                width: '60%',
                alignSelf: 'center',
                marginBottom: 20,
              }}
              textStyle={{fontWeight: 'bold', fontSize: 18, color: 'black'}}
            />
          </View>
        </View>
      </View>
    );
  }
}
