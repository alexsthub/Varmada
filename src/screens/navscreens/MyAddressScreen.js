import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';

import NavScreenHeader from '../../components/general/NavScreenHeader';
import CircularAddButton from '../../components/general/CircularAddButton';
import Icon from 'react-native-vector-icons/AntDesign';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';

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
          <View style={styles.profileDetailsContainer}>
            <Text>Add a new address</Text>
            <CircularAddButton size={30} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileDetailsContainer: {
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
  profileImageContainer: {
    paddingHorizontal: 20,
  },
});
