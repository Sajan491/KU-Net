import React, {useContext, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Card from '../components/Card';
import colors from "../config/colors";
import Screen from '../components/Screen'
import {AuthContext} from "../context/AuthProvider";

import firebase from '../config/firebase'

const posts=[
    {   
        id:1,
        username: 'Sajan Mahat',
        userImg:require("../assets/sajan.png"),
        postTime: '1 day ago',
        postTitle:"Hiring a full stack ReactJs developer!",
        content:"subtitle1",
        postImg:require("../assets/react.png"),
        liked:true,
        likes:'22',
        comments: '4'
    },
    {
        id:2,
        username: 'Sabin Thapa',
        userImg:require("../assets/sajan.png"),
        postTime: '4 hours ago',
        postTitle:"A glimpse of Django workshop!",
        content:"subtitle1",
        postImg:require("../assets/django.jpg"),
        liked:false,
        likes:'2',
        comments: '1'
    },
    {
        id:3,
        username: 'Nripesh Karmacharya',
        userImg:require("../assets/sajan.png"),
        postTime: '34 days ago',
        postTitle:"Aalu lelo!",
        content:"subtitle1",
        postImg:require("../assets/aalu.jpg"),
        liked:true,
        likes:'8',
        comments: '100'
    },
    {
        id:4,
        username: 'Rojan Thapa',
        userImg:require("../assets/sajan.png"),
        postTime: '1 day ago',
        postTitle:"Join AISEC. I beg you!",
        content:"subtitle1",
        postImg:require("../assets/aisec.png"),
        liked:true,
        likes:'1',
        comments: '0'
    }
    
    
]

const HomeScreen = ({navigation}) => {

    // useEffect(() => {
    //     const fetchPosts =()=>{
    //         try {
    //             const list = []
    //             firebase.firestore().collection('posts').get().then((querySnapshot)=>{
    //                 console.log("total posts", querySnapshot.size)
    //                 querySnapshot.forEach(doc=>{
    //                     const {} = doc.data();
    //                     list.push({

    //                     });
    //                 })
    //             })
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchPosts()
    // }, [])

    const {user} = useContext(AuthContext)
    return (
            <View style={styles.container}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={posts}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item})=>(
                        <Card
                            postTitle={item.postTitle}
                            content={item.content}
                            postImg={item.postImg}
                            username={item.username}
                            userImg={item.userImg}
                            postTime= {item.postTime}
                            liked={item.liked}
                            likesCount={item.likes}
                            commentsCount={item.comments}
                            onPress={()=>navigation.navigate('PostDetails', item)}
                        />
                    )}

                />
            </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.light,
        padding:20,
        flex:1,
        
    },
    text: {
        textAlign: 'center'
    }
})
