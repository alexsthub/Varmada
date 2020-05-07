import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Header from '../../components/general/Header';

export default class RequestAddLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {image: null};
  }

  takePicture = () => {
    const options = {
      title: 'Upload a file',
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
          name: 'shippinglabel.pdf',
        };
        this.setState({image: profileImage});
      }
    });
  };

  handleContinue = async () => {
    const {image} = this.state;
    const requestString = await AsyncStorage.getItem('request');
    this.requestObject = JSON.parse(requestString);
    if (image !== null) {
      this.requestObject.label = true;
    } else {
      this.requestObject.label = false;
    }
    const objString = JSON.stringify(this.requestObject);
 
    try {
      await AsyncStorage.setItem('request', objString);
      this.props.navigation.navigate('Services');
    } catch (error) {
      console.log('oh fuck what do i do now.');
    }
    // TODO: Send to some database or some shit
    // TODO: handle if it does not exist
  };
  changePage = () => {
      
  }
  render() {
    const imageContent = !this.state.image ? (
    <View>
      <View style={styles.imageContainer}>
        {/* <FeatherIcon style={{color: '#000000'}} name={'camera'} size={40} /> */}
        <Text>Click here to upload a file</Text>
      </View>
      <Text style={{marginTop:10}}>No File Chosen</Text>
      </View>
    ) : (
        <View>
        <View style={styles.imageContainer}>
        {/* <FeatherIcon style={{color: '#000000'}} name={'camera'} size={40} /> */}
        <Text>Click here to upload a different file</Text>
      </View>
      <Text style={{marginTop:10}}>File name: {this.state.image.name}</Text>
      <Image style={styles.fileStyle} source={{uri: this.state.image.uri}} />
      <View style={{marginTop: 10,
                    backgroundColor: '#f8b500',
                    elevation: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 30,
        }} onPress={this.changePage}><Text>Change page setting</Text></View>
      </View>
    );

    return (
      <View style={{marginHorizontal: 40}}>

        <Header
          headerText={'Request a label Printing'}
          subHeaderText={'Upload a shipping label'}
        />

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('lightgray')}
          onPress={this.takePicture}>
          {imageContent}
        </TouchableNativeFeedback>

        <KeyboardAvoidingView
          style={{marginTop: 20, width: '60%', alignSelf: 'center'}}
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
    height: 50,
  },
  imageStyle: {
    marginTop: 40,
    height: 200,
  },
  fileStyle: {
    marginTop: 20,
    height: 270,
  },
});
