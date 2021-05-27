import { createStackNavigator } from "@react-navigation/stack";
import React from "react"
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import SettingsNavigator from "./SettingsNavigator";
const Stack = createStackNavigator();

const AccountNavigator=()=>(
    <Stack.Navigator mode="modal">
        <Stack.Screen name="Account" component={AccountScreen} options={{
                headerShown: false,          
            }}/>
        <Stack.Screen name="Messages" component={MessagesScreen}/>
        <Stack.Screen name = "Settings" component = {SettingsNavigator} options = {{headerShown: false }}/>
    </Stack.Navigator>
)

export default AccountNavigator;