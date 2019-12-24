import React from 'react';
import {StyleSheet, View, TouchableOpacity, PermissionsAndroid} from 'react-native';

import ProfieImage from '../../components/general/ProfileImage';
import FloatingInput from '../../components/general/FloatingInput';
import ImagePicker from 'react-native-image-picker';

// TODO: Upload file to s3
export default class EditAccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {profileImage: {}};
  }

  changeImage = () => {
    const options = {
      title: 'Select a profile picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
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
          name: 'profileImage.jpg'
        };
        this.setState({profileImage: profileImage});
      }
    });
  }

  render() {
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
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EditFieldScreen', {
                firstName: 'Alex',
                lastName: 'Tan',
              })
            }>
            <FloatingInput
              value={'Alex Tan'}
              label={'Name'}
              labelColorBlur={'#000000'}
              rgbaBackgroundColorBlur={'rgba(247,247,247,0.6)'}
              rgbaBackgroundColorFocus={'rgba(230,230,230,1)'}
              editable={false}
            />
          </TouchableOpacity>

          <View style={{marginVertical: 10}} />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EditFieldScreen', {
                phone: '(360) 515-1765',
              })
            }>
            <FloatingInput
              value={'(360) 515-1765'}
              label={'Phone Number'}
              labelColorBlur={'#000000'}
              rgbaBackgroundColorBlur={'rgba(247,247,247,0.6)'}
              rgbaBackgroundColorFocus={'rgba(230,230,230,1)'}
              editable={false}
            />
          </TouchableOpacity>

          <View style={{marginVertical: 10}} />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EditFieldScreen', {
                email: 'alextan785@gmail.com',
              })
            }>
            <FloatingInput
              value={'alextan785@gmail.com'}
              label={'Email Addresses'}
              labelColorBlur={'#000000'}
              rgbaBackgroundColorBlur={'rgba(247,247,247,0.6)'}
              rgbaBackgroundColorFocus={'rgba(230,230,230,1)'}
              editable={false}
            />
          </TouchableOpacity>

          <View style={{marginVertical: 10}} />

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EditFieldScreen', {
                password: '************',
              })
            }>
            <FloatingInput
              value={'************'}
              label={'Password'}
              labelColorBlur={'#000000'}
              rgbaBackgroundColorBlur={'rgba(247,247,247,0.6)'}
              rgbaBackgroundColorFocus={'rgba(230,230,230,1)'}
              editable={false}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
