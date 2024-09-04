import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, FlatList } from 'react-native';

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
import { Axios_Fetch, Axios_Post_data } from "../../../hooks/axiosCode";
import { ROUTES } from "../../../hooks/ROUTES";
const Products = ({ navigation }) => {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [productsList, setProductList] = useState();
    const [paginate, setPaginate] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [orderBy, setOrderBy] = useState('desc');
    const [sortBy, setSortBy] = useState('id');
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

            //    `${ROUTES.getSpecificProducts}/${id}`,
            `${ROUTES.getSpecificProducts}/${id}?paginate=${paginate}&page_size=${pageSize}&order_by=${orderBy}&sort_by=${sortBy}`
        );
        console.log('datttt');
        setProductList(data?.data?.list);
        console.log(data?.data?.list);

    }

    const renderData = ({ item }) => {


        return (
            <ProductsData name={item?.name} id={item.id} groupCode={item.groupCode}
            />
        )
    }
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
                        onValueChange={(value) => getSpecificProduct(value)}
                        items={transformedBranches}

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
                        style={{ marginBottom: 100 }}
                        data={productsList}
                        renderItem={renderData}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    :
                    <Label label="No data to show" />
            }


            {
                productsList != null ?
                    <Row style={styles.lowerView}>
                        <Label label="Row per Page" />
                        <RNPickerSelect
      onValueChange={(value) => console.log(value)}
      items={[
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
      ]}
    />
                    </Row>
                    : null
            }


            {/* // keyExtractor={item => item.id} */}

            {/* <ProductsData id={1} name={} groupCode={'breakfast'} price={456} />
            <ProductsData id={1} name='Toasted Bagel Jam' groupCode={'breakfast'} price={456} />
            <ProductsData id={1} name='Toasted Bagel Jam' groupCode={'breakfast'} price={456} />
            <ProductsData id={1} name='Toasted Bagel Jam' groupCode={'breakfast'} price={456} />
            <ProductsData id={1} name='Toasted Bagel Jam' groupCode={'breakfast'} price={456} /> */}




        </ScrollView>
    )
}
export default Products;