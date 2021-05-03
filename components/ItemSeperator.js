import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../config/colors'

const ItemSeperator = () => {
    return (
        <View style={styles.seperator} />
    )
}

export default ItemSeperator

const styles = StyleSheet.create({
    seperator:{
        width:'100%',
        height:1,
        backgroundColor: colors.light
    }
})
