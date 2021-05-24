import React from 'react'

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SplashScreen from '../screens/SplashScreen';

const Stack1 = createStackNavigator();

const AuthNavigator=()=>(
    <Stack1.Navigator>
        <Stack1.Screen name="Splash" component={SplashScreen} options={{ headerShown:false}}/>
        <Stack1.Screen name="Login" component={LoginScreen} />
        <Stack1.Screen name="Register" component={RegisterScreen} />
    </Stack1.Navigator>
)

export default AuthNavigator;