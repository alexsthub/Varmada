import React from 'react';
import {StyleSheet, View} from 'react-native';
import Hero from '../components/mainScreen/Hero';
import SearchBar from '../components/mainScreen/SearchBar';
import SearchButton from '../components/mainScreen/SearchButton';
import {faMapMarker, faSlidersH} from '@fortawesome/free-solid-svg-icons';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePress = () => {
    this.props.navigation.navigate('LoginScreen');
  };

  render() {
    return <View style={{flex: 1}}></View>;
  }
}
