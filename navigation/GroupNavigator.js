import { createStackNavigator } from "@react-navigation/stack";
import React from "react"
import GroupsScreen from "../screens/drawerScreens/GroupsScreen";
const Stack = createStackNavigator();

const GroupNavigator=()=>(
        <Stack.Navigator mode="modal">
            
            <Stack.Screen 
                name="Group" 
                component={GroupsScreen} 
            />
           
            
        </Stack.Navigator>
   
    
)

export default GroupNavigator;