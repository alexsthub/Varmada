import React from 'react';
import {
  ImageBackground,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  CheckBox
} from 'react-native';
import styles from '../constants/styles/SelectCarrierStyles';
import CustomButton from '../components/general/CustomButton';
import LeftNavButton from '../components/leftNav/leftNavButton';

export default class SelectCarrierScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  describePackage = () => {
    this.props.navigation.navigate('DescribePackageScreen');
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <LeftNavButton navigation={this.props.navigation} />
        <View style={styles.container}>
          <Text style={styles.title}>Select Your Carrier</Text>
          <View style={styles.grid}>
            <View style={styles.carrier}>
              <CheckBox style={styles.checkbox}
              />
              <Image style={styles.image}
                source={require('../assets/usps.png')}
              />
            </View>
            <View style={styles.carrier}>
              <CheckBox style={styles.checkbox}
                />
              <Image style={styles.image}
                  source={require('../assets/ups.png')}
              />
            </View>
            <View style={styles.carrier}>
              <CheckBox style={styles.checkbox}
                />
              <Image style={styles.image}
                  source={require('../assets/fedex.png')}
              />
            </View>
          </View>
          <CustomButton style={styles.button}
            text={'Continue'}
            onPress={this.describePackage}
            containerStyle={{marginTop: 40}}
          />
        </View>
      </View>
    );
  }
}
