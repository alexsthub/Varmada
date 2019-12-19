import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {NavigationActions} from 'react-navigation';

import {
  faHome,
  faArchive,
  faMapMarkerAlt,
  faWallet,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';

import NavOption from './navOption';

class LeftNav extends React.Component {
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
          <NavOption
            containerStyle={styles.sectionHeadingStyle}
            onPress={this.navigateToScreen('Home')}
            text={'Home'}
            icon={faHome}
          />
          <NavOption
            containerStyle={styles.sectionHeadingStyle}
            onPress={this.navigateToScreen('Pickups')}
            text={'My Pickups'}
            icon={faArchive}
          />
          <NavOption
            containerStyle={styles.sectionHeadingStyle}
            onPress={this.navigateToScreen('MyAddresses')}
            text={'My Addresses'}
            icon={faMapMarkerAlt}
          />
          <NavOption
            containerStyle={styles.sectionHeadingStyle}
            onPress={this.navigateToScreen('PaymentMethods')}
            text={'Payment Methods'}
            icon={faWallet}
          />
          <NavOption
            containerStyle={styles.sectionHeadingStyle}
            onPress={this.navigateToScreen('AccountSettings')}
            text={'Account Settings'}
            icon={faUserCog}
          />
        </ScrollView>
        <View style={styles.footerContainer}>
          <NavOption
            containerStyle={styles.footerOptions}
            onPress={() => {}}
            text={'Legal'}
          />
          <NavOption
            containerStyle={styles.footerOptions}
            onPress={() => {}}
            text={'Support'}
          />
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
    paddingVertical: 15,
    paddingLeft: 15,
    alignItems: 'center',
  },
  footerContainer: {
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
  },
  footerOptions: {
    paddingVertical: 15,
    paddingLeft: 15,
    alignItems: 'center'
  }
});

export default LeftNav;
