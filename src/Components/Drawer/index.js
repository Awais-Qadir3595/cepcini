import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';

const CustomDrawer = ({isDrawerVisible, toggleDrawer}) => {
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
        <Text style={styles.drawerText}>Custom Drawer Content</Text>
        <TouchableOpacity onPress={toggleDrawer} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close Drawer</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  drawerModal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
  drawerContainer: {
    width: Dimensions.get('window').width * 0.75, // 75% of the screen width
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  drawerText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#006DFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomDrawer;
