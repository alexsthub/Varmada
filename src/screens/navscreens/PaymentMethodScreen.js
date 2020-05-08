import React from 'react';
import {Image, 
  StyleSheet, 
  View, 
  Text,  
  SafeAreaView,  
  TouchableNativeFeedback,
  KeyboardAvoidingView, 
  Alert} from 'react-native';
import NavScreenHeader from '../../components/general/NavScreenHeader';
import Header from '../../components/general/Header';

import PaymentMethod from '../../components/general/PaymentMethod';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { CardIOModule } from 'react-native-awesome-card-io';


export default class PaymentMethodScreen extends React.Component {

  _carousel = React.createRef();
  constructor(props){
    // const price = null
    super(props);
    var price = null
    // console.log(this.props)
    if (typeof(this.props) !== undefined && 
        typeof(this.props.navigation.state) !== undefined &&
        typeof(this.props.navigation.state.params) !== undefined) {
          const { params } = this.props.navigation.state;
          price = params ? params.price : null;
    } else {
      price = null
    }

    console.log(price)
    this.state = {
      price: price,
      activeIndex:0,
      carouselItems: [
        {
            type: "card",
            number:"**** **** **** 1234",
            expDate: "12/23",
            name: "Won Barng"
        },
        {
          type: "card",
          number:"**** **** **** 5678",
          expDate: "04/20",
          name: "Won Barng"

        },
        {
            type: "google-pay",
        },
        {
          type:"end"
        }
      ]
    }
  }

  // componentDidMount() {
  //   console.log("comp")
  // }

  // onPress = () => {            
  //   console.log(this._carousel.current.currentIndex)
  // }

  handleContinue = () => {
    // TODO: Send to some database or some shit
    // TODO: handle if it does not exist
    this.props.navigation.navigate('Review');
    Alert.alert("Thank you")
  };

  addPayment = () => {  
    this.props.navigation.navigate('AddPayment', {addCard: this.addCard});
  };

  deleteCard = () => {
    console.log("heldoasdflj")
  };
 
  addCard = (cardNumber, expDate, cvv, zipCode, cardHolder) => {
    console.log("adding card")
    console.log(cardNumber)
    const hideCardNumber = "**** **** **** "  + cardNumber.slice(-4);
    console.log(hideCardNumber)
    this.setState(state => {
      // const carouselItems = state.carouselItems.concat({type: "card", number: hideCardNumber, expDate: "04/20",
      // name: "Won Barng" });
      const carouselItems = state.carouselItems
      carouselItems.splice(0, 0, {type: "card", number: hideCardNumber, expDate: expDate, name: cardHolder })
      
      console.log("adada")
      console.log(carouselItems)
      console.log("oasdfnklnkl")
      return {
        activeIndex: this.state.activeIndex,
        carouselItems
      }
    })

  };

  _renderItem({item,index}){

    return (
      item.type == 'card' ?
        <View style={{
            backgroundColor:'#F8B500',
            borderRadius: 5,
            width: 300,
            height: 250,
            padding: 20,
            marginLeft: 25,
            marginRight: 25, }}>
          <Text style={{ color: 'blue', fontWeight: 'bold', backgroundColor: 'white', width: 80, fontSize:20, paddingLeft:15}}>VISA</Text>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>{item.number}</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{item.expDate}</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{item.name}</Text>
        </View>

      : item.type == 'google-pay' ?
        <View style={{
          backgroundColor:'#F8B500',
          borderRadius: 5,
          width: 300,
          height: 250,
          padding: 20,
          marginLeft: 25,
          marginRight: 25, }}>
        <Image
                style={{width:60, height: 40}}
                source={require('../../assets/googlepay.png')}/>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>
          Pay with GooglePay</Text>
          
      </View>
      : 
      <View style={{
          backgroundColor:'#F8B500',
          borderRadius: 5,
          width: 300,
          height: 250,
          padding: 20,
          marginLeft: 25,
          marginRight: 25, }}>
        <Image
                style={{width:60, height: 40}}
                source={require('../../assets/backarrow.png')}/>
      </View>
    )
      // if (item.type == 'card') {
      //   return (<View style={{
      //       backgroundColor:'#F8B500',
      //       borderRadius: 5,
      //       width: 300,
      //       height: 250,
      //       padding: 20,
      //       marginLeft: 25,
      //       marginRight: 25, }}>
      //     <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>{item.title}</Text>
      //     <Text>{item.text}</Text>
      //   </View>
      //   )} if else{
      //   return (
      //     <View style={{
      //       backgroundColor:'blue',
      //       borderRadius: 5,
      //       width: 300,
      //       height: 250,
      //       padding: 20,
      //       marginLeft: 25,
      //       marginRight: 25, }}>
      //     <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>{item.title}</Text>
      //     <Text>{item.text}</Text>
      //   </View>
      //   )}

  }
  
