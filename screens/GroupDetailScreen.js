import React, {useState, useContext, useEffect} from 'react'
import { StyleSheet, View, Image, Button, FlatList, TouchableOpacity, ActivityIndicator, Modal, Alert, Text } from 'react-native'
import AppText from '../components/AppText';
import AppButton from "../components/AppButton"
import {windowHeight, windowWidth} from "../config/Dimensions";
import {Caption} from "react-native-paper";
import {AuthContext} from "../context/AuthProvider";
import Card from "../components/Card";
import colors from '../config/colors';
import firebase from "../config/firebase";
import Loading from "../components/Loading";
import { SimpleLineIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
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
    const [qnaModalOpen, setQnaModalOpen] = useState(false)
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

    const QNAs = [
        {
            id: 1,
            q: "What is your name?",
            a: "My name is Sabin Thapa"
        },
       {
           id: 2,
           q: "Where do you live?",
           a: "I live in Nepal"
       } 
    ]

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
        setModalOpen(false);
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
                animationType = "slide"
                    visible = {modalOpen}
                    transparent = {true}
                    onRequestClose = {() => setModalOpen(false)}

                >
                    <View style = {styles.kebabModalView}>
                        <View style = {styles.kebabContainer}>
                            <View style={styles.modalButton}>
                                <Button title='X' onPress={()=>setModalOpen(false)} />
                            </View>
                            <TouchableOpacity style = {styles.kebabItem} onPress = {() => {
                                setQnaModalOpen(true)
                                setModalOpen(false)
                                }}>
                                <FontAwesome name = "question-circle" size = {20} />
                                    <View >
                                        <Text style = {styles.leaveGroupText}> Q&A Section</Text>
                                        <Text style = {styles.leaveTextDetails}> Click to view/ask group questions</Text>
                                    </View>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.kebabItem} onPress = {showAlert}>
                                <Ionicons name = "exit" size = {20} color = {colors.danger}/>
                                    <View >
                                        <Text style = {styles.leaveGroupText}> Leave Group</Text>
                                        <Text style = {styles.leaveTextDetails}> Click to leave the group</Text>
                                    </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            {/* Q&A Modal */}
            <Modal
                animationType = "slide"
                visible = {qnaModalOpen}
                transparent = {true}
                onRequestClose = {() => setQnaModalOpen(false)}
                >
                    <View style = {styles.qnaModalView}>
                        <View style={styles.qnaContainer}>
                            <View style={styles.modalButton}>
                                <Button title='X' onPress={()=>setQnaModalOpen(false)} />
                            </View>
                            <View style = {styles.qnaContent}>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator = {false}
                                    keyExtractor = {(item) => item.id.toString()}
                                    data = {QNAs}
                                    renderItem = {({item}) => (
                                        <View style = {{display: "flex", flexDirection: "column"}}>
                                            <Text> {item.q}</Text>
                                            <Text>{item.a}</Text>
                                            <Text>sabin</Text>
                                        </View>
                                    )}
                                />
                                <AppButton title = "Add Question" style ={{display: "flex", flexDirection: "column", alignSelf: "flexEnd"}}/>
                            </View>
                        </View>

                    </View>
                </Modal>
            
            <View style = {styles.groupContainer}>
               <View style = {styles.groupContent}>
                
                {isAMember?
                (<TouchableOpacity onPress = {() => {setModalOpen(true)}}>
                    <SimpleLineIcons name = "options-vertical" size = {20}  style = {{alignSelf: "flex-end", marginRight: 10}}/>
                </TouchableOpacity>)
                : null }

                 <FlatList 
                    ListHeaderComponent = {
                        <>
                        <View style>
                            <View style = {styles.groupInfo}>
                                <Image source = {require("../assets/groups/kucc.png")} style = {styles.detailImage} resizeMode = {'contain'} />
                                {/* <AppText> {group.title} </AppText> */}
                                <Caption style={styles.about}> {group.about} </Caption>
                                
                                { isAMember
                                    ? (<View>
                                            <Caption style = {{color: colors.secondary}}> Already a member!</Caption> 
                                        </View>
                                        )
                                    // :<AppButton onPress = {() => {setJoining((prev => !prev))}} title={joining? "Joining" : "Join"} >
                                    :(<AppButton onPress = {joinGroupHandler} title={joining? "Joining" : "Join"} >
                                        {joining &&  <ActivityIndicator size="small" color ="#fff" />}    
                                     </AppButton> )
                                }
                            </View>

                            {isAMember 
                                ? (<View style = {{display: "flex", flexDirection: "row"}}>
                                        <Caption style = {{alignSelf: "flex-start", padding: 4}}> Group Posts</Caption>
                                    </View>)
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
                            type={item.type}
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
    about:{
        marginTop:20
    },
    detailImage: {
        height: windowHeight/6,
        width: windowWidth
    },
    groupContainer: {
        margin: 10,
        height: windowHeight,
        flex: 1,
        borderRadius: 10,
        padding:10
    },
    groupInfo: {
        justifyContent: "center",
        alignItems: "center",

    },
    groupContent: {
        marginTop: 10
    },
    appText: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.secondary
    },
    kebabModalView:{
        width:'100%',
        height:'100%',
        display:"flex",
        flexDirection:'row',
        alignItems:'flex-end',
        backgroundColor: 'transparent'
    },
    kebabContainer:{
        minHeight:'20%',
        maxHeight:'25%',
        width:'100%',
        paddingTop:17,
        borderTopEndRadius:20,
        backgroundColor: '#fff',
        flex:1,
        flexDirection:'column'
    },
    modalButton:{
        width:40,
        height:40,
        alignSelf:'flex-end',
        top:5,
        right:20,
        position:'absolute',
        zIndex:1
    },
    kebabItem: {
        flex:1,
        flexDirection:'row',
        padding:15,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary
    },
    leaveGroupText: {
        marginLeft: 15,
        fontSize: 16,
        fontWeight: "bold"
    },
    leaveTextDetails: {
        marginLeft: 15,
        color: colors.medium,
        fontSize: 13

    },
    qnaModalView:{
        width:'100%',
        height:'100%',
        display:"flex",
        flexDirection:'row',
        alignItems:'flex-end',
        backgroundColor: 'transparent'
    },
    qnaContainer:{
        minHeight:'95%',
        maxHeight:'100%',
        width:'100%',
        paddingTop:17,
        borderTopEndRadius:20,
        backgroundColor: '#fff',
        flex:1,
        flexDirection:'column'
    },
    qnaContent: {
        justifyContent: "center",
        alignItems: "center"
    } 
})
