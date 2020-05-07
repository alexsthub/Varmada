import React from 'react';
import { StyleSheet, View, Text, Image, TouchableNativeFeedback } from 'react-native';
import NavScreenHeader from '../../components/general/NavScreenHeader';
import { NavigationActions } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';

import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Package } from '../../../amplify-datastore/src/models';

const courierImgs = {
  UPS: 'https://cdn.iconscout.com/icon/free/png-512/ups-282281.png',
  USPS: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/353_Usps_logo-512.png',
  FedEx: 'https://cdn.iconscout.com/icon/free/png-512/fedex-3-283136.png',
};

// const pickups = [
//   {
//     id: 1,
//     key: 'Asus Laptop',
//     date: 'Dec 17, 2019 2PM - 4PM',
//     status: 'Awaiting pickup',
//     courier: 'usps',
//     delivery: 1,
//     price: 4.00,
//     printing: 0.5,
//     packaging: 2.00,
//     tax: 0.75
//   },
//   {
//     id: 2,
//     key: 'Macbook Pro',
//     date: 'Dec 18, 2019 2PM - 4PM',
//     status: 'In transit',
//     courier: 'ups',
//     delivery: 1,
//     price: 4.00,
//     printing: 0.5,
//     packaging: 2.00,
//     tax: 0.75
//   },
//   {
//     id: 3,
//     key: 'Surfacebook',
//     date: 'Dec 19, 2019 2PM - 4PM',
//     status: 'Completed',
//     courier: 'fedex',
//     delivery: 1,
//     price: 4.00,
//     printing: 0.5,
//     packaging: 2.00,
//     tax: 0.75
//   },
// ];

export default class MyPickupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
    };
  }

  async componentDidMount() {
    const user = await Auth.currentUserInfo();
    const requests = await DataStore.query(Package, p => p.phoneNumber("eq", user.attributes.phone_number));
    this.setState({requests: requests});
  }


  render() {
    return (
      <View>
        <NavScreenHeader navigation={this.props.navigation} title={'My Pickups'} />
        <View style={styles.pickupContainer}>
          <FlatList
            data={this.state.requests}
            renderItem={({ item }) =>
              <View>
                <TouchableNativeFeedback key={item.id} onPress={() => { this.props.navigation.navigate('PickupDetails', { pickupObject: item }) }}>
                  <View style={styles.row}>
                    <Image style={styles.icon} source={{ uri: courierImgs[item.carrier] }} />
                    <Text style={styles.pickupItem}>
                      <Text>{item.itemName}{'\n'}</Text>
                      <Text>Status: <Text style={styles.status}>{'Awaiting pickup'}{'\n'}</Text></Text>
                      <Text>Date: {item.date}{'\n'}</Text>
                      <Text>Time: {item.time}{'\n'}</Text>
                    </Text>
                  </View>
                </TouchableNativeFeedback>
                <View
                  style={{
                    borderBottomColor: 'lightgray',
                    borderBottomWidth: 1,
                  }}
                />
              </View>
            }
          >
          </FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickupContainer: {
    padding: 20
  },
  pickupItem: {
    textAlign: 'right',
    fontSize: 16
  },
  status: {
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    width: 50,
    height: 50,
    justifyContent: 'center'
  }
});