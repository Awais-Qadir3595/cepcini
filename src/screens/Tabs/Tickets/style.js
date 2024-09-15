import {StyleSheet} from 'react-native';
import {colorsTheme} from '../../../Services/Color';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  heading: {
    justifyContent: 'center',
  },
  rw: {
    alignItems: 'center',
    width: '70%',
    marginVertical: 10,
  },
  statusRow: {
    alignItems: 'center',
    marginVertical: 10,
  },
  statusValue: {
    padding: 5,
    borderRadius: 34,
    borderWidth: 1,
    borderColor: 'red',
    marginLeft: 10,
    paddingHorizontal: 20,
  },
  branchRow: {
    alignItems: 'center',
  },
  oneside: {
    width: '49%',
  },
  subheading: {
    marginVertical: 5,
  },
  detailContainer: {
    borderWidth: 0.5,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
  },
  Rowdetail: {
    alignItems: 'center',
    marginVertical: 5,
  },
  orderContainer: {
    borderWidth: 0.5,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
  },
  rowclose: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchBox: {
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    height: 40,
  },
  dropDown: {
    width: '35%',
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  v1: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingdata: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'rgba(70, 74, 83, 0.07)',
  },
  lowerView: {
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 0.4,
    padding: 10,
    borderRadius: 10,
  },
  noDate: {
    alignSelf: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: colorsTheme.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
export {styles};
