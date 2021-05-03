import React from 'react'
import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from './app/navigation/navigationTheme';
import {NavigationContainer} from "@react-navigation/native"
import Screen from "./app/components/Screen";

export default function App() {

  return(
    <Screen>
      <NavigationContainer theme={navigationTheme}>
        
        <AppNavigator />
      </NavigationContainer>
    </Screen>
    )
  
}