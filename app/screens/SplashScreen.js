import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Image, View, Text, Button } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

const SplashScreen = ({navigation}) => {
//ActivityIndicator Animation
const [animating, setAnimating] = useState(true);

useEffect(() => {
    setTimeout(() => {
        setAnimating(false);
        AsyncStorage.getItem("user_id").then((value) => 
            navigation.replace(
                value === null ? "Auth" : "DrawerNavigation"
            ),
        )
    }, 2000)
}, [])
   

    return (
        <View>
            <View>
                <ActivityIndicator 
                animating={animating}
                color="#FFF"
                size="large"
                />
            </View>
            <Text> Loading ... </Text>
     </View>
       
    )
}

export default SplashScreen
