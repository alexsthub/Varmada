import React from 'react';
import {ImageBackground, FlatList, StyleSheet, View, Text} from 'react-native';
// import CustomButton from '../components/general/CustomButton';
// import CustomButton from '../components/general/CustomButton';
// import LeftNavButton from '../components/leftNav/leftNavButton';
// import NavScreenHeader from '../../components/general/NavScreenHeader';
// import styles from '../constants/styles/loginStyles';
import styles from '../../constants/styles/loginStyles';

export default class MyPickupScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ImageBackground
        source={require('../../assets/loginGradient.jpg')}
        style={styles.background}>

      <View style={stylesA.container}>
        <FlatList
          data={[
            {key: 'Shoes'},
            {key: 'Other Bullshit'},
            {key: 'Toys'},
          ]}
          renderItem={({item}) => <Text style={stylesA.item}>{item.key}</Text>}
        />
      </View>
      </ImageBackground>
    );
  }
  // render() {
  //   return (
  //     <View style={{flex: 1}}>
  //       <Text> Hi </Text>
  //       <LeftNavButton navigation={this.props.navigation} />
  //     </View>
  //   );
  // }
}

const stylesA = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'white',
  }
})





// import React from 'react';
// import {StyleSheet, View, Text} from 'react-native';
// import NavScreenHeader from '../../components/general/NavScreenHeader';

// export default class MyPickupScreen extends React.Component {
//   render() {
//     return (
//       <View>
//         <NavScreenHeader navigation={this.props.navigation} title={'My Pickups'}/>
//       </View>
//     );
//   }
// }