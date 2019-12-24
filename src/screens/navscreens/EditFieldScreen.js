import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import FloatingInput from '../../components/general/FloatingInput';
import CustomButton from '../../components/general/CustomButton';

export default class EditFieldScreen extends React.Component {
  render() {
    const firstName = this.props.navigation.getParam('fName', 'default');
    const lastName = this.props.navigation.getParam('lName', 'default');
    return (
      <View style={{marginTop: 100, flex: 1, marginHorizontal: 40}}>
        <FloatingInput
          ref={r => (this.firstName = r)}
          value={firstName}
          label={'First Name'}
          labelColorBlur={'#FFFFFF'}
          onChangeText={text => {}}
        />

        <View style={{marginVertical: 10}} />

        <FloatingInput
          ref={r => (this.firstName = r)}
          value={lastName}
          label={'Last Name'}
          labelColorBlur={'#FFFFFF'}
          onChangeText={text => {}}
        />

        <View style={{marginTop: 30}} />

        <CustomButton
          text={'Save'}
          onPress={() => {}}
          textStyle={{color: '#000000'}}
          buttonStyle={{elevation: 10}}
        />
      </View>
    );
  }
}
