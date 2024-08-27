import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Logo, SplashData } from "../../assets/svgs";
import { styles } from "./style";
import PrimaryButton from "../../Components/core/button";
const Splash = ({navigation}) => {

    return (
        <View  style={styles.main}>
            
            <Logo/>

            {/* <SplashData/> */}
            <Image
        
        source={require('../../assets/images/Illustration.png')}
      />

            <PrimaryButton label="Get Started" color={'white'} bgColor={'#000000'} width={'95%'} height={57}
            onclick={()=>navigation.navigate('Login')}/>
           
        </View>
    )
}
export default Splash;