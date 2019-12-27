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

import {CardIOModule, CardIOUtilities} from 'react-native-awesome-card-io';

// TODO: Make the clickable camera a little bigger? Might need to change formatting
// TODO: When cardNumber is not empty, change the end of the text to an X to delete all
export default class PaymentAddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cardNumber: '', expMonth: '', expYear: ''};
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }
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
          expMonth: String(expiryMonth),
          expYear: String(expiryYear),
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
    var v = text.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = v.match(/\d{4,16}/g);
    var match = (matches && matches[0]) || '';
    var parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return text;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header headerText={'Add Card'} />

        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={'credit-card'} style={{}} size={30} />
            <TextInput
              style={styles.cardNumberInput}
              placeholder={'Enter Card Number'}
              value={this.state.cardNumber}
              onChangeText={text => this.handleNumberChange(text)}
              keyboardType={'numeric'}
              maxLength={19}
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
