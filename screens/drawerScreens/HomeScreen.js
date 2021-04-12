import React from 'react';
import { View , Text, Button, StyleSheet} from 'react-native';
const HomeScreen = ({navigation}) => {

    const logoutHandler = () => {
        navigation.navigate("LoginScreen")
    }
    return (
        <View>
            <Text> Home Screen</Text>
            <Text>  Swipe to the right from the left corner to open the drawer navigator!</Text>
            <View style = {styles.logoutButton}>
           <Button title="Logout" onPress={logoutHandler}  />
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    logoutButton: {
        alignItems: "center",
    }
})