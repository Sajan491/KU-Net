import { createStackNavigator } from "@react-navigation/stack";
import React from "react"
import PostDetailScreen from "../screens/PostDetailScreen";
import GroupDetailScreen from "../screens/GroupDetailScreen";
import HomeScreen from "../screens/HomeScreen";

import NotificationsScreen from "../screens/NotificationsScreen";
import CommentsScreen from "../screens/CommentsScreen";

const Stack = createStackNavigator();

const FeedNavigator=()=>(

        <Stack.Navigator mode="modal">
            
            <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                
                options={({})=>({
                    headerShown: false,
                    // headerTintColor:'tomato', 
                    // headerStyle:{height:70, backgroundColor:colors.light, elevation: 0},
                    // headerLeft:null,
                })}
            />
            <Stack.Screen name="Post Detail" component={PostDetailScreen}/>
            <Stack.Screen name="Notifications" component={NotificationsScreen}/>
              <Stack.Screen name="GroupDetails" component={GroupDetailScreen} options= {({route}) => ({
                  title: route.params.abbr,
                  headerTitleAlign: "center"
              })}/>
            <Stack.Screen name="Comments" component={CommentsScreen}/>
            
        </Stack.Navigator>

    
)

export default FeedNavigator;