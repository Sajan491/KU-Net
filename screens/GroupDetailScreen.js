import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import AppText from '../components/AppText'

const GroupDetailScreen = ({route}) => {
    const group = route.params
    return (
        <View style = {styles.groupContainer}>
            <Image source = {group.image} style = {styles.detailImage} resizeMode = {'contain'} />
            <AppText> {group.title} </AppText>
        </View>
    )
}

export default GroupDetailScreen

const styles = StyleSheet.create({
    detailImage: {
        height: 200,
        width: 200
    },
    groupContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20
    }
})
