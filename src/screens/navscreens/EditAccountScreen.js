import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import ProfieImage from '../../components/general/ProfileImage';
import FloatingInput from '../../components/general/FloatingInput';

// TODO: Fill this bad boy in
export default class EditAccountScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <ProfieImage
            borderWidth={1}
            size={120}
            backgroundColor={'#F7F7F7'}
            onPress={() => console.log('pressed image')}
          />
        </View>

        <View style={{marginHorizontal: 40, marginTop: 30}}>

        {/* this.props.navigation.navigate('ValidateScreen', {phone: this.state.phone}); */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EditFieldScreen', {fName: 'Alex', lName: 'Tan'})}>
            <FloatingInput
              ref={r => (this.firstName = r)}
              value={'Alex Tan'}
              label={'Name'}
              labelColorBlur={'#FFFFFF'}
              onChangeText={text => {}}
              editable={false}
            />
          </TouchableOpacity>

          <View style={{marginVertical: 10}} />

          <FloatingInput
            ref={r => (this.firstName = r)}
            value={'(360) 515-1765'}
            label={'Phone Number'}
            labelColorBlur={'#FFFFFF'}
            onChangeText={text => {}}
          />

          <View style={{marginVertical: 10}} />

          <FloatingInput
            ref={r => (this.firstName = r)}
            value={'alextan785@gmail.com'}
            label={'Email Addresses'}
            labelColorBlur={'#FFFFFF'}
            onChangeText={text => {}}
          />

          <View style={{marginVertical: 10}} />

          <FloatingInput
            ref={r => (this.firstName = r)}
            value={'************'}
            label={'Password'}
            labelColorBlur={'#FFFFFF'}
            onChangeText={text => {}}
          />
        </View>
      </View>
    );
  }
}
