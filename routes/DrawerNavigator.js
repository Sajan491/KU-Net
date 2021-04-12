import React from 'react'
import {createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreenStack from "./HomeScreenStack";
import AboutScreenStack from "./AboutScreenStack";

const Drawer = createDrawerNavigator();
  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        >
        <Drawer.Screen
          name="HomeScreenStack"
          options={{drawerLabel: 'Home'}}
          component={HomeScreenStack}
        />
        <Drawer.Screen
          name="AboutScreenStack"
          options={{drawerLabel: 'About'}}
          component={AboutScreenStack}
        />
      </Drawer.Navigator>
    );
  };
  
  export default DrawerNavigator;