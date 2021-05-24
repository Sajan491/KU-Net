import React from 'react'
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native'
import AppText from "../components/AppText"
import AppButton from "../components/AppButton";
import colors from '../config/colors'
const TextCard = ({title, subTitle, description, onPress}) => {
    return (
        <View style = {styles.card}>
            <AppText style = {styles.title}>{title}</AppText>
            <AppText style = {styles.subTitle}>{subTitle}</AppText>
            <AppText style = {styles.description}>{description}</AppText>
            <AppButton title="Change" color="secondary" onPress = {onPress} style = {styles.btn} />
        </View>
    )
}

export default TextCard

const styles = StyleSheet.create({
    card: {
        padding: 10,
        borderRadius: 15,
        backgroundColor: colors.white,
        overflow: 'hidden',
        margin: 10
    },
    title: {
        marginBottom: 3
    },
    subTitle: {
        color: colors.secondary,
        fontSize: 14,
        fontWeight: "bold"
    },
    description: {
        fontSize: 12,
        color: "gray"
    },
    btn: {
        display: "flex",
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: "20%"
    }
})
