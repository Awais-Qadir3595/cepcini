import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './style';
import {Countries, Logo} from '../../assets/svgs';
import Bold from '../../Components/core/bold';
import Label from '../../Components/core/Label';
import PrimaryTextInput from '../../Components/core/PrimaryTextInput';
import Row from '../../Components/core/Row';
import PrimaryButton from '../../Components/core/button';
import {LOGIN} from '../../hooks/ROUTES';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import {Checkbox, Text} from '../../Components';
import {useIsFocused} from '@react-navigation/native';
import {useIsConnected} from 'react-native-offline';
import {isValidEmail} from '../../utils/validation';
import axios from 'axios';

const Login = ({navigation}) => {
  const toast = useToast();
  const isFocused = useIsFocused();
  let isConnected = useIsConnected();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remMe, setRemMe] = useState(false);
  const [eyeClick, setEyeClick] = useState(true);

  useEffect(() => {
    getRememberMe();
  }, [isFocused]);

  const getRememberMe = async () => {
    const temp = await AsyncStorage.getItem('@RememberMe');
    setRemMe(temp === 'true' ? true : false);
    const userInfo = await AsyncStorage.getItem('@LoginCred');
    const user = userInfo != null ? JSON.parse(userInfo) : null;

    if (user) {
      setEmail(user?.email);
      setPassword(user?.password);
    }
  };

  const handleLogin = async () => {
    if (isConnected) {
      setIsLoading(true);

      if (email == '') {
        setIsLoading(false);
        toast.hideAll();
        toast.show('Please enter email!');
      } else if (password == '') {
        setIsLoading(false);
        toast.hideAll();
        toast.show('Please enter password!');
      } else {
        const url = LOGIN;
        axios({
          method: 'POST',
          url: url,
          data: {
            email: email,
            password: password,
          },
          headers: {
            Authorization: 'Bearer ' + global?.userData?.token,
          },
        })
          .then(async resp => {
            const data = resp?.data;
            console.log('entered   -----');

            console.log(data.success);

            if (data?.success) {
              setIsLoading(false);

              global.user = data;
              global.impData = {
                startDate: new Date(),
                endDate: new Date(),
                branch: data?.data?.user?.client?.branches[0],
                branchKey: global?.user?.data?.user?.client?.branches[0]?.key,
                branchStatus: null,
              };
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
                await AsyncStorage.removeItem('@LoginCred');
              }
              toast.hideAll();
              toast.show('Login Successful');
              navigation.replace('MyTabs');
            } else {
              // toast.hideAll();
              toast.show('Something went wrong');
              setIsLoading(false);
            }
          })
          .catch(e => {
            console.log(e);
            toast.hideAll();
            toast.show('Something went wrongss');
            setIsLoading(false);
          });
      }
    } else {
      toast.hideAll();
      toast.show('No Internet Connected!');
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
    <ScrollView style={styles.main}>
      <Logo style={styles.logo} />
      <Countries style={styles.countries} />
      <View style={{marginTop: 10}}>
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
            inputValue={email}
          />
          {!isValidEmail(email) && (
            <Text iserror caption1>
              {'Not Valid Email'}
            </Text>
          )}
        </View>
        <View style={styles.field}>
          <Row>
            <Bold label="Password" size={16} />
            <Label label="Forgot Password" size={16} color="#008C87" />
          </Row>
          <PrimaryTextInput
            secureTextEntry={eyeClick}
            style={styles.inputText}
            placeholder="********"
            onChangeText={v => setPassword(v)}
            inputValue={password}
            onEyeClick={() => setEyeClick(!eyeClick)}
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
          loading={isLoading}
          disabled={isLoading || password.length < 3 || !isValidEmail(email)}
        />

        <Row style={styles.createAccount}>
          <Label label="New on our platform?" size={15} />

          <TouchableOpacity onPress={() => console.log('mmmm')}>
            <Label label="  Create An Account" color="#008C87" size={15} />
          </TouchableOpacity>
        </Row>
      </View>
    </ScrollView>
  );
};
export default Login;
