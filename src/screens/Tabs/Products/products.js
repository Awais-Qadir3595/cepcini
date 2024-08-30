import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';

import { styles } from "./style";
import Header from "../../../Components/custom/Header";
import Row from "../../../Components/core/Row";
import { BackIcon } from "../../../assets/svgs";
import Label from "../../../Components/core/Label";
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calender, Countries } from "../../../assets/svgs";
import Bold from "../../../Components/core/bold";
import { colorsTheme } from "../../../Services/Color";
import PrimaryTextInput from "../../../Components/core/PrimaryTextInput";
import ProductsData from "../../../Components/custom/ProductsData";
const Products = ({ navigation }) => {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    return (
        <ScrollView style={styles.main}>
            <Row style={styles.rw}>
                <BackIcon />
                <Label label="Products Detail" size={20} style={styles.heading} />

            </Row>
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
            <Bold label="Dashboard" size={24} color='black' />
            <Label label="Products / Products List" size={14} color="grey" style={styles.subheading} />
            <PrimaryTextInput rightIcon="SearchIcon"
                placeholder="search"
                style={styles.searchBox} />


            <Row style={styles.headingdata}>

                <View style={styles.v1}>
                    <Label label="ID" size={10} />
                </View>

                <View style={{ width: '20%',  }}>
                    <Label label="Name" size={10} />
                </View>

                <View style={{ width: '20%',  }}>
                    <Label label="Group code" size={10} />

                </View>
                <View style={styles.v1}>
                    <Label label="Price" size={10} />

                </View>
                <View style={{ width: '20%',  }}>
                    <Label label="Action" size={10} />

                </View>
            </Row>

            <ProductsData id={1} name='Toasted Bagel Jam' groupCode={'breakfast'} price={456} />
            <ProductsData id={1} name='Toasted Bagel Jam' groupCode={'breakfast'} price={456} />
            <ProductsData id={1} name='Toasted Bagel Jam' groupCode={'breakfast'} price={456} />
            <ProductsData id={1} name='Toasted Bagel Jam' groupCode={'breakfast'} price={456} />
            <ProductsData id={1} name='Toasted Bagel Jam' groupCode={'breakfast'} price={456} />




        </ScrollView>
    )
}
export default Products;