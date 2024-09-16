import React, {useState} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {styles} from './style';
import Header from '../../../Components/custom/Header';
import Label from '../../../Components/core/Label';
import Bold from '../../../Components/core/bold';
import moment from 'moment';
import axios from 'axios';
import {useTheme} from '../../../config/theme';
import {BarChart} from 'react-native-gifted-charts';
import {ruleTypes} from 'gifted-charts-core';
import {useIsConnected} from 'react-native-offline';
import {useToast} from 'react-native-toast-notifications';
import {GET_SALES_REPORT} from '../../../hooks/ROUTES';
import {BranchAndLanguage} from '../../../Components';

const Dashboard = ({}) => {
  const colors = useTheme();
  let isConnected = useIsConnected();
  const toast = useToast();

  const [graphData, setGraphData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [xAxisLabelTexts, setXAxisLabelTexts] = useState([]);
  const [yAxisLabelTexts, setYAxisLabelTexts] = useState([]);
  const [maxValue, setMax] = useState(0);
  const [stepValue, setStep] = useState(0);

  const getDashboardData = () => {
    if (isConnected) {
      setIsLoading(true);
      const url =
        GET_SALES_REPORT +
        `?from_date=${moment(global?.impData?.startDate).format(
          'YYYY-MM-DD',
        )}&to_date=${moment(global?.impData?.endDate).format(
          'YYYY-MM-DD',
        )}&branch_id=${global?.impData?.branch?.id}`;

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

  return (
    <>
      <ScrollView style={styles.main}>
        <Header name={global?.user?.data?.user?.name} />

        <BranchAndLanguage callBack={() => getDashboardData()} />

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
