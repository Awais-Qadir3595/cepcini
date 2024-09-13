import { StyleSheet } from 'react-native';
import { colorsTheme } from '../../../Services/Color';
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        // paddingVertical:20
    },
    heading: {
        alignSelf: 'center'
    },
    dateTime: {
        width: '70%', alignSelf: "center", marginVertical: 20, alignItems: 'center'
    },
    txt: {
        alignSelf: 'center', marginVertical: 5
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
    }

});
export { styles };
