import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import AppText from '../components/AppText'

const PostDetailScreen = ({route}) => {
    const post=route.params;
    return (
        <View>
            <Image style={styles.image} source={post.image} />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{post.title}</AppText>
            </View>
        </View>
    )
}

export default PostDetailScreen

const styles = StyleSheet.create({
    image:{
        width:"100%",
        height: 300
    },
    detailsContainer:{
        padding:20
    },

    
    title:{
        marginBottom:7,
        fontSize:16,
        fontWeight:'bold'
    }
})
