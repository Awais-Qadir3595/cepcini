import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {ImagePerson} from '../../assets/svgs';
import Label from '../core/Label';
import {BaseColor, useTheme} from '../../config/theme';
import {Icon, Icons, Text} from '..';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const CustomDrawer = ({isDrawerVisible, toggleDrawer}) => {
  const colors = useTheme();
  const navigation = useNavigation();

  const onLogout = async () => {
    await AsyncStorage.removeItem('@UserData');
    await AsyncStorage.removeItem('@isLoggedIn');
    navigation.replace('Login');
  };
  return (
    <Modal
      isVisible={isDrawerVisible}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      onBackdropPress={toggleDrawer}
      onSwipeComplete={toggleDrawer}
      swipeDirection="left"
      style={styles.drawerModal}>
      <View style={styles.drawerContainer}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.cross}>
          <Icon name={Icons.CROSS} color={colors.primary} size={25} />
        </TouchableOpacity>
        <View style={styles.rw}>
          <ImagePerson />
          <View style={styles.names}>
            <Label label="Hello" size={14} color="grey" />
            <Label
              label={global?.user?.data?.user?.name}
              size={14}
              style={{marginTop: 3}}
            />
            <Label
              label={`${global?.user?.data?.user?.email}`}
              size={14}
              style={{marginTop: 3}}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.item}>
          <View style={styles.itemIcon}>
            <Icon
              name={Icons.LOGOUT}
              type="ant"
              color={colors.primary}
              size={20}
            />
          </View>
          <Text body1>Close Drawer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <View style={styles.itemIcon}>
            <Icon
              name={Icons.LOGOUT}
              type="ant"
              color={colors.primary}
              size={20}
            />
          </View>
          <Text body1>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <View style={styles.itemIcon}>
            <Icon
              name={Icons.LOGOUT}
              type="ant"
              color={colors.primary}
              size={20}
            />
          </View>
          <Text body1>Work Period Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={onLogout}>
          <View style={styles.itemIcon}>
            <Icon
              name={Icons.LOGOUT}
              type="ant"
              color={colors.primary}
              size={20}
            />
          </View>
          <Text body1>Logout</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cross: {
    height: 50,
    width: 50,
    backgroundColor: BaseColor.whiteColor,
    position: 'absolute',
    right: -52,
    top: 30,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 5,
  },
  rw: {
    flexDirection: 'row',
    margin: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.secondary,
  },
  names: {
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  drawerModal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
  drawerContainer: {
    width: Dimensions.get('window').width * 0.75,
    height: '100%',
    backgroundColor: BaseColor.whiteColor,
    padding: 20,
  },
});

export default CustomDrawer;
