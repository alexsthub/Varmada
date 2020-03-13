import React from 'react';
import {Image, View, Text, CheckBox, StyleSheet} from 'react-native';
import CustomButton from '../../components/general/CustomButton';
import LeftNavButton from '../../components/leftNav/leftNavButton';
import { RadioButton } from 'react-native-paper';



export default class SelectCarrierScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked: ''};
  }

  describePackage = () => {
    this.props.navigation.navigate('Services');
  };


  render() {
    const { checked } = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Your Carrier</Text>
          <View style={styles.grid}>
            <View style={styles.carrier}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ checked: 'first' }); }}
                color="black"
                uncheckedColor="black"
              />
              <Image
                style={styles.image}
                source={require('../../assets/usps.png')}
              />
            </View>
            <View style={styles.carrier}>
              <RadioButton
                  value="second"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => { this.setState({ checked: 'second' }); }}
                  color="black"
                  uncheckedColor="black"
              />
              <Image
                style={styles.image}
                source={require('../../assets/ups.png')}
              />
            </View>
            <View style={styles.carrier}>
              <RadioButton
                value="third"
                status={checked === 'third' ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ checked: 'third' }); }}
                color="black"
                uncheckedColor="black"
              />
              <Image
                style={styles.image}
                source={require('../../assets/fedex.png')}
              />
            </View>
          </View>
          <CustomButton
            style={styles.button}
            text={'Continue'}
            onPress={this.describePackage}
            containerStyle={{marginTop: 40}}
          />
        </View>
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
    height: 150,
    justifyContent: 'center',
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
