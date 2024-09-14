// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
 
import IncomeReport from '../screens/Tabs/IncomeReport/incomeReport';
import Dashboard from '../screens/Tabs/Dashboard/dashboard';

const Stack = createNativeStackNavigator();

function DrawerScreens() {
  return (
   
     
          <Stack.Navigator initialRouteName='Dashboard'>
           
          
           <Stack.Screen
            name="DashboardScreen"
            component={Dashboard}
            options={{
              headerShown: false,
            }}
          />

              <Stack.Screen
            name="IncomeReport"
            component={IncomeReport}
            options={{
              headerShown: false,
            }}
          />

             
          </Stack.Navigator>
   
  );
}

export default DrawerScreens;
