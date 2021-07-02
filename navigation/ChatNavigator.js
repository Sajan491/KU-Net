import { createStackNavigator } from "@react-navigation/stack";
import React from "react"
import MessagesScreen from "../screens/MessagesScreen";
import ChatScreen from "../screens/ChatScreen";
const Stack = createStackNavigator();

const ChatNavigator=()=>(
        <Stack.Navigator mode="modal">
            
            <Stack.Screen 
                name="Messages" 
                component={MessagesScreen} 
                options={({})=>({
                    headerShown: false,
                })}
            />
                 <Stack.Screen 
                name="Chat" 
                component={ChatScreen} 
                options={({route})=>({
                    title: route.params.userName,
                    headerTitleAlign: "center"
                })}
            />
            
        </Stack.Navigator>
   
    
)

export default ChatNavigator;