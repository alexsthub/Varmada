import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  BackHandler,
  KeyboardAvoidingView,
  Animated,
  AsyncStorage,
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

  // TODO: Also check if a request already exists and if it does, put the value into title state and just change the title on continue
  componentDidMount = async () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );

    try {
      const requestString = await AsyncStorage.getItem('request');
      if (requestString !== null) {
        this.requestObject = JSON.parse(requestString);
        if (this.requestObject.title) {
          this.setState(
            {title: this.requestObject.title},
            this.renderAnimation(150),
          );
        }
      }
    } catch (error) {}
  };

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

  handleContinue = async () => {
    const title = this.state.title;
    if (title === '') return;
    const requestObj = {
      title: title,
    };
    const objString = JSON.stringify(requestObj);
    try {
      await AsyncStorage.setItem('request', objString);
      this.props.navigation.navigate('Image');
    } catch (error) {
      console.log('oh fuck what do i do now.');
    }
  };

  handleChangeText = text => {
    if (text === '' && this.state.fadeValue._value === 150) {
      this.renderAnimation(0);
    } else if (text !== '' && this.state.fadeValue._value < 150) {
      this.renderAnimation(150);
    }
    this.setState({title: text});
  };

  renderAnimation = toValue => {
    Animated.timing(this.state.fadeValue, {
      toValue: toValue,
      duration: 300,
    }).start();
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
