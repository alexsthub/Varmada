import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import NavScreenHeader from '../../components/general/NavScreenHeader';
import CircularAddButton from '../../components/general/CircularAddButton';
import AddressBox from '../../components/general/AddressBox';
export default class MyAddressScreen extends React.Component {
  render() {
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
            <Text style={{color: '#555555', fontWeight: 'bold', fontSize: 18}}>Saved Addresses</Text>

            <AddressBox
              addressTitle={'Olympia Home'}
              street={'1785 53rd Loop SE'}
              apartment={'Apartment #308'}
              city={'Olympia'}
              state={'WA'}
              zipcode={'98501'}
              address={'1785 53rd Loop SE Olypmia WA 98501 United States'}
              onPress={() => console.log('pressed image')}
              isDefault={false}
            />

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
    marginTop: 20
  },
});
