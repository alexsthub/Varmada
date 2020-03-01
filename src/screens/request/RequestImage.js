import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Header from '../../components/general/Header';

export default class RequestImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {image: null};
  }

  takePicture = () => {
    const options = {
      title: 'Select a profile picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (!response.didCancel && !response.error) {
        const profileImage = {
          uri: response.uri,
          type: response.type,
          name: 'package.jpg',
        };
        this.setState({image: profileImage});
      }
    });
  };

  render() {
    const imageContent = !this.state.image ? (
      <View style={styles.imageContainer}>
        <FeatherIcon style={{color: '#000000'}} name={'camera'} size={40} />
        <Text>Take a photo of your package</Text>
      </View>
    ) : (
      <Image style={styles.imageStyle} source={{uri: this.state.image.uri}} />
    );

    return (
      <View style={{marginHorizontal: 40}}>
        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Take a photo'}
        />

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgray')}
          onPress={this.takePicture}>
          {imageContent}
        </TouchableNativeFeedback>

        <KeyboardAvoidingView
          style={{marginTop: 40, width: '60%', alignSelf: 'center'}}
          behavior={'position'}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgray')}
            onPress={this.handleContinue}>
            <View
              style={{
                backgroundColor: '#F8B500',
                elevation: 10,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Continue</Text>
            </View>
          </TouchableNativeFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 40,
    backgroundColor: '#f8b500',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  imageStyle: {
    marginTop: 40,
    height: 200,
  },
});