  // pay = () => {
  //   console.log("pay")
  //   console.log(this.state.activeIndex)
  //         }
  // };

  render() {
    return (
          <SafeAreaView style={{flex: 1, backgroundColor:'white' }}>
            {this.state.price == null?
                <NavScreenHeader
                navigation={this.props.navigation}
                title={'Payment Methods'}
              />
              :
              <Text></Text>
            }

              {/* <View style={{marginVertical: 10}}>
                <FlatList 
                  data={paymentMethods}
                  renderItem={({item}) => (
                    <PaymentMethod 
                      type={item.type} 
                      username={item.username ? item.username : null}
                      cardNumber={item.cardNumber ? item.cardNumber : null}
                      onPress={() => {}}
                    />
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={{height: 1, backgroundColor: 'lightgray', marginHorizontal: 15}} />
                  )}
                  keyExtractor={(item) => item.id}
                /> */}
            {this.state.price !== null?
            <View style={{paddingLeft:30, paddingTop: 50}}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Payment</Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Select a Payment Method:</Text>

            </View>
            :
              <Text></Text>
            }

            <View style={{paddingLeft:30,paddingTop: 50,flexDirection: 'row'}}> 
            {this.state.price !== null?
            <Text style={{fontSize: 20, fontWeight: 'bold', paddingRight:50}}>Order Total: <Text style={{color: '#F8B500'}}>${this.state.price}</Text></Text>
            :
            <Text></Text>
            }
            <KeyboardAvoidingView
              style={{width: '35%', alignSelf: 'center'}}
              behavior={'position'}>
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
            </KeyboardAvoidingView>
            </View>

            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center',paddingLeft: 30, paddingTop: 50 }}>
                <Carousel
                  layout={'stack'} 
                  layoutCardOffset={`18`}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) 
                }
                  ref={(c) => { this._carousel = c; }} />
                  
            </View>
            <Pagination
              dotsLength={this.state.carouselItems.length - 1}
              activeDotIndex={this.state.activeIndex}
              containerStyle={{ backgroundColor: 'white' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'black'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />

              {/* <View style={styles.imageContainer}
                    onPress={() => this.props.navigation.navigate("Review")}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>Add Card</Text>
              </View> */}


            {this.state.price !== null?
            <KeyboardAvoidingView
              style={{marginBottom: 100, width: '60%', alignSelf: 'center'}}
              behavior={'position'}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('lightgray')}
                onPress={this.handleContinue}>
                <View
                  style={{
                    backgroundColor: '#F8B500',
                    elevation: 10,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>Pay & Request</Text>
                </View>
              </TouchableNativeFeedback>
            </KeyboardAvoidingView>
            :
            <Text></Text>
            }
            {/* <View style={{marginTop: 15}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 15}}>
                Add a Payment Method
              </Text>
              <View style={{marginVertical: 10}}>
                <PaymentMethod 
                  type={'Add'}
                  onPress={() => this.props.navigation.navigate("PaymentAddScreen")} />
              </View>
            </View> */}
          </SafeAreaView>



    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 20,
    marginLeft: 150,
    marginBottom:20,
    backgroundColor: 'white',
    elevation: 10,
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    marginTop: 40,
    height: 200,
  },
  fileStyle: {
    marginTop: 20,
    height: 270,
  },
});
