import React from 'react';
import {ScrollView, View, StyleSheet, Dimensions} from 'react-native';
import {Text} from '..';
import Modal from 'react-native-modal';
import {BaseColor} from '../../config/theme';

const Index = ({isVisible, data}) => {
  return (
    <Modal
      isVisible={isVisible}
      //   animationIn="slideInLeft"
      //   animationOut="slideOutLeft"
      //   onBackdropPress={toggleDrawer}
      //   onSwipeComplete={toggleDrawer}
      //   swipeDirection="left"
      style={styles.drawerModal}>
      <View style={styles.drawerContainer}>
        <ScrollView style={styles.container}>
          {data &&
            data?.tables &&
            data?.tables.map((table, tableIndex) => (
              <View key={tableIndex} style={styles.tableContainer}>
                {/* Table Name */}
                <Text style={styles.tableName}>{table.name}</Text>

                {/* Table Headers */}
                <View style={styles.tableHeader}>
                  {table.columns &&
                    table?.columns.map((column, colIndex) => (
                      <Text key={colIndex} style={styles.columnHeader}>
                        {column.header !== null
                          ? column.header
                          : `Column ${colIndex + 1}`}
                      </Text>
                    ))}
                </View>

                {/* Table Rows */}
                <View>
                  {table.rows &&
                    table?.rows.map((row, rowIndex) => (
                      <View key={rowIndex} style={styles.tableRow}>
                        {row.cells.map((cell, cellIndex) => (
                          <Text key={cellIndex} style={styles.tableCell}>
                            {cell !== '' ? cell : '-'}{' '}
                            {/* Display '-' if the cell is empty */}
                          </Text>
                        ))}
                      </View>
                    ))}
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </Modal>
  );
};
export default Index;

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  tableContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  tableName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 4,
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },
});
