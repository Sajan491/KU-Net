import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import {Container, Content, Header, Input, Form, Item, Label} from "native-base"

const RegisterScreen = ({navigation}) => {

    const pressHandler = () => {
        navigation.goBack();
    }
    return (
        <>
        <Container style={styles.container}>
            <Form>
                <Item floatingLabel>
                    <Label> Name</Label>
                    <Input autoCapitalize="none" autoCorrect={false} />
                </Item>
                <Item floatingLabel>
                    <Label> Email</Label>
                    <Input autoCapitalize="none" autoCorrect={false} />
                </Item>
                <Item floatingLabel>
                    <Label> Password</Label>
                    <Input secureTextEntry={true} autoCapitalize="none" autoCorrect={false} />
                </Item>
        <View style={styles.RegisterBtn}>

            <Button title="Register" onPress = {pressHandler}  />
        </View>
            </Form>
        </Container>
        
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    RegisterBtn: {
        marginTop: 50
    },
})

export default RegisterScreen
