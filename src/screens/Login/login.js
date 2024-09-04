import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {CheckboxEmpty, Logo} from '../../assets/svgs';
import Bold from '../../Components/core/bold';
import Label from '../../Components/core/Label';
import PrimaryTextInput from '../../Components/core/PrimaryTextInput';
import Row from '../../Components/core/Row';
import PrimaryButton from '../../Components/core/button';
import {Axios_Post_data} from '../../hooks/axiosCode';
import {ROUTES} from '../../hooks/ROUTES';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import {Checkbox} from '../../Components';

const Login = ({navigation}) => {
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remMe, setRemMe] = useState(false);

  useEffect(() => {
    getRememberMe();
  }, []);

  const getRememberMe = async () => {
    const temp = await AsyncStorage.getItem('@RememberMe');
    setRemMe(temp === 'true' ? true : false);
    const userInfo = await AsyncStorage.getItem('@LoginCred');
    const user = userInfo != null ? JSON.parse(userInfo) : null;
    if (user !== null) {
      setEmail(user?.email);
      setPassword(user?.password);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    console.log(email, password);
    // setLoading(true);
    if (email == '') {
      console.log('email empty');
      setIsLoading(false);
      //   Toast.show('Please enter email!');
      //   setLoading(false);
    } else if (password == '') {
      console.log('email empty');
      setIsLoading(false);
      //   Toast.show('Please enter password!');
      //   setLoading(false);
    } else {
      let data = await Axios_Post_data(
        {
          email: email,
          password: password,
        },
        ROUTES.userlogin,
      );
      if (data.success) {
        setIsLoading(false);
        console.log(data.success);
        global.user = data;
        const user = JSON.stringify(data);
        await AsyncStorage.setItem('@UserData', user);
        await AsyncStorage.setItem('@isLoggedIn', 'true');
        if (remMe) {
          const jsonValue = JSON.stringify({
            email: email,
            password: password,
          });
          await AsyncStorage.setItem('@LoginCred', jsonValue);
        } else {
          await AsyncStorage.setItem('@LoginCred', null);
        }
        navigation.navigate('MyTabs');
        //   setLoading(false);
        //   global.userData = data.data;
        //   const jsonValue = JSON.stringify(data?.data);
        //   await AsyncStorage.setItem('userData', jsonValue);
        //   navigation.replace(COMMON.MY_TABS);
      } else {
        console.log('mmmm');

        console.log(data);

        setIsLoading(false);
        // Toast.show(data.message);
      }
      //   }
    }
  };

  const onRememberMe = async () => {
    if (remMe) {
      setRemMe(false);
      await AsyncStorage.setItem('@RememberMe', `false`);
    } else {
      setRemMe(true);
      await AsyncStorage.setItem('@RememberMe', `true`);
    }
  };

  return (
    <View style={styles.main}>
      <Logo style={styles.logo} />
      <Countries style={styles.countries} />
      <View>
        <Bold label="Welcome to Cepcini! 👋" size={26} color="#212B36" />
        <Label size={13} label="Get started by signing Up / Logging In" />
      </View>

      <View style={styles.lowerView}>
        <View style={styles.field}>
          <Bold label="Email" size={16} />
          <PrimaryTextInput
            style={styles.inputText}
            placeholder="John.doe@example.com"
            onChangeText={v => setEmail(v)}
          />
        </View>
        <View style={styles.field}>
          <Row>
            <Bold label="Password" size={16} />
            <Label label="Forgot Password" size={16} color="#008C87" />
          </Row>
          <PrimaryTextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="********"
            onChangeText={v => setPassword(v)}
          />
        </View>
        <View style={styles.checkBox}>
          <Checkbox check={remMe} label={'Remember me'} func={onRememberMe} />
        </View>
      </View>
      <View>
        <PrimaryButton
          label="Login"
          color={'white'}
          bgColor={'#000000'}
          width={'100%'}
          height={57}
          onclick={() => handleLogin()}
        />

        <Row style={styles.createAccount}>
          <Label label="New on our platform?" size={15} />

          <TouchableOpacity onPress={() => console.log('mmmm')}>
            <Label label="  Create An Account" color="#008C87" size={15} />
          </TouchableOpacity>
        </Row>
      </View>
    </View>
  );
};
export default Login;
