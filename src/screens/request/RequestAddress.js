import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Picker,
} from 'react-native';

import Header from '../../components/general/Header';

import SwipeUpDown from 'react-native-swipe-up-down';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import FeatherIcon from 'react-native-vector-icons/Feather';

// Test input
const shit = [
  {
    address: '1785 53rd Loop SE',
    city: 'Tumwater',
    countryCode: ' USA',
    name: '1785 53rd Loop Southeast',
    placeID: 'ChIJiWjxpoZzkVQRPnjEE6oZ90k',
    state: 'WA',
    zip: '98501',
  },
  {
    address: '4105 Brooklyn Ave NE',
    city: 'Seattle',
    countryCode: ' USA',
    name: 'Levere Apartments',
    placeID: 'ChIJyZCbd_MUkFQRXA53DSuvSns',
    state: 'WA',
    zip: '98105',
  },
];

class Address extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <View style={{paddingHorizontal: 10}}>
          <Text>Icon</Text>
        </View>
        <View style={{flexDirection: 'column', paddingLeft: 10}}>
          <Text style={{fontWeight: 'bold'}}>Name</Text>
          <Text style={{color: 'gray'}}>Details</Text>
        </View>
      </View>
    );
  }
}

export default class RequestAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {addresses: []};
  }

  componentDidMount() {
    this.setState({addresses: shit});
  }

  addAddress = () => {
    this.props.navigation.navigate('AddAddress');
  };

  // TODO: Icon on the left, to the right. (Name, Address + city + state)
  // TODO: If the name === address, (Name, city + state)

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 4, marginHorizontal: 40}}>
          <Header
            headerText={'Request a pickup'}
            subHeaderText={'Select a pickup address'}
          />

          <Address />

          {/* <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={this.addAddress}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                backgroundColor: '#F7F7F7',
                elevation: 10,
                padding: 10,
              }}>
              <Text style={{fontWeight: 'bold'}}>Add a new address</Text>
              <View style={{}}>
                <Text>></Text>
              </View>
            </View>
          </TouchableNativeFeedback> */}
        </View>

        {/* would be the miniView */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#F7F7F7',
            elevation: 10,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <View style={{marginHorizontal: 15, marginTop: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Need to add another address?
            </Text>
            <GooglePlacesAutocomplete
              placeholder="Search"
              editable={false}
              minLength={2}
              autoFocus={false}
              returnKeyType={'search'}
              listViewDisplayed="auto"
              fetchDetails={true}
              getDefaultValue={() => ''}
              placeholder={'Where should we go?'}
              renderDescription={row => row.description}
              renderLeftButton={() => (
                <FeatherIcon
                  style={{
                    color: '#000000',
                    paddingLeft: 15,
                  }}
                  name={'search'}
                  size={20}
                />
              )}
              onPress={(data, details = null) => {
                console.log(data, details);
              }}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                // TODO: Remove this line when you push
                key: '',
                language: 'en',
                types: 'address',
              }}
              styles={{
                container: {
                  // flex: 1,
                  marginTop: 10,
                  elevation: 5,
                  borderRadius: 10,
                  backgroundColor: '#FFFFFF',
                },
                textInputContainer: {
                  height: 44,
                  flexDirection: 'row',
                  alignItems: 'center',
                },
                textInput: {
                  height: 28,
                  borderRadius: 5,
                  paddingVertical: 4.5,
                  paddingHorizontal: 10,
                  fontSize: 15,
                  flex: 1,
                },
                description: {
                  fontWeight: 'bold',
                },
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              GooglePlacesDetailsQuery={{
                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                fields: 'formatted_address',
              }}
              debounce={100} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              predefinedPlacesAlwaysVisible={false}
              enablePoweredByContainer={false}
              suppressDefaultStyles={true}
            />
          </View>
        </View>

        {/* <SwipeUpDown
          hasRef={ref => (this.swipeUpDownRef = ref)}
          itemMini={
            <View style={{alignItems: 'center', paddingVertical: 40}}>
              <Text>----------</Text>
              <Text style={{marginTop: 10}}>Need to add another address?</Text>
            </View>
          }
          itemFull={<Text>Fuck</Text>} // Pass props component when show full
          onShowMini={() => console.log('mini')}
          onShowFull={() => console.log('full')}
          onMoveDown={() => console.log('down')}
          onMoveUp={() => console.log('up')}
          disablePressToShow={false} // Press item mini to show full
          style={{backgroundColor: 'green', elevation: 11}} // style for swipe
          animation={'linear'}
        /> */}
      </View>
    );
  }
}
