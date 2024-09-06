import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, FlatList } from 'react-native';

import { styles } from "./style";
import Header from "../../../Components/custom/Header";
import Row from "../../../Components/core/Row";
import { BackIcon, Next, Previous } from "../../../assets/svgs";
import Label from "../../../Components/core/Label";
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calender, Countries } from "../../../assets/svgs";
import Bold from "../../../Components/core/bold";
import { colorsTheme } from "../../../Services/Color";
import PrimaryTextInput from "../../../Components/core/PrimaryTextInput";
import ProductsData from "../../../Components/custom/ProductsData";
import { Axios_Fetch, Axios_Post_data } from "../../../hooks/axiosCode";
import { ROUTES } from "../../../hooks/ROUTES";
import moment from 'moment';
import TicketsDataComponent from "../../../Components/custom/ticketsDataComponent";
const Tickets = ({ navigation }) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [ticketList, setTicketsList] = useState();
    const [paginate, setPaginate] = useState(1);

    const [orderBy, setOrderBy] = useState('desc');
    const [sortBy, setSortBy] = useState('id');
    const [show1, setShow1] = useState(false);
    const [mode, setMode] = useState('date');

    const [pagination, setPagination] = useState(null);
    const selectedTicketsData = [
        { label: 'Open', value: 1 },
        { label: 'Close', value: 2 },

    ];
    const pagesizeList = [
        { label: '10', value: 10 },
        { label: '20', value: 20 },
        { label: '50', value: 50 },

    ];
    const [pageSize, setPageSize] = useState(pagesizeList[0].value);
    const [selectedTicketsValue, setSelectedTicketsValue] = useState(selectedTicketsData[0].value)
    // console.log(selectedTicketsValue);

    // console.log('paginate',paginate);
    // console.log(selectedTicketsValue);

    useEffect(() => {
        if (global?.user) {
            if (global?.user?.data?.user?.client?.branches) {

            }
        }
    }, []);
    const transformedBranches = global?.user?.data?.user?.client?.branches?.map(branch => ({
        label: branch.name,
        value: branch.id,  // or branch.key, depending on your requirement
    }));

    const onChange = (event, selectedDate) => {


        const currentDate = selectedDate || startDate;
        setShow(Platform.OS === 'ios');
        console.log('start = ', currentDate);
        setStartDate(currentDate)

    };

    const onChange1 = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShow1(Platform.OS === 'ios');
        console.log('end = ', moment(currentDate).format('YYYY-MM-DD'));
        setEndDate(currentDate);
    };


    const getSpecificTickets = async (id) => {


        console.log('paginate', paginate);
        console.log('pageSize', pageSize);
        console.log('order by ', orderBy);
        console.log('sort by', sortBy);

        console.log(id);
        let sdate = moment(startDate).format('YYYY-MM-DD');
        let edate = moment(endDate).format('YYYY-MM-DD')
        console.log('dddy', sdate);
        console.log('ggggy', edate);

        let data = await Axios_Fetch(

            //    `${ROUTES.getSpecificProducts}/${id}`,
            `${ROUTES.ticketsStatus}?paginate=${paginate}&page_size=${pageSize}&from_date=${sdate}&to_date=${edate}&branch_id=${id}`

        );
        console.log('----------------------------');
        console.log(data?.data?.closed_tickets?.tickets?.from);

        setTicketsList(data?.data);


    }

    const renderData = ({ item }) => {
        // console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');

        // console.log(item);



        return (

            <TicketsDataComponent id={item.id} date={item.date}
                user={item?.raw_data?.orders[0]?.user}
                tAmount={item.total_amount}
                type={item?.raw_data?.type}
            />
        )
    }
    return (
        <ScrollView style={styles.main}>
            <Row style={styles.rw}>
                <BackIcon />
                <Label label="Products List" size={20} style={styles.heading} />

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
                        onValueChange={(value) => getSpecificTickets(value)}
                        items={transformedBranches}
                        placeholder={{
                            label: 'select branch',

                            value: null, // If you don't want a placeholder value to be selectable
                            color: '#9EA0A4',
                        }}
                    />
                </View>
                <View style={styles.oneside}>
                    <Row style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setShow(true)}>
                            <Label
                                label={moment(startDate).format('YYYY-MM-DD')}
                                size={12}
                            />
                        </TouchableOpacity>
                        <Label label={`⇁`} size={20} style={{ paddingBottom: 8 }} />
                        <TouchableOpacity onPress={() => setShow1(true)}>
                            <Label label={moment(endDate).format('YYYY-MM-DD')} size={12} />
                        </TouchableOpacity>
                        <Calender />
                    </Row>
                </View>

            </Row>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={startDate}
                    mode={mode}
                    is24Hour={true}
                    display="shortdate"
                    onChange={onChange}
                />
            )}
            {show1 && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={endDate}
                    mode={mode}
                    is24Hour={true}
                    display="shortdate"
                    onChange={onChange1}
                />
            )}
            <Bold label="Branch Products List" size={24} color='black' />
            <Label label="Products / Products List" size={14} color="grey" style={styles.subheading} />

            <Row>
                <View style={styles.dropDown}>
                    <RNPickerSelect

                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value) => setSelectedTicketsValue(value)
                        }
                        value={selectedTicketsValue}
                        items={selectedTicketsData}


                        style={{

                            inputAndroid: {
                                fontSize: 13,
                                paddingVertical: 8,
                                paddingHorizontal: 16,
                                borderWidth: 0.4,
                                borderRadius: 8,
                                color: 'black',
                                paddingRight: 30, // for dropdown icon
                                backgroundColor: '#f0f0f0',  // Example background color
                            },
                            iconContainer: {
                                top: 10,
                                right: 12,
                                alignSelf: 'center',
                            },
                            placeholder: {
                                color: 'white',
                                fontSize: 18,
                            },
                        }}

                        Icon={() => {
                            return (
                                <View
                                    style={{
                                        backgroundColor: 'transparent',
                                        borderTopWidth: 10,
                                        borderTopColor: 'gray',
                                        borderRightWidth: 10,
                                        borderRightColor: 'transparent',
                                        borderLeftWidth: 10,
                                        borderLeftColor: 'transparent',
                                        width: 0,
                                        height: 0,
                                    }}
                                />
                            );
                        }}
                    />
                </View>
                <View style={{ ...styles.dropDown, width: '25%' }}>
                    <Label label="Rows per page" size={12} />
                </View>
                <View style={{ ...styles.dropDown, width: '25%' }}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}

                        onValueChange={(value) => setPageSize(value)
                        }
                        value={pageSize}
                        items={pagesizeList}

                        style={{

                            inputAndroid: {
                                fontSize: 13,
                                paddingVertical: 8,
                                paddingHorizontal: 16,
                                borderWidth: 0.4,
                                borderRadius: 8,
                                color: 'black',
                                paddingRight: 30, // for dropdown icon
                                backgroundColor: '#f0f0f0',  // Example background color
                            },
                            iconContainer: {
                                top: 10,
                                right: 12,
                                alignSelf: 'center',
                            },
                            placeholder: {
                                color: 'white',
                                fontSize: 18,
                            },
                        }}

                        Icon={() => {
                            return (
                                <View
                                    style={{
                                        backgroundColor: 'transparent',
                                        borderTopWidth: 10,
                                        borderTopColor: 'gray',
                                        borderRightWidth: 10,
                                        borderRightColor: 'transparent',
                                        borderLeftWidth: 10,
                                        borderLeftColor: 'transparent',
                                        width: 0,
                                        height: 0,
                                    }}
                                />
                            );
                        }}
                    />
                </View>
            </Row>


            <PrimaryTextInput rightIcon="SearchIcon"
                placeholder="search"
                style={styles.searchBox} />






            {

                ticketList != null ?
                    <>
                        <Row style={styles.headingdata}>

                            <View style={styles.v1}>
                                <Label label="ID" size={10} />
                            </View>

                            <View style={{ width: '20%', alignItems: 'center' }}>
                                <Label label="Date" size={10} />
                            </View>

                            <View style={{ width: '15%', alignItems: 'center' }}>
                                <Label label="User" size={10} />

                            </View>
                            <View style={{ width: '20%', alignItems: 'center' }}>
                                <Label label="Total Amount" size={10} />

                            </View>
                            <View style={{ width: '20%', alignItems: 'center' }}>
                                <Label label="Type" size={10} />
                            </View>
                            <View style={{ width: '10%', alignItems: 'center' }}>
                                <Label label="Action" size={10} />
                            </View>
                        </Row>

                        <FlatList
                            data={selectedTicketsValue == 1 ?
                                ticketList?.open_tickets?.tickets?.data :
                                ticketList?.closed_tickets?.tickets?.data
                            }
                            renderItem={renderData}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </>
                    :
                    <Label label="No data to show" size={12}
                        style={styles.noDate} />

            }


            {
                ticketList != null ?
                    <Row style={styles.lowerView}>
                        {
                            selectedTicketsValue == 1 ?
                                <Label label={'showing ' + ticketList?.open_tickets?.tickets?.from + ' to ' + ticketList?.open_tickets?.tickets?.to + ' of ' + ticketList?.open_tickets?.tickets?.total}
                                    size={12} />
                                :
                                <Label label={'showing ' + ticketList?.closed_tickets?.tickets?.from + ' to ' + ticketList?.closed_tickets?.tickets?.to + ' of ' + ticketList?.closed_tickets?.tickets?.total}
                                    size={12} />

                        }


                        <Previous />
                        <Next />
                       


                    </Row>
                    : null
            }






        </ScrollView>
    )
}
export default Tickets;