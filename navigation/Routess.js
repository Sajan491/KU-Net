import React, {useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import {AuthContext} from "../context/AuthProvider";
import Loading from "../components/Loading";
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import firebase from "firebase";

const Routes = () => {
    const {user, setUser} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [initializing, setInitialize] = useState(false);

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
            {user? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

export default Routes
