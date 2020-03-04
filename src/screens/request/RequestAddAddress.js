import React from 'react';
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';

import Header from '../../components/general/Header';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

// TODO: Maybe get rid of this screen and make it like uber...
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
            console.log(data, details);
          }}
          getDefaultValue={() => ''}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            language: 'en',
            types: 'address',
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
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            fields: 'formatted_address',
          }}
          debounce={100} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          predefinedPlacesAlwaysVisible={false}
          enablePoweredByContainer={false}
        />
      </View>
    );
  }
}
