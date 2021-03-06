import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  AsyncStorage,
  BackHandler,
  Animated
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {NavigationEvents} from 'react-navigation';

import Header from '../../components/general/Header';
import DateCarousel from '../../components/general/DateCarousel';
import TimeRange from '../../components/general/TimeRange';

// TODO: When getRequestFromStorage is fired, the date carousel animation is shitty.
export default class RequestTime extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(),
      modalVisible: false,
      times: [],
      selectedTimeIndex: null,
      fadeValue: new Animated.Value(0),
    };
    this.shit = [
          {startTime: 6, endTime: 8, price: 3.00},
          {startTime: 8, endTime: 10, price: 3.00},
          {startTime: 10, endTime: 12, price: 2.00},
          {startTime: 12, endTime: 14, price: 1.00},
          {startTime: 14, endTime: 16, price: 1.00},
          {startTime: 16, endTime: 18, price: 3.00},
          {startTime: 18, endTime: 20, price: 2.00},
    ];
  }


  // Android back button listener
  componentDidMount = async () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.filterTimes(moment());
    // const shit = [
    //   {startTime: 6, endTime: 8, price: 3.00},
    //   {startTime: 8, endTime: 10, price: 3.00},
    //   {startTime: 10, endTime: 12, price: 2.00},
    //   {startTime: 12, endTime: 14, price: 1.00},
    //   {startTime: 14, endTime: 16, price: 1.00},
    //   {startTime: 16, endTime: 18, price: 3.00},
    //   {startTime: 18, endTime: 20, price: 2.00},
    // ];

    // this.setState({times: shit}); 
  };

  // Handles when button animation should happen
  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.selectedTimeIndex === null &&
      this.state.selectedTimeIndex !== null
    ) {
      this.renderAnimation(150);
    } else if (
      prevState.selectedTimeIndex !== null &&
      this.state.selectedTimeIndex === null
    ) {
      this.renderAnimation(0);
    }
  };

  // Helper to render button animation
  renderAnimation = toValue => {
    Animated.timing(this.state.fadeValue, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Remove back button listener
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  // Return to review if editting
  handleBackButtonClick = () => {
    const navParams = this.props.navigation.state.params;
    if (navParams && navParams.edit) {
      this.props.navigation.navigate('Review');
      return true;
    }
  };

  // read request from async storage (Got rid of getRequest because time lists and dates are changing based on current time and could lead to error)

  getRequestFromStorage = async () => {
    try {
      const requestString = await AsyncStorage.getItem('request');
      if (requestString !== null) {
        this.requestObject = JSON.parse(requestString);
        if (
          this.requestObject.date && 
          moment(this.requestObject.date, "LLLL").isSameOrAfter(moment().format("LLLL"), 'day')
        ) {
          this.setState({selectedDate: moment(this.requestObject.date, "LLLL")});
          if (this.requestObject.time) {
            const time = this.requestObject.time;
            let selectedIndex;
            for (let i = 0; i < this.state.times.length; i++) {
              if (this.state.times[i].startTime === time.startTime) {
                selectedIndex = i;
                break;
              }
            }
            if (selectedIndex) {
              this.setState({selectedTimeIndex: selectedIndex}, () => {
                setTimeout(() => {
                  this.handleTimeScroll(selectedIndex);
                }, 50);
              });
            }
          }
        }
      } 
    } catch (error) {
      console.log(error);
    }
    
    // let latestTimeToRequestPickup = moment('18:00:00', 'hh:mm:ss');
    // if (moment().isAfter(latestTimeToRequestPickup)) { // If after 6pm, show the next day since user cannot make pickup today
    //   console.log("after 6!")
    //   this.setState({selectedDate: moment().add(1,'days')});
    // }
  };

  // Get selected date and time and save to async storage. Go to next screen
  handleContinue = async () => {
    const {selectedTimeIndex} = this.state;
    if (selectedTimeIndex == null) return;

    // try {
    //   const requestString = await AsyncStorage.getItem('request');
    //   if (requestString !== null) {
    //     this.requestObject = JSON.parse(requestString);
        const date = this.state.selectedDate;
        const time = this.state.times[this.state.selectedTimeIndex];
        this.requestObject.date = date.format('dddd, MMMM Do YYYY');
        this.requestObject.deliveryPrice = time.price;
        this.requestObject.time = this.getTime();
        const objString = JSON.stringify(this.requestObject);
        try {
          await AsyncStorage.setItem('request', objString);
          const navParams = this.props.navigation.state.params;
          if (navParams && navParams.edit) {
            this.props.navigation.navigate('Review');
          } else {
            this.props.navigation.navigate('Payment');
          }
        } catch (error) {
          console.log('oh fuck what do i do now.');
        }
      //}
    // } catch (error) {
    //   console.log(error);
    // }


   
  };

  datepickerSelect = date => {
    const d = moment(date);
    this.setState({selectedTimeIndex: null}); // same indices may have different times since time is updated according to current time
    this.setState({modalVisible: false, selectedDate: d});
    this.filterTimes(d);
  };

  carouselSelect = date => {
    const d = moment(date);
    this.setState({selectedTimeIndex: null});
    this.setState({selectedDate: d});
    this.filterTimes(d);
  };

  handleChangeTime = index => {
    this.setState({selectedTimeIndex: index}, () => {
      this.handleTimeScroll(index);
    });
  };

  filterTimes = (d) => {
    if (d.isSame(moment(), "day")) {  // If today is picked, filter out times that have already passed
      const availableTimes = this.shit.filter(object => {
        let startTime = moment(object.startTime, "H HH");
        return moment().isBefore(startTime);
      });
      this.setState({times: availableTimes}); // current time has to be before startTime to request pickup at that startTime
    } else {
      this.setState({times: this.shit});
    }
  }  

  handleTimeScroll = index => {
    const options = {
      animated: true,
      index: index,
      viewPosition: 0.5,
    };
    this.timeList.scrollToIndex(options);
  };

  getTime = () => {
    if (this.state.selectedTimeIndex || this.state.selectedTimeIndex === 0) {
      const timeRange = this.state.times[this.state.selectedTimeIndex];
      let start = timeRange.startTime;
      let end = timeRange.endTime;
      let suffix;
      if (start >= 12) {
        suffix = 'PM';
        start = start % 12;
        end = end % 12;
        if (start === 0) {
          start = 12;
        }
        if (end === 0) {
          end = 12;
        }
      } else {
        suffix = 'AM';
      }
      return `${start}:00${suffix} - ${end}:00${suffix}`;
    } else {
      return 'No Time Currently Selected';
    }
  };

  render() {
    const noPickupTimes = this.state.times == 0 ? (
      <Text style={{fontWeight: 'bold', fontSize: 20}}> No available pickup times today, please select a different day </Text>
    ) : null;

    const animatedBackground = this.state.fadeValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['#FFFFFF', '#F8B500'],
    });

    return (
      <View style={{flex: 1}}>
        <NavigationEvents onWillFocus={this.getRequestFromStorage} />
        <View style={styles.headerContainer}>
          <Header
            headerText={'Request a pickup'}
            subHeaderText={'Select a date and time'}
          />
        </View>
        <View style={styles.calenderRowHelper}>
          <TouchableOpacity
            style={styles.calendarIconContainer}
            onPress={() => this.setState({modalVisible: true})}>
            <AntDesignIcon
              style={{color: '#393e46'}}
              name={'calendar'}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <DateCarousel
          //firstDate={this.state.selectedDate}
          selectedDate={this.state.selectedDate}
          numberOfDays={30}
          paginate
          onDateSelect={this.carouselSelect}
          fade={false}
        />
        <DateTimePickerModal
          isVisible={this.state.modalVisible}
          mode="date"
          minimumDate={this.state.selectedDate.toDate()}
          date={this.state.selectedDate.toDate()}
          onConfirm={this.datepickerSelect}
          onCancel={() => this.setState({modalVisible: false})}
        />

        <View style={{marginTop: 20}} />

        <View style={styles.container}>
          {noPickupTimes}
          <FlatList
            ref={timeList => (this.timeList = timeList)}
            data={this.state.times}
            renderItem={({item, index}) => (
              <TimeRange
                onPress={index => this.handleChangeTime(index)}
                startTime={item.startTime}
                endTime={item.endTime}
                price={item.price}
                containerStyle={{paddingHorizontal: 40}}
                index={index}
                selected={index === this.state.selectedTimeIndex}
              />
            )}
            keyExtractor={item => item.startTime.toString()}
            showsVerticalScrollIndicator={false}
            // onScrollToIndexFailed={() => {}}
          />
          

          <View style={styles.datetimeDisplay}>
            <View style={styles.datetimeInnerContainer}>
              <View style={styles.datetimeTextContainer}>
                <Text style={styles.datetimeTitle}>Pickup Date</Text>
                <Text style={styles.datetimeText}>
                  {this.state.selectedDate.format('dddd, MMMM Do YYYY')}
                </Text>
                <Text style={styles.datetimeText}>{this.getTime()}</Text>
              </View>
            </View>
          </View>
          {/*  */}
        </View>

        <KeyboardAvoidingView
          style={{marginBottom: 20, width: '60%', alignSelf: 'center'}}
          behavior={'position'}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={this.handleContinue}
            disabled={this.state.selectedTimeIndex === null}>
            <Animated.View
              style={{
                backgroundColor: animatedBackground,
                borderWidth:
                  this.state.selectedTimeIndex === null ? 1 : null,
                borderColor:
                  this.state.selectedTimeIndex === null ? '#F8B500' : null,
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
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: 40,
  },
  calenderRowHelper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  calendarIconContainer: {
    marginRight: 15,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: '#F7F7F7',
    padding: 5,
  },
  datetimeDisplay: {
    marginBottom: 10,
    backgroundColor: '#F7F7F7',
  },
  datetimeInnerContainer: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    elevation: 5,
  },
  datetimeTextContainer: {
    padding: 15,
  },
  datetimeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  datetimeText: {
    fontSize: 16,
  },
});
