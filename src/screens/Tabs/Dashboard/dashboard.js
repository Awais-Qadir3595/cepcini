import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';

import { styles } from "./style";
import Header from "../../../Components/custom/Header";
import Label from "../../../Components/core/Label";
import Row from "../../../Components/core/Row";
import { Countries } from "../../../assets/svgs";
import RNPickerSelect from 'react-native-picker-select';

const Dashboard = ({ navigation }) => {



    return (
        <View style={styles.main}>
            <Header name='John Aly' />
            <Row style={styles.statusRow}>

                <Row style={styles.statusRow}>
                    <Label label="Status" size={14} color="grey" />
                    <View style={styles.statusValue}>
                        <Label label="Offline" size={9} color="red" />
                    </View>
                </Row>
                <Countries />
            </Row>

            <Row style={styles.branchRow}>
                <View style={styles.oneside}>
                    <Label label="Branch" color="grey" />
                </View>
                <View style={styles.oneside}>
                    <Label label="Date" color="grey" />
                </View>
            </Row >
          
                <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    items={[
                        { label: 'Football', value: 'football' },
                        { label: 'Baseball', value: 'baseball' },
                        { label: 'Hockey', value: 'hockey' },
                    ]}
                />

                
                

            

        </View >
    )
}
export default Dashboard;