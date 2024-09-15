import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {styles} from './style';
import Row from '../../../Components/core/Row';
import {BackIcon, Next, Previous} from '../../../assets/svgs';
import Label from '../../../Components/core/Label';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Calender, Countries} from '../../../assets/svgs';
import Bold from '../../../Components/core/bold';
import PrimaryTextInput from '../../../Components/core/PrimaryTextInput';
import {Axios_Fetch} from '../../../hooks/axiosCode';
import {ROUTES} from '../../../hooks/ROUTES';
import moment from 'moment';
import TicketsDataComponent from '../../../Components/custom/ticketsDataComponent';
import {useIsFocused} from '@react-navigation/native';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {Dropdown} from '../../../Components';
import TicketModal from '../TicketReset/TicketReset';

const pusher = Pusher.getInstance();

const Tickets = ({navigation}) => {
  const isFocused = useIsFocused();
  const selectedTicketsData = [
    {label: 'Open', value: 1},
    {label: 'Close', value: 2},
  ];
  const pagesizeList = [
    {label: '10', value: 10},
    {label: '20', value: 20},
    {label: '50', value: 50},
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [ticketList, setTicketsList] = useState([]);
  const [paginate, setPaginate] = useState(1);
  const [show1, setShow1] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(pagesizeList[0].value);
  const [selectedTicketsValue, setSelectedTicketsValue] = useState(
    selectedTicketsData[0].value,
  );
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState(null);
  const [branchKey, setBranchKey] = useState(null);
  const [branchStatus, setBranchStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [singleTicket, setSingleTicket] = useState(null);

  useEffect(() => {
    if (global?.user) {
      if (global?.user?.data?.user?.client?.branches) {
        setBranches(global?.user?.data?.user?.client?.branches);
        setBranch(global?.user?.data?.user?.client?.branches[0]);
        setBranchKey(global?.user?.data?.user?.client?.branches[0]?.key);
      }
    }
  }, [isFocused]);

  useEffect(() => {
    connectPusher();
  }, [branchKey]);

  const connectPusher = async () => {
    await pusher.init({
      apiKey: 'af92ce129c59db01ccfb',
      cluster: 'ap2',
    });

    await pusher.connect();
    await pusher.subscribe({
      channelName: `ping-status-${branchKey}`,
      onEvent: event => {
        if (event) setBranchStatus(event);
        else setBranchStatus(null);
      },
      onSubscriptionSucceeded: data => {
        console.log(data, 'success');
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

  const checkPingStatus = async item => {
    await pusher.unsubscribe({channelName: `ping-status-${branchKey}`});
    setBranch(item);
    setBranchKey(item?.key);
  };

  useEffect(() => {
    getSpecificTickets();
  }, [branch, pageNo, pageSize, startDate, endDate]);

  const getSpecificTickets = async () => {
    let sdate = moment(startDate).format('YYYY-MM-DD');
    let edate = moment(endDate).format('YYYY-MM-DD');

    let id = branch?.id;
    let data = await Axios_Fetch(
      `${ROUTES.ticketsStatus}?paginate=${paginate}&page_size=${pageSize}&from_date=${sdate}&to_date=${edate}&branch_id=${id}&page=${pageNo}`,
    );

    setTicketsList(data?.data);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShow(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShow1(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const renderData = ({item}) => {
    const goToDetails = () => {
      console.log(item);
      setIsVisible(true);
      setSingleTicket(item);

      // () => navigation.navigate('TicketsDetail')
    };
    return (
      <TouchableOpacity onPress={goToDetails}>
        <TicketsDataComponent
          id={item.id}
          date={item.date}
          user={item?.raw_data?.orders[0]?.user}
          tAmount={item.total_amount}
          type={item?.raw_data?.type}
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <TicketModal
        isVisible={isVisible}
        data={singleTicket}
        toggleDrawer={() => setIsVisible(!isVisible)}
      />
      <ScrollView style={styles.main}>
        <Row style={styles.rw}>
          <BackIcon />
          <Label label="Tickets List" size={20} style={styles.heading} />
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
          <View style={styles.oneside}>
            <Label label="Date" color="grey" />
          </View>
        </Row>
        <Row style={styles.statusRow}>
          <View style={styles.oneside}>
            <Dropdown
              selected={branch}
              schema={{
                label: 'name',
                value: 'id',
              }}
              data={branches}
              setSelected={item => checkPingStatus(item)}
            />
          </View>
          <View style={styles.oneside}>
            <Row style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => setShow(true)}>
                <Label
                  label={moment(startDate).format('YYYY-MM-DD')}
                  size={12}
                />
              </TouchableOpacity>
              <Label label={`⇁`} size={20} style={{paddingBottom: 8}} />
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
            mode={'date'}
            is24Hour={true}
            display="shortdate"
            onChange={onChange}
          />
        )}
        {show1 && (
          <DateTimePicker
            testID="dateTimePicker"
            value={endDate}
            mode={'date'}
            is24Hour={true}
            display="shortdate"
            onChange={onChange1}
          />
        )}
        <Bold label="Branch Tickets List" size={24} color="black" />
        <Label
          label="Tickets / Tickets List"
          size={14}
          color="grey"
          style={styles.subheading}
        />

        <Row>
          <View style={styles.dropDown}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              onValueChange={value => setSelectedTicketsValue(value)}
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

        <PrimaryTextInput
          rightIcon="SearchIcon"
          placeholder="search"
          style={styles.searchBox}
        />

        {ticketList?.closed_tickets?.tickets?.data?.length > 0 ||
        ticketList?.open_tickets?.tickets?.data?.length > 0 ? (
          <>
            <Row style={styles.headingdata}>
              <View style={styles.v1}>
                <Label label="ID" size={10} />
              </View>

              <View style={{width: '20%', alignItems: 'center'}}>
                <Label label="Date" size={10} />
              </View>

              <View style={{width: '15%', alignItems: 'center'}}>
                <Label label="User" size={10} />
              </View>
              <View style={{width: '20%', alignItems: 'center'}}>
                <Label label="Total Amount" size={10} />
              </View>
              <View style={{width: '20%', alignItems: 'center'}}>
                <Label label="Type" size={10} />
              </View>
              <View style={{width: '10%', alignItems: 'center'}}>
                <Label label="Action" size={10} />
              </View>
            </Row>

            <FlatList
              data={
                selectedTicketsValue == 1
                  ? ticketList?.open_tickets?.tickets?.data
                  : ticketList?.closed_tickets?.tickets?.data
              }
              renderItem={renderData}
              keyExtractor={(item, index) => index.toString()}
              c
              // extraData={selectedTicketsValue}
            />
            <Row style={styles.lowerView}>
              {selectedTicketsValue == 1 ? (
                <Label
                  label={
                    'showing ' +
                    ticketList?.open_tickets?.tickets?.from +
                    ' to ' +
                    ticketList?.open_tickets?.tickets?.to +
                    ' of ' +
                    ticketList?.open_tickets?.tickets?.total
                  }
                  size={12}
                />
              ) : (
                <Label
                  label={
                    'showing ' +
                    ticketList?.closed_tickets?.tickets?.from +
                    ' to ' +
                    ticketList?.closed_tickets?.tickets?.to +
                    ' of ' +
                    ticketList?.closed_tickets?.tickets?.total
                  }
                  size={12}
                />
              )}

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
          </>
        ) : (
          <Label label="No data to show" size={12} style={styles.noDate} />
        )}

        {/* {
                ticketList?.closed_tickets?.tickets?.data.length!=0 != null && ticketList?.open_tickets?.tickets?.data != 0 ?
                 
                    : 
                    <Label label="No data to show"/>
            } */}
      </ScrollView>
    </>
  );
};
export default Tickets;
