import React, {useState} from 'react'
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { useEffect } from 'react/cjs/react.development';
import Card from '../components/Card';
import Header from '../components/Header';
import Screen from '../components/Screen'
import colors from "../config/colors";
import firebase from "../config/firebase";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const SavedPostsScreen = () => {
    const [departPosts, setDepartPosts] = useState([])
    
    const fetchPosts= async ()=>{
        const userID = firebase.auth().currentUser.uid;
        const departs = firebase.firestore().collection('departments')
        const postsToPush =[];
        var departID = ''
        await firebase.firestore().collection("users_extended").doc(userID).get().then(doc=>{
            departID = doc.data()['department'].value;
        })

        await departs.doc(departID).collection('posts').orderBy('postTime','desc').get().then(docss=>{
            docss.forEach(doc=>{
                const postItem = doc.data()
                postItem.grpId=''
                postItem.deptId=departID
                postItem.id=doc.id
                postsToPush.push(postItem)
            })
            
        })
        setDepartPosts(postsToPush)
    }
    useEffect(() => {
        
        fetchPosts();
        const getDataEvery2s = setInterval(fetchPosts,200000000)
        return ()=> clearInterval(getDataEvery2s);
       
    }, [])
 

    return (
        <Screen style={styles.screen}>
                <Header headerText="Department Posts" />
                
            <FlatList 
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={departPosts}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item})=>(
                        <Card
                            id = {item.id}
                            grpId={item.grpId}
                            deptId = {item.deptId}
                            postTitle={item.title}
                            content={item.description}
                            postContents={item.postContents}
                            username={item.userInfo.username}
                            userImg={item.userInfo.profilePic}
                            postTime= {item.postTime}
                            likers = {item.peopleWhoLiked}
                            comments={item.comments}
                            commentsCount={item.comments.length}
                            page={item.page}
                            screen = 'home'
                            type={item.type}
                        />
                    )}
                />
        </Screen>
    )
}

export default SavedPostsScreen

const styles = StyleSheet.create({
    container:{
        marginTop:15
    },
    screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:10,
        flex:1,

    },
 
})
