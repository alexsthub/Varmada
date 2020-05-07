import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import CustomButton from '../components/general/CustomButton';
import LeftNavButton from '../components/leftNav/leftNavButton';
import {NavigationEvents} from 'react-navigation';

import Header from '../components/general/Header';

import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Package } from '../../amplify-datastore/src/models';
import moment from 'moment';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentRequest: null,
      name: ""
    };
  }


  getNameAndRecentPackage = async () => {
    const user = await Auth.currentUserInfo();
    const userName = user.attributes.name;
    this.setState({name: userName});

    //await DataStore.delete(Package, c => c.phoneNumber("eq", user.attributes.phone_number));
    const requests = await DataStore.query(Package, p => p.phoneNumber("eq", user.attributes.phone_number));
    const datetimes = [];
    for (let i = 0; i < requests.length; i++) {
      let date = requests[i].date;
      let dashIndex = requests[i].time.indexOf("-")
      let time = requests[i].time.substring(0, dashIndex).trim();
      let stringDateTime = date + " " + time;
      let dateTime = moment(stringDateTime, "LLLL");
      datetimes.push(dateTime);
    }

    if (datetimes.length > 0) {
      let earliestDate = moment.min(datetimes);
      let index = datetimes.indexOf(earliestDate);
      this.setState({recentRequest: requests[index]});
    }
    

  }

  handlePress = () => {
    this.props.navigation.navigate('LoginScreen');
  };
  handlePickup = () => {
    this.props.navigation.navigate('Request');
  };

  render() {
    const subHeaderText = this.state.recentRequest ? ("Here's your upcoming pickup:") : ("You have no scheduled pickup");

    const request = this.state.recentRequest ? (
      <View style={{marginHorizontal: 40, marginTop: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Image style={{width: 80, height: 80, backgroundColor: 'gray'}} />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: 15,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              {this.state.recentRequest.itemName}
            </Text>
            <Text style={{fontSize: 16}}>
              {"Date: " + this.state.recentRequest.date}
              {"\n"}
              {"Time: " + this.state.recentRequest.time}
              {"\n"}
              {"From: " + this.state.recentRequest.Address}
              {"\n"}
              {"To: " + this.state.recentRequest.carrier}
            </Text>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: 'darkgray'}}>
              In Progress
            </Text>
          </View>
        </View>
      </View>
    ) : null;

    return (
      <View style={{flex: 1}}>
        <NavigationEvents onWillFocus={this.getNameAndRecentPackage} />
        <View style={{flex: 6, backgroundColor: 'lightgray'}}>
          <Image
            source={{
              uri:
                'https://cdn4.iconfinder.com/data/icons/logistics-55/50/1-512.png',
            }}
            style={{flex: 1, width: null, height: null}}
          />
          {/* Left Nav Button */}
          <View style={styles.leftNavButtonContainer}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('lightgray')}
              onPress={() => this.props.navigation.toggleDrawer()}>
              <View style={styles.LeftNavButton}>
                <LeftNavButton
                  navigation={this.props.navigation}
                  disableIconPress={true}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={{flex: 5, elevation: 10}}>
          <Header
            headerText={"Hello " + this.state.name + ","}
            subHeaderText={subHeaderText}
            containerStyle={{marginTop: 20, paddingLeft: 20}}
            headerStyle={{fontSize: 18}}
          />
          {request}
          <View style={{flex: 1, flexDirection: 'column-reverse'}}>
            <CustomButton
              text={'Request a pickup'}
              onPress={this.handlePickup}
              textStyle={{color: '#000000'}}
              buttonStyle={{elevation: 10, backgroundColor: '#F8B500'}}
              containerStyle={{
                width: '60%',
                alignSelf: 'center',
                marginBottom: 20,
              }}
              textStyle={{fontWeight: 'bold', fontSize: 18, color: 'black'}}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftNavButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  LeftNavButton: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    elevation: 5,
  },
});
