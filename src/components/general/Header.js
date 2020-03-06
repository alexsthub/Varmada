import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
  render() {
    return (
      <View style={[styles.headerContainer, this.props.containerStyle]}>
        <Text style={[styles.header, this.props.headerStyle]}>
          {this.props.headerText}
        </Text>
        <Text style={[styles.subHeader, this.props.subHeaderStyle]}>
          {this.props.subHeaderText}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 60,
  },
  header: {fontSize: 14, fontWeight: 'bold'},
  subHeader: {fontSize: 23, fontWeight: 'bold'},
});

Header.propTypes = {
  headerText: PropTypes.string,
  subHeaderText: PropTypes.string,
  containerStyle: PropTypes.object,
  headerStyle: PropTypes.object,
  subHeaderStyle: PropTypes.object,
};

Header.defaultProps = {
  headerText: 'Main text',
  headerText: 'Subtext',
  containerStyle: {},
  headerStyle: {},
  subHeaderStyle: {},
};
