import React from 'react';
import { View , Text, Button,StyleSheet} from 'react-native';
const AboutScreen = ({navigation}) => {
    return (
        <View>
            <Text> About Screen</Text>
            <View style={styles.btn}>
            <Button title="Back" onPress={() => navigation.navigate("HomeScreenStack")}/>
            </View>
        </View>
    )
}

export default AboutScreen

const styles = StyleSheet.create({
    btn: {
        alignItems: "center",
    }
})