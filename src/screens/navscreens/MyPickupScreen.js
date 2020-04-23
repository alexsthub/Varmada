import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import NavScreenHeader from '../../components/general/NavScreenHeader';
import { NavigationActions } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';

const pickups = [
  {
    id: 1,
    key: 'Pickup 1',
    date: 'Dec 17, 2019 2PM - 4PM',
    status: 'Awaiting pickup',
    courier: 'USPS',
    delivery: 1,
    price: 4.00,
    printing: 0.5,
    packaging: 2.00,
    tax: 0.75
  },
  {
    id: 2,
    key: 'Pickup 2',
    date: 'Dec 18, 2019 2PM - 4PM',
    status: 'In transit',
    courier: 'UPS',
    delivery: 1,
    price: 4.00,
    printing: 0.5,
    packaging: 2.00,
    tax: 0.75
  },
  {
    id: 3,
    key: 'Pickup 3',
    date: 'Dec 19, 2019 2PM - 4PM',
    status: 'Completed',
    courier: 'Fedex',
    delivery: 1,
    price: 4.00,
    printing: 0.5,
    packaging: 2.00,
    tax: 0.75
  },
];

const styles = StyleSheet.create({
  pickupContainer: {
    width: '100%'
  },
  pickupItem: {
    textAlign: 'center',
    fontSize: 18
  },
  status: {
    fontWeight: 'bold'
  }
})
export default class MyPickupScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  navigateToScreen = (route, item) => () => {
    // const navigateAction = NavigationActions.navigate({
    //   routeName: route,
    // });
    this.props.navigation.navigate(route, {
      pickup: item
    });
  };
  render() {
    console.log(pickups);
    return (
      <View style={styles.pickupContainer}>
        <NavScreenHeader navigation={this.props.navigation} title={'My Pickups'} />
        <FlatList
          data={pickups}
          renderItem={({ item }) =>
            <View>
              <Text style={styles.pickupItem} key={item.key} onPress={this.navigateToScreen('Pickup', item)}>
                <Text>{item.key}{'\n'}</Text>
                <Text>Status: <Text styles={styles.status}>{item.status}{'\n'}</Text></Text>
                <Text>{item.date}{'\n'}</Text>
              </Text>
            </View>
          }
        >
        </FlatList>
      </View>
    );
  }
}