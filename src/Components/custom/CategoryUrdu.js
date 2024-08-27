import React from "react";
import { StyleSheet, Text } from "react-native";

const CatUrdu = ({
    label = '',
    size = 16,
    style,
    color = 'gray',
    fontFamily = 'Jameel Noori Nastaleeq Kasheeda'
}) => {
    return (

        <Text style={{
             fontSize: size, color: color, 
             ...style, 
             fontFamily:fontFamily
        }}>{label}</Text>

    )
}
export default CatUrdu;
const styles = StyleSheet.create({
     
})