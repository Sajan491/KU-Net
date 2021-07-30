import { createStackNavigator } from '@react-navigation/stack';
import React, {useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from "./AppNavigator";
import SecondRegisterScreen from "../screens/SecondRegisterScreen"
import { AuthContext } from '../context/AuthProvider';
import DrawerNavigator from "./drawer/DrawerNavigator";
import ThirdRegisterScreen from '../screens/ThirdRegisterScreen';

const Stack = createStackNavigator();
const TestNavigator = () => {
    const {isANewUser} = useContext(AuthContext)
    return (
      <Stack.Navigator>
         {isANewUser ? <Stack.Screen name = "SecondRegister" component = {SecondRegisterScreen} options = {{
           headerShown:false
         }} /> : null }
         {isANewUser ? <Stack.Screen name = "ThirdRegister" component = {ThirdRegisterScreen} options={({})=>({
                    headerShown: false,
                    
                })} /> : null }
          <Stack.Screen name = "Drawer" component = {DrawerNavigator} options = {{headerShown: false}} />
          <Stack.Screen name = "App" component = {AppNavigator} options = {{headerShown: false}} />
          
      </Stack.Navigator>
    )
}

export default TestNavigator

