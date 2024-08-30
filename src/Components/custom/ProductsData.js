import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Row from '../core/Row'
import Label from '../core/Label'
import { DeleteIcon, EditIcon } from '../../assets/svgs'

export default function ProductsData({id,name,groupCode,price}) {
  return (
    <Row style={styles.main}>
        <View style={styles.viewId}>
        <Label label={id} size={12}/>
        </View>
        <View style={styles.viewName}>
        <Label label={name} size={10}/>
        </View>
        <View style={styles.viewName}>
        <Label label={groupCode} size={10}/>
        </View>
        <View style={styles.viewId}>
        <Label label={price} size={12}/>
        </View>
        <Row style={styles.icons}>
        <EditIcon/>
        <DeleteIcon/>
        </Row>
    </Row>
  )
}

const styles = StyleSheet.create({
    main:{
        alignItems:'center',padding:5,marginVertical:5
    },
    viewId:{
        width:'10%',justifyContent:'center'
    },
    icons:{
         width:'20%', paddingHorizontal:5
    },
    viewName:{
        width:'20%', 
    }
})