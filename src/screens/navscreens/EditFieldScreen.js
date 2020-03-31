import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
} from 'react-native';

import FloatingInput from '../../components/general/FloatingInput';

const labelMapping = {
  firstName: 'First Name',
  lastName: 'Last Name',
  phone: 'Phone Number',
  email: 'Email Address',
  password: 'Verify Password',
};

export default class EditFieldScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.navigation.state.params;
  }

  handleSaveFields = () => {
    // TODO: Save field
    console.log('Saved!');
  };

  onChangePhone = (text, key) => {
    let input = text.replace(/[(\-) ]/g, '');
    const size = input.length;
    if (input === '(') {
      input = '';
    } else if (size == 0) {
      input = input;
    } else if (size < 4) {
      input = '(' + input;
    } else if (size < 7) {
      input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
    } else {
      input =
        '(' +
        input.substring(0, 3) +
        ') ' +
        input.substring(3, 6) +
        '-' +
        input.substring(6, 10);
    }
    this.setState({[key]: input});
  };

  getKeyboardType = key => {
    if (key === 'phone') {
      return 'numeric';
    } else if (key === 'email') {
      return 'email-address';
    } else {
      return 'default';
    }
  };

  render() {
    let counter = 0;
    const numObjects = Object.keys(this.state).length;
    const components = Object.keys(this.state).map(key => {
      let nextRef;
      const index = String(counter);
      if (counter < numObjects - 1) {
        nextRef = String(counter + 1);
      }
      let retValue = (
        <View style={{marginVertical: 10}} key={key}>
          <FloatingInput
            ref={r => (this[index] = r)}
            autoFocus={counter === 0}
            value={this.state[key]}
            label={labelMapping[key]}
            labelColorBlur={'#000000'}
            fieldStyle={{borderBottomWidth: 1}}
            keyboardType={this.getKeyboardType(key)}
            onChangeText={text =>
              key === 'phone'
                ? this.onChangePhone(text, key)
                : this.setState({[key]: text})
            }
            maxLength={key === 'phone' ? 14 : null}
            secureText={key === 'password' ? true : false}
            onSubmitEditing={
              counter < numObjects - 1
                ? () => this[nextRef].getInnerRef().focus()
                : this.handleSaveFields
            }
          />

          {key === 'password' ? (
            <View style={{marginTop: 10}}>
              <Text>
                For your security, please verify your current password.
              </Text>
            </View>
          ) : null}
        </View>
      );
      counter += 1;
      return retValue;
    });

    return (
      <View style={{marginTop: 100, flex: 1, marginHorizontal: 40}}>
        {components}

        <KeyboardAvoidingView behavior={'position'} style={{marginTop: 30}}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={() => console.log('poop')}>
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
