import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LeftNavButton from '..//leftNav/leftNavButton';
import PropTypes from 'prop-types';

export default class NavScreenHeader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <LeftNavButton navigation={this.props.navigation} />
        </View>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuContainer: {
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24
  }
})

NavScreenHeader.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.string
};

NavScreenHeader.defaultProps = {
  navigation: {},
  title: ''
}
