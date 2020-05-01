import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import NavScreenHeader from '../../components/general/NavScreenHeader';

export default class PickupDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { params } = this.props.navigation.state;
    const pickup = params ? params.pickup : null;
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>{pickup.key}</Text>
          <Text style={styles.summary}>Your pickup is scheduled for {pickup.date}. We'll let you know when the driver is within a 30 minute proximity.</Text>
          <View style={styles.orderDetails}>
            <View style={styles.lineContainer}>
              <Text>Items (1):</Text>
              <Text>${pickup.price.toFixed(2).toString()}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text>Delivery Fee:</Text>
              <Text>${pickup.delivery.toFixed(2).toString()}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text>Printing:</Text>
              <Text>${pickup.printing.toFixed(2).toString()}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text>Sales Tax:</Text>
              <Text>${pickup.tax.toFixed(2).toString()}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.orderTotal}>Order Total:</Text>
              <Text style={[styles.orderTotal, styles.price]}>${(pickup.price + pickup.delivery + pickup.printing + pickup.tax).toFixed(2).toString()}</Text>
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
