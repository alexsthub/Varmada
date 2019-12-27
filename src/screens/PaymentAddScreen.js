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
import Header from '../components/general/Header';

import {CardIOModule, CardIOUtilities} from 'react-native-awesome-card-io';

// TODO: Make the clickable camera a little bigger? Might need to change formatting
// TODO: When cardNumber is not empty, change the end of the text to an X to delete all
export default class PaymentAddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={cardNumber: '', expMonth: '', expYear: ''};
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
      scanExpiry: false
    }

    CardIOModule.scanCard(cardModuleConfig)
      .then(card => {
        const {cardNumber, expiryMonth, expiryYear} = card;
        this.setState({cardNumber: cardNumber, expMonth: String(expiryMonth), expYear: String(expiryYear)});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleNumberChange = (text) => {
    this.setState({cardNumber: text});
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText={'Add Card'} />

        <View style={styles.inputContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={'credit-card'} style={{}} size={30} />
            <TextInput
              style={styles.cardNumberInput}
              placeholder={'Enter Card Number'}
              value={this.state.cardNumber}
              onChangeText={(text) => this.handleNumberChange(text)}
              keyboardType={'numeric'}
              maxLength={23}
            />

            <TouchableOpacity
              onPress={this.scanCard}
              style={{position: 'absolute', right: 0}}>
              <FeatherIcon name={'camera'} size={20} />
            </TouchableOpacity>
            
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
  inputContainer: {
    marginTop: 20,
  },
  cardNumberInput: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    flex: 1,
    marginLeft: 10,
    paddingRight: 30,
  }
});
