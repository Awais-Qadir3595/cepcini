import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Row from '../core/Row';
import Label from '../core/Label';
import {EditIcon} from '../../assets/svgs';

export default function ProductsData({id, name, groupCode, price, onEdit}) {
  return (
    <Row style={styles.main}>
      <View style={styles.viewId}>
        <Label label={id} size={12} />
      </View>
      <View style={styles.viewName}>
        <Label label={name} size={10} />
      </View>
      <View style={styles.viewName}>
        <Label label={groupCode} size={10} />
      </View>
      <View style={styles.viewName}>
        <Label label={price} size={12} />
      </View>
      <TouchableOpacity style={styles.icons} onPress={onEdit}>
        <EditIcon />
        {/* <DeleteIcon/> */}
      </TouchableOpacity>
    </Row>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    padding: 5,
    marginVertical: 5,
  },
  viewId: {
    width: '20%',
    justifyContent: 'center',
  },
  icons: {
    width: '20%',
    alignItems: 'center',
  },
  viewName: {
    width: '20%',
    alignItems: 'center',
  },
});
