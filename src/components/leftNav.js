import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './LeftNav.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View} from 'react-native';

class LeftNav extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text
              style={styles.sectionHeadingStyle}
              onPress={this.navigateToScreen('Home')}>
              Home
            </Text>
          </View>
          <View>
            <Text
              style={styles.sectionHeadingStyle}
              onPress={this.navigateToScreen('MyPickups')}>
              My Pickups
            </Text>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              onPress={this.navigateToScreen('MyAddresses')}> My Addresses
            </Text>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              onPress={this.navigateToScreen('PaymentMethods')}> Payment Methods
            </Text>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              onPress={this.navigateToScreen('AccountSettings')}> Account
              Settings
            </Text>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>Support</Text>
        </View>
      </View>
    );
  }
}

LeftNav.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  navItemStyle: {
    padding: 10,
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey',
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey',
  },
});

export default LeftNav;
