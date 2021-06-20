import React, {useContext, useEffect, useState, useCallback} from 'react'
import { FlatList, StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import Card from '../components/Card';
import colors from "../config/colors";

import GroupLogoWithTitle from '../components/GroupLogoWithTitle';
import NotifButton from '../navigation/NotifButton';
import Constants from 'expo-constants';
import firebase from "../config/firebase";



const groups = [
    {
        id: 1,
        title: "KUCC",
        image:require("../assets/groups/kucc.png")
    },
    {
        id: 2,
        title: "AIESEC",
        image:require("../assets/groups/aiesec.png")
    },
    {
        id: 3,
        title: "KUSWC",
        image:require("../assets/groups/ku.png")
    },
    {
        id: 4,
        title: "ALUMNI",
        image:require("../assets/django.jpg"),
    },
    {
        id: 5,
        title: "KURCS",
        image:require("../assets/groups/redcross.png"),
    },
    {
        id: 6,
        title: "KUCS",
        image:require("../assets/django.jpg"),
    },
    {
        id: 7,
        title: "KUCE",
        image:require("../assets/groups/itmeet.png"),
    },
]
const usersCollection = firebase.firestore().collection("users_extended")

const HomeScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const [homePosts, setHomePosts] = useState([])
    const [refreshing, setRefreshing] = useState(false);
 
    const getPosts = async ()=>{
        
        const userID = firebase.auth().currentUser.uid;
        let department_id;
        let allPosts = []
        let groupIds=[]
        let userName;
        
        
        await usersCollection.doc(userID).get().then((usr)=>{
            department_id = usr.data()['department'].value
            userName = usr.data()['username']
            console.log(userName);
            let groups = usr.data()['groups']
            groups.forEach(function(grp){
                groupIds.push(grp.id)
            })
        }).catch((error)=>{
            console.log(error)
        })

        // -----------fetching posts---------------------//
        await groupIds.forEach((doc)=>{
            const groupPosts = firebase.firestore().collection('groups').doc(doc).collection('posts')
            
            groupPosts.orderBy('postTime','desc').get().then((snapshot2)=>{
                snapshot2.forEach(doc=>{
                    const postItem = doc.data()
                    postItem.id = doc.id;
                    allPosts.push(postItem)
                })
            })
            
        })

        const departPosts = await firebase.firestore().collection('departments').doc(department_id).collection('posts')
        await departPosts.orderBy('postTime','desc').get().then((snapshot1)=>{
            snapshot1.forEach(doc => {
                const postItem = doc.data()
                postItem.id = doc.id;
                allPosts.push(postItem)  
            });
        })
        
        
        setHomePosts(allPosts)
        
        


        //   --------------------------------------------- //
    }
    useEffect(() => {
        
        (async () => getPosts())();
        
    }, [])

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getPosts()
        setRefreshing(false)
    }, [])

   
    return (
                

            <View style={styles.container}>
                <View  style={styles.header} >
                    <Text style={styles.headerText}>Home</Text>
                    <NotifButton style={styles.notifButton} onPress={()=>navigation.navigate("Notifications")}/>
                </View>
                <View  style={styles.notifCount}>
                    <Text style={styles.notifCountText}>1</Text>
                </View>

                <FlatList 
                    ListHeaderComponent = {
                        <>
                            <FlatList
                                horizontal 
                                showsHorizontalScrollIndicator={false}
                                data = {groups}
                                keyExtractor = {(item) => item.id.toString()}
                                renderItem = {({item}) => (
                                    <GroupLogoWithTitle title = {item.title} image = {item.image} onPress = {() => navigation.navigate("GroupDetails", item)} />
                                )}
                            />
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={homePosts}
                    keyExtractor={(item)=>item.id.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={({item})=>(
                        <Card
                            postTitle={item.title}
                            content={item.description}
                            postContents={item.postContents}
                            username={item.username}
                            userImg={require("../assets/sajan.png")}
                            postTime= {item.postTime}
                            liked={false}
                            likesCount={item.likesCount}
                            comments={item.comments}
                            commentsCount={item.comments.length}
                            onPressComment={()=> navigation.navigate('Comments', {comments: item.comments})}
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
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10
    },
    text: {
        textAlign: 'center'
    },
    header:{
        paddingTop: Constants.statusBarHeight,
        flexDirection:'row',
        paddingLeft:10,
        paddingBottom:13,
        marginTop:12,
        justifyContent:'space-between',
    }
    ,
    headerText:{
        color: colors.primary,
        fontWeight:'bold',
        fontSize:21
    },
    notifCount:{
        backgroundColor:colors.primary,
        borderRadius:7,
        width:14,
        height:14,
        fontSize:12,
        zIndex:1,
        position:'absolute',
        alignItems:'center',
        top:Constants.statusBarHeight+30,
        right:42
    },
    notifCountText:{
        color:'white'
    },
    scrollView: {
        marginBottom: 15
    }
    
    
})
