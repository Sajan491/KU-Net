import React from 'react'
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from './app/navigation/navigationTheme';
import {NavigationContainer} from "@react-navigation/native"
import Screen from "./app/components/Screen";

export default function App() {

  return(
    <Screen>
      <NavigationContainer theme={navigationTheme}>
        <AuthNavigator />
        
          {/* <AppNavigator /> */}
        
      </NavigationContainer>
    </Screen> 
    )
  
}