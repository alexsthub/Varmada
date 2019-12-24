import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';

import NavScreenHeader from '../../components/general/NavScreenHeader';
import ProfieImage from '../../components/general/ProfileImage';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';

// TODO: Profile Image itself should not be touchable in this case.
// TODO: Make the rest of the buttons
export default class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavScreenHeader
          navigation={this.props.navigation}
          title={'Account Settings'}
        />

        <TouchableHighlight 
          underlayColor={'lightgray'}
          activeOpacity={.95}
          onPress={() => this.props.navigation.navigate('EditAccountScreen')}>
          <View style={styles.profileDetailsContainer}>
            <View style={styles.profileImageContainer}>
              <ProfieImage
                borderWidth={1}
                size={50}
                backgroundColor={'#F7F7F7'}
                onPress={() => console.log('pressed image')}
              />
            </View>

            <View style={styles.accountDetailsContainer}>
              <Text>Alex Tan</Text>
              <Text>+1 (360) 515-1765</Text>
            </View>

            <View style={{marginRight: 20}}>
              <FontAwesomeIcon icon={faUserEdit} style={{color: 'black'}} size={25}/>
            </View>

          </View>
        </TouchableHighlight>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  profileImageContainer: {
    paddingHorizontal: 20,
  },
  accountDetailsContainer: {
    flexDirection: 'column',
    flex: 1,
  },
});
