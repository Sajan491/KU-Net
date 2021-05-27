import { createStackNavigator } from "@react-navigation/stack";
import React from "react"
import MessagesScreen from "../screens/MessagesScreen";
const Stack = createStackNavigator();

const ChatNavigator=()=>(
        <Stack.Navigator mode="modal">
            
            <Stack.Screen 
                name="Chat" 
                component={MessagesScreen} 
                options={({})=>({
                    headerShown: false,
                })}
            />
           
            
        </Stack.Navigator>
   
    
)

export default ChatNavigator;