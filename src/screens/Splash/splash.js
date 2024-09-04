import React from 'react';
import {View, Image} from 'react-native';
import {Logo} from '../../assets/svgs';
import {styles} from './style';
import PrimaryButton from '../../Components/core/button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  const onGetStarted = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('@isLoggedIn');
      const userInfo = await AsyncStorage.getItem('@UserData');
      const user = userInfo != null ? JSON.parse(userInfo) : null;
      global.user = user;
      navigation.replace(isLoggedIn === 'true' ? 'MyTabs' : 'Login');
    } catch (e) {
      console.log('No Data Available', e);
    }
  };
  return (
    <View style={styles.main}>
      <Logo />

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
        onclick={onGetStarted}
      />
    </View>
  );
};
export default Splash;
