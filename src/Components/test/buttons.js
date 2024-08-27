//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const Button = ({setEditValue,v}) => {

    const increment=()=>{
        setEditValue(v+1);
    }

    const decrement=()=>{
        setEditValue((i)=>{
            return(i-1)
        });
    }
    return (
        <View style={styles.container}>
           <TouchableOpacity onPress={increment}>
            <Text style={{fontSize:44,backgroundColor:'pink',padding:10,margin:5}}>+</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={decrement}>
            <Text style={{fontSize:44,backgroundColor:'blue',padding:10,margin:5,color:'white'}}>-</Text>
           </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
});

//make this component available to the app
export default Button;
