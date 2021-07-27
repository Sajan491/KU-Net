import React, {useContext, useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import Card from '../components/Card';
import colors from "../config/colors";
import Screen from '../components/Screen'
import {AuthContext} from "../context/AuthProvider";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import GroupLogoWithTitle from '../components/GroupLogoWithTitle';
import NotifButton from '../navigation/NotifButton';
import Constants from 'expo-constants'
import {posts} from "../data/posts"
import firebase from "../config/firebase";
const HomeScreen = ({navigation}) => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const groupsDB = firebase.firestore().collection("groups")
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

    useEffect(()=> {
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

    return (
                

            <View style={styles.container}>
                <View  style={styles.header} >
                    <Text style={styles.headerText}>Home</Text>
                    <NotifButton style={styles.notifButton} onPress={()=>navigation.navigate("Notifications")}/>
                </View>
                <View  style={styles.notifCount}>
                    <Text style={styles.notifCountText}>1</Text>
                </View>
              {/* <ScrollView>
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    showsVerticalScrollIndicator = {false}
                    style = {styles.scrollView}
                >
                    <FlatList
                        horizontal 
                        data = {groups}
                        keyExtractor = {(item) => item.id.toString()}
                        renderItem = {({item}) => (
                            <GroupLogoWithTitle title = {item.title} image = {item.image} onPress = {() => navigation.navigate("GroupDetails", item)} />
                        )}
                    />

                </ScrollView> */}
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
                    data={posts}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item})=>(
                        <Card
                            postTitle={item.postTitle}
                            content={item.content}
                            postImgs={item.postImgs}
                            username={item.username}
                            userImg={item.userImg}
                            postTime= {item.postTime}
                            liked={item.liked}
                            likesCount={item.likesCount}
                            comments={item.comments}
                            commentsCount={item.comments.length}
                            onPressComment={()=> navigation.navigate('Comments', {comments: item.comments})}
                        />
                    )}

                />
                {/* </ScrollView> */}
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
