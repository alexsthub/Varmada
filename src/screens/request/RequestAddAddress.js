import React from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';

import Header from '../../components/general/Header';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default class RequestAddAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{marginHorizontal: 40, flex: 1}}>
        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Add an address'}
        />
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2}
          autoFocus={true}
          returnKeyType={'search'}
          listViewDisplayed="auto"
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            const formattedAddress = details.formatted_address.split(',');
            const address = {
              name: data.structured_formatting.main_text
                ? data.structured_formatting.main_text
                : formattedAddress[0].trim(),
              placeID: data.place_id,
              address: formattedAddress[0].trim(),
              city: formattedAddress[1].trim(),
              state: formattedAddress[2]
                .trim()
                .split(' ')[0]
                .trim(),
              zip: formattedAddress[2]
                .trim()
                .split(' ')[1]
                .trim(),
              countryCode: formattedAddress[3],
            };
            console.log(address);
          }}
          getDefaultValue={() => ''}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: '',
            language: 'en',
          }}
          styles={{
            textInputContainer: {
              width: '100%',
            },
            description: {
              fontWeight: 'bold',
            },
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          GooglePlacesDetailsQuery={{
            fields: 'formatted_address',
          }}
          debounce={100}
          predefinedPlacesAlwaysVisible={false}
          enablePoweredByContainer={false}
        />
      </View>
    );
  }
}
