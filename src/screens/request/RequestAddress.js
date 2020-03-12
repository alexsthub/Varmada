import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';

import Header from '../../components/general/Header';
import AddressBox from '../../components/general/AddressBox';

import SlidingUpPanel from 'rn-sliding-up-panel';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import FeatherIcon from 'react-native-vector-icons/Feather';

// Test input
const shit = [
  {
    address: '1785 53rd Loop Southeast',
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

const {height} = Dimensions.get('window');
// TODO: Doesn't go over the back arrow :/ when the view is up
export default class RequestAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      draggedValue: new Animated.Value(120),
      sliderOpen: false,
      autocompleteText: '',
    };
  }

  componentDidMount() {
    this.setState({addresses: shit});
  }

  addAddress = () => {
    this.props.navigation.navigate('AddAddress');
  };

  handlePress = (e, index) => {
    // TODO: Add to db
    const selectedAddress = this.state.addresses[index];
    console.log(selectedAddress);
    this.props.navigation.navigate('Time', {
      addressObj: this.state.addresses[index],
      carrier: this.props.navigation.getParam("carrier")
    });
  };

  // TODO: Parser doesn't work for all inputs.
  handleAutocompletePress = (data, details = null) => {
    console.log(data);
    console.log(details);
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
    const newAddresses = this.state.addresses.concat(address);
    this.setState({addresses: newAddresses, autocompleteText: ''}, () => {
      this._panel.hide();
    });
  };

  handleDragStart = () => {
    if (this.state.sliderOpen) {
      this.autocomplete.triggerBlur();
    }
  };

  handleDragEnd = position => {
    if (position === this.top) {
      this.setState({sliderOpen: true});
      this.autocomplete.triggerFocus();
    } else {
      this.setState({sliderOpen: false, autocompleteText: ''});
    }
  };

  handleBackButton = () => {
    if (this.state.sliderOpen) {
      this._panel.hide();
      this.setState({sliderOpen: false, autocompleteText: ''});
      return true;
    } else {
      return false;
    }
  };

  handleTouchSlidingWindow = () => {
    this._panel.show(this.top);
    this.setState({sliderOpen: true}, () => {
      this.autocomplete.triggerFocus();
    });
  };

  handleFocus = () => {
    this._panel.show(this.top);
    this.setState({sliderOpen: true});
  };

  handleTextChange = text => {
    this.setState({autocompleteText: text});
  };

  render() {
    const draggableRange = {top: height - StatusBar.currentHeight, bottom: 120};
    this.top = draggableRange.top;
    this.bottom = draggableRange.bottom;

    const borderRadiusAnim = this.state.draggedValue.interpolate({
      inputRange: [this.bottom, this.top],
      outputRange: [25, 0],
    });
    const borderRadiusStyle = {
      borderTopLeftRadius: borderRadiusAnim,
      borderTopRightRadius: borderRadiusAnim,
    };

    return (
      <View style={styles.container}>
        <View style={{marginHorizontal: 40}}>
          <Header
            headerText={'Request a pickup'}
            subHeaderText={'Select a pickup address'}
          />

          <FlatList
            data={this.state.addresses}
            renderItem={({item, index}) => (
              <AddressBox
                address={item}
                index={index}
                onPress={(e, index) => this.handlePress(e, index)}
              />
            )}
            ItemSeparatorComponent={() => <View style={{marginVertical: 8}} />}
            keyExtractor={item => item.placeID}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginTop: 20}}
          />
        </View>

        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={draggableRange}
          animatedValue={this.state.draggedValue}
          height={this.top}
          friction={0.4}
          allowMomentum={true}
          snappingPoints={[this.top]}
          onDragStart={this.handleDragStart}
          onMomentumDragEnd={this.handleDragEnd}
          onBackButtonPress={this.handleBackButton}
          avoidKeyboard={false}>
          <TouchableWithoutFeedback
            onPress={this.handleTouchSlidingWindow}
            disabled={this.state.sliderOpen}>
            <Animated.View style={[styles.panelHeader, borderRadiusStyle]}>
              <View style={styles.panelIcon} />
              <Text style={styles.textHeader}>
                Need to add another address?
              </Text>
              <GooglePlacesAutocomplete
                ref={c => (this.autocomplete = c)}
                text={this.state.autocompleteText}
                placeholder="Search"
                textInputProps={{
                  onFocus: this.handleFocus,
                  onChangeText: this.handleTextChange,
                }}
                minLength={2}
                autoFocus={false}
                returnKeyType={'search'}
                listViewDisplayed={this.state.sliderOpen}
                fetchDetails={true}
                getDefaultValue={() => ''}
                placeholder={'Where should we go?'}
                renderDescription={row => row.description}
                renderLeftButton={() => (
                  <FeatherIcon
                    style={styles.autocompleteIcon}
                    name={'search'}
                    size={20}
                  />
                )}
                onPress={this.handleAutocompletePress}
                query={{
                  // TODO: Remove this key when you push. Probably use secrets manager later.
                  key: '',
                  language: 'en',
                }}
                styles={autocompleteStyle}
                nearbyPlacesAPI="GooglePlacesSearch"
                GooglePlacesDetailsQuery={{
                  fields: 'formatted_address',
                }}
                debounce={100}
                predefinedPlacesAlwaysVisible={false}
                enablePoweredByContainer={false}
                suppressDefaultStyles={true}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </SlidingUpPanel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  panelIcon: {
    backgroundColor: 'lightgray',
    height: 4,
    width: 50,
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 1,
    marginBottom: 5,
  },
  panelHeader: {
    height: 120,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
    flex: 1,
    backgroundColor: '#393e46',
    elevation: 5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  autocompleteIcon: {
    color: '#000000',
    paddingLeft: 15,
  },
});

const autocompleteStyle = {
  container: {
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
  row: {
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
};
