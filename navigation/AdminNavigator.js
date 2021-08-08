import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import AdminScreen from '../screens/AdminScreen';
import AdminDetailScreen from '../screens/AdminDetailScreen';


const Stack = createStackNavigator()

const AdminNavigator = () => (
    <Stack.Navigator name="modal">
        <Stack.Screen name="Admin" component = {AdminScreen} options = {{headerShown: false }} />
        
        <Stack.Screen name="AdminDetail" component = {AdminDetailScreen} options = {{headerShown: false }} />
    </Stack.Navigator>
);

export default AdminNavigator;