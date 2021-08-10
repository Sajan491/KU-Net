import React, {useContext, useState, useEffect, useCallback} from 'react'
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Button, Alert } from 'react-native'
import colors from "../config/colors";
import Screen from "../components/Screen";
import Header from '../components/Header';
import firebase from "../config/firebase";
import {Entypo} from "@expo/vector-icons"


const UserProfileScreen = ({navigation, route}) => {
    const postAuthorID = route.params?.postUserID
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([])
    const currentUserId = firebase.auth().currentUser.uid;
    const [ratingCount, setRatingCount] = useState(0);
    const [canUpVote, setCanUpVote] = useState(true);
    const [canDownVote, setCanDownVote] = useState(true);
    const [sameUser, setSameUser] = useState(false)
    const [userHasAlreadyUpvoted, setUserHasAlreadyUpvoted] = useState(false)
    const [userHasAlreadyDownvoted, setUserHasAlreadyDownvoted] = useState(false)
    const ratingsDoc = firebase.firestore().collection("users_extended").doc(postAuthorID).collection("ratings").doc(postAuthorID)
    useEffect(() => {
        // console.log(postAuthorID, " post");
        console.log(currentUserId, "current");
        getData();
            if(postAuthorID === currentUserId || postAuthorID === undefined) {
                setSameUser(true)
            } else {
                setSameUser(false);
            }
            console.log(sameUser, "same user?");
    }, [])

    const getData = () => {
            firebase.firestore().collection("users_extended").doc(postAuthorID || currentUserId).onSnapshot((documentSnapshot) => {
            setUserData(documentSnapshot.data())
             })
             firebase.firestore().collection("users_extended")
                    .doc(postAuthorID || currentUserId).collection("ratings")
                    .doc(postAuthorID || currentUserId).get().then((doc) =>{
                        if(doc.exists){
                            {setRatingCount(doc.data()['voteCount'] ) };
                            const upVotersArr = []
                            const upVoterArrFromDB = doc.data()['upvoter']
                            const arr = upVotersArr.concat(upVoterArrFromDB);
                            {arr.length !== 0 && arr.forEach((voterID) => {
                                if(voterID === currentUserId) {
                                    setUserHasAlreadyUpvoted(true)
                                    setCanDownVote(true)
                                }
                            })}
    
                            const downVotersArr = []
                            const downVoterArrFromDB = (doc.data()['downvoter'])
                            const arr2 = downVotersArr.concat(downVoterArrFromDB);   
                            {arr2.length !== 0 && arr2.forEach((voterID) => {
                                if(voterID === currentUserId) {
                                    setUserHasAlreadyDownvoted(true)
                                    setCanUpVote(true)
                                }
                            })}
                        }

             })

    }

    const handlePressUpvote = () => {
        setRatingCount(ratingCount+1);
        Alert.alert("Upvoted!")
        // disable upvote
        setCanUpVote(false)
        setCanDownVote(true)
        setUserHasAlreadyDownvoted(false)
        ratingsDoc.set({
            voteCount: ratingCount+1,
            upvoter: [currentUserId]
        }, {
            merge: true
        }).then(() => {
            console.log("Upvote added to the database");
        })

        ratingsDoc.get().then((doc) => {
            const downVotersFromDB = doc.data()['downvoter'] || []
            const filteredDownvoters = downVotersFromDB.filter((id) => id!== currentUserId)
            console.log(filteredDownvoters, "filteredLIST");
            ratingsDoc.update({
                downvoter: filteredDownvoters
            })
        })

        //enable downvote with count-=2
    }

    const handlePressDownvote = () => {
        setRatingCount(ratingCount-1);
        Alert.alert("Downvoted!")
        //disable downvote
        setCanDownVote(false)
        setCanUpVote(true)
        setUserHasAlreadyUpvoted(false)
      
        console.log(canUpVote, "canUpVote");
        ratingsDoc.set({
            voteCount: ratingCount-1,
            downvoter: [currentUserId]
        },
            {merge: true}
        ).then(() => {
            console.log("Upvote added to the database");
        })

        ratingsDoc.get().then((doc) => {
            const upvotersFromDB = doc.data()['upvoter'] || []
            const filteredUpvoters = upvotersFromDB.filter((id) => id!== currentUserId)
            console.log(filteredUpvoters, "filteredLIST");
            ratingsDoc.update({
                upvoter: filteredUpvoters
            })
        })
    }

    return (
        <Screen style={styles.screen}>
            { !route?.params && <Header headerText="Profile" /> }
            <ScrollView
                style = {styles.container}
                contentContainerStyle = {{justifyContent: "center", alignItems: "center"}}
                showsVerticalScrollIndicator = {false}    
            >
                <Image 
                    source = { userData.profilePic ? { uri: userData.profilePic} : require("../assets/sajan.png")} 
                    style = {styles.userImg} 
                />

                <Text style = {styles.userName}> {userData?.username}</Text>
                <Text style = {styles.aboutUser}> {userData?.bio} </Text>
                <Text style = {styles.aboutUser}> Student of {userData.department?.label} </Text>
                <Text style = {styles.aboutUser}> Batch of {userData?.batch} </Text>
                
                {/* If same user's profile then, allow to edit */}
                {sameUser
                        ? (<View style = {styles.userBtnWrapper}>
                                <TouchableOpacity onPress = {() => {navigation.navigate("ProfileSettings")}} style = {styles.userBtn}>
                                    <Text style = {styles.userBtnText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress = {() => navigation.navigate("AccountSettings")} style = {styles.userBtn}>
                                    <Text style = {styles.userBtnText}>Settings</Text>
                                </TouchableOpacity>
                           </View>)
                        : null }

                        <View style = {{marginTop: 5, borderTopWidth: 1, borderTopColor: colors.secondary}}>
                            <Text style = {styles.userName}> Upvotes/Ratings</Text>
                            {!sameUser  && <Text style = {styles.aboutUser}> You can only rate a user once.</Text> }
                            {sameUser && <Text style = {styles.aboutUser}> Your ratings based on other users' votes is</Text> }
                            <View style = {styles.ratingContainer}>
                                {!sameUser && canUpVote && !userHasAlreadyUpvoted && <TouchableOpacity onPress = {() => handlePressUpvote()}>
                                        <Entypo name="arrow-up" size={65} color = "green"/>
                                    </TouchableOpacity> }
                                    <View style = {styles.rating}> 
                                        <Text style={{textAlign: "center", marginRight: 15, fontSize: 80, color: "#fff"}}> {ratingCount}</Text>
                                    </View>
                                {!sameUser && canDownVote && !userHasAlreadyDownvoted && <TouchableOpacity onPress = {() => handlePressDownvote()}>
                                    <Entypo name="arrow-down" size={65} color = {colors.primary}/>
                                    </TouchableOpacity> }
                            </View>
                        </View>

            </ScrollView>
        </Screen>
    )
}

export default UserProfileScreen

const styles = StyleSheet.create({
    container:{
        padding: 20,
        flex: 1,
        backgroundColor: colors.white
    }
    ,screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10

    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: colors.light
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
        alignSelf: "center",
        color: colors.secondary
    },
    aboutUser: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.medium,
        textAlign: "center",
        marginBottom: 10
    },
    userBtnWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginBottom: 10,
    },
    userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 1,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
      },
      userBtnTxt: {
        color: '#2e64e5',
      },
      ratingContainer: {
        display: "flex", 
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center"
      },
      rating: {
          backgroundColor: colors.secondary,
          height: 115,
          width: 115,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center"
    
      }
})

