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
import DocumentPicker from 'react-native-document-picker';
import Header from '../../components/general/Header';
import FileViewer from 'react-native-file-viewer';
export default class RequestAddLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: null};
  }

  takePicture = async () => {
    const options = {
      title: 'Upload a file',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // ImagePicker.showImagePicker(options, response => {
    //   if (!response.didCancel && !response.error) {
    //     const profileImage = {
    //       uri: response.uri,
    //       type: response.type,
    //       name: 'shippinglabel.pdf',
    //     };
    //     this.setState({image: profileImage});
    //   }
    // });
    
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
      this.setState({file: res})
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on

      } else {
        throw err;
      }
    }

    
  };

  viewFile = () => {
    FileViewer.open(this.state.file.uri)
    .then(() => {
      // success
    })
    .catch(_err => {
      // error
    });
  };


  handleContinue = () => {
    const {image} = this.state;
    // TODO: Send to some database or some shit
    // TODO: handle if it does not exist
    this.props.navigation.navigate('Services');
  };

  render() {
    const imageContent = !this.state.file ? (
    <View>
      <View style={styles.imageContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>UPLAOD FILE</Text>
      </View>
      <Text style={{marginTop:10}}>No File Chosen</Text>
      </View>
    ) : (
        <View>
        <View style={styles.imageContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>UPLOAD DIFFERENT FILE</Text>
      </View>
      <Text style={{marginTop:10}}>File name: {this.state.file.name}</Text>
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
        {
          this.state.file ? (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('lightgray')}
              onPress={this.viewFile}>
              <View style={styles.imageContainer}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>OPEN FILE</Text>
              </View>

            </TouchableNativeFeedback>
          ): (
            null
          )
        }
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
