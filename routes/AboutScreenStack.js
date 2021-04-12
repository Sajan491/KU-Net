import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import AboutScreen from "../screens/drawerScreens/AboutScreen";


const Stack = createStackNavigator()

const AboutScreenStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="AboutScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#307ecc',
          },
          headerLeft: () => null,        }}>
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{
            title: 'About', //Set Header Title
          }}
        />
      </Stack.Navigator>
    );
  };

  export default AboutScreenStack;