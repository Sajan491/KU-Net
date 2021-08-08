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
    const [savedPosts, setsavedPosts] = useState([])
    const fetchPosts= async ()=>{
        const userID = firebase.auth().currentUser.uid;
        const postsToPush =[];
        const posts = firebase.firestore().collection("users_extended").doc(userID).collection("savedPosts")
        await posts.orderBy('postTime','desc').get().then((doc)=>{
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
    const handleDeleteAll= async ()=>{
        const userID = firebase.auth().currentUser.uid;
        const posts = firebase.firestore().collection("users_extended").doc(userID).collection("savedPosts")
        await posts.get().then(docs=>{
            docs.forEach(doc=>{
                posts.doc(doc.id).delete()
            })
        })
    }

    const handleDeletePress = () => {
        if(savedPosts.length>0){
            Alert.alert('Are you sure?','This will remove all the posts that you have saved.',[
                {text:'Confirm', onPress:()=>{handleDeleteAll()}},
                {text:'Cancel'}
            ],{
                cancelable:true
            })
        }
        else{
            Alert.alert('No Saved Posts','You have not saved any posts yet.')
        }
    }

    
    return (
        <Screen style={styles.screen}>
                <Header headerText="Saved Posts" />
                <View style={styles.deleteAllSaved}>
                    <TouchableOpacity onPress={handleDeletePress}>
                            <MaterialCommunityIcons name="trash-can-outline" size={30} color="black" />
                    </TouchableOpacity>
                </View>
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
                            screen = 'save'
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
        marginBottom:10,
        borderRadius:20,

    }
    ,screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10

    },
    // header:{
    //     flex:1,
    //     flexDirection:'row',
    //     justifyContent:'space-between',
    // },  
    deleteAllSaved:{
        marginTop:40,
        marginRight:15,
        zIndex:1,
        position:'absolute',
        right:10,
        top:20
    }
})
