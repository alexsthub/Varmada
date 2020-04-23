import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
} from 'react-native';

import FloatingInput from '../../components/general/FloatingInput';
import {Auth} from 'aws-amplify';

export default class EditPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordConf: '',
      password: '',
      firstError: '',
      secondError: '',
    };
  }

  changePassword = () => {
    const {passwordConf, password} = this.state;
    Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, passwordConf, password);
      })
      .then(data => {
        this.props.navigation.goBack(null);
      })
      .catch(err => {
        console.log(err);
        if (
          err.code === 'NotAuthorizedException' ||
          err.message.indexOf('previousPassword') !== -1
        ) {
          this.setState({firstError: 'Incorrect password'});
        }
        if (err.message.indexOf('proposedPassword') !== -1) {
          this.setState({
            secondError: 'Password must be 6 characters or more.',
          });
        }
      });
  };

  render() {
    return (
      <View style={{marginTop: 60, flex: 1, marginHorizontal: 40}}>
        <FloatingInput
          ref={r => (this.conf = r)}
          autoFocus={true}
          value={this.state.passwordConf}
          label={'Old Password'}
          labelColorBlur={'#000000'}
          fieldStyle={{
            borderBottomWidth: 1,
            borderColor: this.state.firstError !== '' ? '#CC0000' : null,
          }}
          secureText={true}
          onChangeText={text => this.setState({passwordConf: text})}
          onSubmitEditing={() => this.new.getInnerRef().focus()}
        />

        {this.state.firstError !== '' ? (
          <View>
            <Text style={{color: '#CC0000'}}>{this.state.firstError}</Text>
          </View>
        ) : null}

        <View style={{marginTop: 10, marginBottom: 20}}>
          <Text>
            For securiry purposes, please verify your current password.
          </Text>
        </View>

        <FloatingInput
          ref={r => (this.new = r)}
          autoFocus={true}
          value={this.state.password}
          label={'New Password'}
          labelColorBlur={'#000000'}
          fieldStyle={{
            borderBottomWidth: 1,
            borderColor: this.state.secondError !== '' ? '#CC0000' : null,
          }}
          showPasswordIcon={true}
          secureText={true}
          onChangeText={text => this.setState({password: text})}
          onSubmitEditing={this.changePassword}
        />

        {this.state.secondError !== '' ? (
          <View>
            <Text style={{color: '#CC0000'}}>{this.state.secondError}</Text>
          </View>
        ) : null}

        <KeyboardAvoidingView behavior={'position'} style={{marginTop: 40}}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={() => this.changePassword()}>
            <View
              style={{
                backgroundColor: '#F8B500',
                elevation: 10,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Change Password
              </Text>
            </View>
          </TouchableNativeFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
