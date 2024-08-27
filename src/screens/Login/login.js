import React from "react";
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import { styles } from "./style";
import { CheckboxEmpty, Countries, Logo } from "../../assets/svgs";
import Bold from "../../Components/core/bold";
import Label from "../../Components/core/Label";
import PrimaryTextInput from "../../Components/core/PrimaryTextInput";
import Row from "../../Components/core/Row";
import PrimaryButton from "../../Components/core/button";
const Login = ({ navigation }) => {

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
                    <PrimaryTextInput style={styles.inputText} placeholder="John.doe@example.com" />
                </View>
                <View style={styles.field}>
                    <Row>
                        <Bold label="Password" size={16} />
                        <Label label="Forgot Password" size={16} color="#008C87" />

                    </Row>
                    <PrimaryTextInput style={styles.inputText} placeholder="John.doe@example.com" />
                </View>
                <Row style={styles.checkBox}>
                    <CheckboxEmpty />
                    <Label label="Remember me" style={styles.rightText} />
                </Row>
            </View>
            <View>
                <PrimaryButton label="Login" color={'white'} bgColor={'#000000'} width={'100%'} height={57}
                    onclick={() => navigation.navigate('MyTabs')} />



               

                    <Row style={styles.createAccount}>
                        <Label label="New on our platform?" size={15}/>
                        
                    
                    <TouchableOpacity onPress={() => console.log('mmmm')
                    }>
                       <Label label="  Create An Account" color="#008C87" size={15}/>
                    </TouchableOpacity>
                    </Row>
            </View>

        </View>
    )
}
export default Login;