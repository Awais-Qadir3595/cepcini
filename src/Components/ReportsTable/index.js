import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Icon, Icons, Text} from '..';
import Modal from 'react-native-modal';
import {BaseColor, useTheme} from '../../config/theme';

const Index = ({isVisible, data, reportsLoading, toggleDrawer}) => {
  const colors = useTheme();

  return (
    <Modal
      isVisible={isVisible}
      style={styles.drawerModal}
      onBackButtonPress={toggleDrawer}
      onBackdropPress={toggleDrawer}>
      <View style={styles.drawerContainer}>
        <ScrollView style={styles.container}>
          <View>
            <TouchableOpacity onPress={toggleDrawer} style={styles.cross}>
              <Icon name={Icons.CROSS} color={colors.primary} size={25} />
            </TouchableOpacity>
          </View>
          {reportsLoading ? (
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <ActivityIndicator color={colors.primary} size={'large'} />
              <Text>{`Loading Report Data ...`}</Text>
            </View>
          ) : (
            <>
              {data && data?.data ? (
                data?.data?.getCustomReport?.tables.map((table, tableIndex) => (
                  <View key={tableIndex} style={styles.tableContainer}>
                    <Text style={styles.tableName}>{table.name}</Text>

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
                                {cell !== '' ? cell : '-'}
                              </Text>
                            ))}
                          </View>
                        ))}
                    </View>
                  </View>
                ))
              ) : (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text>{`No Report Data Available`}</Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};
export default Index;

const styles = StyleSheet.create({
  cross: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: BaseColor.primary,
    borderRadius: 3,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  drawerModal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
  drawerContainer: {
    height: '95%',
    backgroundColor: BaseColor.whiteColor,
    margin: 10,
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
