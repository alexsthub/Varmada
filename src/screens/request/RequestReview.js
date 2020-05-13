import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  AsyncStorage,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';

import Header from '../../components/general/Header';
import ReviewHeader from '../../components/general/ReviewHeader';

import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Package, Address } from '../../../amplify-datastore/src/models';

export default class RequestReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: 'Venmo',
      request: null,
      packagePrice: 0,
      packageType: null,
      labelPrice: 0,
      deliveryPrice: 0,
      itemPrice: 3.0,
      salesTax: 0,
      total: 0,
      cardNumber: ''
    };
  }

  getRequestFromStorage = async () => {
    try {
      const requestString = await AsyncStorage.getItem('request');
      if (requestString !== null) {
        const requestObject = JSON.parse(requestString);
        let total = 0;
        let labelCost = 0;
        if (requestObject.label) {
          total += .5;
          labelCost = 0.50;
        }
        let packageCost = 0;
        let packageType = null;
        if (requestObject.packaging) {
          total += requestObject.packaging.price;
          packageCost = requestObject.packaging.price;
          packageType = requestObject.packaging.name + " (" + requestObject.packaging.dimensions + ")";
        }
        total += requestObject.deliveryPrice;
        let itemCost = 3;
        total += itemCost;
        let tax = 0.065 * total;
        tax = tax.toFixed(2); //toFixed turns tax into a string, have to parseFloat to convert back to float
        let orderTotal = parseFloat(tax) + total;
        // Delivery and package prices will sometimes not show to hundredths place, so apply toFixed(2)
        this.setState({request: requestObject, cardNumber: requestObject.paymentNumber, salesTax: tax, deliveryPrice: requestObject.deliveryPrice.toFixed(2),
                       packagePrice: packageCost.toFixed(2), packageType: packageType, labelPrice: labelCost, total: orderTotal}); 
      }
      
    } catch (error) {
      console.log('oh no...');
    }
  };

  choosePayment = () => {
    this.props.navigation.navigate('Payment');
  };

  editCarrier = () => {
    this.props.navigation.navigate('Carrier', {edit: true});
  };

  editDateTime = () => {
    this.props.navigation.navigate('Time', {edit: true});
  };

  editTitle = () => {
    console.log('reditting');
    this.props.navigation.navigate('Title', {edit: true});
  };

  editAddress = () => {
    this.props.navigation.navigate('Address', {edit: true});
  };

  editPackage = () => {
    this.props.navigation.navigate('Package', {edit: true});
  };


  handleConfirm = async () => {
    const userInfo = await Auth.currentUserInfo();
    const requestObject = this.state.request;
    // Get id of address
    //const userAddress = await DataStore.query(Address, a => a.phoneNumber("eq", userInfo.attributes.phone_number).placeID("eq", requestObject.address.placeID));
   
    //console.log(userInfo.attributes.phone_number + ", " + requestObject.title + ", " + requestObject.carrier.name + ", " + userAddress + ", " + 
                //packageType + ", " + this.state.packagePrice + ", " + requestObject.date + ", " + requestObject.time + ", " + this.state.deliveryPrice + ", " + this.state.labelPrice + ", " + this.state.salesTax + ", " + this.state.total)
    // todo: item cost is hardcoded
    await DataStore.save(
      new Package({
        phoneNumber: userInfo.attributes.phone_number, 
        itemName: requestObject.title,
        carrier: requestObject.carrier.name,
        Address: requestObject.address.address + ", " + requestObject.address.city + ", " + requestObject.address.state,
        packageType: this.state.packageType,
        packageCost: this.state.packagePrice,
        date: requestObject.date,
        time: requestObject.time,
        itemCost: 3.0, 
        deliveryCost: this.state.deliveryPrice,
        printingCost: this.state.labelPrice,
        salesTax: this.state.salesTax,
        total: this.state.total,
        cardNumber: this.state.cardNumber
      })
    );
    try {
      await AsyncStorage.removeItem('request');
      this.props.navigation.navigate('Home');
    } catch (error) {
      console.log('oh fuck what do i do now.');
    }
  }

  render() {
    const packagingPrice =
      this.state.request && this.state.request.packaging ? (
        <View style={styles.lineContainer}>
          <Text>Packaging:</Text>
          <Text>${this.state.packagePrice}</Text>
        </View>
      ) : null;

    const labelPrice =
      this.state.labelPrice != 0 ? (
        <View style={styles.lineContainer}>
          <Text>Printing:</Text>
          <Text>$0.50</Text>
        </View>
      ) : null; 
 
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginHorizontal: 40, paddingBottom: 20}}>
          <NavigationEvents onWillFocus={this.getRequestFromStorage} />

          <Header
            headerText={'Request a pickup'}
            subHeaderText={'Review and pay'}
          />
          <ReviewHeader
            request={this.state.request}
            containerStyle={{marginVertical: 15}}
            touchTitle={this.editTitle}
            touchDateTime={this.editDateTime}
            touchAddress={this.editAddress}
            touchCarrier={this.editCarrier}
            touchPackage={this.editPackage}
          />

          <Text style={{fontWeight: 'bold'}}>Pay With:</Text>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={this.choosePayment}>
            <View style={styles.payContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{ color: 'blue', fontWeight: 'bold', backgroundColor: 'white', width: 80, fontSize:20, paddingLeft:15}}>VISA</Text>
                <Text style={{fontSize: 18, marginLeft: 15}}>{this.state.cardNumber}</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          <View style={styles.orderDetails}>
            <View style={styles.lineContainer}>
              <Text>Item:</Text>
              <Text>$3.00</Text>
            </View>
            {packagingPrice}
            {labelPrice}
            <View style={styles.lineContainer}>
              <Text>Delivery Fee:</Text>
              <Text>${this.state.deliveryPrice}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text>Sales Tax:</Text>
              <Text>${this.state.salesTax}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.orderTotal}>Order Total:</Text>
              <Text style={[styles.orderTotal, styles.price]}>${this.state.total}</Text>
            </View>
          </View>

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={this.handleConfirm}>
            <View style={styles.continueButton}>
              <Text style={styles.continueText}>Confirm</Text>
            </View>
          </TouchableNativeFeedback>
          {/* <Text style={styles.warning}>
          You won’t be charged until after the pickup has been dropped off.
        </Text> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDetails: {
    marginVertical: 10,
  },
  orderTotal: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
  },
  price: {
    color: '#f8b500',
  },
  warning: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
  },
  payContainer: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    // backgroundColor: '#F7F7F7',
    // elevation: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#F8B500',
    elevation: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
