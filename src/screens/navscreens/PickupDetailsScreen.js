import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import NavScreenHeader from '../../components/general/NavScreenHeader';

import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Package } from '../../../amplify-datastore/src/models';

export default class PickupDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   requests: []
    // };
  }

  // async componentDidMount() {
  //   const pickupObject = this.props.navigation.getParam('pickupObject', 'some default value');

  // }

  render() {
    const request = this.props.navigation.getParam('pickupObject', 'some default value');
    const printing = request.printingCost != 0 ? (
        <View style={styles.lineContainer}>
          <Text>Printing:</Text>
          <Text>$0.50</Text>
        </View>
      ) : null; 
    const packagingPrice =
      request.packageCost != 0 ? (
        <View style={styles.lineContainer}>
          <Text>Packaging:</Text>
          <Text>${request.packageCost}</Text>
        </View>
      ) : null;
    const packageType = 
      request.packageType ? (
        <Text style={styles.summary}>Requested package type: {request.packageType}</Text>
      ) : null;
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>{request.itemName}</Text>
          <Text style={styles.summary}>Your pickup is scheduled on {request.date + " between " + request.time}.
                                       We'll let you know when the driver is within a 30 minute proximity.</Text>
          {packageType}
          <Text>Pickup location: {request.Address}{'\n'}</Text>
          <Text>Dropoff location: {request.carrier}{'\n'}</Text>
          <View style={styles.orderDetails}>
            <View style={styles.lineContainer}>
              <Text>Item:</Text>
              <Text>${request.itemCost.toFixed(2)}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text>Delivery Fee:</Text>
              <Text>${request.deliveryCost}</Text>
            </View>
            {printing}
            {packagingPrice}
            <View style={styles.lineContainer}>
              <Text>Sales Tax:</Text>
              <Text>${request.salesTax}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.orderTotal}>Order Total:</Text>
              <Text style={[styles.orderTotal, styles.price]}>${request.total}</Text>
            </View>
          </View>
          <View style={styles.lineContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Need to change the pickup time?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Need to cancel?</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.warning}>You won't be charged until after the pickup is dropped off.</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 50
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24
  },
  orderDetails: {
    marginVertical: 10,
  },
  orderTotal: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  price: {
    color: '#f8b500',
  },
  summary: {
    padding: 20
  },
  warning: {
    paddingTop: 100,
    textAlign: 'center',
    fontSize: 14
  },
  button: {
    width: 120,
    padding: 10,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 12,
    alignContent: 'center',
    textAlign: 'center'
  }
});
