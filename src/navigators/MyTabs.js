// import React from "react";
// import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { colorsTheme } from "../Services/Color";
// import { StyleSheet, TouchableOpacity, View } from "react-native";
// import * as SVG from '../assets/svgs';

// import Label from "../Components/core/Label";
// import Bold from "../Components/core/bold";
// import Dashboard from "../screens/Tabs/Dashboard/dashboard";
// import IncomeReport from "../screens/Tabs/IncomeReport/incomeReport";
// import SalesReport from "../screens/Tabs/SalesReport/salesReport";
// import Tickets from "../screens/Tabs/Tickets/tickets";
// import Products from "../screens/Tabs/Products/products";
// const Tab = createBottomTabNavigator();

// const MyTabs = () => {


//   const tabBar = [
//     {
//       id: 1, route: 'SalesReport', Label: 'Sales Report', component: SalesReport, activeIcon: 'SalesIcon', InActive: 'SalesIcon'
//     },
//     {
//       id: 2, route: 'Tickets', Label: 'Tickets', component: Tickets, activeIcon: 'Tickets', InActive: 'Tickets'
//     },
//     {
//       id: 3, route: 'IncomeReport', Label: 'Income Report', component: IncomeReport, activeIcon: 'IncomeReport', InActive: 'IncomeReport'
//     },
//     {
//       id: 4, route: 'Products', Label: 'Products', component: Products, activeIcon: 'Products', InActive: 'Products'
//     },
//   ]
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           height: 70,
//           marginBottom: 1,
//           elevation: 10,
//           borderTopLeftRadius: 30,
//           borderTopEndRadius: 30,
//           backgroundColor: 'white',
//           shadowColor: colorsTheme.primary

//         }
//       }}>

//       {
//         tabBar.map((item, index) => {

//           const ActiveIcon = SVG[item.activeIcon];
//           const InActiveIcon = SVG[item.InActive];
//           return (
//             <>
//               <Tab.Screen name={item.Label} component={item.component} options={{
//                 headerShown: false,
//                 tabBarIcon: ({ focused }) => (
//                   <View style={styles.main}>
//                     {focused ? <ActiveIcon /> : <InActiveIcon />}
//                     {focused ?
//                       <Bold label={item.Label} size={12} color={colorsTheme.primary} /> :
//                       <Label label={item.Label} size={12} color={colorsTheme.primary} />
//                     }

//                   </View>
//                 )
//               }} />


//             </>
//           )
//         })
//       }

     

//     </Tab.Navigator>
//   );
// }
// export default MyTabs;

// const styles = StyleSheet.create({
//   main: {
//     alignItems: 'center'
//   }
// })
//////////////////////////////////////////////////////////////////////

import React from "react";
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colorsTheme } from "../Services/Color";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as SVG from '../assets/svgs';

import Label from "../Components/core/Label";
import Bold from "../Components/core/bold";
import Dashboard from "../screens/Tabs/Dashboard/dashboard";
import IncomeReport from "../screens/Tabs/IncomeReport/incomeReport";
import SalesReport from "../screens/Tabs/SalesReport/salesReport";
import Tickets from "../screens/Tabs/Tickets/tickets";
import Products from "../screens/Tabs/Products/products";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const tabBar = [
    {
      id: 1, route: 'SalesReport', Label: 'Sales Report', component: SalesReport, activeIcon: 'SalesIcon', InActive: 'SalesIcon'
    },
    {
      id: 2, route: 'Tickets', Label: 'Tickets', component: Tickets, activeIcon: 'Tickets', InActive: 'Tickets'
    },
    {
      id: 3, route: 'Dashboard', Label: 'Dashboard', component: Dashboard, activeIcon: 'DashboardTab', InActive: 'DashboardTab'
    },
    {
      id: 4, route: 'IncomeReport', Label: 'Income Report', component: IncomeReport, activeIcon: 'IncomeReport', InActive: 'IncomeReport'
    },
    {
      id: 5, route: 'Products', Label: 'Products', component: Products, activeIcon: 'Products', InActive: 'Products'
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          
          height: 70,
          marginBottom: 1,
          // elevation: 10,
          // borderTopLeftRadius: 30,
          // borderTopEndRadius: 30,
          // backgroundColor: 'white',
          // shadowColor: colorsTheme.primary
        }
      }}>

      {tabBar.map((item, index) => {
        const ActiveIcon = SVG[item.activeIcon];
        const InActiveIcon = SVG[item.InActive];
      
        if (item.route === 'Dashboard') {
         
          
          return (
            <Tab.Screen key={item.id} name={item.Label} component={item.component} options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (

                <View style={styles.middleTabContainer}>
                {focused ? <ActiveIcon /> : <InActiveIcon />}
                {/* {focused ?
                  <Bold label={item.Label} size={10} color={colorsTheme.primary} /> :
                  <Label label={item.Label} size={10} color={colorsTheme.primary} />
                } */}
              </View>
                // <TouchableOpacity style={styles.middleTabContainer} onPress={()=>console.log(item.component)
                // }>
                //   <View style={styles.middleTab}>
                //     <ActiveIcon />
                //   </View>
                // </TouchableOpacity>
              )
            }} />
          );
        }

        return (
          <Tab.Screen key={item.id} name={item.Label} component={item.component} options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={styles.main}>
                {focused ? <ActiveIcon /> : <InActiveIcon />}
                {focused ?
                  <Bold label={item.Label} size={10} color={colorsTheme.primary} /> :
                  <Label label={item.Label} size={10} color={colorsTheme.primary} />
                }
              </View>
            )
          }} />
        );
      })}
    </Tab.Navigator>
  );
}

export default MyTabs;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
     
    
  },
  middleTabContainer: {
    position: 'absolute',
    bottom: 35,
    
    // transform: [{ translateX: -35 }],
    
    // alignSelf:'center'
  },
  middleTab: {
    
      
     
     
    
     

  },
});
