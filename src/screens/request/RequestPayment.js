import React from 'react';
import {Image, 
  StyleSheet, 
  View, 
  Text,  
  SafeAreaView,  
  TouchableNativeFeedback,
  KeyboardAvoidingView, 
  AsyncStorage,
  FlatList,
  Animated,
  BackHandler,
  Alert} from 'react-native';

import {NavigationEvents} from 'react-navigation';
import Header from '../../components/general/Header';
import PaymentBox from '../../components/general/PaymentBox';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import { CardIOModule } from 'react-native-awesome-card-io';

import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Payment } from '../../../amplify-datastore/src/models';

export default class RequestPayment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedPaymentIndex: null,
      fadeValue: new Animated.Value(0),
      paymentOptions: []
    }
  }

  getRequestFromStorage = async () => {
    //Get all payments of user to display
    const userInfo = await Auth.currentUserInfo();
    const userPayments = await DataStore.query(Payment, p => p.phoneNumber("eq", userInfo.attributes.phone_number));
    this.setState({paymentOptions: userPayments});

    try {
      const requestString = await AsyncStorage.getItem('request');
      if (requestString !== null) {
        this.requestObject = JSON.parse(requestString);
        if (this.requestObject.paymentIndex) {
            this.setState({selectedPaymentIndex: this.requestObject.paymentIndex});
        }
      }
    } catch (error) {
      console.log('oh no...');
    }
  }

  componentDidMount = async () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  // Handles when button animation should happen
  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.selectedPaymentIndex === null &&
      this.state.selectedPaymentIndex !== null
    ) {
      this.renderAnimation(150);
    } else if (
      prevState.selectedPaymentIndex !== null &&
      this.state.selectedPaymentIndex === null
    ) {
      this.renderAnimation(0);
    }
  };

  // Removes back button listener when component is unmounted
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  // Helper to render button animation
  renderAnimation = toValue => {
    Animated.timing(this.state.fadeValue, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

    // Return to review if editting
  handleBackButtonClick = () => {
    const navParams = this.props.navigation.state.params;
    if (navParams && navParams.edit) {
      this.props.navigation.navigate('Review');
      return true;
    }
  };

  handleContinue = async () => {
    const {selectedPaymentIndex, paymentOptions} = this.state;
    if (selectedPaymentIndex == null) return;

    this.requestObject.paymentIndex = selectedPaymentIndex;
    let cardNumber = paymentOptions[selectedPaymentIndex].cardNumber;
    this.requestObject.paymentNumber = cardNumber;
    const objString = JSON.stringify(this.requestObject);
    await AsyncStorage.setItem('request', objString);
    this.props.navigation.navigate('Review');
  };

  addPayment = () => {  
    this.props.navigation.navigate('AddPayment'); 
  };

  deleteCard = () => {
    console.log("heldoasdflj")
  };

   // On address press, set selected address index and scroll flatlist
  handlePress = (e, index) => {
    this.setState({selectedPaymentIndex: index}, () => {
    });
  };

 
  // addCard = (cardNumber, expDate, cvv, zipCode, cardHolder) => {
  //   console.log("adding card")
  //   console.log(cardNumber)
  //   const hideCardNumber = "**** **** **** "  + cardNumber.slice(-4);
  //   console.log(hideCardNumber)
  //   this.setState(state => {
  //     // const carouselItems = state.carouselItems.concat({type: "card", number: hideCardNumber, expDate: "04/20",
  //     // name: "Won Barng" });
  //     const carouselItems = state.carouselItems
  //     carouselItems.splice(0, 0, {type: "card", number: hideCardNumber, expDate: expDate, name: cardHolder })
      
  //     console.log("adada")
  //     console.log(carouselItems)
  //     console.log("oasdfnklnkl")
  //     return {
  //       activeIndex: this.state.activeIndex,
  //       carouselItems
  //     }
  //   })

  // };

 

  render() {
    const animatedBackground = this.state.fadeValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['#FFFFFF', '#F8B500'],
    });

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.getRequestFromStorage} />

        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Select a payment method'}
        />


        <View style={{marginTop: 40}}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={this.addPayment}>
            <View
              style={{
                backgroundColor: '#F8B500',
                elevation: 10,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>Add Card</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        <FlatList
          ref={paymentList => (this.paymentList = paymentList)}
          data={this.state.paymentOptions}
          renderItem={({item, index}) => (
            <PaymentBox
              payment={item}
              index={index}
              onPress={(e, index) => this.handlePress(e, index)}
              selected={this.state.selectedPaymentIndex === index}
            />
          )}
          ItemSeparatorComponent={() => <View style={{marginVertical: 8}} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop: 20}}
        />

        <KeyboardAvoidingView
          style={{marginBottom: 20, width: '60%', alignSelf: 'center'}}
          behavior={'position'}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={this.handleContinue}
            disabled={this.state.selectedPaymentIndex === null}>
            <Animated.View
              style={{
                backgroundColor: animatedBackground,
                borderWidth:
                  this.state.selectedPaymentIndex === null ? 1 : null,
                borderColor:
                  this.state.selectedPaymentIndex === null ? '#F8B500' : null,
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    flex: 1
  },
  headerContainer: {
    marginHorizontal: 40,
  }
});