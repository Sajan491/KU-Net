import React from 'react'
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from './app/navigation/navigationTheme';
import {NavigationContainer} from "@react-navigation/native"
import Screen from "./app/components/Screen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const MainNavigator=()=>(
  <Stack.Navigator>
      <Stack.Screen name="Before" component={AuthNavigator} options={{ headerShown:false}}/>
      <Stack.Screen name="After" component={AppNavigator} options={{ headerShown:false}}/>
  </Stack.Navigator>
)

export default function App() {

  
  return(
    <Screen>
      
      <NavigationContainer theme={navigationTheme}>
        
          <MainNavigator />
        
      </NavigationContainer>
    </Screen> 
    )
  
}