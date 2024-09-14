import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './style';
import Header from '../../../Components/custom/Header';
import Label from '../../../Components/core/Label';
import Row from '../../../Components/core/Row';
import {Calender, Countries} from '../../../assets/svgs';
import DateTimePicker from '@react-native-community/datetimepicker';
import Bold from '../../../Components/core/bold';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {CUSTOM_REPORT, GET_REPORTS} from '../../../hooks/ROUTES';
import {Dropdown, ReportsTable, Text} from '../../../Components';
import axios from 'axios';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {useTheme} from '../../../config/theme';
import PrimaryButton from '../../../Components/core/button';
import {useIsConnected} from 'react-native-offline';
import {useToast} from 'react-native-toast-notifications';

const pusher = Pusher.getInstance();

const CustomReport = ({navigation}) => {
  const toast = useToast();
  const isFocused = useIsFocused();
  const colors = useTheme();
  let isConnected = useIsConnected();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [mode, setMode] = useState('date');
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState(null);
  const [branchKey, setBranchKey] = useState(null);
  const [branchStatus, setBranchStatus] = useState(null);
  const [reports, setReports] = useState(null);

  useEffect(() => {
    if (global?.user) {
      if (global?.user?.data?.user?.client?.branches) {
        setBranches(global?.user?.data?.user?.client?.branches);
        setBranch(global?.user?.data?.user?.client?.branches[0]);
        setBranchKey(global?.user?.data?.user?.client?.branches[0]?.key);
        onGetData(global?.user?.data?.user?.client?.branches[0]);
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
    onGetData(item);
  };

  const onGetData = item => {
    const url = GET_REPORTS + `/${item?.id}`;
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
            console.log(resp?.data, '=====');
            // setBranchStatus(resp?.data);
            setReports(resp?.data);
          } catch (e) {
            console.log(e, 'error');
            // setBranchStatus(null);
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
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

  const viewData = ind => {
    const temp = [...reports];
    temp[ind] = {...temp[ind], openModal: temp[ind]?.openModal ?? false};
    setReports(temp);
  };

  const fetchData = (single, ind) => {
    if (isConnected) {
      const url = CUSTOM_REPORT;

      const formData = new FormData();
      formData.append('start_date', moment(startDate).format('YYYY-MM-DD'));
      formData.append('end_date', moment(endDate).format('YYYY-MM-DD'));
      formData.append('branch_id', branch?.id);
      formData.append('name', single?.report_name);

      axios({
        method: 'POST',
        url: url,
        data: formData,
        headers: {
          Authorization: `Bearer ${global?.user?.data?.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(async resp => {
          const data = resp?.data;
          if (data.success) {
            console.log(data.data);
            const temp = [...reports];
            temp[ind] = {...temp[ind], fetchedData: data.data};
            setReports(temp);
            toast.hideAll();
            toast.show('Data Fetched!, You can view it.');
          } else {
            toast.hideAll();
            toast.show('Something went wrong');
          }
        })
        .catch(e => {
          console.log(e);
          toast.hideAll();
          toast.show('Something went wrong');
        });
    } else {
      toast.hideAll();
      toast.show('No Internet Connection!');
    }
  };

  const getReportsView = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            padding: 5,
            backgroundColor: colors.notSelected,
          }}>
          <Text bold subhead textGreyDark>
            {'Title'}
          </Text>
          <Text bold subhead textGreyDark>
            {'Report Actions'}
          </Text>
        </View>
        {reports &&
          reports.length > 0 &&
          reports.map((item, index) => {
            return (
              <>
               <ReportsTable isVisible={item?.openModal} data={item?.fetchedData} />
              
                <View
                  key={`'${index}'`}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <Text bold subhead textGreyDark>
                      {item?.report_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: item?.fetchedData
                        ? 'space-between'
                        : 'flex-end',
                      flex: 1,
                    }}>
                    {item?.fetchedData && (
                      <PrimaryButton
                        label="View"
                        color={'white'}
                        bgColor={colors.primary}
                        width={'45%'}
                        height={40}
                        loading={false}
                        disabled={false}
                        onclick={() => viewData(item, index)}
                      />
                    )}
                    <PrimaryButton
                      label={item?.fetchedData ? 'Refresh' : 'Fetch'}
                      color={'white'}
                      bgColor={colors.primary}
                      width={'45%'}
                      height={40}
                      loading={false}
                      disabled={false}
                      onclick={() => fetchData(item, index)}
                    />
                  </View>
                </View>
              </>
            );
          })}
      </>
    );
  };

  return (
    <ScrollView style={styles.main}>
      <Header name="John Aly" />
      <Row style={styles.statusRow}>
        <Row style={styles.statusRow}>
          <Label label="Status" size={14} color="grey" />
          {branchStatus?.keep_alive ? (
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
              <Label label={moment(startDate).format('DD-MM-YYYY')} size={12} />
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

      <Bold label="Custom Reports" size={24} color="black" />
      {getReportsView()}
    </ScrollView>
  );
};
export default CustomReport;
