import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import SwitchToggle from '@dooboo-ui/native-switch-toggle';

// TODO: Better spacing
export default class NotificationSettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotifcations: false,
      showUpdates: false,
      showPromos: false,
    };
  }
  render() {
    // Switch toggle needs a padding or else it breaks
    return (
      <View style={styles.container}>
        <View style={styles.switchRowContainer}>
          <View>
            <Text style={styles.switchTitle}>Mute Notifications</Text>
            <Text>{this.state.showNotifcations ? 'On' : 'Off'}</Text>
          </View>
          <SwitchToggle
            switchOn={this.state.showNotifcations}
            onPress={() =>
              this.setState({showNotifcations: !this.state.showNotifcations})
            }
            circleColorOff={'white'}
            circleColorOn={'black'}
            backgroundColorOff={'lightgray'}
            backgroundColorOn={'#F8B500'}
            containerStyle={{
              width: 80,
              borderRadius: 30,
              padding: 5,
            }}
          />
        </View>

        <View style={{alignItems: 'center'}}>
          <View style={styles.subSettingsContainer}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <View>
                <Text style={{fontSize: 20}}>Return Updates</Text>
                <Text style={{color: 'gray'}}>
                  Keep updated with the status of your package
                </Text>
              </View>

              <SwitchToggle
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
                containerStyle={{
                  width: 60,
                  borderRadius: 30,
                  padding: 5,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <View>
                <Text style={{fontSize: 20}}>Promotions and News</Text>
                <Text style={{color: 'gray'}}>
                  Learn more about promotions and new features
                </Text>
              </View>
              
              <SwitchToggle
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
                containerStyle={{
                  width: 60,
                  borderRadius: 30,
                  padding: 5,
                }}
              />

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
  switchRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  switchTitle: {
    fontSize: 20,
  },
  subSettingsContainer: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
});
