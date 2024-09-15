import { BackHandler, Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import { styles } from './style';
import Label from '../../../Components/core/Label';
import Bold from '../../../Components/core/bold';
import Row from '../../../Components/core/Row';
import DrawHorizentalLine from '../../../Components/core/drawHorizentalLine';
import Modal from 'react-native-modal';
import { Icon, Icons } from '../../../Components';
import { useTheme } from '../../../config/theme';
import moment from 'moment';


const Index = ({ isVisible, data, toggleDrawer }) => {
  const colors = useTheme();
  console.log('aws');

  console.log(data?.raw_data?.payments.length);


  const renderOrders = ({ item }) => {



    return (
      <Row style={styles.rowData}>
        <Label label={item?.quantity} size={12} color='black' />
        <Label label={item?.name} size={12} />
        <Label label={item?.price} size={12} />
      </Row>
    )
  }

  return (
    <Modal
      isVisible={isVisible}
      style={styles.drawerModal}
      onBackButtonPress={toggleDrawer}
      onBackdropPress={toggleDrawer}
      backdropColor={'grey'} backdropOpacity={1}>
      <View style={styles.drawerContainer}>
        <View style={styles.main}>

          <View>
            <TouchableOpacity onPress={toggleDrawer} style={styles.cross}>
              <Icon name={Icons.CROSS} color={colors.primary} size={25} />
            </TouchableOpacity>
          </View>
          <Bold
            label="AWS Machine Branch-2"
            style={styles.heading}
            size={18}
            color={'black'}
          />
          <Row style={styles.dateTime}>
            <Label label={moment(data?.date).format('DD-MM-YYYY')} />
            <Label label={moment(data?.date).format('HH:mm:ss A')} />
          </Row>
          <Label label={"Ticket Id # " + data?.id} style={styles.txt} />
          <Label label="Mr.John" style={styles.txt} />
          <DrawHorizentalLine borderStyle="dashed" style={styles.line} />

          <Row style={styles.rwHead}>
            <Bold label="Qty" />
            <Bold label="Name" />
            <Bold label="Price" />
          </Row>

          <FlatList
            data={
              data?.raw_data?.orders
            }
            renderItem={renderOrders}
            keyExtractor={(item, index) => index.toString()}


          />



          <View style={styles.middle}>

            <View style={styles.rightRound}></View>
            <View style={styles.leftRound}></View>
          </View>
          <View style={styles.lowerView}>
            <DrawHorizentalLine borderStyle="dashed" style={styles.line} />
            <Row style={styles.rowLower}>
              <Label label="Ticket type" size={13} />
              <Bold label="Delivery" size={13} />
            </Row>

            <Row style={styles.rowLower}>
              <Label label="Total Amount " size={13} />
              <Bold label={'$' + data?.total_amount} size={13} />
            </Row>

            <Row style={styles.rowLower}>
              <Label label="Remaining amount" size={13} />
              <Bold label={'$' + data?.remaining_amount} size={13} />
            </Row>

            <Row style={styles.rowLower}>
              <Label label="Cash" size={13} />
              <Bold label={data?.raw_data?.payments.length == 0 ?
                'null' :
                data?.raw_data?.payments[0].amount} size={13} />
            </Row>

            <DrawHorizentalLine
              borderStyle="dashed"
              style={styles.line}
              color="grey"
            />
          </View>

          <Bold label='Thankyou' style={styles.thankyou} />
        </View>
      </View>
    </Modal>
  );
};
export default Index;
