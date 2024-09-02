import React from 'react';
import {View, Image} from 'react-native';
import {Logo, SplashData, SplashLogo} from '../../assets/svgs';
import {styles} from './style';
import PrimaryButton from '../../Components/core/button';

const Splash = ({navigation}) => {
  return (
    <View style={styles.main}>
      <Logo />

      {/* <SplashLogo /> */}
      {/* <SplashData/> */}
      <Image
        style={{height: 300, width: 300}}
        source={require('../../assets/images/Illustration.png')}
      />

      <PrimaryButton
        label="Get Started"
        color={'white'}
        bgColor={'#000000'}
        width={'95%'}
        height={57}
        onclick={() => navigation.navigate('Login')}
      />
    </View>
  );
};
export default Splash;
