import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

import {Auth} from 'aws-amplify';

import ProfieImage from '../../components/general/ProfileImage';
import FloatingInput from '../../components/general/FloatingInput';
import ImagePicker from 'react-native-image-picker';

// TODO: Upload file to s3
// TODO: Show activity indicator over until the screen is finished with ComponentDidMount

// TODO: After I update, this data needs to refresh. Maybe just use didFocus

export default class EditAccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {profileImage: {}, user: {}};
  }

  componentDidMount = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser({bypassCache: true});
      this.setState({user: user.attributes});
    } catch (err) {
      console.log(err);
    }
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
    const {user} = this.state;
    const name = user ? `${user.name} ${user.family_name}` : null;
    const phone = user ? user.phone_number : null;
    return (
      <View style={{flex: 1}}>
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
            value={phone}
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
