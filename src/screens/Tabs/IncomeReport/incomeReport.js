import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';

import { styles } from "./style";
import Header from "../../../Components/custom/Header";
import Label from "../../../Components/core/Label";
import Row from "../../../Components/core/Row";
import { Calender, Countries } from "../../../assets/svgs";
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Bold from "../../../Components/core/bold";
import Radio from "../../../Components/core/radio";
import { Dimensions } from 'react-native';
 
import ShowData from "../../../Components/custom/showData";
import PieChart from 'react-native-pie-chart';
import { colorsTheme } from "../../../Services/Color";

const IncomeReport = ({ navigation }) => {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [type1, setType1] = useState(true);
    const [type2, setType2] = useState(false);
    const screenWidth = Dimensions.get('window').width;

     
    const widthAndHeight = 250
    const series = [72, 14, 28, 36]
    const sliceColor = [colorsTheme.primary, '#ffb300', 'green', '#ff6c00',]



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        // const year = currentDateget.getUTCFullYear();
        //     const month = String(currentDateget.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        //     const day = String(currentDateget.getUTCDate()).padStart(2, '0');
    };
    const onTypeClick = (v) => {


        if (v == 1) {
            setType1(true);
            setType2(false);
        }
        if (v == 2) {
            setType1(false);
            setType2(true);
        }
    }


    return (
        <ScrollView style={styles.main}>
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
            <Row style={styles.statusRow}>
                <View style={styles.oneside}>
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Football', value: 'football' },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },
                        ]}
                    />
                </View>
                <View style={styles.oneside}>
                    <TouchableOpacity onPress={() => setShow(true)}>
                        <Row style={{ alignItems: 'center' }}>
                            <Label label={date.toString()} size={12} />
                            <Calender />
                        </Row>

                    </TouchableOpacity>
                </View>

            </Row>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            <Bold label="Income Report" size={24} color='black' />
            <View style={styles.salesContainer}>
                <Label label="Income Details" size={12}/>
                <Label label="Income data" size={10} color="grey"/>
                
                <ScrollView horizontal={true}>


                 
          
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.70}
            coverFill={'white'}
          />

                </ScrollView>
            </View>
           

             



             

        </ScrollView >
    )
}
export default IncomeReport;