import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Row from '../core/Row';
import {ImagePerson, NotificationIcon, OptionIcon} from '../../assets/svgs';
import Label from '../core/Label';
import {Drawer} from '..';

export default function Header({name = ''}) {
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };
  return (
    <>
      <Drawer isDrawerVisible={isDrawerVisible} toggleDrawer={toggleDrawer} />
      <Row style={styles.main}>
        <Row style={styles.rw}>
          <ImagePerson />
          <View style={styles.names}>
            <Label label="Hello" size={14} color="grey" />
            <Label label={name} size={14} style={{marginTop: 3}} />
          </View>
        </Row>

        <Row style={styles.rw}>
          <NotificationIcon />
          <TouchableOpacity onPress={toggleDrawer}>
            <OptionIcon />
          </TouchableOpacity>
        </Row>
      </Row>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rw: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  names: {
    justifyContent: 'space-between',
    marginLeft: 10,
  },
});
