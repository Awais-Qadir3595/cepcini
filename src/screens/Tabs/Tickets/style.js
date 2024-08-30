import { StyleSheet } from "react-native";
const styles=StyleSheet.create({

    main:{
        flex:1, backgroundColor:'white',padding:10,
    },
    heading:{
        justifyContent:'center'
    },
    rw:{
        alignItems:'center',width:'70%',marginVertical:10
    },
    statusRow: {
        alignItems: 'center', marginVertical: 10
    },
    statusValue: {
        padding: 5, borderRadius: 34, borderWidth: 1, borderColor: 'red', marginLeft: 10, paddingHorizontal: 20
    },
    branchRow: {
        alignItems: 'center',
    },
    oneside: {
        width: '50%'
    },
    subheading:{
        marginVertical:5
    },
    detailContainer:{
        borderWidth:0.5,borderColor:'grey',padding:10,borderRadius:10,marginVertical:8
    },
    Rowdetail: {
        alignItems: 'center', marginVertical: 5
    },
    orderContainer:{
        borderWidth:0.5,borderColor:'grey',padding:10,borderRadius:10,marginVertical:8
    },
    rowclose:{
        justifyContent:'flex-start',alignItems:'center'
    }
})
export {styles};