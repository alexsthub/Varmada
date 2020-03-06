import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 40,
  },

  title: {
    textAlign: 'center',
    fontSize: 30
  },

  grid: {
    height: 450
  },

  carrier: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 0.5,
    flexDirection: "row",
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },

  checkbox: {
    flex: 1
  },

  image: {
    flex: 5,
    height: 140,
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: "white"
  }

});

export default styles;