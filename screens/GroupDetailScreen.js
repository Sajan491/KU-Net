import React, {useState, useContext, useEffect} from 'react'
import { StyleSheet, View, Image, Button, FlatList, TouchableOpacity, ActivityIndicator, Modal, Alert } from 'react-native'
import AppText from '../components/AppText';
import AppButton from "../components/AppButton"
import {windowHeight, windowWidth} from "../config/Dimensions";
import {Caption} from "react-native-paper";
import {AuthContext} from "../context/AuthProvider";
import {posts} from "../data/posts"
import Card from "../components/Card";
import colors from '../config/colors';
import firebase from "../config/firebase";
import Loading from "../components/Loading";
import { SimpleLineIcons } from '@expo/vector-icons';
import Screen from "../components/Screen";

const GroupDetailScreen = ({route, navigation}) => {
    const group = route.params
    const [isAMember, setIsAMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [groupData, setGroupData] = useState([]);
    const [membersData, setMembersData] = useState(null)
    const {user} = useContext(AuthContext);
    const userID = firebase.auth().currentUser.uid;
    const usersDB = firebase.firestore().collection("users_extended")
    const groupsDB = firebase.firestore().collection("groups");
    const [modalOpen, setModalOpen] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(  () => {
        console.log(group.id);
        const subscriber = usersDB
                            .doc(userID)
                            .onSnapshot((docs) => {
                                // console.log(docs.data(), "-----updated----------");
                                          })
        getGroups();
        getMembers();
        getPosts();
        // console.log(userID, " sa");

        return () => subscriber();
 
    }, [userID, isAMember])

    const getPosts= async ()=>{
        const groupPosts = groupsDB.doc(group.id).collection('posts')
        let postsArray=[]
        await groupPosts.orderBy('postTime','desc').get().then((docs)=>{
            docs.forEach(doc=>{
                const postItem = doc.data()
                postItem.grpId = group.id;
                postItem.deptId=''
                postItem.id = doc.id
                postsArray.push(postItem)
            })
        })
        setPosts(postsArray)
        console.log(postsArray);
    }
    
    const getGroups = async () => {
        await usersDB.doc(userID).get().then((doc) => {
           if(doc.data()['groups'] !== undefined) {
               const groupArr = doc.data()['groups']
               setGroupData(groupArr)
            //    console.log(groupData, " is set");
              } else{
                  usersDB.doc(userID).update({
                      groups: []
               })
           }
      }).catch(err => {
          console.log("Error fetching users data", err);
      })
    }

    const getMembers =  () => {
        groupsDB.doc(group.id).collection("members").get().then((docs) => {
            const membersArr= []
            docs.forEach((doc) => {
                // console.log(doc.data().id, "MEMBERS LIST");
                // console.log(userID, "Current user iD");
                membersArr.push({id: doc.data().id})
                if (doc.data().id === userID) {
                    setIsAMember(true);
                    console.log(isAMember, "IS A MEMBERss!");
                    setLoading(false);
                }
            })
            setMembersData(membersArr)

            setLoading(false);
        })
    }

    const updateData = () => {
        setGroupData([...groupData, {...group}])
        // console.log(groupData, "join");

       
            setMembersData({id: userID})
            // console.log(membersData, "join");
        } 

    const joinGroupHandler =  () => {
        setJoining(true);
        updateData();

         usersDB.doc(userID).update({
            groups: [...groupData, {...group}]
        }).then(()=> {
            // console.log("Group", group.title ," added to the database");
        }).catch((err) => {
            console.log("Error adding group to the database", err.message);
        })

        groupsDB.doc(group.id).collection("members").doc(userID).set({
          id: userID
        }).then(() => {
        setJoining(false);
        setIsAMember(true)
            // console.log("Members added to the database");
        }).catch((err) => {
            console.log("Error adding members to the database: ", err.message);
        })
    }

    const leaveGroupHandler = ( ) => {
        console.log("left");
        setIsAMember(false)
        //code to remove data from firebase
        
        /* To remove group from group array in users database */
        usersDB.doc(userID).update({
            groups: groupData.filter(grp => grp.id !== group.id)
        }).then(()=>{
            console.log("Deleted group from users database");
        })

        /* To remove user from groups collection*/
        groupsDB.doc(group.id).collection("members").doc(userID).delete().then(() => {
            console.log("Deleted member from database");
        })
    }


    // const joinGroupHandler =   () => {
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
    //                  groupsDB.doc(group.id).get().then(() => {
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
    }
    const openChatHandler = () => {
        navigation.navigate("Chat", group)
    }

   

    const showAlert = () => {
        Alert.alert(
            "Leave Group?",
            "You can join anytime again.",
            [
              {
                text: "Leave",
                onPress: () => {
                    leaveGroupHandler()
                    Alert.alert("Group Left")
                },
                style: "cancel",
              },
              {
                text: "cancel",
                style: "ok",
              },
            ],
            {
              cancelable: true,
            }
          );
    }

    return  !loading ?    
     (  
        <Screen >
            


            <Modal
                visible = {modalOpen}
                transparent = {true}
                onRequestClose = {() => setModalOpen(false)}

            >
                <TouchableOpacity>
                    <AppText> Leave Group</AppText>
                </TouchableOpacity>
            </Modal>  
            
            <View style = {styles.groupContainer}>
            <View style = {styles.groupContent}>
            <FlatList 
                    ListHeaderComponent = {
                        <>
                        <View style>
                            <View style = {styles.groupInfo}>
                                <Image source = {require("../assets/groups/ku.png")} style = {styles.detailImage} resizeMode = {'contain'} />
                                <AppText> {group.title} </AppText>
                                <Caption> {group.about} </Caption>
                                
                                { isAMember
                                    ? (<View>
                                            <Caption> Hello {user.displayName}!</Caption> 
                                            <TouchableOpacity onPress = {showAlert}>
                                                <Caption style = {{color: "red"}}> Leave group?</Caption>
                                            </TouchableOpacity>
                                        </View>
                                        )
                                    // :<AppButton onPress = {() => {setJoining((prev => !prev))}} title={joining? "Joining" : "Join"} >
                                    :(<AppButton onPress = {joinGroupHandler} title={joining? "Joining" : "Join"} >
                                        {joining &&  <ActivityIndicator size="small" color ="#fff" />}    
                                     </AppButton> )
                                }
                            </View>
                            <View style = {styles.switchTab}>
                               <TouchableOpacity onPress = {() => showtPostsHandler()}>
                                   <AppText style = {styles.appText}> Posts</AppText>
                                </TouchableOpacity> 
                               <TouchableOpacity onPress ={() => openChatHandler()}>
                                   <AppText style = {styles.appText}> Group Chat</AppText>
                                </TouchableOpacity> 
                            </View>
                            {isAMember ? <Caption style = {{alignSelf: "flex-start", padding: 4}}> Group Posts</Caption>
                                        : <Caption style = {{alignSelf: "center", padding: 100}}> Join to View Group Posts</Caption> }
                        </View>
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={isAMember ? posts : []}
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
                        />
                    )}

                />
            </View>

        </View>
        </Screen>

    ) : <Loading/>;
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
