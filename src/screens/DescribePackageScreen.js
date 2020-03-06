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
import styles from '../constants/styles/DescribePackageStyles';
import CustomButton from '../components/general/CustomButton';
import LeftNavButton from '../components/leftNav/leftNavButton';

export default class DescribePackage extends React.Component {
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
          <Text style={styles.title}>Describe the Package</Text>
          
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
