import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colorsTheme } from '../../Services/Color'
import Label from './Label'

export default function Radio({ selected, label = '',onClick }) {
     
    
    return (
        <TouchableOpacity style={styles.main} onPress={onClick}>
            <View style={{ ...styles.radio, backgroundColor: selected ? colorsTheme.primary : 'white' }}>

            </View>
            <Label label={label} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row', alignItems: 'center',marginHorizontal:10,marginVertical:10
    },
    radio: {
        width: 10, height: 10, borderRadius: 20, borderColor: colorsTheme.primary, borderWidth: 1, marginHorizontal: 5
    }
})