import React from 'react'

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, Text, View, SafeAreaView, Button, Image} from 'react-native';
import DrawerNavigator from "./routes/DrawerNavigator";

//import screens
import LoginScreen from "./screens/LoginScreen";
import SplashScreen from "./screens/SplashScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createStackNavigator()

const Auth = () => {
  //Stack Navigator for the Login and Register Screen
  return(
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen 
        name = "LoginScreen"
        component = {LoginScreen}
        options = {{headerShown: false}}
      />
      <Stack.Screen 
        name = "RegisterScreen"
        component = {RegisterScreen}
        options = {{title: "Register", 
        headerStyle: {
          backgroundColor: "#307ecc"
        },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName ="SplashScreen">
        <Stack.Screen 
          name = "SplashScreen"
          component = {SplashScreen}
          options = {{headerShown: false}}
        />
        <Stack.Screen 
          name = "Auth"
          component = {Auth}
          options = {{headerShown: false}}
        />
          <Stack.Screen 
          name = "DrawerNavigator"
          component = {DrawerNavigator}
          options = {{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
