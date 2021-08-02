import { createStackNavigator } from "@react-navigation/stack";
import React from "react"
import AddPostScreen from "../screens/AddPostScreen";
import AddFilesScreen from "../screens/AddFilesScreen";
import AddPostOrFileScreen from "../screens/AddPostOrFileScreen";

const Stack = createStackNavigator();

const AddPostNavigator=()=>(

        <Stack.Navigator mode="modal">
            
            <Stack.Screen 
                name="ChoiceScreen" 
                component={AddPostOrFileScreen} 
                
                options={({})=>({
                    headerShown: false,
                })}
            />
            <Stack.Screen name = "AddPost" component = {AddPostScreen} options = {{headerShown: false }}/>
            <Stack.Screen name = "AddFile" component = {AddFilesScreen} options = {{headerShown: false }}/>
            
        </Stack.Navigator>

    
)

export default AddPostNavigator;