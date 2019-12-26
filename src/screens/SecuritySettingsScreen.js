import React from 'react';
import {StyleSheet, View, TouchableHighlight, Text} from 'react-native';

// TODO: Security
// Two factor auth?
export default class SecuritySettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {TFAuth: false};
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          style={styles.container}
          onPress={() => {}}
          underlayColor={'lightgray'}
          activeOpacity={0.95}>
          <View style={styles.rowContainer}>
            <Text style={styles.titleText}>Two-Factor Authentication</Text>
            <Text style={styles.subtitleText}>
              {this.state.TFAuth ? 'On' : 'Off'}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.noticeContainer}>
          <Text style={styles.subtitleText}>
            With two factor authentication enabled, you will be asked for a
            secondary mode of verification when you sign in to your account.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 18,
    paddingLeft: 15,
  },
  subtitleText: {
    fontSize: 14,
    color: 'gray',
    paddingRight: 25,
  },
  noticeContainer: {
    marginTop: 20,
    marginHorizontal: 20
  },
});
