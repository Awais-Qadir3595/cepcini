import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './style';
import Label from '../core/Label';
import Row from '../core/Row';
import {Calender, Countries} from '../../assets/svgs';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Dropdown} from '..';
import {useIsFocused} from '@react-navigation/native';
import {Pusher} from '@pusher/pusher-websocket-react-native';

const pusher = Pusher.getInstance();

const Index = ({callBack}) => {
  const isFocused = useIsFocused();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [branchStatus, setBranchStatus] = useState(null);

  useEffect(() => {
    callBack();
    setBranchStatus(global.impData?.branchStatus);
  }, [isFocused]);

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
      onEvent: event => {
        if (event) {
          var temp = global.impData;
          temp = {...temp, branchStatus: event};
          global.impData = temp;
          setBranchStatus(event);
        } else {
          var temp = global.impData;
          temp = {...temp, branchStatus: null};
          global.impData = temp;
          setBranchStatus(null);
        }
      },
      onSubscriptionSucceeded: data => {
        console.log(data, 'success');
        var temp = global.impData;
        temp = {...temp, branchStatus: null};
        global.impData = temp;
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
    callBack();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || global?.impData?.startDate;
    setShow(Platform.OS === 'ios');
    var temp = global.impData;
    temp = {...temp, startDate: currentDate};
    global.impData = temp;
    callBack();
  };

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || global?.impData?.endDate;
    setShow1(Platform.OS === 'ios');
    var temp = global.impData;
    temp = {...temp, endDate: currentDate};
    global.impData = temp;
    callBack();
  };

  return (
    <>
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
            selected={global?.impData?.branch}
            schema={{
              label: 'name',
              value: 'id',
            }}
            data={global?.user?.data?.user?.client?.branches}
            setSelected={item => onChangeBranch(item)}
          />
        </View>

        <View style={styles.oneside}>
          <Row style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setShow(true)}>
              <Label
                label={moment(global?.impData?.startDate).format('DD-MM-YYYY')}
                size={12}
              />
            </TouchableOpacity>
            <Label label={`⇁`} size={20} style={{paddingBottom: 8}} />
            <TouchableOpacity onPress={() => setShow1(true)}>
              <Label
                label={moment(global?.impData?.endDate).format('DD-MM-YYYY')}
                size={12}
              />
            </TouchableOpacity>
            <Calender />
          </Row>
        </View>
      </Row>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={global?.impData?.startDate}
          mode={'date'}
          is24Hour={true}
          display="shortdate"
          onChange={onChange}
        />
      )}
      {show1 && (
        <DateTimePicker
          testID="dateTimePicker"
          value={global?.impData?.endDate}
          mode={'date'}
          is24Hour={true}
          display="shortdate"
          onChange={onChange1}
        />
      )}
    </>
  );
};
export default Index;
