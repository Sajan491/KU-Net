import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../screens/drawerScreens/HomeScreen";

const Stack = createStackNavigator()

const HomeScreenStack = ({navigation}) => {
    return (
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home', //Set Header Title
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    );
  };

export default HomeScreenStack;