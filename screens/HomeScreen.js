import React, {useContext, useEffect, useState, useCallback} from 'react'
import { FlatList, StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'

import Card from '../components/Card';
import colors from "../config/colors";

import GroupLogoWithTitle from '../components/GroupLogoWithTitle';
import Constants from 'expo-constants'
import firebase from "../config/firebase";
import NotifButton from '../navigation/NotifButton';

const usersCollection = firebase.firestore().collection("users_extended")

const HomeScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const [homePosts, setHomePosts] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [groups, setGroups] = useState(null)
    const groupsDB = firebase.firestore().collection("groups")
    const getPosts = async ()=>{
        
        const userID = firebase.auth().currentUser.uid;
        let department_id;
        let allPosts = []
        let groupIds=[]
        
        await usersCollection.doc(userID).get().then((usr)=>{
            department_id = usr.data()['department'].value
            let groups = usr.data()['groups']
            groups.forEach(function(grp){
                groupIds.push(grp.id)
            })
        }).catch((error)=>{
            console.log(error)
        })

        // -----------fetching posts---------------------//
        
        await groupIds.forEach((doc1)=>{
            const groupPosts = firebase.firestore().collection('groups').doc(doc1).collection('posts')
            groupPosts.orderBy('postTime','desc').get().then((snapshot2)=>{
                snapshot2.forEach(doc=>{
                    const postItem = doc.data()
                    postItem.id = doc.id;
                    postItem.grpId = doc1;
                    postItem.deptId=''
                    allPosts.push(postItem)
                })
            })
        })
        

        const departPosts = firebase.firestore().collection('departments').doc(department_id).collection('posts')
        await departPosts.orderBy('postTime','desc').get().then((snapshot1)=>{
            snapshot1.forEach(doc => {
                const postItem = doc.data()  
                postItem.id = doc.id;
                postItem.deptId = department_id
                postItem.grpId = ''
                allPosts.push(postItem) 
            });
        })
        //overall sort
        allPosts.sort((x,y)=>{
            return y.postTime.toDate() - x.postTime.toDate();
        })
        setHomePosts(allPosts)
        //   --------------------------------------------- //
    }

    useEffect(()=> {

        getPosts()
        setRefreshing(false)
        groupsDB.get().then((docs)=> {
            const groupsArr = []
            docs.forEach((doc) => {
                groupsArr.push({id: doc.id, ...doc.data()})
            })
            setGroups(groupsArr);
            setLoading(false)
        })

        console.log(firebase.auth().currentUser, "huh");
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
                    {/* <NotifButton style={styles.notifButton} onPress={()=>navigation.navigate("Admin")}/> */}
                </View>
                {/* <View  style={styles.notifCount}>
                    <Text style={styles.notifCountText}>1</Text>
                </View> */}

                <FlatList 
                    ListHeaderComponent = {
                        <>
                            <FlatList
                                horizontal 
                                showsHorizontalScrollIndicator={false}
                                data = {groups}
                                keyExtractor = {(item) => item.id.toString()}
                                renderItem = {({item}) => (
                                    <GroupLogoWithTitle title = {item.abbr} icon = {item.icon}  onPress = {() => navigation.navigate("GroupDetails", item)} />
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
                            navigation = {navigation}
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
        paddingTop:10,
        flex:1,
     
    },
    text: {
        textAlign: 'center'
    },
    header:{
        paddingTop: Constants.statusBarHeight,
        flexDirection:'row',
        paddingLeft:10,
        paddingBottom:13,
        
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
