import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import Header from '../../../Components/custom/Header';
import Label from '../../../Components/core/Label';
import Row from '../../../Components/core/Row';
import {Calender, Countries} from '../../../assets/svgs';
import DateTimePicker from '@react-native-community/datetimepicker';
import Bold from '../../../Components/core/bold';
import Radio from '../../../Components/core/radio';
import ShowData from '../../../Components/custom/showData';
import moment from 'moment';
import {Dropdown} from '../../../Components';
import {GET_DASHBOARD} from '../../../hooks/ROUTES';
import axios from 'axios';
import DataTable, {COL_TYPES} from 'react-native-datatable-component';
import {useTheme} from '../../../config/theme';
import {BarChart} from 'react-native-gifted-charts';
import {ruleTypes} from 'gifted-charts-core';
import {useIsFocused} from '@react-navigation/native';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {useIsConnected} from 'react-native-offline';
import {useToast} from 'react-native-toast-notifications';

const pusher = Pusher.getInstance();

const Dashboard = ({navigation}) => {
  const colors = useTheme();
  const isFocused = useIsFocused();
  let isConnected = useIsConnected();
  const toast = useToast();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [type1, setType1] = useState(true);
  const [type2, setType2] = useState(false);
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState(null);
  const [branchKey, setBranchKey] = useState(null);
  const [branchStatus, setBranchStatus] = useState(null);
  const [dashData, setDashData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [xAxisLabelTexts, setXAxisLabelTexts] = useState([]);
  const [yAxisLabelTexts, setYAxisLabelTexts] = useState([]);
  const [maxValue, setMax] = useState(0);
  const [stepValue, setStep] = useState(0);

  useEffect(() => {
    if (global?.user) {
      if (global?.user?.data?.user?.client?.branches) {
        setBranches(global?.user?.data?.user?.client?.branches);
        setBranch(global?.user?.data?.user?.client?.branches[0]);
        setBranchKey(global?.user?.data?.user?.client?.branches[0]?.key);
        getDashboardData(global?.user?.data?.user?.client?.branches[0]);
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
    getDashboardData(item);
  };

  const getDashboardData = item => {
    if (isConnected) {
      setIsLoading(true);
      const url =
        GET_DASHBOARD +
        `?from_date=${moment(startDate).format('YYYY-MM-DD')}&to_date=${moment(
          endDate,
        ).format('YYYY-MM-DD')}&branch_id=${item?.id}`;

      axios({
        url,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${global?.user?.data?.token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(async resp => {
          if (resp?.data) {
            try {
              setDashData(resp?.data?.data);
              var temp = [];
              if (resp?.data?.data?.sales_on_daily_bases) {
                resp?.data?.data?.sales_on_daily_bases.map((item, index) => {
                  temp.push({
                    value: item?.total_amount,
                    frontColor:
                      index % 2 == 0 ? colors.primary : colors.secondary,
                    spacing: 20,
                    label: moment(item?.date).format('DD-MM-YYYY'),
                    barWidth: 10,
                  });
                });

                const amounts = resp?.data?.data?.sales_on_daily_bases.map(
                  item => parseFloat(item.total_amount),
                );
                const maxValue = Math.max(...amounts);
                const stepValue = Math.ceil(maxValue / 6);
                setMax(Math.ceil(maxValue));
                setStep(stepValue);
                const yAxisLabelTexts = [];
                for (let i = 0; i <= 6; i++) {
                  yAxisLabelTexts.push(`${stepValue * i}`);
                }

                const xAxisLabelTexts =
                  resp?.data?.data?.sales_on_daily_bases.map(item =>
                    moment(item?.date).format('MMM YYYY'),
                  );
                setGraphData(temp);
                setYAxisLabelTexts(yAxisLabelTexts);
                setXAxisLabelTexts(xAxisLabelTexts);
                setIsLoading(false);
              }
            } catch (e) {
              console.log(e, 'error');
              setDashData(null);
              setIsLoading(false);
            }
          }
        })
        .catch(e => {
          console.log(e);
          setDashData(null);
          setIsLoading(false);
        });
    } else {
      toast.hideAll();
      toast.show('No Internet Connected!');
      setIsLoading(false);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShow(Platform.OS === 'ios');
    setStartDate(currentDate);
    getDashboardData(branch);
  };

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShow1(Platform.OS === 'ios');
    setEndDate(currentDate);
    getDashboardData(branch);
  };

  const onTypeClick = v => {
    if (v == 1) {
      setType1(true);
      setType2(false);
    }
    if (v == 2) {
      setType1(false);
      setType2(true);
    }
  };

  return (
    <>
      <ScrollView style={styles.main}>
        <Header name={global?.user?.data?.user?.name} />
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
                  label={moment(startDate).format('DD-MM-YYYY')}
                  size={12}
                />
              </TouchableOpacity>
              <Label label={`⇁`} size={20} style={{paddingBottom: 8}} />
              <TouchableOpacity onPress={() => setShow1(true)}>
                <Label label={moment(endDate).format('DD-MM-YYYY')} size={12} />
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

        <Bold label="Dashboard" size={24} color="black" />

        {isLoading && (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator color={colors.primary} size={'large'} />
          </View>
        )}

        <View style={styles.salesContainer}>
          <Label label="Sales" />
          <Label label="Sales view" color={colors.textGrey} />
          <Row style={styles.radio}>
            <Radio
              selected={type1}
              label="type 1"
              onClick={() => onTypeClick(1)}
            />
            <Radio
              selected={type2}
              label="type 2"
              onClick={() => onTypeClick(2)}
            />
          </Row>
          <ScrollView horizontal={true}>
            {graphData !== null && graphData.length > 0 ? (
              <BarChart
                data={graphData}
                initialSpacing={10}
                spacing={20}
                barBorderRadius={4}
                yAxisThickness={0}
                xAxisType={ruleTypes.DASHED}
                xAxisColor={'lightgray'}
                yAxisTextStyle={{color: 'lightgray'}}
                stepValue={stepValue}
                maxValue={maxValue}
                noOfSections={6}
                yAxisLabelTexts={yAxisLabelTexts}
                xAxisLabelTexts={xAxisLabelTexts}
                labelWidth={8}
                xAxisLabelTextStyle={{color: '#000', fontSize: 5}}
              />
            ) : (
              <>
                <Label label="No Sales Data Available" />
              </>
            )}
          </ScrollView>
        </View>

        <Row>
          <ShowData
            icon={'Dailysales'}
            label={'Daily Sales'}
            count={dashData?.today_sale_amount ?? 0}
          />
          <ShowData
            icon={'AvgAmountPerTicket'}
            label={'Avg Amount Per Ticket'}
            count={dashData?.avg_amount_per_ticket ?? 0}
          />
        </Row>

        <Row>
          <ShowData
            icon={'OpenTickets'}
            label={'Open Tickets'}
            count={dashData?.total_num_of_open_tickets ?? 0}
          />
          <ShowData
            icon={'TotalTickets'}
            label={'Total Ticket Amount'}
            count={dashData?.sum_of_open_tickets ?? 0}
          />
        </Row>

        <Row>
          <ShowData
            icon={'OpenticketsAmount'}
            label={'Open Tickets Amount'}
            count={dashData?.sum_all_tickets_amount ?? 0}
          />
          <ShowData
            icon={'TotalTicketsBlack'}
            label={'Total Tickets'}
            count={dashData?.total_num_of_tickets ?? 0}
          />
        </Row>

        <View style={{...styles.salesContainer, marginBottom: 100}}>
          <Label label="Top Users" size={14} />
          <Row style={styles.rw}>
            <Label label="User" size={12} />
            <Label label="Total Amount" size={12} />
          </Row>

          <View style={{width: '100%', backgroundColor: 'red', margin: 1}}>
            {dashData?.user_based_sale &&
            dashData?.user_based_sale.length > 0 ? (
              <DataTable
                data={dashData?.user_based_sale ?? []}
                colNames={['user', 'total_amount']}
                colSettings={[
                  {name: 'user', type: COL_TYPES.STRING, width: '50%'},
                  {name: 'total_amount', type: COL_TYPES.INT, width: '50%'},
                ]}
                noOfPages={Math.max(
                  1,
                  Math.ceil((dashData?.user_based_sale?.length ?? 0) / 10),
                )}
                // noOfPages={
                //   dashData?.user_based_sale.length / 5 > 1
                //     ? dashData?.user_based_sale.length / 5
                //     : 2
                // }
                backgroundColor={'#fff'}
                headerLabelStyle={{color: 'grey', fontSize: 12}}
              />
            ) : (
              <>
                <Label label="No Users Data Available" />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default Dashboard;
