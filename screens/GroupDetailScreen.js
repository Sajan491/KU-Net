import React, {useState, useContext, useEffect} from 'react'
import { StyleSheet, View, Image, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
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

const GroupDetailScreen = ({route, navigation}) => {
    const group = route.params
    const [isAMember, setIsAMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [groupData, setGroupData] = useState([]);
    const [membersData, setMembersData] = useState("")
    const {user} = useContext(AuthContext);
    const userID = firebase.auth().currentUser.uid;
    const usersDB = firebase.firestore().collection("users_extended")
    const groupsDB = firebase.firestore().collection("groups");
    
    useEffect(  () => {
        const subscriber = usersDB
                            .doc(userID)
                            .onSnapshot((docs) => {
                                console.log(docs.data(), "-----updated----------");
                                          })
        getGroups();
        getMembers();

    

        return () => subscriber();
 
    }, [userID, isAMember])
    
    const getGroups = async () => {
        await usersDB.doc(userID).get().then((doc) => {
           if(doc.data()['groups'] !== undefined) {
               const groupArr = doc.data()['groups']
               setGroupData(groupArr)
               console.log(groupData, " is set");
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
            docs.forEach((doc) => {
                console.log(doc.data().id, "MEMBERS LIST");
                console.log(userID, "Current user iD");
                if (doc.data().id === userID) {
                    setIsAMember(true);
                    console.log(isAMember, "IS A MEMBER!");
                    setLoading(false);
                }
            })
            setLoading(false);
        })
    }

    const updateData = () => {
        setGroupData([...groupData, {...group}])
        console.log(groupData, "join");

       
            setMembersData({id: userID})
            console.log(membersData, "join");
        } 

    const joinGroupHandler =  () => {

        setJoining(true);

        updateData();

         usersDB.doc(userID).update({
            groups: [...groupData, {...group}]
        }).then(()=> {
            console.log("Group", group.title ," added to the database");
        }).catch((err) => {
            console.log("Error adding group to the database", err.message);
        })

        groupsDB.doc(group.id).collection("members").add({
          id: userID
        }).then(() => {
        setJoining(false);
        setIsAMember(true)
            console.log("Members added to the database");
        }).catch((err) => {
            console.log("Error adding members to the database: ", err.message);
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
        setPostSelected(true);
    }
    const showMembersHandler = () => {
        setMemberSelected(true);
    }

    // if (loading) {
    //     return <Loading />
    // }
    return  !loading ?    
     (  
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
                                    // :<AppButton onPress = {() => {setJoining((prev => !prev))}} title={joining? "Joining" : "Join"} >
                                    :<AppButton onPress = {joinGroupHandler} title={joining? "Joining" : "Join"} >
                                        {joining &&  <ActivityIndicator size="small" color ="#fff" />}    
                                     </AppButton> 
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
