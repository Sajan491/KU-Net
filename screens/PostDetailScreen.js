import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import AppText from '../components/AppText'

import Card from '../components/Card'


const PostDetailScreen = ({route}) => {
    const item=route.params;
    return (
        <ScrollView style={styles.container}> 
            <View style={styles.userInfo}>
                <Image style={styles.userImage} source={item.userImg} />
                <View style={styles.userInfoText}>
                    <Text style={styles.username}>{item.username}</Text>
                    <Text style={styles.time}>{item.postTime}</Text>
                </View>
            </View>
               
            <Text style={styles.title}>{item.postTitle}</Text>
            <View style={styles.borderline}></View>
            <Text style={styles.description}>
                {item.content}
            </Text>
            <Image style={styles.image} source={item.postImg} />
            <View style={styles.commentsWrapper}>
                <Text style={styles.commentText}>Comments</Text>
            </View>
            
        </ScrollView>
    )
}

export default PostDetailScreen

const styles = StyleSheet.create({
    borderline:{
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        width: '98%',
        marginTop:7,
        alignSelf:'center'
    },  
    container:{
        padding:20,
        overflow:'hidden'
    },
    commentsWrapper:{
        marginTop:20,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        width: '48%',
    },
    commentText:{
        fontWeight:'bold',
        paddingBottom:4
    },
    image:{
        marginTop:14,
        width:"100%",
        height:210
    },
    description:{
        paddingLeft:5,
        marginTop:10,
        lineHeight:19
    },
    title:{
        paddingLeft:5,
        marginTop:15,
        fontWeight:'bold'
    },
    userImage:{
        width:46,
        height:46,
        borderRadius:23
    },  
    
    userInfo:{
        flexDirection:"row",
        justifyContent:'flex-start',
    },
    username:{
        fontSize:14,
        fontWeight: "bold"
    },
    userInfoText:{
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:10
    }
})
