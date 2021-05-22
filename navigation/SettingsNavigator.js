import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import AccountSettings from "../screens/AccountSettings";
import ProfileSettings from "../screens/ProfileSettings";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator()

const SettingsNavigator = () => (
    <Stack.Navigator name="modal">
        <Stack.Screen name="Settings" component = {SettingsScreen} />
        <Stack.Screen name= "AccountSettings" component = {AccountSettings} />
        <Stack.Screen name = "ProfileSettings" component = {ProfileSettings} />
    </Stack.Navigator>
);

export default SettingsNavigator;