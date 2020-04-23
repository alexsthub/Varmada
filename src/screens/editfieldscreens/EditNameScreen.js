import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
} from 'react-native';

import FloatingInput from '../../components/general/FloatingInput';
import {Auth} from 'aws-amplify';

export default class EditNameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.navigation.state.params;
    this.state.firstError = '';
    this.state.lastError = '';
  }

  handleSave = async () => {
    if (this.isValid()) {
      let user = await Auth.currentAuthenticatedUser();
      let result = await Auth.updateUserAttributes(user, {
        name: this.state.firstName,
        family_name: this.state.lastName,
      });
      console.log(result);
      this.props.navigation.goBack(null);
    }
  };

  isValid = () => {
    let valid = true;
    if (this.state.firstName === '') {
      this.setState({firstError: 'Please enter a valid first name.'});
      valid = false;
    }
    if (this.state.lastName === '') {
      this.setState({lastError: 'Please enter a valid last name.'});
      valid = false;
    }
    return valid;
  };

  render() {
    return (
      <View style={{marginTop: 60, flex: 1, marginHorizontal: 40}}>
        <FloatingInput
          ref={r => (this.firstname = r)}
          autoFocus={true}
          value={this.state.firstName}
          label={'First Name'}
          labelColorBlur={'#000000'}
          fieldStyle={{
            borderBottomWidth: 1,
            borderColor: this.state.firstError !== '' ? '#CC0000' : null,
          }}
          onChangeText={text => this.setState({firstName: text})}
          onSubmitEditing={() => this.lastname.getInnerRef().focus()}
        />

        {this.state.firstError !== '' ? (
          <View>
            <Text style={{color: '#CC0000'}}>{this.state.firstError}</Text>
          </View>
        ) : null}

        <View style={{marginVertical: 10}} />

        <FloatingInput
          ref={r => (this.lastname = r)}
          value={this.state.lastName}
          label={'Last Name'}
          labelColorBlur={'#000000'}
          fieldStyle={{
            borderBottomWidth: 1,
            borderColor: this.state.lastError !== '' ? '#CC0000' : null,
          }}
          onChangeText={text => this.setState({lastName: text})}
          onSubmitEditing={this.handleSave}
        />

        {this.state.lastError !== '' ? (
          <View>
            <Text style={{color: '#CC0000'}}>{this.state.lastError}</Text>
          </View>
        ) : null}

        <KeyboardAvoidingView behavior={'position'} style={{marginTop: 40}}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={() => this.handleSave()}>
            <View
              style={{
                backgroundColor: '#F8B500',
                elevation: 10,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Save</Text>
            </View>
          </TouchableNativeFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
