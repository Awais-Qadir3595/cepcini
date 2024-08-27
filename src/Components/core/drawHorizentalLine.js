import { mvs } from "../../Services/metrices";
import React from "react";
import {StyleSheet,View} from "react-native";
 
const DrawHorizentalLine=({ style,color='gray',width='100%'})=>{
    return(
           
            <View style={{...styles.main,...style,borderBottomColor:color,width:width}}>
               
            </View>
          
    )
}
export default DrawHorizentalLine;
const styles=StyleSheet.create({
    main:{ alignItems:'center',borderBottomWidth:2,marginVertical:3 }
    
})