import React, {useState} from 'react';
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
import Row from '../../../Components/core/Row';
import {BackIcon} from '../../../assets/svgs';
import Label from '../../../Components/core/Label';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Calender, Countries} from '../../../assets/svgs';
import Bold from '../../../Components/core/bold';
import {colorsTheme} from '../../../Services/Color';
import Modal from 'react-native-modal';
import DrawHorizentalLine from '../../../Components/core/drawHorizentalLine';
import {stylesModel} from './modelStyle';

const TicketsDetail = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [ticketsData, setTicketsData] = useState(null);

  return (
    <ScrollView style={styles.main}>
      <Modal isVisible={true} backdropColor={'grey'} backdropOpacity={1}>
        <View style={stylesModel.main}>
          <View style={stylesModel.rightRound}></View>
          <View style={stylesModel.leftRound}></View>
          <Bold
            label="AWS Machine Branch-2"
            style={stylesModel.heading}
            size={16}
            color={'black'}
          />
          <Row style={stylesModel.dateTime}>
            <Label label="02/05/2023" size={13} />
            <Label label="11:36:20 AM" size={13} />
          </Row>
          <Label
            label="Ticket Id # 12345678"
            style={stylesModel.txt}
            size={13}
          />
          <Label label="Mr.John" style={stylesModel.txt} size={13} />
          <DrawHorizentalLine borderStyle="dashed" style={stylesModel.line} />

          <Row style={stylesModel.rwHead}>
            <Bold label="Qty" size={13} />
            <Bold label="Name" size={13} />
            <Bold label="Price" size={13} />
          </Row>
          <Row style={stylesModel.rowData}>
            <Label label="01" size={12} />
            <Label label="Toasted Bagal Jam" size={12} />
            <Label label="$1200" size={12} />
          </Row>
          <Row style={stylesModel.rowData}>
            <Label label="01" size={12} />
            <Label label="Toasted Bagal Jam" size={12} />
            <Label label="$1200" size={12} />
          </Row>
          <Row style={stylesModel.rowData}>
            <Label label="01" size={12} />
            <Label label="Toasted Bagal Jam" size={12} />
            <Label label="$1200" size={12} />
          </Row>
          <View style={stylesModel.lowerView}>
            <DrawHorizentalLine borderStyle="dashed" style={stylesModel.line} />
            <Row style={stylesModel.rowLower}>
              <Label label="Ticket type" size={13} />
              <Bold label="Delivery" size={13} />
            </Row>

            <Row style={stylesModel.rowLower}>
              <Label label="Total Amount " size={13} />
              <Bold label="$2.34" size={13} />
            </Row>

            <Row style={stylesModel.rowLower}>
              <Label label="Remaining amount" size={13} />
              <Bold label="$3.45" size={13} />
            </Row>

            <Row style={stylesModel.rowLower}>
              <Label label="Cash" size={13} />
              <Bold label="$3.45" size={13} />
            </Row>

            <DrawHorizentalLine
              borderStyle="dashed"
              style={stylesModel.line}
              color="grey"
            />

            <Bold
              label="Thank you !"
              style={stylesModel.heading}
              color="black"
            />
          </View>
        </View>
      </Modal>

      <Row style={styles.rw}>
        <BackIcon />
        <Label label="Tickets Detail" size={20} style={styles.heading} />
      </Row>
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
            items={[
              {label: 'Football', value: 'football'},
              {label: 'Baseball', value: 'baseball'},
              {label: 'Hockey', value: 'hockey'},
            ]}
          />
        </View>
        <View style={styles.oneside}>
          <TouchableOpacity onPress={() => setShow(true)}>
            <Row style={{alignItems: 'center'}}>
              <Label label={date.toString()} size={12} />
              <Calender />
            </Row>
          </TouchableOpacity>
        </View>
      </Row>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Bold label="Tickets Detail" size={24} color="black" />
      <Label
        label="Tickets / Tickets Details"
        size={14}
        color="grey"
        style={styles.subheading}
      />

      <View style={styles.detailContainer}>
        <Label
          label="Miscellaneous Details"
          size={18}
          color={colorsTheme.primary}
        />
        <Row style={styles.Rowdetail}>
          <View style={styles.oneside}>
            <Label label="Customer name" />
          </View>
          <View style={styles.oneside}>
            <Label label="Date" />
          </View>
        </Row>

        <Row style={styles.Rowdetail}>
          <View style={styles.oneside}>
            <Label label="John" color="grey" size={15} />
          </View>
          <View style={styles.oneside}>
            <Label label="2/12/2024. 9:30:21 AM" size={15} color="grey" />
          </View>
        </Row>

        <Row style={styles.Rowdetail}>
          <View style={styles.oneside}>
            <Label label="Ticket Id" />
          </View>
          <View style={styles.oneside}>
            <Label label="Table" />
          </View>
        </Row>

        <Row style={styles.Rowdetail}>
          <View style={styles.oneside}>
            <Label label="2345" color="grey" size={15} />
          </View>
          <View style={styles.oneside}>
            <Label label="null" size={15} color="grey" />
          </View>
        </Row>

        <Label label="Notes" />
        <Label
          color="grey"
          size={15}
          label="Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document "
        />
      </View>

      <View style={styles.orderContainer}>
        <Label label="Order Details" size={18} color={colorsTheme.primary} />
        <Label label="Herbal tea" />
        <Label label="1.35" size={15} />
        <Row style={styles.rowclose}>
          <Label label="quantity :" size={15} />
          <Label label="3" style={{marginHorizontal: 5}} size={15} />
        </Row>
        <Row style={styles.rowclose}>
          <Label label="Portion :" size={15} />
          <Label label="normal" style={{marginHorizontal: 5}} size={15} />
        </Row>
      </View>
      <View style={styles.orderContainer}>
        <Label label="Amount Detail" size={18} color={colorsTheme.primary} />
        <Row style={styles.Rowdetail}>
          <View style={styles.oneside}>
            <Label label="Total amount" size={15} />
          </View>
          <View style={styles.oneside}>
            <Label label="Remaining amount" size={15} />
          </View>
        </Row>

        <Row style={styles.Rowdetail}>
          <View style={styles.oneside}>
            <Label label="0.78" color="grey" size={15} />
          </View>
          <View style={styles.oneside}>
            <Label label="0.0" color="grey" size={15} />
          </View>
        </Row>
      </View>

      <View style={{...styles.orderContainer, marginBottom: 40}}>
        <Label label="Payments Detail" size={18} color={colorsTheme.primary} />
        <Row style={styles.Rowdetail}>
          <View style={styles.oneside}>
            <Label label="Status" size={15} />
          </View>
          <View style={styles.oneside}>
            <Label label="Source" size={15} />
          </View>
        </Row>

        <Row style={styles.Rowdetail}>
          <View style={styles.oneside}>
            <Label label="unpaid" color="grey" size={15} />
          </View>
          <View style={styles.oneside}>
            <Label label="online orders" color="grey" size={15} />
          </View>
        </Row>
      </View>
    </ScrollView>
  );
};
export default TicketsDetail;
