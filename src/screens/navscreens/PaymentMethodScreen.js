import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import NavScreenHeader from '../../components/general/NavScreenHeader';

import PaymentMethod from '../../components/general/PaymentMethod';

const paymentMethods = [
  {
    id: '1',
    type: 'venmo', 
    username: 'alextan_97'
  },
  {
    id: '2',
    type: 'visa',
    cardNumber: '****5678',
    expDate: '09/20',
    cvv: '123',
    zip: '98501',
  },
];

export default class PaymentMethodScreen extends React.Component {

  render() {
    return (
      <View>
        <NavScreenHeader
          navigation={this.props.navigation}
          title={'Payment Methods'}
        />
        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 15}}>
            Current Payment Methods
          </Text>
          <View style={{marginVertical: 10}}>
            <FlatList 
              data={paymentMethods}
              renderItem={({item}) => (
                <PaymentMethod 
                  type={item.type} 
                  username={item.username ? item.username : null}
                  cardNumber={item.cardNumber ? item.cardNumber : null}
                  onPress={() => {}}
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={{height: 1, backgroundColor: 'lightgray', marginHorizontal: 15}} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>

        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 15}}>
            Add a Payment Method
          </Text>
          <View style={{marginVertical: 10}}>
            <PaymentMethod 
              type={'Add'}
              onPress={() => this.props.navigation.navigate("PaymentAddScreen")} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  methodsContainer: {},
});
