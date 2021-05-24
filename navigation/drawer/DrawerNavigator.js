import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import SettingsScreen from "../screens/SettingsScreen";
import AccountScreen from '../screens/AccountScreen';
import DrawerContent from "./DrawerContent";
import AboutScreen from '../screens/drawerScreens/AboutScreen';
import AppNavigator from "../navigation/AppNavigator";

const Drawer = createDrawerNavigator()
const DrawerNavigator = () => (
    <Drawer.Navigator initialRouteName = "Home" drawerContent = {props => <DrawerContent {...props} /> }>
        <Drawer.Screen name="Home" component = {AppNavigator} />
        <Drawer.Screen name="About" component = {AboutScreen} options = {{headerShown: true}} />
    </Drawer.Navigator>
    )

export default DrawerNavigator


