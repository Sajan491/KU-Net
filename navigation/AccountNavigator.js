import { createStackNavigator } from "@react-navigation/stack";
import React from "react"
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import SecondRegisterScreen from "../screens/SecondRegisterScreen";

const Stack = createStackNavigator();

const AccountNavigator=()=>(
    <Stack.Navigator mode="modal">
        <Stack.Screen name="Account" component={AccountScreen} options={{
                headerLeft:null,
                
            }}/>
        <Stack.Screen name="Messages" component={MessagesScreen}/>
        <Stack.Screen name="SecondRegister" component={SecondRegisterScreen}/>
    </Stack.Navigator>
)

export default AccountNavigator;