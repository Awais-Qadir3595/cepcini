import React, {useState} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {styles} from './style';
import Header from '../../../Components/custom/Header';
import Bold from '../../../Components/core/bold';
import moment from 'moment';
import {CUSTOM_REPORT, GET_REPORTS} from '../../../hooks/ROUTES';
import {BranchAndLanguage, ReportsTable, Text} from '../../../Components';
import axios from 'axios';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {useTheme} from '../../../config/theme';
import PrimaryButton from '../../../Components/core/button';
import {useIsConnected} from 'react-native-offline';
import {useToast} from 'react-native-toast-notifications';

const pusher = Pusher.getInstance();

const CustomReport = ({}) => {
  const toast = useToast();
  const colors = useTheme();
  let isConnected = useIsConnected();

  const [reports, setReports] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onGetData = () => {
    if (isConnected) {
      setIsLoading(true);
      const url = GET_REPORTS + `/${global?.impData?.branch?.id}`;
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
              setReports(resp?.data);
              setIsLoading(false);
            } catch (e) {
              console.log(e, 'error');
              setReports(null);
              setIsLoading(false);
            }
          }
        })
        .catch(e => {
          console.log(e, '....');
          setIsLoading(false);
        });
    } else {
      toast.hideAll();
      toast.show('No Internet Connected!');
      setIsLoading(false);
    }
  };

  const viewData = async (ind, item) => {
    setReportsLoading(true);
    setModalVisible(!modalVisible);

    await pusher.init({
      apiKey: 'af92ce129c59db01ccfb',
      cluster: 'ap2',
    });
    await pusher.connect();
    await pusher.unsubscribe({
      channelName: `custom-reports-${global?.impData?.branchKey}`,
    });
    await pusher.subscribe({
      channelName: `custom-reports-${global?.impData?.branchKey}`,
      onEvent: event => {
        if (event) {
          const parsedData = JSON.parse(event.data);
          setReportData(parsedData);
        } else setReportData(null);
        setReportsLoading(false);
      },
      onSubscriptionSucceeded: data => {
        console.log(data, 'success,1');
        setReportsLoading(false);
      },
      onSubscriptionError: (name, msg, err) => {
        console.log(name, msg, err, 'error,1');
      },
      onError: (name, msg, err) => {
        console.log(name, msg, err, 'error----,1');
      },
    });
  };

  const fetchData = (single, ind) => {
    if (isConnected) {
      const url = CUSTOM_REPORT;

      const formData = new FormData();
      formData.append(
        'start_date',
        moment(global?.impData?.startDate).format('YYYY-MM-DD'),
      );
      formData.append(
        'end_date',
        moment(global?.impData?.endDate).format('YYYY-MM-DD'),
      );
      formData.append('branch_id', global?.impData?.branch?.id);
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
        {isLoading ? (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator color={colors.primary} size={'large'} />
          </View>
        ) : (
          <>
            {reports &&
              reports.length > 0 &&
              reports.map((item, index) => {
                return (
                  <View key={`'${index}'`}>
                    <ReportsTable
                      isVisible={modalVisible}
                      data={reportData}
                      reportsLoading={reportsLoading}
                      toggleDrawer={() => setModalVisible(!modalVisible)}
                    />

                    <View
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
                  </View>
                );
              })}
          </>
        )}
      </>
    );
  };

  return (
    <ScrollView style={styles.main}>
      <Header name={global?.user?.data?.user?.name} />

      <BranchAndLanguage callBack={() => onGetData()} />

      <Bold label="Custom Reports" size={24} color="black" />
      {getReportsView()}
    </ScrollView>
  );
};
export default CustomReport;
