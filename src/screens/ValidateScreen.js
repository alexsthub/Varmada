import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import styles from '../constants/styles/loginStyles';

import {Auth} from 'aws-amplify';
import SmsListener from 'react-native-android-sms-listener';

import DigitInput from '../components/login/DigitInput';
import ErrorModal from '../components/login/ErrorModal';
import Header from '../components/general/Header';
import CustomButton from '../components/general/CustomButton';

// TODO: Send sms permissions to signup part?
// TODO: Can probably get rid of the editable thing if it is wrapped in touchable without feedback? Fix it?
export default class ValidateScreen extends React.Component {
  number_cells = 6;
  constructor(props) {
    super(props);
    this.state = {
      codes: Array(this.number_cells).fill(''),
      editable: this.getEditableArray(),
      username: '',
      showModal: false,
      error: {},
    };
  }

  getEditableArray = () => {
    let editableArray = [];
    for (let i = 0; i < this.number_cells; i++) {
      editableArray.push(i === 0 ? true : false);
    }
    return editableArray;
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.requestReadSmsPermission();
      this.subscription = SmsListener.addListener(message => {
        let verificationCodeRegex = /Your verification code is ([\d]{6})/;
        if (verificationCodeRegex.test(message.body)) {
          let verificationCode = message.body.match(verificationCodeRegex)[1];
          const codes = verificationCode.split('');
          this.setState({codes: codes}, () => {
            this.handleVerification(this.props.navigation.getParam('user', 'default').user.username, verificationCode);
          });
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.remove();
    }
  }

  handleVerification = (username, verificationCode) => {
    Auth.confirmSignUp(username, verificationCode)
      .then(data => {
        console.log('verified');
        // Data just says success
        console.log(data);
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  };

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

  selectCursorLocation = index => {
    const value = this.state.codes[index];
    if (value === '') {
      return {start: 0, end: 0};
    } else {
      return {start: 1, end: 1};
    }
  };

  // TODO: This is not showing the keyboard when you click on any other one.
  focusOnCurrent = () => {
    const code = 'code' + this.state.editable.indexOf(true);
    this.refs[code].focus();
  };

  // Fires before onChangeText
  handleKeyPress = ({nativeEvent: {key: keyValue}}, index) => {
    if (keyValue === 'Backspace') {
      if (this.state.codes[index] === '') {
        if (index > 0) {
          const reference = 'code' + (index - 1);
          this.setState(
            currentState => {
              let editArray = currentState.editable;
              editArray[index] = false;
              editArray[index - 1] = true;
              let newCodes = currentState.codes;
              newCodes[index - 1] = '';
              return {codes: newCodes, editable: editArray};
            },
            () => {
              this.refs[reference].focus();
            },
          );
        }
      }
    }
  };

  onChangeText = (index, value) => {
    this.setState(
      (currentState, currentProps) => {
        let editArray = currentState.editable;
        if (index < 5) {
          editArray[index] = false;
          editArray[index + 1] = true;
        }
        let newCodes = currentState.codes;
        newCodes[index] = value;
        return {codes: newCodes, editable: editArray};
      },
      () => {
        if (value.length === 1) {
          if (index < 5) {
            const reference = 'code' + (index + 1);
            this.refs[reference].focus();
          } else {
            // TODO: Keyboard does not persist and im upset
            this.completeSignup();
          }
        }
      },
    );
  };

  completeSignup = () => {
    this.setState({showModal: true});
    console.log('Sign me up!');
  };

  handleResend = () => {
    console.log('Resend code!');
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  render() {
    let codeInputs = [];
    for (let i = 0; i < this.number_cells; i++) {
      codeInputs.push(
        <DigitInput
          key={i}
          ref={'code' + i}
          value={this.state.codes[i]}
          onChangeText={value => this.onChangeText(i, value)}
          onKeyPress={event => this.handleKeyPress(event, i)}
          selection={this.selectCursorLocation(i)}
          blurOnSubmit={false}
          edit={this.state.editable[i]}
          autoFocus={i === 0 ? true : false}
        />,
      );
    }
    return (
      <ImageBackground
        source={require('../assets/loginGradient.jpg')}
        style={styles.background}>
        <ErrorModal
          showModal={this.state.showModal}
          title={'Wrong Code'}
          description={'The 6 digit code you entered is incorrect. Try again'}
          buttonText={'Ok'}
          closeModal={this.closeModal}
        />

        <ScrollView keyboardShouldPersistTaps={'always'} style={{flex: 1}}>
          <View style={styles.container}>
            <Header
              headerText={'Verify Account'}
              subHeaderText={'One last step'}
            />

            <View style={{marginTop: 20}}>
              <View style={{}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  Enter the code
                </Text>
                <Text style={{fontSize: 16}}>
                  Sent to: {this.props.navigation.getParam('user', 'default').user.username}
                </Text>
              </View>

              <TouchableWithoutFeedback onPress={this.focusOnCurrent}>
                <View style={styles.digitContainer}>{codeInputs}</View>
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

        <TouchableOpacity
          style={styles.signUpContainer}
          onPress={this.handleResend}>
          <Text style={styles.highlightText}>
            Didn't Get Your Code? Click Here To Resend
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
