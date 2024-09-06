// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Splash/splash';
import Login from '../screens/Login/login';
import MyTabs from './MyTabs';
import {ToastProvider} from 'react-native-toast-notifications';
import {NetworkProvider} from 'react-native-offline';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ToastProvider>
      <NetworkProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MyTabs"
              component={MyTabs}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NetworkProvider>
    </ToastProvider>
  );
}

export default App;
