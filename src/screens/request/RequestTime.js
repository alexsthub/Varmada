import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Animated,
  Modal
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { RadioButton } from 'react-native-paper';

import Header from '../../components/general/Header';
// import { Modal } from 'react-native-paper';

// TODO: Fill this shit out
export default class RequestTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: new Date(),
      modalVisible: false,
      checked: ""
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  handleContinue = () => {
    const {addressObj, carrier} = this.props.navigation.state.params;
    const date = new Date();
    this.props.navigation.navigate('Review', {
      addressObj: this.props.navigation.getParam("addressObj"),
      carrier: this.props.navigation.getParam("carrier"),
      // filler for now
      time: `${date.getHours()}:${date.getMinutes()}`,
      date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
    });
  };

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate.toString().substring(0, 3) + ", " + selectedStartDate.toString().substring(4, 15);
    const minDate = new Date();  // Today
    const { checked } = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Pickup DateTime</Text>

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <View
              style={{
                backgroundColor: '#F7F7F7',
                elevation: 10,
                padding: 20,
                marginTop: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Change Date</Text>
            </View>
          </TouchableNativeFeedback>
          
          {/* Calendar Modal */}

            <Modal 
              animationType="fade"
              visible={this.state.modalVisible}
              transparent={false}
            >
              <View style={styles.modal}>
                <CalendarPicker
                  onDateChange={this.onDateChange}
                  minDate={minDate}
                  selectedStartDate={this.state.selectedStartDate}
                />
                <View style={styles.modalButtons}>
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('lightgray')}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View
                      style={{
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontWeight: 'bold', fontSize: 16}}>Cancel</Text>
                    </View>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('lightgray')}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View
                      style={{
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontWeight: 'bold', fontSize: 16}}>OK</Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
              
            </Modal>
          
          {/* Time Selector */}
          
          <View style={styles.carrier}>
            <RadioButton
                value="12:00AM - 2:00AM"
                status={checked === '12:00AM - 2:00AM' ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ checked: '12:00AM - 2:00AM' }); }}
                color="black"
                uncheckedColor="black"
            />
            <Text>12:00AM - 2:00AM</Text>
            <Text style={styles.price}>$5.00</Text>
          </View>

          <View style={styles.carrier}>
            <RadioButton
                value="2:00AM - 4:00AM"
                status={checked === '2:00AM - 4:00AM' ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ checked: '2:00AM - 4:00AM' }); }}
                color="black"
                uncheckedColor="black"
            />
            <Text>2:00AM - 4:00AM</Text>
            <Text style={styles.price}>$5.00</Text>
          </View>

          <View style={styles.carrier}>
            <RadioButton
                value="4:00AM - 6:00AM"
                status={checked === '4:00AM - 6:00AM' ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ checked: '4:00AM - 6:00AM' }); }}
                color="black"
                uncheckedColor="black"
            />
            <Text>4:00AM - 6:00AM</Text>
            <Text style={styles.price}>$5.00</Text>
          </View>

          <View style={styles.carrier}>
            <RadioButton
                value="6:00AM - 8:00AM"
                status={checked === '6:00AM - 8:00AM' ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ checked: '6:00AM - 8:00AM' }); }}
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
                onPress={() => { this.setState({ checked: '8:00AM - 10:00AM' }); }}
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
                onPress={() => { this.setState({ checked: '10:00AM - 12:00PM' }); }}
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
                onPress={() => { this.setState({ checked: '12:00PM - 2:00PM' }); }}
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
                onPress={() => { this.setState({ checked: '2:00PM - 4:00PM' }); }}
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
                onPress={() => { this.setState({ checked: '4:00PM - 6:00PM' }); }}
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
                onPress={() => { this.setState({ checked: '6:00PM - 8:00PM' }); }}
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
                onPress={() => { this.setState({ checked: '8:00PM - 10:00PM' }); }}
                color="black"
                uncheckedColor="black"
            />
            <Text>8:00PM - 10:00PM</Text>
            <Text style={styles.price}>$5.00</Text>
          </View>

          <View style={styles.carrier}>
            <RadioButton
                value="10:00PM - 12:00AM"
                status={checked === '10:00PM - 12:00AM' ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ checked: '10:00PM - 12:00AM' }); }}
                color="black"
                uncheckedColor="black"
            />
            <Text>10:00PM - 12:00AM</Text>
            <Text style={styles.price}>$5.00</Text>
          </View>

          <View style={styles.datetimeDisplay}>
            <Text style={styles.text}>Pickup Date:</Text>
            <Text style={styles.text}>{ startDate }</Text>
            <Text style={styles.text}>{ checked }</Text>
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
    flexDirection: 'column',
    marginHorizontal: 40,
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    margin: 15,
    borderColor: 'black',
    borderWidth: 0.5
  },

  modalButtons: {
    flexDirection: 'row'
  },

  datetimeDisplay: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontWeight: 'bold',
    fontSize: 16
  },

  price: {
    marginLeft: 'auto',
    marginRight: 10
  },

  title: {
    textAlign: 'center',
    fontSize: 30,
  },

  grid: {
    height: 450,
    borderWidth: 1
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

  image: {
    flex: 5,
    height: 140,
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
});