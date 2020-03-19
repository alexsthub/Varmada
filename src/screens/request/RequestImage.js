import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Header from '../../components/general/Header';

// TODO: Set request to state
export default class RequestImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {request: null};
  }

  componentDidMount = async () => {
    // AsyncStorage.getAllKeys().then(res => {
    //   for (let i = 0; i < res.length; i++) {
    //     AsyncStorage.removeItem(res[i]);
    //   }
    // });

    // AsyncStorage.getAllKeys().then(res => {
    //   console.log(res);
    // });

    try {
      const requestString = await AsyncStorage.getItem('request');
      if (requestString !== null) {
        const requestObject = JSON.parse(requestString);
        this.setState({request: requestObject});
      }
    } catch (error) {
      console.log('oh no...');
    }
  };

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
        const packageImage = {
          uri: response.uri,
          type: response.type,
          name: 'package.jpg',
        };
        const request = this.state.request;
        request.image = packageImage;
        this.setState({request: request});
      }
    });
  };

  handleContinue = async () => {
    const {request} = this.state;
    const objString = JSON.stringify(request);
    try {
      await AsyncStorage.setItem('request', objString);
      this.props.navigation.navigate('Carrier');
    } catch (error) {
      console.log('oh fuck what do i do now.');
    }
  };

  render() {
    const imageContent =
      this.state.request && this.state.request.image ? (
        <Image
          style={styles.imageStyle}
          source={{uri: this.state.request.image.uri}}
        />
      ) : (
        <View style={styles.imageContainer}>
          <FeatherIcon style={{color: '#000000'}} name={'camera'} size={40} />
          <Text>Take a photo of your package</Text>
        </View>
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
