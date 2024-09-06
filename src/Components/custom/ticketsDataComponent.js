import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Row from '../core/Row'
import Label from '../core/Label'
import { DeleteIcon, EditIcon } from '../../assets/svgs'
import moment from 'moment'

export default function TicketsDataComponent({id,date,tAmount,user,type}) {
  return (
    <Row style={styles.main}>
        <View style={styles.viewId}>
        <Label label={id} size={12}/>
        </View>
        <View style={styles.viewName}>
        <Label label={moment(date).format('YYYY-MM-DD')} size={10}/>
        </View>
        
        <View style={styles.viewId}>
        <Label label={user} size={12}/>
        </View>

        <View style={styles.viewName}>
        <Label label={tAmount} size={10}/>
        </View>

        <Row style={styles.icons}>
            <Label label={type} size={10}/>
        {/* <EditIcon/>
        <DeleteIcon/> */}
        </Row>
        <View>
            
        </View>
        
    </Row>
  )
}

const styles = StyleSheet.create({
    main:{
        alignItems:'center',padding:5,marginVertical:5,borderBottomWidth:0.2,borderColor:'grey'
    },
    viewId:{
        width:'15%',justifyContent:'center',alignItems:'center'
    },
    icons:{
         width:'20%', paddingHorizontal:5,alignItems:'center',justifyContent:'center'
    },
    viewName:{
        width:'20%', alignItems:'center',justifyContent:'center'
    }
})