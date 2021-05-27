import { createStackNavigator } from "@react-navigation/stack";
import React from "react"
import PostDetailScreen from "../screens/PostDetailScreen";
import GroupDetailScreen from "../screens/GroupDetailScreen";
import HomeScreen from "../screens/HomeScreen";
import ChatButton from "./ChatButton";
import Screen from '../components/Screen'

const Stack = createStackNavigator();

const FeedNavigator=()=>(
    
    <Stack.Navigator mode="modal">
        <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={({})=>({
                headerTintColor:'tomato', 
                headerStyle:{height:50},
                headerLeft:null,
                headerRight: ({navigation})=><ChatButton onPress={()=>console.log('helo')}/>
            })}
        />
        <Stack.Screen name="PostDetails" component={PostDetailScreen}/>
        <Stack.Screen name="GroupDetails" component={GroupDetailScreen}/>
    </Stack.Navigator>
    
)

export default FeedNavigator;