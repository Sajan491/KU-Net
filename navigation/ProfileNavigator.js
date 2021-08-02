import { createStackNavigator } from "@react-navigation/stack";
import React from "react"
import UserProfileScreen from "../screens/UserProfileScreen";
import ProfileSettings from "../screens/ProfileSettings";
import AccountSettings from "../screens/AccountSettings";

const Stack = createStackNavigator();

const ProfileNavagator=()=>(
    <Stack.Navigator mode="modal">

         <Stack.Screen name = "UserProfile" component = {UserProfileScreen} options = {{headerShown: false }}/>
        <Stack.Screen name = "ProfileSettings" component = {ProfileSettings} />
        <Stack.Screen name = "AccountSettings" component = {AccountSettings} />
        
    </Stack.Navigator>
)


export default ProfileNavagator;