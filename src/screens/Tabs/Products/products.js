import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './style';
import Header from '../../../Components/custom/Header';
import Row from '../../../Components/core/Row';
import {BackIcon, Next, Previous} from '../../../assets/svgs';
import Label from '../../../Components/core/Label';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Calender, Countries} from '../../../assets/svgs';
import Bold from '../../../Components/core/bold';
import {colorsTheme} from '../../../Services/Color';
import PrimaryTextInput from '../../../Components/core/PrimaryTextInput';
import ProductsData from '../../../Components/custom/ProductsData';
import {Axios_Fetch, Axios_Post_data} from '../../../hooks/axiosCode';
import {ROUTES} from '../../../hooks/ROUTES';
import PrimaryButton from '../../../Components/core/button';
import {Dropdown} from '../../../Components';
import {useIsFocused} from '@react-navigation/native';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';

const pusher = Pusher.getInstance();

const Products = ({navigation}) => {
  const isFocused = useIsFocused();
  const toast = useToast();

  const pagesizeList = [
    {label: '10', value: 10},
    {label: '20', value: 20},
    {label: '50', value: 50},
  ];

  const [productsList, setProductList] = useState();
  const [paginate, setPaginate] = useState(1);
  const [productPrice, setProductPrice] = useState();
  const [priceModal, setModalPrice] = useState(false);
  const [orderBy, setOrderBy] = useState('desc');
  const [sortBy, setSortBy] = useState('id');
  const [pagination, setPagination] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [priceID, setPriceID] = useState(null);
  const [branchStatus, setBranchStatus] = useState(null);
  const [pageSize, setPageSize] = useState(pagesizeList[0].value);

  useEffect(() => {
    setBranchStatus(global.impData?.branchStatus);
  }, [isFocused]);

  useEffect(() => {
    getSpecificProduct();
  }, [pageSize, pageNo]);

  useEffect(() => {
    connectPusher();
  }, [global?.impData?.branchKey]);

  const connectPusher = async () => {
    await pusher.init({
      apiKey: 'af92ce129c59db01ccfb',
      cluster: 'ap2',
    });

    await pusher.connect();
    await pusher.subscribe({
      channelName: `ping-status-${global?.impData?.branchKey}`,
      onEvent: async event => {
        if (event) {
          var temp = global.impData;
          temp = {...temp, branchStatus: event};
          global.impData = temp;
          const impData = JSON.stringify(temp);
          await AsyncStorage.setItem('@ImpData', impData);
          setBranchStatus(event);
        } else {
          var temp = global.impData;
          temp = {...temp, branchStatus: null};
          global.impData = temp;
          const impData = JSON.stringify(temp);
          await AsyncStorage.setItem('@ImpData', impData);
          setBranchStatus(null);
        }
      },
      onSubscriptionSucceeded: async data => {
        console.log(data, 'success');
        var temp = global.impData;
        temp = {...temp, branchStatus: null};
        global.impData = temp;
        const impData = JSON.stringify(temp);
        await AsyncStorage.setItem('@ImpData', impData);
        setBranchStatus(null);
      },
      onSubscriptionError: (name, msg, err) => {
        console.log(name, msg, err, 'error');
      },
      onError: (name, msg, err) => {
        console.log(name, msg, err, 'error----');
      },
    });
  };

  const onChangeBranch = async item => {
    await pusher.unsubscribe({
      channelName: `ping-status-${global?.impData?.branchKey}`,
    });
    var temp = global.impData;
    temp = {...temp, branch: item, branchKey: item?.key};
    global.impData = temp;
    const impData = JSON.stringify(temp);
    await AsyncStorage.setItem('@ImpData', impData);
    getSpecificProduct();
  };

  const getSpecificProduct = async () => {
    let data = await Axios_Fetch(
      `${ROUTES.getSpecificProducts}/${global?.impData?.branch?.id}?paginate=${paginate}&page_size=${pageSize}&order_by=${orderBy}&sort_by=${sortBy}&page=${pageNo}`,
    );
    setProductList(data?.data?.list);
    setPagination(data?.data?.pagination);
  };

  const editClicked = (id, price) => {
    if (branchStatus) {
      setProductPrice(price);
      setPriceID(id);
      setModalPrice(true);
    } else {
      toast.hideAll();
      toast.show(`Can't Edit, Selected Branch is offline`);
    }
  };

  const renderData = ({item}) => {
    return (
      <ProductsData
        name={item?.name}
        id={item.id}
        groupCode={item.groupCode}
        price={item?.product_price}
        onEdit={() => editClicked(item.id, item?.product_price)}
      />
    );
  };

  const updatePrice = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + global?.user?.data?.token);

    const formdata = new FormData();
    formdata.append('product_id', priceID);
    formdata.append('portion', 'Normal');
    formdata.append('price', productPrice);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://api.cepcini.mego.pk/api/sambapos/product/update/' +
        global?.impData?.branch?.id,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => getSpecificProduct())
      .catch(error => console.error(error));

    setModalPrice(false);
  };
  return (
    <ScrollView style={styles.main}>
      <Row style={styles.rw}>
        <BackIcon />
        <Label label="Products List" size={20} style={styles.heading} />
      </Row>
      <Row style={styles.statusRow}>
        <Row style={styles.statusRow}>
          <Label label="Status" size={14} color="grey" />
          {branchStatus ? (
            <View
              style={[
                styles.statusValue,
                {
                  borderColor: 'green',
                },
              ]}>
              <Label label="Online" size={9} color="green" />
            </View>
          ) : (
            <View
              style={[
                styles.statusValue,
                {
                  borderColor: 'red',
                },
              ]}>
              <Label label="Offline" size={9} color="red" />
            </View>
          )}
        </Row>
        <Countries />
      </Row>
      <Row style={styles.branchRow}>
        <View style={styles.oneside}>
          <Label label="Branch" color="grey" />
        </View>
      </Row>
      <Row style={styles.statusRow}>
        <View style={styles.oneside}>
          <Dropdown
            selected={global?.impData?.branch}
            schema={{
              label: 'name',
              value: 'id',
            }}
            data={global?.user?.data?.user?.client?.branches}
            setSelected={item => onChangeBranch(item)}
          />
        </View>

        <View style={{...styles.dropDown, width: '25%'}}>
          <Label label="Rows per page" size={12} />
        </View>

        <View style={{...styles.dropDown, width: '25%'}}>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            onValueChange={value => setPageSize(value)}
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
                backgroundColor: '#f0f0f0', // Example background color
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

      <Bold label="Branch Products List" size={24} color="black" />

      <Label
        label="Products / Products List"
        size={14}
        color="grey"
        style={styles.subheading}
      />
      <PrimaryTextInput
        rightIcon="SearchIcon"
        placeholder="search"
        style={styles.searchBox}
      />

      <Row style={styles.headingdata}>
        <View style={styles.v1}>
          <Label label="ID" size={10} />
        </View>

        <View style={{width: '20%', alignItems: 'center'}}>
          <Label label="Name" size={10} />
        </View>

        <View style={{width: '20%', alignItems: 'center'}}>
          <Label label="Portion" size={10} />
        </View>

        <View style={{width: '20%', alignItems: 'center'}}>
          <Label label="Price" size={10} />
        </View>

        <View style={{width: '20%', alignItems: 'center'}}>
          <Label label="Action" size={10} />
        </View>
      </Row>

      {productsList != null ? (
        <>
          {productsList.map((item, index) => {
            return (
              <View key={`'${index}'`}>
                <ProductsData
                  name={item?.name}
                  id={item.id}
                  groupCode={item.groupCode}
                  price={item?.product_price}
                  onEdit={() => editClicked(item.id, item?.product_price)}
                />
              </View>
            );
          })}
        </>
      ) : (
        // <FlatList
        //   data={productsList}
        //   renderItem={renderData}
        //   keyExtractor={(item, index) => index.toString()}
        // />
        <ActivityIndicator
          size={'small'}
          color={colorsTheme.primary}
          style={styles.noDate}
        />
      )}

      {productsList != null ? (
        <Row style={styles.lowerView}>
          <Label
            label={
              'showing ' +
              pagination?.from +
              ' to ' +
              pagination?.to +
              ' of ' +
              pagination?.total
            }
            size={12}
          />

          <TouchableOpacity
            disabled={pageNo == 1 ? true : false}
            style={styles.btn}
            onPress={() => {
              if (pageNo != 1) {
                setPageNo(pageNo - 1);
              }
            }}>
            <Previous />
          </TouchableOpacity>
          <View>
            <Label label={pageNo} />
          </View>
          <TouchableOpacity
            onPress={() => setPageNo(pageNo + 1)}
            style={styles.btn}>
            <Next />
          </TouchableOpacity>
        </Row>
      ) : null}

      <Modal
        isVisible={priceModal}
        backdropColor={'grey'}
        backdropOpacity={1}
        onBackdropPress={() => setModalPrice(false)}
        onBackButtonPress={() => setModalPrice(false)}>
        <View style={styles.modalMain}>
          <Label label="Enter Price" size={14} />
          <PrimaryTextInput
            style={styles.inputText}
            inputValue={productPrice}
            onChangeText={v => setProductPrice(v)}
          />
          <PrimaryButton
            label="Save"
            bgColor={colorsTheme.primary}
            width={'30%'}
            style={{alignSelf: 'center'}}
            color={'white'}
            onclick={() => updatePrice()}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};
export default Products;
