import React, {useContext} from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import AboutScreen from '../../screens/drawerScreens/AboutScreen';
import AppNavigator from "../AppNavigator";
import AccountNavigator from '../AccountNavigator';
import GroupNavigator from '../GroupNavigator';
import { AuthContext } from '../../context/AuthProvider';
import GroupDetailScreen from '../../screens/GroupDetailScreen';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import HelpScreen from '../../screens/HelpScreen';

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    const {isEmailVerified} = useContext(AuthContext);
    return (
    <Drawer.Navigator initialRouteName = "Home" drawerContent = {props => <DrawerContent {...props} /> }>
        <Drawer.Screen name="Home" component = {AppNavigator} />
        <Drawer.Screen name="About" component = {AboutScreen} options = {{headerShown: true}} />
        <Drawer.Screen name = "Profile" component = {AccountNavigator}/>
        <Drawer.Screen name = "Help" component = {HelpScreen} options = {{ headerShown: false}} />
    </Drawer.Navigator>
    )
    }
export default DrawerNavigator


