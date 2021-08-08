import React,{useEffect, useState} from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Card from '../components/Card';
import Header from '../components/Header';
import Screen from '../components/Screen';
import colors from '../config/colors';
import firebase from "../config/firebase";

const AdminDetailScreen = ({route}) => {
    const mainData = route.params
    const groupsDB = firebase.firestore().collection("groups");
    const departsDB = firebase.firestore().collection("departments");
    const [posts, setPosts] = useState([])

    const getPosts = async() => {
        if(mainData.type==='group'){
            const groupPosts = groupsDB.doc(mainData.id).collection('posts')
            let postsArray=[]
            await groupPosts.orderBy('postTime','desc').get().then((docs)=>{
                docs.forEach(doc=>{
                    const postItem = doc.data()
                    postItem.grpId = mainData.id;
                    postItem.deptId=''
                    postItem.id = doc.id
                    postsArray.push(postItem)
                })
            })
            setPosts(postsArray)
        }
        else{
            const departPosts = departsDB.doc(mainData.id).collection('posts')
            let postsArray=[]
            await departPosts.orderBy('postTime','desc').get().then((docs)=>{
                docs.forEach(doc=>{
                    const postItem = doc.data()
                    postItem.grpId = ''
                    postItem.deptId= mainData.id;
                    postItem.id = doc.id
                    postsArray.push(postItem)
                })
            })
            setPosts(postsArray)
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <Screen style={styles.screen}>
            <Header headerText={mainData.title} />
            <FlatList 
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={posts}
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
                            screen = 'admin'
                            type={item.type}
                        />
                    )}
                />
        </Screen>
    )
}

export default AdminDetailScreen

const styles = StyleSheet.create({
    container:{
        marginTop:10
    },
    screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:10,
        flex:1,
    },
})
