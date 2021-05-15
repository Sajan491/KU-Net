import React from 'react'
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import navigationTheme from './navigation/navigationTheme';
import {NavigationContainer} from "@react-navigation/native"
import Screen from "./components/Screen";
import { createStackNavigator } from "@react-navigation/stack";
import {AuthProvider} from "./context/AuthProvider"
import Providers from "./navigation"
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
// const Stack = createStackNavigator();

// const MainNavigator=()=>(
//   <Stack.Navigator>
//       <Stack.Screen name="Before" component={AuthNavigator} options={{ headerShown:false}}/>
//       <Stack.Screen name="After" component={AppNavigator} options={{ headerShown:false}}/>
//   </Stack.Navigator>
// )

export default function App() {

  
  return(
    <Providers />
    )
  
}