import {StyleSheet} from 'react-native';
import {colorsTheme} from '../../../Services/Color';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  statusRow: {
    alignItems: 'center',
    marginVertical: 10,
  },
  statusValue: {
    padding: 5,
    borderRadius: 34,
    borderWidth: 1,
    marginLeft: 10,
    paddingHorizontal: 20,
  },
  branchRow: {
    alignItems: 'center',
  },
  oneside: {
    width: '49%',
  },
  salesContainer: {
    borderWidth: 0.4,
    borderColor: 'grey',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  radio: {
    justifyContent: 'flex-end',
  },
  rw: {
    backgroundColor: '#7A86A117',
    padding: 10,
    marginVertical: 10,
  },
  resultLabel: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});
export {styles};
