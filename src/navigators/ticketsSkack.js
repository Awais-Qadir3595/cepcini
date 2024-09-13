// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tickets from '../screens/Tabs/Tickets/tickets';
import TicketsDetail from '../screens/Tabs/TicketsDetail/ticketsDetail';
 
 

const Stack = createNativeStackNavigator();

function TicketsStack() {
  return (
    
   
       
          <Stack.Navigator>
            <Stack.Screen
              name="Tickets"
              component={Tickets}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TicketsDetail"
              component={TicketsDetail}
              options={{
                headerShown: false,
              }}
            />
           
          </Stack.Navigator>
     
  
  );
}

export default TicketsStack;
