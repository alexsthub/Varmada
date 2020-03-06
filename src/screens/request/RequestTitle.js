import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  BackHandler,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';

import Header from '../../components/general/Header';
import FloatingInput from '../../components/general/FloatingInput';

// TODO: Maybe we can have a little progress bar at the top that shows the steps
// TODO: Title --> Picture --> Carrier --> etc.
export default class RequestTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      fadeValue: new Animated.Value(0),
    };
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
    const title = this.state.title;
    if (title === '') return;
    // TODO: Send to some database or some shit
    // TODO: handle if it does not exist
    this.props.navigation.navigate('Image');
  };

  handleChangeText = text => {
    if (text === '' && this.state.fadeValue._value === 150) {
      Animated.timing(this.state.fadeValue, {
        toValue: 0,
        duration: 300,
      }).start();
    } else if (text !== '' && this.state.fadeValue._value < 150) {
      Animated.timing(this.state.fadeValue, {
        toValue: 150,
        duration: 300,
      }).start();
    }
    this.setState({title: text});
  };

  render() {
    const animatedBackground = this.state.fadeValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['#FFFFFF', '#F8B500'],
    });

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
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleContinue}
            blurOnSubmit={false}
          />
        </View>

        <KeyboardAvoidingView
          style={{marginTop: 80, width: '60%', alignSelf: 'center'}}
          behavior={'position'}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={this.handleContinue}
            disabled={this.state.title === '' ? true : false}>
            <Animated.View
              style={{
                backgroundColor: animatedBackground,
                borderWidth: this.state.title === '' ? 1 : null,
                borderColor: this.state.title === '' ? '#F8B500' : null,
                elevation: 10,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Continue</Text>
            </Animated.View>
          </TouchableNativeFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
