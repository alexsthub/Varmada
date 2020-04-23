import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
} from 'react-native';

import FloatingInput from '../../components/general/FloatingInput';
import {formatPhoneNumber} from '../../helpers/InputHelpers';
import {Auth} from 'aws-amplify';

export default class EditPhoneScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.firstError = '';
  }

  componentDidMount = async () => {
    const {phone} = this.props.navigation.state.params;
    const formattedNumber = formatPhoneNumber(phone.substring(2));
    let user = await Auth.currentAuthenticatedUser();
    this.setState({number: formattedNumber, user: user});
  };

  // TODO: This does not check if it is a valid number... need error handling
  // TODO: I think this takes me to verification....
  handleSave = async () => {
    const number = this.unformatNumber(this.state.number);
    console.log(number);
    let result = await Auth.updateUserAttributes(this.state.user, {
      phone_number: number,
    });
    console.log(result);

    // if (this.isValid()) {
    //   const requiredFormat = this.unformatNumber();
    //   let user = await Auth.currentAuthenticatedUser();
    //   let result = await Auth.updateUserAttributes(user, {
    //     phone_number: requiredFormat,
    //   });
    //   console.log(result);
    //   this.props.navigation.goBack(null);
    // }
  };

  isValid = number => {};

  unformatNumber = number => {
    const removals = ['(', ')', '-', ' '];
    for (let char of removals) {
      number = number.replace(char, '');
    }
    number = '+1' + number;
    return number;
  };

  handleChangeText = text => {
    const formattedNumber = formatPhoneNumber(text);
    this.setState({number: formattedNumber});
  };

  render() {
    return (
      <View style={{marginTop: 60, flex: 1, marginHorizontal: 40}}>
        <FloatingInput
          ref={r => (this.phone = r)}
          autoFocus={true}
          value={this.state.number}
          label={'Phone Number'}
          labelColorBlur={'#000000'}
          keyboardType={'numeric'}
          maxLen={14}
          fieldStyle={{
            borderBottomWidth: 1,
            borderColor: this.state.firstError !== '' ? '#CC0000' : null,
          }}
          onChangeText={text => this.handleChangeText(text)}
          onSubmitEditing={() => this.lastname.getInnerRef().focus()}
        />

        {this.state.firstError !== '' ? (
          <View>
            <Text style={{color: '#CC0000'}}>{this.state.firstError}</Text>
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
