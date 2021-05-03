import { createStackNavigator } from "@react-navigation/stack";
import React from "react"
import PostDetailScreen from "../screens/PostDetailScreen";
import HomeScreen from "../screens/HomeScreen";
import ChatButton from "./ChatButton";
import MessagesScreen from "../screens/MessagesScreen";

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
    </Stack.Navigator>
)

export default FeedNavigator;