import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  background: {
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 60,
  },
  inputDivider: {
    marginVertical: 20,
  },
  clickableText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signUpContainer: {
    position: 'absolute',
    bottom: 15,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  // SignUpScreen Unique
  noticeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  highlightText: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  // ValidateScreen Unique
  digitContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
});

export default styles;
