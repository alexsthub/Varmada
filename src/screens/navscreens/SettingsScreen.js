import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';

import NavScreenHeader from '../../components/general/NavScreenHeader';
import ProfieImage from '../../components/general/ProfileImage';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';

import ModalPicker from '../../components/general/ModalPicker';
import {Auth} from 'aws-amplify';

// TODO: Modal picker code is actually disgusting
export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: {name: 'English (US)', code: 'en'},
      darkMode: false,
      type: 'darkMode',
      showModal: false,
    };
  }

  handleModalSettingsPress = title => {
    if (this.state.type === 'darkMode') {
      if (title === 'On' && !this.state.darkMode) {
        this.setState({darkMode: true, showModal: false});
      } else if (title === 'Off' && this.state.darkMode) {
        this.setState({darkMode: false, showModal: false});
      } else {
        this.setState({showModal: false});
      }
    } else {
      if (
        title === 'English (US)' &&
        this.state.language.name != 'English (US)'
      ) {
        this.setState({
          language: {name: 'English (US)', code: 'en'},
          showModal: false,
        });
      } else if (title === 'Spanish' && this.state.language.name != 'Spanish') {
        this.setState({
          language: {name: 'Spanish', code: 'es'},
          showModal: false,
        });
      } else {
        this.setState({showModal: false});
      }
    }
  };

  handleSignOut = async () => {
    try {
      await Auth.signOut();
      this.props.navigation.navigate('Auth');
    } catch (e) {}
  };

  render() {
    return (
      <View style={styles.container}>
        <NavScreenHeader
          navigation={this.props.navigation}
          title={'Account Settings'}
        />

        <ModalPicker
          darkMode={this.state.darkMode}
          language={this.state.language}
          type={this.state.type}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          showModal={this.state.showModal}
          closeModal={() => this.setState({showModal: false})}
          onPress={this.handleModalSettingsPress}
        />

        <TouchableHighlight
          underlayColor={'lightgray'}
          activeOpacity={0.95}
          onPress={() => this.props.navigation.navigate('EditAccountScreen')}>
          <View style={styles.profileDetailsContainer}>
            <View style={styles.profileImageContainer}>
              <ProfieImage
                borderWidth={1}
                size={50}
                backgroundColor={'#F7F7F7'}
                disabled={true}
              />
            </View>

            <View style={styles.accountDetailsContainer}>
              <Text>Alex Tan</Text>
              <Text>+1 (360) 515-1765</Text>
            </View>

            <View style={{marginRight: 20}}>
              <FontAwesomeIcon
                icon={faUserEdit}
                style={{color: 'black'}}
                size={25}
              />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor={'lightgray'}
          activeOpacity={0.95}
          onPress={() =>
            this.props.navigation.navigate('NotificationSettingsScreen')
          }>
          <View style={styles.settingOption}>
            <Text style={{fontSize: 24}}>Notifications</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor={'lightgray'}
          activeOpacity={0.95}
          onPress={() =>
            this.props.navigation.navigate('SecuritySettingsScreen')
          }>
          <View style={styles.settingOption}>
            <Text style={{fontSize: 24}}>Security</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor={'lightgray'}
          activeOpacity={0.95}
          onPress={() => this.setState({showModal: true, type: 'lang'})}>
          <View style={[styles.settingOption, styles.multiTextOption]}>
            <Text style={{fontSize: 24}}>Language</Text>
            <Text>{this.state.language.name}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor={'lightgray'}
          activeOpacity={0.95}
          onPress={() => this.setState({showModal: true, type: 'darkMode'})}>
          <View style={[styles.settingOption, styles.multiTextOption]}>
            <Text style={{fontSize: 24}}>Dark Mode</Text>
            <Text>{this.state.darkMode ? 'On' : 'Off'}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor={'lightgray'}
          activeOpacity={0.95}
          onPress={() => {}}>
          <View style={styles.settingOption}>
            <Text style={{fontSize: 24}}>Help</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor={'lightgray'}
          activeOpacity={0.95}
          onPress={this.handleSignOut}>
          <View style={styles.settingOption}>
            <Text style={{fontSize: 24, color: '#B52323'}}>Sign Out</Text>
          </View>
        </TouchableHighlight>

        <View style={styles.versionContainer}>
          <Text>Version 1.0.0</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  profileImageContainer: {
    paddingHorizontal: 20,
  },
  accountDetailsContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  settingOption: {
    paddingVertical: 15,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  multiTextOption: {
    paddingVertical: 5,
  },
  versionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
