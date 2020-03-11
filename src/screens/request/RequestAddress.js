import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  FlatList,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';

import Header from '../../components/general/Header';

import SlidingUpPanel from 'rn-sliding-up-panel';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import PropTypes from 'prop-types';

import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';

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

class Address extends React.Component {
  render() {
    const addressObj = this.props.address;
    const {address, city, name, state} = addressObj;
    let subText;
    if (name === address) {
      subText = `${city},  ${state}`;
    } else {
      subText = `${address} ${city}, ${state}`;
    }

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('lightgray')}
        onPress={e => this.props.onPress(e, this.props.index)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 15,
            elevation: 5,
            backgroundColor: '#F7F7F7',
          }}>
          <View style={{paddingHorizontal: 10}}>
            <EntypoIcon
              style={{
                color: '#000000',
              }}
              name={'location-pin'}
              size={40}
            />
          </View>
          <View style={{flexDirection: 'column', paddingLeft: 10}}>
            <Text style={{fontWeight: 'bold'}}>{name}</Text>
            <Text style={{color: 'gray'}}>{subText}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const {height} = Dimensions.get('window');
// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: 'green',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   test: {
//     flex: 1,
//     backgroundColor: 'lightblue',
//   },
//   panel: {
//     flex: 1,
//     backgroundColor: 'white',
//     position: 'relative',
//   },
//   panelHeader: {
//     height: 100,
//     backgroundColor: '#b197fc',
//     justifyContent: 'flex-end',
//     padding: 24,
//   },
//   textHeader: {
//     fontSize: 28,
//     color: '#FFF',
//   },
//   icon: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'absolute',
//     top: -24,
//     right: 18,
//     width: 48,
//     height: 48,
//     zIndex: 1,
//   },
//   iconBg: {
//     backgroundColor: '#2b8a3e',
//     position: 'absolute',
//     top: -24,
//     right: 18,
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     zIndex: 1,
//   },
// };

// TODO: Shits the bed when the keyboard comes up
// TODO: Doesn't go over the back arrow :/ when the view is up
export default class RequestAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      draggedValue: new Animated.Value(120),
      sliderOpen: false,
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
    this.props.navigation.navigate('Time');
  };

  handleDragEnd = position => {
    if (position === this.top) {
      this.setState({sliderOpen: true});
      // this.autocomplete.triggerFocus();
    } else {
      this.setState({sliderOpen: false});
    }
  };

  handleBackButton = () => {
    if (this.state.sliderOpen) {
      this._panel.hide();
      this.setState({sliderOpen: false});
      return true;
    } else {
      return false;
    }
  };

  handleTouchSlidingWindow = () => {
    console.log('touched');
    this._panel.show(this.top);
    this.setState({sliderOpen: true}, () => {
      // this.autocomplete.triggerFocus();
    });
  };

  // _draggedValue = new Animated.Value(100);

  render() {
    //   const {top, bottom} = this.props.draggableRange;

    //   const textTranslateY = this._draggedValue.interpolate({
    //     inputRange: [bottom, top],
    //     outputRange: [0, 8],
    //     extrapolate: 'clamp',
    //   });
    //   console.log(this.props.draggableRange);

    //   return (
    //     <View style={styles.container}>
    //       <Text onPress={() => this._panel.show(360)}>Show panel</Text>
    //       <SlidingUpPanel
    //         ref={c => (this._panel = c)}
    //         draggableRange={{top: height - StatusBar.currentHeight, bottom: 100}}
    //         animatedValue={this._draggedValue}
    //         snappingPoints={[180]}
    //         height={height + 100}
    //         friction={0.5}>
    //         <View style={styles.panel}>
    //           <View style={styles.panelHeader}>
    //             <Animated.View
    //               style={{
    //                 transform: [{translateY: textTranslateY}],
    //               }}>
    //               <Text style={styles.textHeader}>Sliding Up Panel</Text>
    //             </Animated.View>
    //           </View>
    //           <View style={styles.test}>
    //             <Text>Bottom sheet content</Text>
    //           </View>
    //         </View>
    //       </SlidingUpPanel>
    //     </View>
    //   );

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
              <Address
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
          onMomentumDragEnd={this.handleDragEnd}
          onBackButtonPress={this.handleBackButton}
          avoidKeyboard={false}>
          <TouchableWithoutFeedback
            onPress={this.handleTouchSlidingWindow}
            disabled={this.state.sliderOpen}>
            {/* <View style={styles.panel}> */}
            <Animated.View style={[styles.panelHeader, borderRadiusStyle]}>
              <Text style={styles.textHeader}>
                Need to add another address?
              </Text>
              <GooglePlacesAutocomplete
                ref={c => (this.autocomplete = c)}
                placeholder="Search"
                editable={this.state.sliderOpen}
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
                    style={styles.autocompleteIcon}
                    name={'search'}
                    size={20}
                  />
                )}
                onPress={(data, details = null) => {
                  console.log(data, details);
                }}
                query={{
                  // TODO: Remove this line when you push
                  key: '',
                  language: 'en',
                  types: 'address',
                }}
                styles={autocompleteStyle}
                nearbyPlacesAPI="GooglePlacesSearch"
                GooglePlacesDetailsQuery={{
                  fields: 'formatted_address',
                }}
                debounce={50}
                predefinedPlacesAlwaysVisible={false}
                enablePoweredByContainer={false}
                suppressDefaultStyles={true}
              />
            </Animated.View>
            {/* </View> */}
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
  panel: {
    flex: 1,
    position: 'relative',
  },
  panelHeader: {
    height: 120,
    padding: 24,
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
};
