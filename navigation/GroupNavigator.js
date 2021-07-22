import { createStackNavigator } from "@react-navigation/stack";
import React from "react"
import GroupsScreen from "../screens/drawerScreens/GroupsScreen";
const Stack = createStackNavigator();
import GroupDetailScreen from "../screens/GroupDetailScreen";
import CommentsScreen from "../screens/CommentsScreen";
import {GroupProvider} from "../context/GroupProvider"
const GroupNavigator=()=>(
    <GroupProvider>
        <Stack.Navigator mode="modal">
            
            <Stack.Screen 
                name="Group" 
                component={GroupsScreen} 
                options ={{
                    headerShown: false
                }}
            />
            <Stack.Screen name = "GroupDetails" component = {GroupDetailScreen} options = {({route}) => ({
                title: route.params.title,
                headerTitleAlign: "center"
            })}/>
            <Stack.Screen name="Comments" component={CommentsScreen}/>
            
        </Stack.Navigator>
       </GroupProvider>
    
)

export default GroupNavigator;