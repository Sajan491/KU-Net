import { createStackNavigator } from '@react-navigation/stack';
import React, {useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from "./AppNavigator";
import SecondRegisterScreen from "../screens/SecondRegisterScreen"
import { AuthContext } from '../context/AuthProvider';
const Stack = createStackNavigator();
const TestNavigator = () => {
    const {isANewUser} = useContext(AuthContext)
    return (
      <Stack.Navigator>
         {isANewUser ? <Stack.Screen name = "SecondRegister" component = {SecondRegisterScreen} /> : null }
          <Stack.Screen name = "App" component = {AppNavigator} options = {{headerShown: false}}/>
      </Stack.Navigator>
    )
}

export default TestNavigator

const styles = StyleSheet.create({})
