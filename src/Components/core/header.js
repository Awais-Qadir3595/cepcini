import React from "react";
import { View, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { colorsTheme } from "../../Services/Color";
import Row from "./Row";
import { BackIcon } from "../../Assets/svgs";
import * as SVG from '../../Assets/svgs';
import Bold from "./bold";
const Header = ({ leftIcon, rightIcon, Title,onRightClick }) => {

    const LeftIcon = SVG[leftIcon];
    const RightIcon = SVG[rightIcon];


    return (
        <View style={styles.main}>
            <Row style={styles.row}>
                {
                    leftIcon ?
                        <LeftIcon /> : <View></View>
                }

                <Bold label={Title} color={'white'} size={18} style={styles.title}/>
                <TouchableOpacity onPress={onRightClick}>
                {
                    rightIcon ?
                        <RightIcon /> : <View></View>
                }
                </TouchableOpacity>
            </Row>
        </View>
    )
}
export default Header;

const styles = StyleSheet.create({
    main: {
        width: '100%',
        backgroundColor: colorsTheme.primary,
        padding: 10,
        marginTop:1

    },
    row:{
        alignItems:'center',
    },
    title:{

    }
})