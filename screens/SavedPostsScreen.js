import React, {useState} from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import { useEffect } from 'react/cjs/react.development';
import Card from '../components/Card';
import Header from '../components/Header';
import Screen from '../components/Screen'
import colors from "../config/colors";
import firebase from "../config/firebase";

const SavedPostsScreen = () => {
    const [savedPosts, setsavedPosts] = useState([])
    const fetchPosts= async ()=>{
        const userID = firebase.auth().currentUser.uid;
        const postsToPush =[];
        const posts = firebase.firestore().collection("users_extended").doc(userID).collection("savedPosts")
        await posts.get().then((doc)=>{
            doc.forEach((oneDoc)=>{
                postsToPush.push(oneDoc.data())
            })
        })
        setsavedPosts(postsToPush)
    }
    useEffect(() => {
        
        fetchPosts();
        const getDataEvery2s = setInterval(fetchPosts,200000000)
        return ()=> clearInterval(getDataEvery2s);
       
    }, [])
    return (
        <Screen style={styles.screen}>
            <Header headerText="Saved Posts" />
            <FlatList 
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={savedPosts}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item})=>(
                        <Card
                            id = {item.id}
                            grpId={item.grpId}
                            deptId = {item.deptId}
                            postTitle={item.title}
                            content={item.description}
                            postContents={item.postContents}
                            username={item.username}
                            userImg={item.userImg}
                            postTime= {item.postTime}
                            page={item.page}
                            screen = 'savedPosts'
                        />
                    )}
                />
        </Screen>
    )
}

export default SavedPostsScreen

const styles = StyleSheet.create({
    container:{
        marginBottom:10,
        borderRadius:20
    }
    ,screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10

    }
})
