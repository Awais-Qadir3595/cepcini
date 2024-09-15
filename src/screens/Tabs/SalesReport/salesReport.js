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
import moment from 'moment';
import {Dropdown} from '../../../Components';
import axios from 'axios';
import {useTheme} from '../../../config/theme';
import {BarChart} from 'react-native-gifted-charts';
import {ruleTypes} from 'gifted-charts-core';
import {useIsFocused} from '@react-navigation/native';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {useIsConnected} from 'react-native-offline';
import {useToast} from 'react-native-toast-notifications';
import {GET_SALES_REPORT} from '../../../hooks/ROUTES';

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
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState(null);
  const [branchKey, setBranchKey] = useState(null);
  const [branchStatus, setBranchStatus] = useState(null);
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
        GET_SALES_REPORT +
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
              var temp = [];
              if (resp?.data?.data) {
                resp?.data?.data.map((item, index) => {
                  temp.push({
                    value: parseFloat(item?.total_quantity),
                    frontColor:
                      index % 2 == 0 ? colors.primary : colors.secondary,
                    spacing: 20,
                    label: item?.product_name,
                    barWidth: 10,
                  });
                });
                const quan = resp?.data?.data.map(item => item.total_quantity);

                const maxValue = Math.max(...quan);
                const stepValue = Math.ceil(maxValue / 6);
                setMax(Math.ceil(maxValue));
                setStep(stepValue);
                const yAxisLabelTexts = [];
                for (let i = 0; i <= 6; i++) {
                  yAxisLabelTexts.push(`${stepValue * i}`);
                }

                const xAxisLabelTexts = resp?.data?.data.map(
                  item => item.product_name,
                );
                setGraphData(temp);
                setYAxisLabelTexts(yAxisLabelTexts);
                setXAxisLabelTexts(xAxisLabelTexts);

                setIsLoading(false);
              }
            } catch (e) {
              console.log(e, 'error');
              setIsLoading(false);
            }
          }
        })
        .catch(e => {
          console.log(e);
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

        <Bold label="Product Sales Report" size={24} color="black" />

        {isLoading && (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator color={colors.primary} size={'large'} />
          </View>
        )}

        <View style={styles.salesContainer}>
          <Label label="Sales Report" color={colors.textGrey} />

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
      </ScrollView>
    </>
  );
};
export default Dashboard;
