import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './style';
import Header from '../../../Components/custom/Header';
import Label from '../../../Components/core/Label';
import Row from '../../../Components/core/Row';
import {Calender, Countries} from '../../../assets/svgs';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Bold from '../../../Components/core/bold';
import Radio from '../../../Components/core/radio';
import {Dimensions} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import ShowData from '../../../Components/custom/showData';
import moment from 'moment';

const Dashboard = ({navigation}) => {
  const userData = global.user;
  const screenWidth = Dimensions.get('window').width;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [mode, setMode] = useState('date');
  const [type1, setType1] = useState(true);
  const [type2, setType2] = useState(false);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    if (global?.user) {
      if (global?.user?.data?.user?.client?.branches) {
        const branchData = global?.user?.data?.user?.client?.branches;
        var temp = [];
        branchData.map(item => {
          temp.push({...item, label: item.name, value: item.id});
        });

        setBranches(temp);
      }
    }
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    // const year = currentDateget.getUTCFullYear();
    //     const month = String(currentDateget.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    //     const day = String(currentDateget.getUTCDate()).padStart(2, '0');
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
      </Row>
      <Row style={styles.statusRow}>
        <View style={styles.oneside}>
          <RNPickerSelect
            onValueChange={value => console.log(value)}
            items={branches}
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
          onChange={onChange}
        />
      )}

      <Bold label="Dashboard" size={24} color="black" />

      <View style={styles.salesContainer}>
        <Label label="Sales" />
        <Label label="Sales view" />
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
          <BarChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                },
              ],
            }}
            width={screenWidth} // from react-native
            height={220}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            decorator={({x, y, width, height, index, data}) => {
              return data.datasets[0].data.map((value, i) => {
                return (
                  <G key={i}>
                    <Rect
                      x={x(i)}
                      y={y(value)}
                      width={width / data.labels.length - 16} // Adjust width for padding
                      height={height - y(value)}
                      rx={10} // This is for rounded corners
                      ry={10} // This is for rounded corners
                      fill="rgba(0, 123, 255, 0.7)"
                    />
                  </G>
                );
              });
            }}
          />
        </ScrollView>
      </View>
      <Row>
        <ShowData icon={'Dailysales'} label={'Daily Sales'} count={0} />
        <ShowData
          icon={'AvgAmountPerTicket'}
          label={'Avg Amount Per Ticket'}
          count={0}
        />
      </Row>

      <Row>
        <ShowData icon={'OpenTickets'} label={'Open Tickets'} count={0} />
        <ShowData icon={'TotalTickets'} label={'Total Tickets'} count={0} />
      </Row>

      <Row>
        <ShowData icon={'OpenticketsAmount'} label={'Open Tickets'} count={0} />
        <ShowData
          icon={'TotalTicketsBlack'}
          label={'Total Tickets'}
          count={0}
        />
      </Row>

      <View style={{...styles.salesContainer, marginBottom: 100}}>
        <Label label="Top Users" size={14} />
        <Row style={styles.rw}>
          <Label label="User" size={12} />
          <Label label="Total Amount" size={12} />
        </Row>
        <Label
          label=" Showing 0 to 0 of 00 entries"
          style={styles.resultLabel}
          size={11}
        />
      </View>
    </ScrollView>
  );
};
export default Dashboard;
