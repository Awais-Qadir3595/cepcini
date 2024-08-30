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
const Tickets = ({ navigation }) => {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    return (
        <ScrollView style={styles.main}>
            <Row style={styles.rw}>
                <BackIcon />
                <Label label="Tickets Detail" size={20} style={styles.heading} />

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
            <Label label="Tickets / Tickets Details" size={14} color="grey" style={styles.subheading} />


            <View style={styles.detailContainer}>
                <Label label="Miscellaneous Details" size={18} color={colorsTheme.primary} />
                <Row style={styles.Rowdetail}>
                    <View style={styles.oneside}>
                        <Label label="Customer name" />
                    </View>
                    <View style={styles.oneside}>
                        <Label label="Date" />
                    </View>
                </Row>

                <Row style={styles.Rowdetail}>
                    <View style={styles.oneside}>
                        <Label label="John" color="grey" size={15} />
                    </View>
                    <View style={styles.oneside}>
                        <Label label="2/12/2024. 9:30:21 AM" size={15} color="grey" />
                    </View>
                </Row>


                <Row style={styles.Rowdetail}>
                    <View style={styles.oneside}>
                        <Label label="Ticket Id" />
                    </View>
                    <View style={styles.oneside}>
                        <Label label="Table" />
                    </View>
                </Row>

                <Row style={styles.Rowdetail}>
                    <View style={styles.oneside}>
                        <Label label="2345" color="grey" size={15} />
                    </View>
                    <View style={styles.oneside}>
                        <Label label="null" size={15} color="grey" />
                    </View>
                </Row>

                <Label label="Notes" />
                <Label color="grey" size={15} label="Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document " />
            </View>

            <View style={styles.orderContainer}>
                <Label label="Order Details" size={18} color={colorsTheme.primary} />
                <Label label="Herbal tea" />
                <Label label="1.35" size={15} />
                <Row style={styles.rowclose}>
                    <Label label="quantity :" size={15} />
                    <Label label="3" style={{ marginHorizontal: 5 }} size={15} />

                </Row>
                <Row style={styles.rowclose}>
                    <Label label="Portion :" size={15} />
                    <Label label="normal" style={{ marginHorizontal: 5 }} size={15} />

                </Row>
            </View>
            <View style={styles.orderContainer}>
                <Label label="Amount Detail" size={18} color={colorsTheme.primary} />
                <Row style={styles.Rowdetail}>
                    <View style={styles.oneside}>
                        <Label label="Total amount" size={15}  />
                    </View>
                    <View style={styles.oneside}>
                        <Label label="Remaining amount" size={15}  />
                    </View>
                </Row>

                <Row style={styles.Rowdetail}>
                    <View style={styles.oneside}>
                        <Label label="0.78" color="grey" size={15} />
                    </View>
                    <View style={styles.oneside}>
                        <Label label="0.0" color="grey" size={15} />
                    </View>
                </Row>
            </View>

            <View style={{...styles.orderContainer,marginBottom:40}}>
                <Label label="Payments Detail" size={18} color={colorsTheme.primary} />
                <Row style={styles.Rowdetail}>
                    <View style={styles.oneside}>
                        <Label label="Status" size={15} />
                    </View>
                    <View style={styles.oneside}>
                        <Label label="Source" size={15} />
                    </View>
                </Row>

                <Row style={styles.Rowdetail}>
                    <View style={styles.oneside}>
                        <Label label="unpaid" color="grey" size={15} />
                    </View>
                    <View style={styles.oneside}>
                        <Label label="online orders" color="grey" size={15} />
                    </View>
                </Row>
            </View>
        </ScrollView>
    )
}
export default Tickets;