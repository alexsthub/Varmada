import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Header from '../components/general/Header';
import CustomButton from '../components/general/CustomButton';

import {CardIOModule, CardIOUtilities} from 'react-native-awesome-card-io';

// TODO: Convert to floating text
// TODO: Country picker
// TODO: Make the clickable camera a little bigger? Might need to change formatting
// TODO: Do not allow any characters that are not numbers
// TODO: Text formatting should change before, not after.
export default class PaymentAddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cardNumber: '', expDate: '', cvv: '', zipCode: ''};
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }
  }

  addPayment = () => {
    console.log('Save damnit!');
  }

  scanCard = () => {
    const cardModuleConfig = {
      hideCardIOLogo: true,
      suppressManualEntry: true,
      supressConfirmation: true,
      requireCVV: false,
      requirePostalCode: false,
      scanExpiry: false,
    };

    CardIOModule.scanCard(cardModuleConfig)
      .then(card => {
        const {cardNumber, expiryMonth, expiryYear} = card;
        this.setState({
          cardNumber: this.formatCardNumber(cardNumber),
          expDate: String(expiryMonth) + '/' + String(expiryYear)
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
    const v = text.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
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
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 2) {
      parts.push(match.substring(i, i + 2));
    }
    if (parts.length) {
      this.setState({expDate: parts.join('/')});
    } else {
      this.setState({expDate: text})
    }

    if (text.length >= 5) {
      this.refs.cvv.focus();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText={'Add Card'} />

        <View>
          {/* First row input */}
          <View style={styles.rowContainer}>
            <Icon name={'credit-card'} style={{}} size={30} />
            <TextInput
              style={styles.cardNumberInput}
              placeholder={'Enter Card Number'}
              value={this.state.cardNumber}
              onChangeText={text => this.handleNumberChange(text)}
              keyboardType={'numeric'}
              maxLength={19}
              blurOnSubmit={false}
              onSubmitEditing={() => this.refs.exp.focus()}
              returnKeyType={'next'}
              autoCompleteType={'cc-number'}
            />

            <TouchableOpacity
              onPress={
                this.state.cardNumber === '' ? this.scanCard : this.clearText
              }
              style={styles.cardNumberRightIcon}>
              {this.state.cardNumber === '' ? (
                <FeatherIcon name={'camera'} size={20} />
              ) : (
                <AntIcon name={'close'} size={20} />
              )}
            </TouchableOpacity>
          </View>

          {/* Second row input */}
          <View style={styles.rowContainer}>
            <TextInput
              ref={'exp'}
              style={{flex: 2, borderBottomWidth: 1, borderColor: 'gray'}}
              placeholder={'MM/YY'}
              value={this.state.expDate}
              onChangeText={(text) => this.formatExpirationDate(text)}
              maxLength={5}
              keyboardType={'numeric'}
              blurOnSubmit={false}
              onSubmitEditing={() => this.refs.cvv.focus()}
              returnKeyType={'next'}
            />
            <View style={{flex:1}}/>
            <TextInput
              ref={'cvv'}
              style={{flex: 2, borderBottomWidth: 1, borderColor: 'gray'}}
              placeholder={'CVV'}
              value={this.state.cvv}
              onChangeText={(text) => {
                this.setState({cvv: text}); 
                if (text.length >= 3) {
                  this.refs.zip.focus();
                }
              }}
              maxLength={3}
              keyboardType={'numeric'}
              blurOnSubmit={false}
              onSubmitEditing={() => this.refs.zip.focus()}
              returnKeyType={'next'}
            />
            <View style={{flex:1}}/>
            <TextInput
              ref={'zip'}
              style={{flex: 4, borderBottomWidth: 1, borderColor: 'gray'}}
              placeholder={'Zip Code'}
              value={this.state.zipCode}
              onChangeText={(text) => this.setState({zipCode: text})}
              maxLength={5}
              keyboardType={'numeric'}
              onSubmitEditing={this.addPayment}
            />
          </View>

          <View style={styles.rowContainer}>
            <TextInput 
              style={{borderBottomWidth: 1, borderColor: 'gray', flex: 1}}
              placeholder={'Country'}
            />

          </View>

        </View>

        <View style={{alignItems: 'center'}}>
          <CustomButton
            text={'Add Payment'}
            onPress={this.addPayment}
            textStyle={{color: '#000000'}}
            buttonStyle={{elevation: 10, marginTop: 30}}
            containerStyle={{width: '60%'}}
          />
        </View>

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
  },
});
