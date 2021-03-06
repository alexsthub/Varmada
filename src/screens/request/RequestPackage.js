import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  FlatList,
  AsyncStorage,
  Dimensions,
  Animated,
  BackHandler,
} from 'react-native';

import {NavigationEvents} from 'react-navigation';
import {TabView, TabBar} from 'react-native-tab-view';

import Header from '../../components/general/Header';

import { DataStore } from '@aws-amplify/datastore';
import { Cart } from '../../../amplify-datastore/src/models';

const mailerList = [
  {
    name: 'Bubble Mailer - Size 0',
    dimensions: '6" x 9"',
    price: 1.50,
    id: 1,
    type: 'mailer',
  },
  {
    name: 'Bubble Mailer - Size 1',
    dimensions: '7 1/4" x 11 1/8"',
    price: 1.75,
    id: 2,
    type: 'mailer',
  },
  {
    name: 'Bubble Mailer - Size 2',
    dimensions: '8 1/2" x 11 1/8"',
    price: 2.00,
    id: 3,
    type: 'mailer',
  },
  {
    name: 'Bubble Mailer - Size 3',
    dimensions: '8 1/2" x 14 1/2"',
    price: 2.25,
    id: 4,
    type: 'mailer',
  },
  {
    name: 'Bubble Mailer - Size 4',
    dimensions: '9 1/2" x 14 1/2"',
    price: 2.50,
    id: 5,
    type: 'mailer',
  },
  {
    name: 'Bubble Mailer - Size 5',
    dimensions: '10 1/2" x 15"',
    price: 2.75,
    id: 6,
    type: 'mailer',
  },
];

const boxList = [
  {
    name: 'Cardboard Box',
    dimensions: '9" x 7" x 5"',
    price: 1.75,
    id: 10,
    type: 'box',
  },
  {
    name: 'Cardboard Box',
    dimensions: '10" x 8" x 6"',
    price: 2.00,
    id: 11,
    type: 'box',
  },
  {
    name: 'Cardboard Box',
    dimensions: '11" x 9" x 7"',
    price: 2.25,
    id: 12,
    type: 'box',
  },
  {
    name: 'Cardboard Box',
    dimensions: '12" x 10" x 8"',
    price: 2.5,
    id: 13,
    type: 'box',
  },
];

export default class RequestPackage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [{key: 'Mailer', title: 'Mailers'}, {key: 'Box', title: 'Boxes'}],
      selectedPackageID: null,
    };
  }

  // Creates an event listener for the android back button
  componentDidMount = async () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  };

  // Removes back button listener when component is unmounted
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  // If screen was navigated in order to edit, return to review. Else, default behavior
  handleBackButtonClick = () => {
    const navParams = this.props.navigation.state.params;
    if (navParams && navParams.edit) {
      this.props.navigation.navigate('Review');
      return true;
    }
  };

  // Get request object from async storage and save selected package if exists
  getRequestFromStorage = async () => {
    try {
      const requestString = await AsyncStorage.getItem('request');
      if (requestString !== null) {
        this.requestObject = JSON.parse(requestString);
        if (this.requestObject.packaging) {
          this.setState(
            {selectedPackageID: this.requestObject.packaging.id},
            () => {
              const itemObj = this.findIndexAndKeyByID(
                this.requestObject.packaging.id,
              );
              setTimeout(() => {
                this.handleScroll(itemObj.index, itemObj.key);
              }, 50);
            },
          );
          if (this.requestObject.packaging.type === 'box') {
            this.setState({index: 1});
          }
        }
      }
    } catch (error) {
      console.log('oh no...');
    }
  };

  findIndexAndKeyByID = id => {
    let index;
    index = mailerList.findIndex(o => o.id === id);
    if (index !== -1) {
      return {index: index, key: 'Mailer'};
    }
    index = mailerList.findIndex(o => o.id === id);
    if (index !== -1) {
      return {index: index, key: 'Box'};
    }
    return null;
  };

  // Set new selected packageID to state and handle flatlist scrolling
  handlePress = (itemID, index, key) => {
    if (this.state.selectedPackageID === itemID) {
      this.setState({selectedPackageID: null});
    } else {
      this.setState({selectedPackageID: itemID}, () => {
        this.handleScroll(index, key);
      });
    }
  };

  // Helper function to handle flatlist scrolling
  handleScroll = (index, key) => {
    const options = {
      animated: true,
      index: index,
      viewPosition: 0.5,
    };
    if (key === 'Mailer') {
      this.mailerFlatlist.getInnerRef().scrollToIndex(options);
    } else {
      this.boxFlatlist.getInnerRef().scrollToIndex(options);
    }
  };

  // Get package object and save to async storage
  handleContinue = async () => {
    const all = mailerList.concat(boxList);
    const packaging = all.find(p => p.id === this.state.selectedPackageID);
    if (packaging) {
      this.requestObject.packaging = packaging;
    } else {
      delete this.requestObject.packaging;
    }
    const objString = JSON.stringify(this.requestObject);
    try {
      await AsyncStorage.setItem('request', objString);
      const navParams = this.props.navigation.state.params;
      if (navParams && navParams.edit) {
        this.props.navigation.navigate('Review');
      } else {
        this.props.navigation.navigate('Services');
      }
    } catch (error) {
      console.log('oh fuck what do i do now.');
    }
  };

  // Returns tab bar element for the tabview
  renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#f8b500'}}
      style={{backgroundColor: '#393e46'}}
    />
  );

  render = () => {
    return (
      <View style={{marginHorizontal: 40, flex: 1}}>
        <NavigationEvents onWillFocus={this.getRequestFromStorage} />

        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Select a container'}
        />

        <TabView
          initialLayout={{width: Dimensions.get('window').width - 80}}
          navigationState={{index: this.state.index, routes: this.state.routes}}
          renderTabBar={this.renderTabBar}
          renderScene={({route}) => {
            switch (route.key) {
              case 'Mailer':
                return (
                  <PackageOptionsView
                    ref={r => (this.mailerFlatlist = r)}
                    type={route.key}
                    data={mailerList}
                    selectedPackageID={this.state.selectedPackageID}
                    onPress={(itemID, index) =>
                      this.handlePress(itemID, index, route.key)
                    }
                    index={this.state.index}
                  />
                );
              case 'Box':
                return (
                  <PackageOptionsView
                    ref={r => (this.boxFlatlist = r)}
                    type={route.key}
                    data={boxList}
                    selectedPackageID={this.state.selectedPackageID}
                    onPress={(itemID, index) =>
                      this.handlePress(itemID, index, route.key)
                    }
                    index={this.state.index}
                  />
                );
              default:
                return null;
            }
          }}
          onIndexChange={index => this.setState({index: index})}
          style={{marginTop: 20}}
        />

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgray')}
          onPress={this.handleContinue}>
          <View style={styles.continueButton}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Continue</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#F8B500',
    elevation: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: '60%',
    alignSelf: 'center',
  },
});

