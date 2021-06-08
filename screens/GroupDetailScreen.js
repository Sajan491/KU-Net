import React, {useState, useContext, useEffect} from 'react'
import { StyleSheet, View, Image, Button, FlatList, TouchableOpacity, Alert } from 'react-native'
import AppText from '../components/AppText';
import {windowHeight, windowWidth} from "../config/Dimensions";
import {Caption} from "react-native-paper";
import {AuthContext} from "../context/AuthProvider";
import {posts} from "../data/posts"
import Card from "../components/Card";
// import { GroupContext } from '../context/GroupProvider';
import colors from '../config/colors';
import firebase from "../config/firebase";
import Loading from "../components/Loading";

const GroupDetailScreen = ({route, navigation}) => {
    const group = route.params
    const [postSelected, setPostSelected] = useState(false);
    const [memberSelected, setMemberSelected] = useState(false);
    const [isAMember, setIsAMember] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [groupData, setGroupData] = useState([]);
    const [membersData, setMembersData] = useState([]);
    const {user} = useContext(AuthContext);
    // const {addMember} = useContext(GroupContext);
    const usersDB = firebase.firestore().collection("users_extended")
    const groupsDB = firebase.firestore().collection("groups")
    const userID = firebase.auth().currentUser.uid;
    
    useEffect(() => {
        // getData();
    }, [])


    // const getData = async () => {
    //     try{
    //          await usersDB.doc(userID).get().then((doc) => {
    //              console.log("PUlled data", doc.data()['groups']);
    //              if(doc.data()['groups'] !== undefined) {
    //                  setGroupData(doc.data()['groups'])
    //                 } else{
    //                     usersDB.doc(userID).update({
    //                         groups: []
    //                  })
    //              }
    //         }).catch(err => {
    //             console.log("Error fetching users data", err);
    //         })
    
    //         await groupsDB.doc(group.id).get().then((doc) => {
    //             if(doc.data()['members' !== undefined]) {
    //                 setMembersData(doc.data()['members']);
    //             } else {
    //                 groupData.doc(group.id).update({
    //                     members: []
    //                 })
    //             }
    //             membersData.forEach((member) => {
    //                 if(member === userID) {
    //                     setIsAMember(true);
    //                 }
    //             })
    //         }).catch((err) => {
    //             console.log("Error fetching groups data: ", err);
    //         })
    //         setLoading(false);
    //     }catch(err) {
    //         console.log(err);
    //     }
 
    // }

    // const joinGroupHandler = async  () => {
    //             try{
    //                 //Add group in groups array inside users collection
    //                 setGroupData([...groupData, group.title])
    //                  usersDB.doc(userID).update({
    //                     groups: groupData
    //                 }).then(() => {
    //                     console.log("Joined Successfully", group.title);
    //                     setGroupData(groupData);
    //                     setIsAMember(true);                            
    //                 })
                    
    //                 // Add member in members array inside groups collection
    //                 setMembersData ([...membersData, group.title])
    //                 await groupsDB.doc(group.id).get().then(() => {
    //                     groupsDB.doc(group.id).update({
    //                         members: membersData
    //                     }).then(()=> {
    //                         console.log("Member added successfully!");
    //                         setIsAMember(true);   
    //                         console.log(membersData); 
    //                     })
    //                 })
                    
    //             }catch(err){
    //                 console.log("Error joining group:", err.message);
    //             };
    //         }
        

    const showtPostsHandler = () => {
        setPostSelected(true);
    }
    const showMembersHandler = () => {
        setMemberSelected(true);
    }

    if (loading) {
        return <Loading />
    }
    return (
        <View style = {styles.groupContainer}>
            <View style = {styles.groupContent}>
            <FlatList 
                    ListHeaderComponent = {
                        <>
                        <View style>
                            <View style = {styles.groupInfo}>
                                <Image source = {group.image} style = {styles.detailImage} resizeMode = {'contain'} />
                                <AppText> {group.title} </AppText>
                                <Caption> {group.about} </Caption>
                                { isAMember
                                    ? <Caption> Hello {user.displayName}!</Caption> 
                                    :<Button title="Join" onPress = {() => joinGroupHandler()}/>
                                }
                            </View>
                            <View style = {styles.switchTab}>
                               <TouchableOpacity onPress = {() => showtPostsHandler()}>
                                   <AppText style = {styles.appText}> Posts</AppText>
                                </TouchableOpacity> 
                               <TouchableOpacity onPress ={() => showMembersHandler()}>
                                   <AppText style = {styles.appText}> Members</AppText>
                                </TouchableOpacity> 
                            </View>
                            <Caption style = {{alignSelf: "flex-start", padding: 4}}> Group Posts</Caption>
                        </View>
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
            </View>

        </View>
    )
}

export default GroupDetailScreen

const styles = StyleSheet.create({
    detailImage: {
        height: windowHeight/6,
        width: windowWidth
    },
    groupContainer: {
        margin: 10,
        height: windowHeight,
        backgroundColor: "#fff",
        flex: 1,
        borderRadius: 10,
    },
    groupInfo: {
        justifyContent: "center",
        alignItems: "center",

    },
    groupContent: {
        marginTop: 10
    },
    switchTab: {
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        marginLeft: windowWidth/8,
        marginRight: windowWidth/8,
        justifyContent: "space-between",

    },
    appText: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.secondary
    }
})
