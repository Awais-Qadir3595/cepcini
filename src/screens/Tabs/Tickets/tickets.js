import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {styles} from './style';
import Row from '../../../Components/core/Row';
import {BackIcon, Next, Previous} from '../../../assets/svgs';
import Label from '../../../Components/core/Label';
import RNPickerSelect from 'react-native-picker-select';
import Bold from '../../../Components/core/bold';
import PrimaryTextInput from '../../../Components/core/PrimaryTextInput';
import {Axios_Fetch} from '../../../hooks/axiosCode';
import {ROUTES} from '../../../hooks/ROUTES';
import moment from 'moment';
import TicketsDataComponent from '../../../Components/custom/ticketsDataComponent';
import {BranchAndLanguage} from '../../../Components';
import TicketModal from '../TicketReset/TicketReset';

const Tickets = ({}) => {
  const selectedTicketsData = [
    {label: 'Open', value: 1},
    {label: 'Close', value: 2},
  ];
  const pagesizeList = [
    {label: '10', value: 10},
    {label: '20', value: 20},
    {label: '50', value: 50},
  ];

  const [ticketList, setTicketsList] = useState([]);
  const [paginate, setPaginate] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(pagesizeList[0].value);
  const [selectedTicketsValue, setSelectedTicketsValue] = useState(
    selectedTicketsData[0].value,
  );
  const [isVisible, setIsVisible] = useState(false);
  const [singleTicket, setSingleTicket] = useState(null);

  useEffect(() => {
    getSpecificTickets();
  }, [pageNo, pageSize]);

  const getSpecificTickets = async () => {
    let sdate = moment(global?.impData?.startDate).format('YYYY-MM-DD');
    let edate = moment(global?.impData?.endDate).format('YYYY-MM-DD');

    let data = await Axios_Fetch(
      `${ROUTES.ticketsStatus}?paginate=${paginate}&page_size=${pageSize}&from_date=${sdate}&to_date=${edate}&branch_id=${global?.impData?.branch?.id}&page=${pageNo}`,
    );

    setTicketsList(data?.data);
  };

  const renderData = ({item}) => {
    const goToDetails = () => {
      setIsVisible(true);
      setSingleTicket(item);
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

        <BranchAndLanguage callBack={() => getSpecificTickets()} />

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
      </ScrollView>
    </>
  );
};
export default Tickets;
