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
const Products = ({ navigation }) => {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [productsList, setProductList] = useState();
    const [paginate, setPaginate] = useState(1);

    const [orderBy, setOrderBy] = useState('desc');
    const [sortBy, setSortBy] = useState('id');
    const [pagination, setPagination] = useState(null);


     
    const pagesizeList = [
        { label: '10', value: 10 },
        { label: '20', value: 20 },
        { label: '50', value: 50 },
    ];

    const [pageSize, setPageSize] = useState(pagesizeList[0].value);

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





    const getSpecificProduct = async (id) => {




        let data = await Axios_Fetch(

            `${ROUTES.getSpecificProducts}/${id}?paginate=${paginate}&page_size=${pageSize}&order_by=${orderBy}&sort_by=${sortBy}`
        );

        setProductList(data?.data?.list);

        setPagination(data?.data?.pagination)

    }

    const renderData = ({ item }) => {




        return (
            <ProductsData name={item?.name} id={item.id} groupCode={item.groupCode} price={item?.portions[0]?.price}
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

            </Row >
            <Row style={styles.statusRow}>
                <View style={styles.oneside}>
                    <RNPickerSelect
                        onValueChange={(value) => getSpecificProduct(value)}
                        items={transformedBranches}
                    />
                </View>

                <View style={{ ...styles.dropDown, width: '25%' }}>
                    <Label label="Rows per page" size={12} />
                </View>

                <View style={{ ...styles.dropDown, width: '25%' }}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value) => setPageSize(value)}

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
            <Bold label="Branch Products List" size={24} color='black' />
            <Label label="Products / Products List" size={14} color="grey" style={styles.subheading} />
            <PrimaryTextInput rightIcon="SearchIcon"
                placeholder="search"
                style={styles.searchBox} />


            <Row style={styles.headingdata}>

                <View style={styles.v1}>
                    <Label label="ID" size={10} />
                </View>

                <View style={{ width: '20%', }}>
                    <Label label="Name" size={10} />
                </View>

                <View style={{ width: '20%', }}>
                    <Label label="Group code" size={10} />

                </View>
                <View style={styles.v1}>
                    <Label label="Price" size={10} />

                </View>
                <View style={{ width: '20%', }}>
                    <Label label="Portion" size={10} />

                </View>
            </Row>

            {
                productsList != null ?
                    <FlatList

                        data={productsList}
                        renderItem={renderData}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    :
                    <Label label="No data to show" size={12}
                        style={styles.noDate} />
            }

            {
                productsList != null ?
                    <Row style={styles.lowerView}>
                        <Label label={'showing' + pagination?.from + ' to ' + pagination?.to + ' of ' + pagination?.total}
                            size={12} />


                        <Previous />
                        <Next />


                    </Row>
                    : null
            }






        </ScrollView>
    )
}
export default Products;