import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import NavScreenHeader from '../../components/general/NavScreenHeader';
import CircularAddButton from '../../components/general/CircularAddButton';
import AddressBox from '../../components/general/AddressBox';
import {API, graphqlOperation} from 'aws-amplify';
import {listAddresss} from '../../graphql/queries';
import {createAddress} from '../../graphql/mutations';

import uuid from 'uuid/v4';
const CLIENTID = uuid();
export default class MyAddressScreen extends React.Component {
  async componentDidMount() {
    try {
      const addressData = await API.graphql(graphqlOperation(listAddresss));
      console.log('addresses:', addressData.data.listAddresss.items);
      this.setState({
        addresses: addressData.data.listAddresss.items,
      });
    } catch (err) {
      console.log('error fetching addresses...fuck', err);
    }
  }
  createAddress = async () => {
    const {
      addressTitle,
      street,
      apartment,
      city,
      state,
      zipcode,
      isDefault,
    } = this.state;
    const address = {
      addressTitle,
      street,
      apartment,
      city,
      state,
      zipcode,
      isDefault,
      clientId: CLIENTID,
    };
    // perform an optimistic response to update the UI immediately
    const addresses = [...this.state.addresses, address];
    this.setState({
      addresses,
    });
    try {
      // make the API call
      await API.graphql(
        graphqlOperation(createAddress, {
          input: address,
        }),
      );
      console.log('address created! ⊂(▀¯▀⊂)');
    } catch (err) {
      console.log('error creating address...FUCK', err);
    }
  };

  render() {
    const DATA = [
      {
        addressTitle: 'Olympia Home',
        street: '1785 53rd Loop SE',
        apartment: 'Apartment #308',
        city: 'Olympia',
        state: 'WA',
        zipcode: '98501',
        isDefault: true,
      },
      {
        addressTitle: 'Seattle Apt',
        street: '4105 Brooklyn Ave NE',
        apartment: 'Unit #308',
        city: 'Seattle',
        state: 'WA',
        zipcode: '98501',
        isDefault: false,
      },
    ];
    return (
      <View>
        <NavScreenHeader
          navigation={this.props.navigation}
          title={'My Addresses'}
        />

        <View style={{marginHorizontal: 30}}>
          <TouchableHighlight
            underlayColor={'lightgray'}
            activeOpacity={0.95}
            onPress={() => this.props.navigation.navigate('EditAccountScreen')}>
            <View style={styles.addressDetailsContainer}>
              <Text>Add a new address</Text>
              <CircularAddButton size={30} />
            </View>
          </TouchableHighlight>

          <View style={styles.addressContainer}>
            <Text
              style={{
                color: '#555555',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Saved Addresses
            </Text>
            <View>
              <FlatList
                data={DATA}
                renderItem={({item}) => (
                  <AddressBox
                    onPress={() =>
                      this.props.navigation.navigate('EditAccountScreen')
                    }
                    addressTitle={item.addressTitle}
                    street={item.street}
                    apartment={item.apartment}
                    city={item.city}
                    state={item.state}
                    zipcode={item.zipcode}
                    address={item.address}
                    isDefault={item.isDefault}
                  />
                )}
                keyExtractor={item => item.addressTitle}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: 'lightgray',
                    }}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addressDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'space-between',
  },
  addressContainer: {
    marginTop: 20,
  },
});
