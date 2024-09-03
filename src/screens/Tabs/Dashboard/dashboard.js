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
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from 'react-native-chart-kit';
import ShowData from '../../../Components/custom/showData';
import moment from 'moment';
import {Dropdown} from '../../../Components';
import {GET_DASHBOARD, KEEP_ALIVE} from '../../../hooks/ROUTES';
import axios from 'axios';
import DataTable, {COL_TYPES} from 'react-native-datatable-component';
import {useTheme} from '../../../config/theme';
import {BarChart} from 'react-native-gifted-charts';
import {ruleTypes} from 'gifted-charts-core';

const Dashboard = ({navigation}) => {
  const colors = useTheme();
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
  const [branch, setBranch] = useState(null);
  const [branchStatus, setBranchStatus] = useState(null);
  const [dashData, setDashData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [yAxisLabes, setYAxisLabels] = useState(null);

  useEffect(() => {
    if (global?.user) {
      if (global?.user?.data?.user?.client?.branches) {
        // const branchData = global?.user?.data?.user?.client?.branches;
        // var temp = [];
        // branchData.map(item => {
        //   temp.push({...item, label: item.name, value: item.id});
        // });

        setBranches(global?.user?.data?.user?.client?.branches);
      }
    }
  }, []);

  const onKeepAlive = item => {
    setBranch(item);
    getDashboardData(item);
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

  const getDashboardData = item => {
    const url =
      GET_DASHBOARD +
      `?from_date=${moment(startDate).format('YYYY-MM-DD')}&to_date=${moment(
        endDate,
      ).format('YYYY-MM-DD')}&branch_id=${item?.id}`;

    console.log(url);

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
            setDashData(resp?.data?.data);
            var temp = [];
            if (resp?.data?.data?.sales_on_daily_bases) {
              resp?.data?.data?.sales_on_daily_bases.map((item, index) => {
                temp.push({
                  value: item?.total_amount,
                  frontColor:
                    index % 2 == 0 ? colors.primary : colors.secondary,
                  //   gradientColor: '#009FFF',
                  spacing: 20,
                  label: moment(item?.date).format('DD-MM-YYYY'),
                  barWidth: 10,
                });
              });
              const amounts = resp?.data?.data?.sales_on_daily_bases.map(item =>
                parseFloat(item.total_amount),
              );
            //   const maxAmount = Math.max(...amounts);
            //   const minAmount = 0;
            //   const noOfSections = 6;
            //   const stepValue = (maxAmount - minAmount) / noOfSections;
            //   const yAxisLabelTexts = [];
            //   for (let i = 0; (i = noOfSections); i++) {
            //     const labelValue = minAmount + stepValue * i;
            //     yAxisLabelTexts.push(
            //       labelValue === 0 ? '0' : `${(labelValue / 1000).toFixed(1)}k`,
            //     );
            //   }
            //   setYAxisLabels(yAxisLabelTexts);
              console.log('--------');

              setGraphData(temp);
            }
          } catch (e) {
            console.log(e, 'error');
            setDashData(null);
          }
        }
      })
      .catch(e => {
        console.log(e);
        setDashData(null);
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
      <Header name={global?.user?.data?.user?.name} />
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
            onValueChange={value => setBranch(value)}
            items={branches}
            value={branch}
            activeItemStyle={{color:'#000'}}
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

      <Bold label="Dashboard" size={24} color="black" />

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
          {graphData && (
            <BarChart
              data={graphData}
              //   barWidth={16}
              initialSpacing={10}
              spacing={20}
              barBorderRadius={4}
              yAxisThickness={0}
              xAxisType={ruleTypes.DASHED}
              xAxisColor={'lightgray'}
              yAxisTextStyle={{color: 'lightgray'}}
              stepValue={4000}
              maxValue={24000}
              noOfSections={6}
              yAxisLabelTexts={['0', '4k', '8k', '12k', '16k', '20k', '24k']}
              xAxisLabelTexts={['aug 2023', 'nov 2023', 'feb 2024', 'may 2024']}
              labelWidth={8}
              xAxisLabelTextStyle={{color: '#000', fontSize: 5}}
              //   showLine
              //   lineConfig={{
              //     color: '#F29C6E',
              //     thickness: 3,
              //     curved: true,
              //     hideDataPoints: true,
              //     shiftY: 20,
              //     initialSpacing: -30,
              //   }}
            />
          )}
          {/* <BarChart
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
            strokeWidth={8}
            radius={20}
            // decorator={({x, y, width, height, index, data}) => {
            //   return data.datasets[0].data.map((value, i) => {
            //     return (
            //       <G key={i}>
            //         <Rect
            //           x={x(i)}
            //           y={y(value)}
            //           width={width / data.labels.length - 16} // Adjust width for padding
            //           height={height - y(value)}
            //           rx={10} // This is for rounded corners
            //           ry={10} // This is for rounded corners
            //           fill="rgba(0, 123, 255, 0.7)"
            //         />
            //       </G>
            //     );
            //   });
            // }}
            // decorator={({ x, y, width, height, index, data }) => {
            //     return data.datasets[0].data.map((value, i) => {
            //       const barColor = i % 2 === 0 ? 'red' : 'blue'; // Alternate between red and blue
            //       return (
            //         <G key={i}>
            //           <Rect
            //             x={x(i) + (width / data.labels.length) / 2 - 1.5} // Center the bar with the given width
            //             y={y(value)}
            //             width={3} // Fixed width of the bar
            //             height={height - y(value)}
            //             fill={barColor} // Apply alternating colors
            //           />
            //         </G>
            //       );
            //     });
            //   }}
          /> */}
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
        {/* <Label
          label=" Showing 0 to 0 of 00 entries"
          style={styles.resultLabel}
          size={11}
        /> */}
        <View style={{width: '100%', backgroundColor: 'red', margin: 1}}>
          <DataTable
            data={dashData?.user_based_sale ?? []} // list of objects
            colNames={['user', 'total_amount']} //List of Strings
            colSettings={[
              {name: 'user', type: COL_TYPES.STRING, width: '50%'},
              {name: 'total_amount', type: COL_TYPES.INT, width: '50%'},
            ]}
            noOfPages={dashData?.user_based_sale.length / 5} //number
            backgroundColor={'#fff'}
            headerLabelStyle={{color: 'grey', fontSize: 12}}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default Dashboard;
