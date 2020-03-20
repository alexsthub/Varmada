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
    };
  }

  componentDidMount = async () => {
    const shit = [
      {startTime: 6, endTime: 8, price: 4.0},
      {startTime: 8, endTime: 10, price: 4.0},
      {startTime: 10, endTime: 12, price: 4.0},
      {startTime: 12, endTime: 14, price: 4.0},
      {startTime: 14, endTime: 16, price: 4.0},
      {startTime: 16, endTime: 18, price: 4.0},
      {startTime: 18, endTime: 20, price: 5.0},
    ];
    this.setState({times: shit});
  };

  getRequestFromStorage = async () => {
    try {
      const requestString = await AsyncStorage.getItem('request');
      if (requestString !== null) {
        this.requestObject = JSON.parse(requestString);
        if (
          this.requestObject.date &&
          moment(this.requestObject.date).isSameOrAfter(moment(), 'day')
        ) {
          this.setState({selectedDate: moment(this.requestObject.date)});
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
  };

  handleContinue = async () => {
    const date = this.state.selectedDate;
    const time = this.state.times[this.state.selectedTimeIndex];
    this.requestObject.date = date;
    this.requestObject.time = time;
    const objString = JSON.stringify(this.requestObject);
    try {
      await AsyncStorage.setItem('request', objString);
      this.props.navigation.navigate('Additional');
    } catch (error) {
      console.log('oh fuck what do i do now.');
    }
  };

  datepickerSelect = date => {
    const d = moment(date);
    this.setState({modalVisible: false, selectedDate: d});
  };

  carouselSelect = date => {
    const d = moment(date);
    this.setState({selectedDate: d});
  };

  handleChangeTime = index => {
    this.setState({selectedTimeIndex: index}, () => {
      this.handleTimeScroll(index);
    });
  };

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
          // lastDate={'2019-07-20'}
          selectedDate={this.state.selectedDate}
          numberOfDays={30}
          paginate
          onDateSelect={this.carouselSelect}
          fade={false}
        />
        <DateTimePickerModal
          isVisible={this.state.modalVisible}
          mode="date"
          minimumDate={new Date()}
          date={this.state.selectedDate.toDate()}
          onConfirm={this.datepickerSelect}
          onCancel={() => this.setState({modalVisible: false})}
        />

        <View style={{marginTop: 20}} />

        <View style={styles.container}>
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
            onPress={this.handleContinue}>
            <View
              style={{
                backgroundColor: '#F8B500',
                elevation: 10,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Continue</Text>
            </View>
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
