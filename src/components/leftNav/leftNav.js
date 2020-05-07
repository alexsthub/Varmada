import React from 'react';
import {StyleSheet, ScrollView, Text, View, NavigationEvents} from 'react-native';
import PropTypes from 'prop-types';
import {NavigationActions} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import { Auth } from 'aws-amplify';

import {
  faHome,
  faArchive,
  faMapMarkerAlt,
  faWallet,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';

import NavOption from './navOption';
import ProfileImage from '../general/ProfileImage';

// TODO: Make a Header Component that just rests on top
class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      profileImage: {},
      name: ""
    }
  }

  async componentDidMount()  {
    const user = await Auth.currentUserInfo();
    const userName = user.attributes.name + " " + user.attributes.family_name;
    this.setState({name: userName})
  }

  changeImage = () => {
    const options = {
      title: 'Select a profile picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const profileImage = {
          uri: response.uri,
          type: response.type,
          name: 'profileImage.jpg',
        };
        this.setState({profileImage: profileImage});
      }
    });
  };

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const activeKey = this.props.activeItemKey;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.navHeader}>
            <Text style={{textAlign: 'center', fontSize: 24}}>{this.state.name}</Text>
            <View style={{marginTop: 20}}>
              <ProfileImage
                borderWidth={1}
                size={100}
                backgroundColor={'#F7F7F7'}
                onPress={this.changeImage}
              />
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <NavOption
              containerStyle={styles.sectionHeadingStyle}
              onPress={this.navigateToScreen('Home')}
              text={'Home'}
              icon={faHome}
              active={activeKey === 'Home'}
            />
            <NavOption
              containerStyle={styles.sectionHeadingStyle}
              onPress={this.navigateToScreen('Pickups')}
              text={'My Pickups'}
              icon={faArchive}
              active={activeKey === 'Pickups'}
            />
            <NavOption
              containerStyle={styles.sectionHeadingStyle}
              onPress={this.navigateToScreen('MyAddresses')}
              text={'My Addresses'}
              icon={faMapMarkerAlt}
              active={activeKey === 'MyAddresses'}
            />
            <NavOption
              containerStyle={styles.sectionHeadingStyle}
              onPress={this.navigateToScreen('PaymentMethods')}
              text={'Payment Methods'}
              icon={faWallet}
              active={activeKey === 'PaymentMethods'}
            />
            <NavOption
              containerStyle={styles.sectionHeadingStyle}
              onPress={this.navigateToScreen('AccountSettings')}
              text={'Account Settings'}
              icon={faUserCog}
              active={activeKey === 'AccountSettings'}
            />
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <NavOption
            containerStyle={styles.footerOptions}
            onPress={() => {}}
            text={'Legal'}
            isFooter={true}
          />
          <NavOption
            containerStyle={styles.footerOptions}
            onPress={() => {}}
            text={'Support'}
            isFooter={true}
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
  navHeader: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
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
    alignItems: 'center',
  },
});

export default LeftNav;
