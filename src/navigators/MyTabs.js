import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import * as SVG from '../assets/svgs';
import Label from '../Components/core/Label';
import Bold from '../Components/core/bold';
import Dashboard from '../screens/Tabs/Dashboard/dashboard';
import IncomeReport from '../screens/Tabs/IncomeReport/incomeReport';
import SalesReport from '../screens/Tabs/SalesReport/salesReport';
import Tickets from '../screens/Tabs/Tickets/tickets';
import Products from '../screens/Tabs/Products/products';
import {BaseColor, useTheme} from '../config/theme';
import TicketsStack from './ticketsSkack';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const colors = useTheme();
  const tabBar = [
    {
      id: 1,
      route: 'SalesReport',
      Label: 'Sales Report',
      component: SalesReport,
      activeIcon: <SVG.SalesReportIcon color={colors.primary} />,
      InActive: <SVG.SalesReportIcon />,
    },
    {
      id: 2,
      route: 'TicketsStack',
      Label: 'Tickets',
      component: TicketsStack,
      activeIcon: <SVG.TicketIcon color={colors.primary} />,
      InActive: <SVG.TicketIcon />,
    },
    {
      id: 3,
      route: 'Dashboard',
      Label: 'Dashboard',
      component: Dashboard,
      activeIcon: <SVG.DashboardIcon color={colors.whiteColor} />,
      InActive: <SVG.DashboardIcon color={colors.textGrey} />,
    },
    {
      id: 4,
      route: 'IncomeReport',
      Label: 'Income Report',
      component: IncomeReport,
      activeIcon: <SVG.IncomeReportIcon color={colors.primary} />,
      InActive: <SVG.IncomeReportIcon />,
    },
    {
      id: 5,
      route: 'Products',
      Label: 'Products',
      component: Products,
      activeIcon: <SVG.ProductIcon color={colors.primary} />,
      InActive: <SVG.ProductIcon />,
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          marginBottom: 1,
        },
      }}>
      {tabBar.map((item, index) => {
        if (item.route === 'Dashboard') {
          return (
            <Tab.Screen
              key={item.id}
              name={item.Label}
              component={item.component}
              options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                  <View style={styles.middleTabContainer}>
                    {focused ? <>{item.activeIcon}</> : <>{item.InActive}</>}
                  </View>
                ),
              }}
            />
          );
        }

        return (
          <Tab.Screen
            key={item.id}
            name={item.Label}
            component={item.component}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <View style={styles.main}>
                  {focused ? <>{item.activeIcon}</> : <>{item.InActive}</>}
                  {focused ? (
                    <Bold label={item.Label} size={10} color={colors.primary} />
                  ) : (
                    <Label
                      label={item.Label}
                      size={10}
                      color={colors.textGrey}
                    />
                  )}
                </View>
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default MyTabs;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
  },
  middleTabContainer: {
    position: 'absolute',
    bottom: 35,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 27,
    backgroundColor: BaseColor.primary,
  },
  middleTab: {},
});
