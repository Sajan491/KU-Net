import React, {useContext} from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import AboutScreen from '../../screens/drawerScreens/AboutScreen';
import AppNavigator from "../AppNavigator";
import { AuthContext } from '../../context/AuthProvider';
import HelpScreen from '../../screens/HelpScreen';
import UserProfileScreen from '../../screens/UserProfileScreen';

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    const {isEmailVerified} = useContext(AuthContext);
    return (
    <Drawer.Navigator initialRouteName = "Home" drawerContent = {props => <DrawerContent {...props} /> }>
        <Drawer.Screen name="Home" component = {AppNavigator} />
        <Drawer.Screen name="About" component = {AboutScreen} options = {{headerShown: true}} />
        <Drawer.Screen name = "UserProfile" component = {UserProfileScreen}/>
        <Drawer.Screen name = "Help" component = {HelpScreen} options = {{ headerShown: false}} />
    </Drawer.Navigator>
    )
    }
export default DrawerNavigator


