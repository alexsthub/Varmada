import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import ProfieImage from '../../components/general/ProfileImage';
import FloatingInput from '../../components/general/FloatingInput';

// TODO: Fill in the rest?
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
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EditFieldScreen', {
                firstName: 'Alex',
                lastName: 'Tan',
              })
            }>
            <FloatingInput
              value={'Alex Tan'}
              label={'Name'}
              labelColorBlur={'#000000'}
              rgbaBackgroundColorBlur={'rgba(247,247,247,0.6)'}
              rgbaBackgroundColorFocus={'rgba(230,230,230,1)'}
              editable={false}
            />
          </TouchableOpacity>

          <View style={{marginVertical: 10}} />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EditFieldScreen', {
                phone: '(360) 515-1765',
              })
            }>
            <FloatingInput
              value={'(360) 515-1765'}
              label={'Phone Number'}
              labelColorBlur={'#000000'}
              rgbaBackgroundColorBlur={'rgba(247,247,247,0.6)'}
              rgbaBackgroundColorFocus={'rgba(230,230,230,1)'}
              editable={false}
            />
          </TouchableOpacity>

          <View style={{marginVertical: 10}} />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EditFieldScreen', {
                email: 'alextan785@gmail.com',
              })
            }>
            <FloatingInput
              value={'alextan785@gmail.com'}
              label={'Email Addresses'}
              labelColorBlur={'#000000'}
              rgbaBackgroundColorBlur={'rgba(247,247,247,0.6)'}
              rgbaBackgroundColorFocus={'rgba(230,230,230,1)'}
              editable={false}
            />
          </TouchableOpacity>

          <View style={{marginVertical: 10}} />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EditFieldScreen', {
                password: '************',
              })
            }>
            <FloatingInput
              value={'************'}
              label={'Password'}
              labelColorBlur={'#000000'}
              rgbaBackgroundColorBlur={'rgba(247,247,247,0.6)'}
              rgbaBackgroundColorFocus={'rgba(230,230,230,1)'}
              editable={false}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
