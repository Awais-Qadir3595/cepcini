import {StyleSheet} from 'react-native';
import { BaseColor } from '../../../config/theme';

const styles = StyleSheet.create({
  cross: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: BaseColor.primary,
    borderRadius: 3,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  drawerModal: {
    margin: 0,
    // justifyContent: 'flex-start',
  },
  drawerContainer: {
    height: '95%',
    // backgroundColor: BaseColor.whiteColor,
    margin: 10,
  },
  main: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    // paddingVertical:20
  },
  heading: {
    alignSelf: 'center',
  },
  dateTime: {
    width: '70%',
    alignSelf: 'center',
    marginVertical: 20,
    alignItems: 'center',
  },
  txt: {
    alignSelf: 'center',
    marginVertical: 5,
  },
  rwHead: {
    padding: 5,
    backgroundColor: 'smoke',
  },
  line: {
    marginVertical: 10,
  },
  rowData: {
    borderBottomWidth: 0.3,
    paddingVertical: 10,
    borderColor: 'grey',
    alignItems: 'center',
  },
  lowerView: {
    marginTop: 70,
  },
  rowLower: {
    marginVertical: 5,
    alignItems: 'center',
  },
  rightRound:{
    height:50,width:50,backgroundColor:'grey',borderRadius:25,
    position:'absolute', right:-50, top:'63%'
},
leftRound:{
    height:50,width:50,backgroundColor:'grey',borderRadius:25,
    top:'63%',left:-50,position:'absolute',
},
middle:{
  marginTop:20
},
thankyou:{
  alignSelf:'center',marginVertical:10
}
});
export {styles};
