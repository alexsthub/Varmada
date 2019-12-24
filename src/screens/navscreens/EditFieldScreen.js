import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import FloatingInput from '../../components/general/FloatingInput';
import CustomButton from '../../components/general/CustomButton';

export default class EditFieldScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      firstName: this.props.navigation.getParam('fName', 'default'),
      lastName: this.props.navigation.getParam('lName', 'default')
    };
  }

  handleSaveFields = () => {
    // TODO: Save field
    console.log('Saved!');
  }

  render() {
    return (
      <View style={{marginTop: 100, flex: 1, marginHorizontal: 40}}>
        <FloatingInput
          ref={r => (this.firstName = r)}
          value={this.state.firstName}
          label={'First Name'}
          labelColorBlur={'#FFFFFF'}
          onChangeText={(text) => this.setState({firstName: text})}
        />

        <View style={{marginVertical: 10}} />

        <FloatingInput
          ref={r => (this.firstName = r)}
          value={this.state.lastName}
          label={'Last Name'}
          labelColorBlur={'#FFFFFF'}
          onChangeText={(text) => this.setState({lastName: text})}
        />

        <View style={{marginTop: 30}} />

        <CustomButton
          text={'Save'}
          onPress={this.handleSaveFields}
          textStyle={{color: '#000000'}}
          buttonStyle={{elevation: 10}}
        />
      </View>
    );
  }
}
