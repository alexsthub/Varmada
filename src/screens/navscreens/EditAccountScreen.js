import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from 'react-native';

import {Auth} from 'aws-amplify';
import {NavigationEvents} from 'react-navigation';

import ProfieImage from '../../components/general/ProfileImage';
import FloatingInput from '../../components/general/FloatingInput';
import ImagePicker from 'react-native-image-picker';
import {formatPhoneNumber} from '../../helpers/InputHelpers';

// TODO: Upload file to s3
// TODO: Little popup message at the bottom, when something gets changed?

export default class EditAccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {profileImage: {}, user: {}, loading: true};
  }

  componentDidMount = async () => {
    await this.getUser();
  };

  getUser = async () => {
    this.setState({loading: true}, async () => {
      try {
        const user = await Auth.currentAuthenticatedUser({bypassCache: true});
        this.setState({user: user.attributes, loading: false});
      } catch (err) {
        console.log(err);
      }
    });
  };

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

  render() {
    if (this.state.loading) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator
            animating={true}
            size={'large'}
            color={'#000000'}
          />
        </View>
      );
    }

    const {user} = this.state;
    const name = user ? `${user.name} ${user.family_name}` : null;
    const phone = user ? user.phone_number : null;
    const formattedPhone = formatPhoneNumber(phone.substring(2));
    return (
      <View style={{flex: 1}}>
        <NavigationEvents onWillFocus={this.getUser} />
        <View style={{alignItems: 'center', marginTop: 40}}>
          <ProfieImage
            borderWidth={1}
            size={120}
            backgroundColor={'#F7F7F7'}
            onPress={this.changeImage}
          />
        </View>

        <View style={{marginHorizontal: 40, marginTop: 30}}>
          <AccountField
            value={name}
            label={'Name'}
            onPress={() =>
              this.props.navigation.navigate('EditNameScreen', {
                firstName: user.name,
                lastName: user.family_name,
              })
            }
          />

          <View style={{marginVertical: 10}} />

          <AccountField
            value={formattedPhone}
            label={'Phone Number'}
            onPress={() =>
              this.props.navigation.navigate('EditPhoneScreen', {
                phone: user.phone_number,
              })
            }
          />

          <View style={{marginVertical: 10}} />

          <AccountField
            value={'*Link an email address for extra security'}
            label={'Email'}
            onPress={() =>
              this.props.navigation.navigate('EditFieldScreen', {
                key: 'email',
                email: '',
              })
            }
          />

          <View style={{marginVertical: 10}} />

          <AccountField
            value={'********'}
            label={'Password'}
            onPress={() => this.props.navigation.navigate('EditPasswordScreen')}
          />
        </View>
      </View>
    );
  }
}

class AccountField extends React.Component {
  render() {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('lightgray')}
        useForeground={true}
        onPress={this.props.onPress}>
        <View>
          <FloatingInput
            value={this.props.value ? this.props.value : null}
            label={this.props.label}
            editable={false}
            fieldStyle={styles.editField}
          />
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  editField: {
    backgroundColor: '#F7F7F7',
    elevation: 5,
    borderRadius: 5,
    paddingLeft: 15,
  },
});
