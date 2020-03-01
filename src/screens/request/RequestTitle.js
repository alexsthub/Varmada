import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  BackHandler,
  KeyboardAvoidingView,
} from 'react-native';

import Header from '../../components/general/Header';
import FloatingInput from '../../components/general/FloatingInput';

export default class RequestTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: ''};
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick = () => {
    console.log('GOING BACK');
    // TODO: Ask the user if they are sure they want to close
    // TODO: Need to do this if they hit the back button as well...
  };

  handleContinue = () => {
    const {title} = this.state;
    // TODO: Send to some database or some shit
    // TODO: handle if it does not exist
    this.props.navigation.navigate('Image');
  };

  render() {
    return (
      <View style={{marginHorizontal: 40}}>
        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Describe your package'}
        />
        <View style={{marginTop: 40}}>
          <FloatingInput
            ref={r => (this.title = r)}
            value={this.state.title}
            label={'Name of delivery'}
            labelColorBlur={'#000000'}
            labelColorFocus={'#000000'}
            labelStyle={{fontWeight: 'bold'}}
            fieldStyle={{borderBottomWidth: 1}}
            onChangeText={text => this.setState({title: text})}
            onSubmitEditing={() => {}}
            blurOnSubmit={false}
          />
        </View>

        {/* POSITION, height, padding */}
        <KeyboardAvoidingView
          style={{marginTop: 80, width: '60%', alignSelf: 'center'}}
          behavior={'position'}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={this.handleContinue}>
            <View
              style={{
                backgroundColor: '#F8B500',
                elevation: 10,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Continue</Text>
            </View>
          </TouchableNativeFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
