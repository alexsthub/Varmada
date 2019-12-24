import React from 'react';
import {View} from 'react-native';

import FloatingInput from '../../components/general/FloatingInput';
import CustomButton from '../../components/general/CustomButton';

export default class EditFieldScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      firstName: this.props.navigation.getParam('fName', 'default'),
      lastName: this.props.navigation.getParam('lName', 'default')
    };
  }

  handleSaveFields = () => {
    // TODO: Save field
    console.log('Saved!');
  }

  render() {
    return (
      <View style={{marginTop: 100, flex: 1, marginHorizontal: 40}}>
        <FloatingInput
          ref={r => (this.first = r)}
          value={this.state.firstName}
          label={'First Name'}
          labelColorBlur={'#000000'}
          rgbaBackgroundColorBlur={'rgba(247,247,247,0.6)'}
          rgbaBackgroundColorFocus={'rgba(230,230,230,1)'}
          onChangeText={(text) => this.setState({firstName: text})}
          onSubmitEditing={() => this.last.getInnerRef().focus()}
        />

        <View style={{marginVertical: 10}} />

        <FloatingInput
          ref={r => (this.last = r)}
          value={this.state.lastName}
          label={'Last Name'}
          labelColorBlur={'#000000'}
          rgbaBackgroundColorBlur={'rgba(247,247,247,0.6)'}
          rgbaBackgroundColorFocus={'rgba(230,230,230,1)'}
          onChangeText={(text) => this.setState({lastName: text})}
          onSubmitEditing={this.handleSaveFields}
        />

        <View style={{marginTop: 30}} />

        <CustomButton
          text={'Save'}
          onPress={this.handleSaveFields}
          textStyle={{color: '#000000'}}
          buttonStyle={{elevation: 10}}
        />
      </View>
    );
  }
}
