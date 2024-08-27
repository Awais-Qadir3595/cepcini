//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Values = ({valueToShow}) => {
    return (
        <View style={styles.container}>
            <Text style={{color:'black',fontSize:18}}>{valueToShow}</Text>
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
export default Values;
