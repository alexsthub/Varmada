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
        <TouchableHighlight
          underlayColor={'lightgray'}
          activeOpacity={0.95}
          onPress={() => this.props.navigation.navigate('EditAccountScreen')}>
          <View>
            <View style={styles.addressDetailsContainer}>
              <Text>Add a new address</Text>
              <CircularAddButton size={30} />
            </View>
            <View style={styles.addAddressContainer}>
              <Text>Saved Addresses</Text>
            </View>
            <View>
              <AddressBox
                addressTitle={'Olympia Home'}
                address={'1785 53rd Loop SE Olypmia WA 98501 United States'}
                onPress={() => console.log('pressed image')}></AddressBox>
            </View>
          </View>
        </TouchableHighlight>
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
    borderBottomWidth: 1,
    borderColor: 'gray',
    justifyContent: 'space-between',
  },
  addAddressContainer: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
});
