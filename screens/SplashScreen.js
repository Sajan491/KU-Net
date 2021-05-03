import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Image, View, Text, Button } from 'react-native';

const SplashScreen = ({navigation}) => {
//ActivityIndicator Animation
const [animating, setAnimating] = useState(true);

useEffect(() => {
    setTimeout(() => {
        setAnimating(false);
    }, 1000)
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
