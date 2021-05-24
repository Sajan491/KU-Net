import React,{useState} from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import colors from '../config/colors'
import AppText from './AppText'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const Card = ({
    postTitle, 
    content,
    postImg,
    username,
    userImg,
    postTime,
    liked,
    likesCount,
    commentsCount, onPress, onPressComment}) => {

        const [isLiked, setIsLiked] = useState(liked)
    return (
        <View style={styles.card}> 
            <View style={styles.userInfo}>
                <Image style={styles.userImage} source={userImg} />
                <View style={styles.userInfoText}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.time}>{postTime}</Text>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={onPress}>
                <View>
                    <Text style={styles.title}>{postTitle}  ...</Text>
                    {postImg? <Image style={styles.image} source={postImg} />: <View style={styles.borderline}></View>}
                </View>
            </TouchableWithoutFeedback>
                <View style={styles.interactionWrapper}>
                    <TouchableOpacity style={styles.interaction} onPress={()=>setIsLiked(!isLiked)}>
                        {isLiked?<MaterialCommunityIcons size={25} name="heart-multiple" color='red'/>:<MaterialCommunityIcons size={25} name="heart-outline" color="black" />}
                        {isLiked?<Text style={styles.interationText}>Liked</Text>: <Text style={styles.interationText}>Like</Text>}
                    </TouchableOpacity>
                        
                    <TouchableOpacity style={styles.interaction}  onPress={()=>onPressComment()}>
                        <MaterialCommunityIcons size={25} name="comment-outline" />
                        <Text style={styles.interationText}>Comments</Text>
                    </TouchableOpacity>
                </View>
            
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    borderline:{
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        width: '92%',
        marginTop:15,
        alignSelf:'center'
    },  
    card:{
        borderRadius:15,
        backgroundColor: colors.white,
        marginBottom: 15,
        overflow:'hidden'
    },
    interactionWrapper:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:15
    },
    interaction:{
        flexDirection:'row',
        justifyContent:'center',
        borderRadius:5,
        
    },
    interationText:{
        fontSize:13,
        fontWeight:'bold',
        color:'#333',
        marginTop:5,
        marginLeft:5
    },
    image:{
        marginTop:14,
        width:"100%",
        height:210
    },
    content:{
        color:colors.secondary,
        fontWeight:'bold',
        fontSize:14
    },
    time:{
        fontSize:12,
        color:'#666'
    },
    title:{
        paddingLeft:15
    },
    userImage:{
        width:46,
        height:46,
        borderRadius:23
    },  
    
    userInfo:{
        flexDirection:"row",
        justifyContent:'flex-start',
        padding:14
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
