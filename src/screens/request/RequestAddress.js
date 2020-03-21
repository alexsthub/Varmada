import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  FlatList,
  Animated,
  Dimensions,
  StatusBar,
  AsyncStorage,
  KeyboardAvoidingView,
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
// TODO: Can I only return addresses in the autocomplete? Only show those that start with numbers?
export default class RequestAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddressIndex: null,
      addresses: [],
      draggedValue: new Animated.Value(120),
      fadeValue: new Animated.Value(0),
      sliderOpen: false,
      autocompleteText: '',
    };
  }

  componentDidMount = async () => {
    try {
      const requestString = await AsyncStorage.getItem('request');
      if (requestString !== null) {
        this.requestObject = JSON.parse(requestString);
        if (this.requestObject.address) {
          const id = this.requestObject.address.placeID;
          const index = shit.findIndex(ele => ele.placeID === id);
          if (index !== -1) {
            this.setState({selectedAddressIndex: index});
          }
        }
      }
    } catch (error) {
      console.log('oh no...');
    }
    console.log(this.requestObject);
    this.setState({addresses: shit});
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.selectedAddressIndex === null &&
      this.state.selectedAddressIndex !== null
    ) {
      this.renderAnimation(150);
    } else if (
      prevState.selectedAddressIndex !== null &&
      this.state.selectedAddressIndex === null
    ) {
      this.renderAnimation(0);
    }
  };

  renderAnimation = toValue => {
    Animated.timing(this.state.fadeValue, {
      toValue: toValue,
      duration: 300,
    }).start();
  };

  addAddress = () => {
    this.props.navigation.navigate('AddAddress');
  };

  handlePress = (e, index) => {
    this.setState({selectedAddressIndex: index}, () => {
      this.handleScroll(index);
    });
  };

  handleScroll = index => {
    const options = {
      animated: true,
      index: index,
      viewPosition: 0.5,
    };
    this.addressList.scrollToIndex(options);
  };

  handleContinue = async () => {
    const selectedAddress = this.state.addresses[
      this.state.selectedAddressIndex
    ];
    this.requestObject.address = selectedAddress;
    const objString = JSON.stringify(this.requestObject);
    try {
      await AsyncStorage.setItem('request', objString);
      this.props.navigation.navigate('Time');
    } catch (error) {
      console.log('ahhhhhh error with async storage');
    }
  };

  // TODO: Parser doesn't work for all inputs.
  handleAutocompletePress = (data, details = null) => {
    // console.log(data);
    // console.log(details);
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
    // console.log(address);
    const savedAddresses = this.state.addresses;
    const existingAddressIndex = savedAddresses.findIndex(
      ele => ele.placeID === address.placeID,
    );
    if (existingAddressIndex !== -1) {
      this.setState(
        {
          autocompleteText: '',
          selectedAddressIndex: existingAddressIndex,
        },
        () => {
          this._panel.hide();
          this.handleScroll(existingAddressIndex);
        },
      );
    } else {
      savedAddresses.unshift(address);
      this.setState(
        {
          addresses: savedAddresses,
          autocompleteText: '',
          selectedAddressIndex: 0,
        },
        () => {
          this._panel.hide();
          this.handleScroll(0);
        },
      );
    }
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

    const animatedBackground = this.state.fadeValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['#FFFFFF', '#F8B500'],
    });
    return (
      <View style={styles.container}>
        <View
          style={{
            marginHorizontal: 40,
            height:
              height - styles.panelHeader.height - StatusBar.currentHeight,
          }}>
          <Header
            headerText={'Request a pickup'}
            subHeaderText={'Select a pickup address'}
          />

          <FlatList
            ref={addressList => (this.addressList = addressList)}
            data={this.state.addresses}
            renderItem={({item, index}) => (
              <AddressBox
                address={item}
                index={index}
                onPress={(e, index) => this.handlePress(e, index)}
                selected={this.state.selectedAddressIndex === index}
              />
            )}
            ItemSeparatorComponent={() => <View style={{marginVertical: 8}} />}
            keyExtractor={item => item.placeID}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginTop: 20}}
          />

          <KeyboardAvoidingView
            style={{marginBottom: 20, width: '60%', alignSelf: 'center'}}
            behavior={'position'}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('lightgray')}
              onPress={this.handleContinue}
              disabled={this.state.selectedAddressIndex === null}>
              <Animated.View
                style={{
                  backgroundColor: animatedBackground,
                  borderWidth:
                    this.state.selectedAddressIndex === null ? 1 : null,
                  borderColor:
                    this.state.selectedAddressIndex === null ? '#F8B500' : null,
                  elevation: 10,
                  padding: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>Continue</Text>
              </Animated.View>
            </TouchableNativeFeedback>
          </KeyboardAvoidingView>
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
