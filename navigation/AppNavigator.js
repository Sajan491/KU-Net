import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddButton from "./AddButton";
import AddPostScreen from "../screens/AddPostScreen";

const Tab = createBottomTabNavigator();

const AppNavigator=()=>(
    <Tab.Navigator tabBarOptions={{
        style:{height:65, paddingBottom:5}
      }}>
        <Tab.Screen 
            name="Feed" 
            component={FeedNavigator}
            options={{
                tabBarIcon:({color, size})=><MaterialCommunityIcons name="home" size={35} color={color} />
            }}
        />
        <Tab.Screen 
            name="AddPost" 
            component={AddPostScreen} 
            options={({navigation})=>({
                tabBarButton:()=> <AddButton onPress={()=>navigation.navigate("AddPost")} />,
                tabBarIcon:({color, size})=><MaterialCommunityIcons name="plus-circle" size={35} color={color} />
            })}
        />
        <Tab.Screen 
            name="Account" 
            component={AccountNavigator} 
            options={{
                tabBarIcon:({color, size})=><MaterialCommunityIcons name="account" size={35} color={color} />
            }}
        />
    </Tab.Navigator>
)

export default AppNavigator;