import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import NavScreenHeader from '../../components/general/NavScreenHeader';

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
    justifyContent: 'space-between',
  },
  price: {
    color: '#f8b500',
  },
  summary: {
    padding: 20
  },
  warning: {
    textAlign: 'center',
    fontSize: 14,
  }
})

export default class PickupScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { params } = this.props.navigation.state;
    const pickup = params ? params.pickup : null;
    console.log(pickup);
    return (
      <View>
        <NavScreenHeader navigation={this.props.navigation} title={'Pickup Details'} />
        <View style={styles.container}>
          <Text style={styles.title}>{pickup.key}</Text>
          <Text style={styles.summary}>Your pickup is scheduled for {pickup.date}. We'll let you know when the driver is within a 30 minute proximity.</Text>
          <View style={styles.orderDetails}>
            <View style={styles.lineContainer}>
              <Text>Items (1):</Text>
              <Text>${pickup.price}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text>Delivery Fee:</Text>
              <Text>${pickup.delivery}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text>Printing:</Text>
              <Text>${pickup.printing}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text>Sales Tax:</Text>
              <Text>${pickup.tax}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.orderTotal}>Order Total:</Text>
              <Text style={[styles.orderTotal, styles.price]}>${pickup.price + pickup.delivery + pickup.printing + pickup.tax}</Text>
            </View>
          </View>
          <Text style={styles.warning}>You won't be charged until after the pickup is dropped off.</Text>
        </View>
      </View>
    )
  }
}
