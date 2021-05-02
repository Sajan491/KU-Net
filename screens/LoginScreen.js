import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {Container, Content, Header, Input, Form, Item, Button, Label} from "native-base"

const LoginScreen = ({navigation}) => {

    const pressHandlerRegister = () => {
        navigation.navigate("RegisterScreen")
    }

    const pressHandlerHome = () => {
        navigation.navigate("DrawerNavigator")
    }

    return (
        <View style ={styles.container}>
            <Container>
                <Form>
                    <Item floatingLabel>
                        <Label> Email</Label>
                        <Input autoCapitalize="none" autoCorrect={false} />
                    </Item>
                    <Item floatingLabel>
                        <Label> Password</Label>
                        <Input secureTextEntry={true} autoCapitalize="none" autoCorrect={false} />
                    </Item>
                             <Button full rounded  onPress={pressHandlerHome} style={styles.LoginBtn} > <Text> Login</Text> </Button>
                </Form>
            </Container>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    LoginBtn: {
        marginTop: 10
    }
})
export default LoginScreen
