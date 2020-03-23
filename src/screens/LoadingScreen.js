import React from 'react';
import {ActivityIndicator, View, StatusBar} from 'react-native';
import {Auth} from 'aws-amplify';

export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: {}};
  }

  componentDidMount = async () => {
    StatusBar.setHidden(true);
    try {
      await Auth.currentAuthenticatedUser();
      this.props.navigation.navigate('Main');
    } catch (err) {
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator animating={true} size={'large'} color={'#000000'} />
      </View>
    );
  }
}
