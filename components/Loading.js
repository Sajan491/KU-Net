import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'

const Loading = () => {
    return (
        <View style={styles.loadingContainer}>
<<<<<<< HEAD
            <ActivityIndicator size={large} color ="#6646ee" />
=======
            <ActivityIndicator size="large" color ="#6646ee" />
>>>>>>> authentication-v1
            </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
