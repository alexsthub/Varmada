import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  FlatList,
} from 'react-native';

import Header from '../../components/general/Header';

const packageList = [
  {
    name: 'Bubble Mailer - Size 0',
    dimensions: '6" x 9"',
    price: 1.5,
  },
  {
    name: 'Bubble Mailer - Size 1',
    dimensions: '7 1/4" x 11 1/8"',
    price: 1.75,
  },
  {
    name: 'Bubble Mailer - Size 2',
    dimensions: '8 1/2" x 11 1/8"',
    price: 2.0,
  },
  {
    name: 'Bubble Mailer - Size 3',
    dimensions: '8 1/2" x 14 1/2"',
    price: 2.25,
  },
  {
    name: 'Bubble Mailer - Size 4',
    dimensions: '9 1/2" x 14 1/2"',
    price: 2.5,
  },
  {
    name: 'Bubble Mailer - Size 5',
    dimensions: '10 1/2" x 15"',
    price: 2.75,
  },
];

export default class RequestPackage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // TODO: Return this to the previous
  handlePress = (e, index) => {
    console.log(packageList[index]);
  };

  render() {
    return (
      <View style={{marginHorizontal: 40, flex: 1}}>
        <Header
          headerText={'Request a pickup'}
          subHeaderText={'Select a container'}
        />

        <View style={styles.listContainer}>
          <FlatList
            data={packageList}
            renderItem={({item, index}) => (
              <Packaging
                title={item.name}
                dimensions={item.dimensions}
                price={item.price}
                onPress={(e, index) => this.handlePress(e, index)}
                index={index}
              />
            )}
            ItemSeparatorComponent={() => <View style={{marginVertical: 8}} />}
            keyExtractor={item => item.name}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 20,
    marginTop: 20,
    flex: 1,
  },
});

class Packaging extends React.Component {
  render() {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('lightgray')}
        onPress={e => this.props.onPress(e, this.props.index)}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 15,
            backgroundColor: 'green',
          }}>
          <View>
            <Image
              style={{height: 100, width: 100}}
              source={require('../../assets/packaging/mailer.png')}
            />
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: 20,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              {this.props.title}
            </Text>
            <Text>{this.props.dimensions}</Text>
            <Text>{'$' + this.props.price.toString()}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
