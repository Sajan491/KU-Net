import React from 'react'
import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from './app/navigation/navigationTheme';
import {NavigationContainer} from "@react-navigation/native"


export default function App() {

  return(
    <NavigationContainer theme={navigationTheme}>
      
      <AppNavigator />
    </NavigationContainer>
    )
  
}