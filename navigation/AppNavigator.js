import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import { MaterialCommunityIcons , Entypo } from "@expo/vector-icons";
import AddButton from "./AddButton";
import AddPostScreen from "../screens/AddPostScreen";
import colors from "../config/colors";
import ChatNavigator from "./ChatNavigator";
import GroupNavigator from "./GroupNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator=()=>(

    <Tab.Navigator tabBarOptions={{activeTintColor: colors.primary,
    inactiveTintColor: 'gray',
        style:{height:65, paddingBottom:10, paddingHorizontal:10}
      }}>
        <Tab.Screen 
            name="Feed" 
            component={FeedNavigator}
            options={{
                tabBarIcon:({color, size})=><MaterialCommunityIcons name="home" size={32} color={color} />
            }}
        />
         <Tab.Screen 
            name="Groups" 
            component={GroupNavigator}
            options={{
                tabBarIcon:({color, size})=><MaterialCommunityIcons name="account-group" size={32} color={color} />
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
            name="Chat" 
            component={ChatNavigator} 
            options={{
                tabBarIcon:({color, size})=><Entypo name="chat" size={32} color={color} />
            }}
        />
        <Tab.Screen 
            name="Account" 
            component={AccountNavigator} 
            options={{
                tabBarIcon:({color, size})=><MaterialCommunityIcons name="account" size={32} color={color} />
            }}
        />
    </Tab.Navigator>
)

export default AppNavigator;