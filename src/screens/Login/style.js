import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    // justifyContent: 'space-evenly',
  },
  logo: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  countries: {
    alignSelf: 'flex-end',
  },
  lowerView: {
    marginVertical: 10,
  },
  inputText: {
    height: 55,
    borderColor: '#9BA6A7',
    borderWidth: 0.3,
    borderRadius: 8,
  },
  field: {
    marginVertical: 5,
  },
  checkBox: {
    flexDirection: 'row',
  },
  rightText: {
    marginLeft: 10,
  },
  createAccount: {
    alignItems: 'center',
    alignSelf: 'center',
  },
});
export {styles};
