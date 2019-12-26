import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import SwitchToggle from '@dooboo-ui/native-switch-toggle';

export default class NotificationSettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdates: false,
      showPromos: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.settingsContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.textContainer}>
                <Text style={{fontSize: 20}}>Return Updates</Text>
                <Text style={{color: 'gray'}}>
                  Keep updated with the status of your package
                </Text>
              </View>

              <View style={styles.switchView}>
                <SwitchToggle
                  disabled={!this.state.showNotifcations}
                  switchOn={this.state.showUpdates}
                  onPress={() =>
                    this.setState({
                      showUpdates: !this.state.showUpdates,
                    })
                  }
                  circleColorOff={'white'}
                  circleColorOn={'black'}
                  backgroundColorOff={'lightgray'}
                  backgroundColorOn={'#F8B500'}
                  containerStyle={styles.switchContainer}
                />
              </View>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.textContainer}>
                <Text style={{fontSize: 20}}>Promotions and News</Text>
                <Text style={{color: 'gray'}}>
                  Learn more about promotions and new features
                </Text>
              </View>

              <View style={styles.switchView}>
                <SwitchToggle
                  disabled={!this.state.showNotifcations}
                  switchOn={this.state.showPromos}
                  onPress={() =>
                    this.setState({
                      showPromos: !this.state.showPromos,
                    })
                  }
                  circleColorOff={'white'}
                  circleColorOn={'black'}
                  backgroundColorOff={'lightgray'}
                  backgroundColorOn={'#F8B500'}
                  containerStyle={styles.switchContainer}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchContainer: {
    width: 70,
    borderRadius: 30,
    padding: 5,
  },
  settingsContainer: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    paddingLeft: 10,
  },
  switchView: {
    paddingRight: 10
  }
});
