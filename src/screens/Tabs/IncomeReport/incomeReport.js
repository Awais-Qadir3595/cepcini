import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import {styles} from './style';
import Header from '../../../Components/custom/Header';
import Label from '../../../Components/core/Label';
import Row from '../../../Components/core/Row';
import {Calender, Countries} from '../../../assets/svgs';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Bold from '../../../Components/core/bold';
import {Dimensions} from 'react-native';
import PieChart from 'react-native-pie-chart';
import {colorsTheme} from '../../../Services/Color';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {KEEP_ALIVE} from '../../../hooks/ROUTES';
import { Dropdown } from '../../../Components';
import axios from 'axios';

const IncomeReport = ({navigation}) => {
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [mode, setMode] = useState('date');
  const [type1, setType1] = useState(true);
  const [type2, setType2] = useState(false);
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState(null);
  const [branchStatus, setBranchStatus] = useState(null);

  const widthAndHeight = 250;
  const series = [72, 14, 28, 36];
  const sliceColor = [colorsTheme.primary, '#ffb300', 'green', '#ff6c00'];

  useEffect(() => {
    if (global?.user) {
      if (global?.user?.data?.user?.client?.branches) {
        setBranches(global?.user?.data?.user?.client?.branches);
        setBranch(global?.user?.data?.user?.client?.branches[0]);
      }
    }
  }, [isFocused]);

  const onKeepAlive = item => {
    setBranch(item);
    ///is jaga s call ho gi 
    const url = KEEP_ALIVE + `?branch_id=${item?.id}`;
    axios({
      url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${global?.user?.data?.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      //   params: params,
    })
      .then(async resp => {
        if (resp?.data) {
          try {
            // console.log(resp?.data);
            setBranchStatus(resp?.data);
          } catch (e) {
            console.log(e, 'error');
            setBranchStatus(null);
          }
        }
      })
      .catch(e => {
        console.log(e);
        setBranchStatus(null);
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
          {/* <RNPickerSelect
            onValueChange={value => console.log(value)}
            items={[
              {label: 'Football', value: 'football'},
              {label: 'Baseball', value: 'baseball'},
              {label: 'Hockey', value: 'hockey'},
            ]}
          /> */}

          <Dropdown
            selected={branch}
            schema={{
              label: 'name',
              value: 'id',
            }}
            data={branches}
            setSelected={item => onKeepAlive(item)}
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

      <Bold label="Income Report" size={24} color="black" />
      <View style={styles.salesContainer}>
        <Label label="Income Details" size={12} />
        <Label label="Income data" size={10} color="grey" />

        <ScrollView horizontal={true}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.7}
            coverFill={'white'}
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
};
export default IncomeReport;
