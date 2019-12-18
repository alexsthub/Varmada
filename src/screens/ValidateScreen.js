import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';

import SmsListener from 'react-native-android-sms-listener';
import Header from '../components/general/Header';
import DigitInput from '../components/login/DigitInput';
import CustomButton from '../components/general/CustomButton';

// TODO: Can probably get rid of the editable thing if it is wrapped in touchable without feedback? Fix it?
// TODO: Add send another code absolute positioning
// TODO: Make the modal component
export default class ValidateScreen extends React.Component {
  number_cells = 6;
  constructor(props) {
    super(props);
    this.state = {
      codes: Array(this.number_cells).fill(''), editable: this.getEditableArray(),
      username: '', modalVisible: false, error: {}
    };
  }

  getEditableArray = () => {
    let editableArray = [];
    for (let i = 0; i < this.number_cells; i++) {
      editableArray.push(i === 0 ? true : false);
    }
    return editableArray;
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.requestReadSmsPermission();
      this.subscription = SmsListener.addListener(message => {
        console.info(message);
        // TODO: Parse the message and set the state, then call on the submit function
        this.setState({codes: ['1', '2', '3', '4', '5', '6']}, () => console.log('call function here'));
      });
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.remove();
    }
  }

  async requestReadSmsPermission() {
    try {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'Auto Verification OTP',
          message: 'need access to read sms, to verify OTP',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('sms read permissions granted', granted);
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
          {
            title: 'Receive SMS',
            message: 'Need access to receive sms, to verify OTP',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('RECEIVE_SMS permissions granted', granted);
        } else {
          console.log('RECEIVE_SMS permissions denied');
        }
      } else {
        console.log('sms read permissions denied');
      }
    } catch (err) {
      console.log(err);
    }
  }

  selectCursorLocation = (index) => {
    const value = this.state.codes[index];
    if (value === '') {
      return {start:0, end:0};
    } else {
      return {start:1, end:1};
    }
  }

  // TODO: This is not showing the keyboard when you click on any other one.
  focusOnCurrent = () => {
    const code = 'code' + this.state.editable.indexOf(true);
    this.refs[code].focus();
  }

  // Fires before onChangeText
  handleKeyPress = ({ nativeEvent: { key: keyValue }}, index) => {
    if (keyValue === 'Backspace') {
      if (this.state.codes[index] === '') {
        if (index > 0) {
          const reference = 'code' + (index-1);
          this.setState((currentState) => {
            let editArray = currentState.editable;
            editArray[index] = false;
            editArray[index - 1] = true;
            let newCodes = currentState.codes;
            newCodes[index-1] = '';
            return {codes: newCodes, editable: editArray};
          }, () => {
            this.refs[reference].focus();
          })
        }
      } 
    }
  };

  onChangeText = (index, value) => {
    this.setState((currentState, currentProps) => {
      let editArray = currentState.editable;
      if (index < 5) {
        editArray[index] = false;
        editArray[index + 1] = true;
      }
      let newCodes = currentState.codes;
      newCodes[index] = value;
      return {codes : newCodes, editable: editArray};
    }, () => {
      if (value.length === 1) {
        if (index < 5) {
          const reference = 'code' + (index+1);
          this.refs[reference].focus();
        } else {
          // TODO: Keyboard does not persist and im upset
          this.completeSignup();
        }
      }
    })
  };

  completeSignup = () => {
    console.log('Sign me up!');
  }

  render() {
    let codeInputs = [];
    for (let i = 0; i < this.number_cells; i++) {
      codeInputs.push(
        <DigitInput
          key={i}
          ref={'code' + i}
          value={this.state.codes[i]}
          onChangeText={value => this.onChangeText(i, value)}
          onKeyPress={(event) => this.handleKeyPress(event, i)}
          selection={this.selectCursorLocation(i)}
          blurOnSubmit={false}
          edit={this.state.editable[i]}
          autoFocus={i === 0 ? true : false}
        />
      );
    };
    return (
      <ImageBackground
        source={require('../assets/loginGradient.jpg')}
        style={styles.background}>
        <ScrollView keyboardShouldPersistTaps={'always'} style={{flex: 1}}>
          <View style={styles.container}>
            <Header
              headerText={'Verify Account'}
              subHeaderText={'One last step'}
            />

            {/* Sent to stuff */}
            <View style={{marginTop: 20}}>
              <View style={{}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>Enter the code</Text>
                <Text style={{fontSize: 16}}>Sent to: {this.props.navigation.getParam('phone', 'default')}</Text>
              </View>

              <TouchableWithoutFeedback onPress={this.focusOnCurrent}>
                <View style={styles.digitContainer}>
                  {codeInputs}
                </View>
              </TouchableWithoutFeedback>

            </View>

            <View style={{marginTop: 20}}>
              <CustomButton
                text={'Sign Up'}
                onPress={this.completeSignup}
                textStyle={{color: '#000000'}}
                buttonStyle={{elevation: 10}}
              />
            </View>

          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    marginHorizontal: 45,
    flex: 1,
  },
  highlightText: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  digitContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  }
});
