import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  background: {
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'gray'
  },
  inputDivider: {
    marginVertical: 10,
  },
  clickableText: {
    color: 'white',
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
    flexWrap: 'wrap'
  },
  highlightText: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  // ValidateScreen Unique
  highlightText: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  digitContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
});

export default styles;