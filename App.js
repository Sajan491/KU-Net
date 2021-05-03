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

import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCWdmIAjwE9HzKWQha8obHsfozDS4ZdxkM",
  authDomain: "ku-net-b0cf0.firebaseapp.com",
  projectId: "ku-net-b0cf0",
  storageBucket: "ku-net-b0cf0.appspot.com",
  messagingSenderId: "993085530228",
  appId: "1:993085530228:web:521a21de7054ee3545f121"  
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator()

//Stack Navigator for the Login and Register Screen
const Auth = () => {
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
      <Stack.Navigator initialRouteName ="Auth">
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
