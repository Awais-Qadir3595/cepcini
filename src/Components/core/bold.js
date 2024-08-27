import React from "react";
import { StyleSheet, Text } from "react-native";

const Bold = ({
    label = '',
    size = 16,
    style,
    color = 'gray',
  
}) => {
    return (

        <Text style={{
             fontSize: size, color: color, 
             ...style, 
            fontWeight:'bold'
        }}>{label}</Text>

    )
}
export default Bold;
const styles = StyleSheet.create({
     
})