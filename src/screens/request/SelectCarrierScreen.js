import React from 'react';
import {Image, View, Text, CheckBox, StyleSheet} from 'react-native';
import CustomButton from '../../components/general/CustomButton';
import LeftNavButton from '../../components/leftNav/leftNavButton';

export default class SelectCarrierScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  describePackage = () => {
    this.props.navigation.navigate('Services');
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Your Carrier</Text>
          <View style={styles.grid}>
            <View style={styles.carrier}>
              <CheckBox style={styles.checkbox} />
              <Image
                style={styles.image}
                source={require('../../assets/usps.png')}
              />
            </View>
            <View style={styles.carrier}>
              <CheckBox style={styles.checkbox} />
              <Image
                style={styles.image}
                source={require('../../assets/ups.png')}
              />
            </View>
            <View style={styles.carrier}>
              <CheckBox style={styles.checkbox} />
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
