import React from "react";
import { StyleSheet, Text } from "react-native";

const Label = ({ label = '',

    size = 16,
    style,
    color = 'black',
    fontFamily = 'Jameel Noori Nastaleeq Regular'
}) => {
    return (

        <Text title3 style={{
            fontSize: size,
            color: color, ...style,
            fontFamily: fontFamily
        }}>{label}</Text>
    )
}
export default Label;
const styles = StyleSheet.create({


})