// Class to render the flatlist for mailers and boxes
class PackageOptionsView extends React.Component {
  // By default re-renders when tabview is moved so this prevents pages from re-rendering if they are not
  // currently in view
  shouldComponentUpdate = nextProps => {
    if (
      (this.props.type === 'Mailer' && nextProps.index === 1) ||
      (this.props.type === 'Box' && nextProps.index === 0)
    ) {
      return false;
    }
    return true;
  };

  // Return the ref of the flatlist
  getInnerRef = () => this.ref;

  render() {
    return (
      <View style={styles.listContainer}>
        <FlatList
          ref={r => (this.ref = r)}
          data={this.props.data}
          renderItem={({item, index}) => (
            <Packaging
              title={item.name}
              dimensions={item.dimensions}
              price={item.price}
              type={item.type}
              selected={this.props.selectedPackageID === item.id}
              onPress={() => this.props.onPress(item.id, index)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{marginVertical: 8}} />}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}
        />
      </View>
    );
  }
}

// Class to render the view of a package option
class Packaging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fadeValue: new Animated.Value(0)};
  }

  // If selected, object should be highlighted
  componentDidMount() {
    if (this.props.selected) {
      this.renderAnimation(150);
    }
  }

  // If selected, render animation
  componentDidUpdate = prevProps => {
    if (this.props.selected && !prevProps.selected) {
      this.renderAnimation(150);
    } else if (prevProps.selected && !this.props.selected) {
      this.renderAnimation(0);
    }
  };

  // Helper function to render animation
  renderAnimation = toValue => {
    Animated.timing(this.state.fadeValue, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const animatedBackground = this.state.fadeValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['#F7F7F7', '#5c636e'],
    });
    const animatedTextColor = this.state.fadeValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['#000000', '#FFFFFF'],
    });
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('lightgray')}
        onPress={this.props.onPress}>
        <Animated.View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 15,
            elevation: 5,
            backgroundColor: animatedBackground,
          }}>
          <View>
            <Image
              style={{height: 100, width: 100}}
              source={
                this.props.type === 'mailer'
                  ? require('../../assets/packaging/mailer.png')
                  : require('../../assets/packaging/box.png')
              }
            />
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: 20,
            }}>
            <Animated.Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: animatedTextColor,
              }}>
              {this.props.title}
            </Animated.Text>
            <Animated.Text style={{color: animatedTextColor}}>
              {this.props.dimensions}
            </Animated.Text>
            <Animated.Text style={{color: animatedTextColor}}>
              {'$' + this.props.price.toFixed(2).toString()}
            </Animated.Text>
          </View>
        </Animated.View>
      </TouchableNativeFeedback>
    );
  }
}
