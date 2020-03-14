import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Header from '../../components/general/Header';
import DateCarousel from '../../components/general/DateCarousel';

export default class RequestTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment().format('dddd, MMMM Do YYYY'),
      modalVisible: false,
      checked: '',
    };
  }

  handleContinue = () => {
    const {addressObj, carrier} = this.props.navigation.state.params;
    const date = new Date();
    this.props.navigation.navigate('Review', {
      addressObj: this.props.navigation.getParam('addressObj'),
      carrier: this.props.navigation.getParam('carrier'),
      // filler for now
      time: `${date.getHours()}:${date.getMinutes()}`,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
    });
  };

  handleConfirm = date => {
    const d = moment(date);
    const selectedDate = d.format('dddd, MMMM Do YYYY');
    this.setState({modalVisible: false, selectedDate: selectedDate});
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  carouselSelect = date => {
    const d = moment(date);
    const formatDate = d.format('dddd, MMMM Do YYYY');
    this.setState({selectedDate: formatDate});
  };

  render() {
    const {checked} = this.state;
    return (
      <View style={{flex: 1}}>
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
          numberOfDays={30}
          paginate
          onDateSelect={this.carouselSelect}
        />
        {/* // TODO: I can't set the value on this bitch */}
        <DateTimePickerModal
          isVisible={this.state.modalVisible}
          mode="date"
          // value={moment(this.state.selectedDate, 'dddd, MMMM Do YYYY').toDate}
          onConfirm={this.handleConfirm}
          onCancel={() => this.setState({modalVisible: false})}
        />
        <View style={styles.container}>
          {/* Time Selector */}

          <View style={styles.carrier}>
            <RadioButton
              value="6:00AM - 8:00AM"
              status={checked === '6:00AM - 8:00AM' ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checked: '6:00AM - 8:00AM'});
              }}
              color="black"
              uncheckedColor="black"
            />
            <Text>6:00AM - 8:00AM</Text>
            <Text style={styles.price}>$5.00</Text>
          </View>

          <View style={styles.carrier}>
            <RadioButton
              value="8:00AM - 10:00AM"
              status={checked === '8:00AM - 10:00AM' ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checked: '8:00AM - 10:00AM'});
              }}
              color="black"
              uncheckedColor="black"
            />
            <Text>8:00AM - 10:00AM</Text>
            <Text style={styles.price}>$4.00</Text>
          </View>

          <View style={styles.carrier}>
            <RadioButton
              value="10:00AM - 12:00PM"
              status={checked === '10:00AM - 12:00PM' ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checked: '10:00AM - 12:00PM'});
              }}
              color="black"
              uncheckedColor="black"
            />
            <Text>10:00AM - 12:00PM</Text>
            <Text style={styles.price}>$4.00</Text>
          </View>

          <View style={styles.carrier}>
            <RadioButton
              value="12:00PM - 2:00PM"
              status={checked === '12:00PM - 2:00PM' ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checked: '12:00PM - 2:00PM'});
              }}
              color="black"
              uncheckedColor="black"
            />
            <Text>12:00PM - 2:00PM</Text>
            <Text style={styles.price}>$3.00</Text>
          </View>

          <View style={styles.carrier}>
            <RadioButton
              value="2:00PM - 4:00PM"
              status={checked === '2:00PM - 4:00PM' ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checked: '2:00PM - 4:00PM'});
              }}
              color="black"
              uncheckedColor="black"
            />
            <Text>2:00PM - 4:00PM</Text>
            <Text style={styles.price}>$3.00</Text>
          </View>

          <View style={styles.carrier}>
            <RadioButton
              value="4:00PM - 6:00PM"
              status={checked === '4:00PM - 6:00PM' ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checked: '4:00PM - 6:00PM'});
              }}
              color="black"
              uncheckedColor="black"
            />
            <Text>4:00PM - 6:00PM</Text>
            <Text style={styles.price}>$4.00</Text>
          </View>

          <View style={styles.carrier}>
            <RadioButton
              value="6:00PM - 8:00PM"
              status={checked === '6:00PM - 8:00PM' ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checked: '6:00PM - 8:00PM'});
              }}
              color="black"
              uncheckedColor="black"
            />
            <Text>6:00PM - 8:00PM</Text>
            <Text style={styles.price}>$4.50</Text>
          </View>

          <View style={styles.carrier}>
            <RadioButton
              value="8:00PM - 10:00PM"
              status={checked === '8:00PM - 10:00PM' ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checked: '8:00PM - 10:00PM'});
              }}
              color="black"
              uncheckedColor="black"
            />
            <Text>8:00PM - 10:00PM</Text>
            <Text style={styles.price}>$5.00</Text>
          </View>

          <View style={styles.datetimeDisplay}>
            <Text style={styles.text}>Pickup Date:</Text>
            <Text style={styles.text}>{this.state.selectedDate}</Text>
            <Text style={styles.text}>{checked}</Text>
          </View>
        </View>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 40,
  },
  headerContainer: {
    marginHorizontal: 40,
  },
  calenderRowHelper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
  carrier: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 40,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    flex: 1,
  },
});
