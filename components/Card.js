import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import colors from '../config/colors'
import AppText from './AppText'

const Card = ({title, subTitle, image, onPress}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Image style={styles.image} source={image} />
                <View style={styles.detailsContainer}>
                    <AppText style={styles.title}>{title}</AppText>
                    <AppText style={styles.subTitle}>{subTitle}</AppText>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Card

const styles = StyleSheet.create({
    card:{
        borderRadius:15,
        backgroundColor: colors.white,
        marginBottom: 15,
        overflow:'hidden'
    },
    detailsContainer:{
        padding:20
    },
    image:{
        marginTop:20,
        width:"100%",
        height:200
    },
    subTitle:{
        color:colors.secondary,
        fontWeight:'bold',
        fontSize:14
    },
    title:{
        marginBottom:3,
    }
})
