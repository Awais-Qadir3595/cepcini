import { StyleSheet } from 'react-native';
import { colorsTheme } from '../../../Services/Color';
const stylesModel = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        width:'95%',alignSelf:'center',
        borderRadius:20
        // paddingVertical:20
    },
    heading: {
        alignSelf: 'center'
    },
    dateTime: {
        width: '70%', alignSelf: "center", marginVertical: 15, alignItems: 'center'
    },
    txt: {
        alignSelf: 'center',  marginTop:10
    },
    rwHead: {
        padding: 5, backgroundColor: 'smoke'
    },
    line: {
        marginVertical: 10
    },
    rowData: {
          borderBottomWidth: 0.3, paddingVertical: 10,borderColor:'grey',
        alignItems:'center'
    },
    lowerView:{
        marginTop:70
    },
    rowLower:{
        marginVertical:5,alignItems:'center'
    },
    rightRound:{
        height:50,width:50,backgroundColor:'grey',borderRadius:25,
        position:'absolute',top:'50%',right:-25
    },
    leftRound:{
        height:50,width:50,backgroundColor:'grey',borderRadius:25,
        position:'absolute',top:'50%',left:-25
    }

});
export { stylesModel };
