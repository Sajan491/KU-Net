import React, {useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import {AuthContext} from "../context/AuthProvider";
import Loading from "../components/Loading";
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import firebase from "firebase";
import TestNavigator from './TestNavigator';

const Routes = () => {
    const {user, setUser, isANewUser} = useContext(AuthContext);
    console.log(isANewUser);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitialize] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitialize(false);
        setLoading(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; //to unsub on unmount
    }, [])

    if (loading) {
        return <Loading />
    }
    return (
        <NavigationContainer>
            {user ? <TestNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

export default Routes
