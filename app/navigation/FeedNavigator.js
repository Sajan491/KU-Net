import { createStackNavigator } from "@react-navigation/stack";
import React from "react"
import PostDetailScreen from "../screens/PostDetailScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const FeedNavigator=()=>(
    <Stack.Navigator mode="modal">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="PostDetails" component={PostDetailScreen}/>
    </Stack.Navigator>
)

export default FeedNavigator;