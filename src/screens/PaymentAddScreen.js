import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableNativeFeedback} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';

import Header from '../components/general/Header';
import CustomButton from '../components/general/CustomButton';
import FloatingInput from '../components/general/FloatingInput';

import {CardIOModule, CardIOUtilities} from 'react-native-awesome-card-io';

// TODO: label is too high in comparison to where the underline is
// TODO: Absolute position bottom text gets caught on some shit when the keyboard is up
// TODO: Country picker????

// TODO: Text formatting should change before, not after.
export default class PaymentAddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cardNumber: '', expDate: '', cvv: '', zipCode: '', cardHolder: ''};
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }
  }

  addPayment = () => {
    console.log('Save damnit!');
    console.log(this.state.cardNumber, this.state.expDate, this.state.cvv, this.state.zipCode)
    console.log(this.state.cardNumber.length, this.state.expDate.length, this.state.cvv.length, this.state.zipCode.length)
    console.log(this.state.cardNumber.length == 19 && this.state.expDate.length == 5)
    if (this.state.cardNumber.length == 19 && 
        this.state.expDate.length == 5 &&
        this.state.cvv.length == 3 &&
        this.state.zipCode.length == 5 &&
        this.state.cardHolder.length > 0) {
          // this.props.parentCallback("Hey Popsie, How’s it going?");
          this.props.navigation.state.params.addCard(this.state.cardNumber,
                                                    this.state.expDate,
                                                    this.state.cvv,
                                                    this.state.zipCode,
                                                    this.state.cardHolder);
          // this.props.navigation.navigate("Payment")
          this.props.navigation.goBack();
          // this.props.addCard("new card")
          // this.props.navigation.navigate("Payment", {'cardNumber': this.state.cardNumber})
        }
      // this.props.navigation.navigate('PaymentMethodScreen', { /* params go here */ })
  };

  scanCard = () => {
    const cardModuleConfig = {
      hideCardIOLogo: true,
      suppressManualEntry: true,
      supressConfirmation: true,
      scanExpiry: false,
    };

    CardIOModule.scanCard(cardModuleConfig)
      .then(card => {
        const {cardNumber, expiryMonth, expiryYear} = card;
        this.setState({
          cardNumber: this.formatCardNumber(cardNumber),
          expDate: String(expiryMonth) + '/' + String(expiryYear),
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  clearText = () => {
    this.setState({cardNumber: ''});
  };

  handleNumberChange = text => {
    const formatNumber = this.formatCardNumber(text);
    this.setState({cardNumber: formatNumber});
  };

  formatCardNumber = text => {
    const v = text
      .replace(/\s+/g, '')
      .replace(/[^0-9]/gi, '')
      .replace(/\D/g, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return text;
    }
  };

  formatExpirationDate = text => {
    const v = text.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{2,4}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 2) {
      parts.push(match.substring(i, i + 2));
    }
    if (parts.length) {
      this.setState({expDate: parts.join('/')});
    } else {
      this.setState({expDate: text});
    }

    if (text.length >= 5) {
      this.cvv.getInnerRef().focus();
    }
  };

  render() {

    return (
      <View style={styles.container}>
        <Header headerText={'Add Card'} />

        <View>
          {/* First row input */}
          <View style={styles.rowContainer}>
            <Icon name={'credit-card'} size={30} />
            <View style={styles.cardNumberInput}>
              <FloatingInput
                label={'Card Number'}
                value={this.state.cardNumber}
                labelColorBlur={'gray'}
                rgbaBackgroundColorBlur={'rgba(255,255,255,0.6)'}
                rgbaBackgroundColorFocus={'rgba(255,255,255,1)'}
                onChangeText={text => this.handleNumberChange(text)}
                keyboardType={'numeric'}
                maxLength={19}
                blurOnSubmit={false}
                onSubmitEditing={() => this.exp.getInnerRef().focus()}
                returnKeyType={'next'}
                autoCompleteType={'cc-number'}
              />
            </View>

            <TouchableOpacity
              style={styles.cardNumberRightIcon}
              onPress={
                this.state.cardNumber === '' ? this.scanCard : this.clearText
              }>
              {this.state.cardNumber === '' ? (
                <FeatherIcon name={'camera'} size={20} />
              ) : (
                <AntIcon name={'close'} size={20} />
              )}
            </TouchableOpacity>
          </View>

          {/* Second row input */}
          <View style={styles.rowContainer}>
            <View style={{flex: 2, borderBottomWidth: 1, borderColor: 'gray'}}>
              <FloatingInput
                ref={r => (this.exp = r)}
                label={'MM/YY'}
                labelColorBlur={'gray'}
                rgbaBackgroundColorBlur={'rgba(255,255,255,0.6)'}
                rgbaBackgroundColorFocus={'rgba(255,255,255,1)'}
                value={this.state.expDate}
                onChangeText={text => this.formatExpirationDate(text)}
                maxLength={5}
                keyboardType={'numeric'}
                blurOnSubmit={false}
                onSubmitEditing={() => this.cvv.getInnerRef().focus()}
                returnKeyType={'next'}
              />
            </View>

            <View style={{flex: 1}} />

            <View style={{flex: 2, borderBottomWidth: 1, borderColor: 'gray'}}>
              <FloatingInput
                ref={r => (this.cvv = r)}
                label={'CVV'}
                labelColorBlur={'gray'}
                rgbaBackgroundColorBlur={'rgba(255,255,255,0.6)'}
                rgbaBackgroundColorFocus={'rgba(255,255,255,1)'}
                value={this.state.cvv}
                onChangeText={text => {
                  this.setState({cvv: text});
                  if (text.length >= 3) {
                    this.zip.getInnerRef().focus();
                  }
                }}
                maxLength={3}
                keyboardType={'numeric'}
                blurOnSubmit={false}
                onSubmitEditing={() => this.zip.getInnerRef().focus()}
                returnKeyType={'next'}
              />
            </View>

            <View style={{flex: 1}} />

            <View style={{flex: 4, borderBottomWidth: 1, borderColor: 'gray'}}>
              <FloatingInput
                ref={r => (this.zip = r)}
                label={'Zip Code'}
                labelColorBlur={'gray'}
                rgbaBackgroundColorBlur={'rgba(255,255,255,0.6)'}
                rgbaBackgroundColorFocus={'rgba(255,255,255,1)'}
                value={this.state.zipCode}
                onChangeText={text => this.setState({zipCode: text})}
                maxLength={5}
                keyboardType={'numeric'}
                returnKeyType={'next'}
                // onSubmitEditing={this.addPayment}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={{borderBottomWidth: 1, borderColor: 'gray', flex: 1}}>
              <FloatingInput
                ref={r => (this.cardHolder = r)}
                label={'Name'}
                labelColorBlur={'gray'}
                rgbaBackgroundColorBlur={'rgba(255,255,255,0.6)'}
                rgbaBackgroundColorFocus={'rgba(255,255,255,1)'}
                value={this.state.cardHolder}
                onChangeText={text => this.setState({cardHolder: text})}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={{alignItems: 'center', color: '#F8B500'}}>
          <CustomButton
            text={'Add Payment'}
            onPress={this.addPayment}
            textStyle={{color: 'black'}}
            buttonStyle={{elevation: 10, marginTop: 30, color: '#F8B500'}}
            containerStyle={{width: '60%'}}
          />
        </View> */}

        <KeyboardAvoidingView
              style={{marginTop: 50, width: '60%', alignSelf: 'center'}}
              behavior={'position'}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('lightgray')}
                onPress={this.addPayment}>
                <View
                  style={{
                    backgroundColor: '#F8B500',
                    elevation: 10,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>Add Card</Text>
                </View>
              </TouchableNativeFeedback>
            </KeyboardAvoidingView>

        <View style={{position: 'absolute', right: 0, left: 0, bottom: 5}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name={'lock'} style={{paddingRight: 5}} size={15} />
            <Text style={{textAlign: 'center'}}>
              Your payment information will be stored securely
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  cardNumberInput: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    flex: 1,
    marginLeft: 10,
    paddingRight: 30,
  },
  cardNumberRightIcon: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
});
