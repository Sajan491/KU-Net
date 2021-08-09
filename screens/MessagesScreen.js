import React, {useState, useContext, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import Header from '../components/Header'
import colors from '../config/colors'
import {channels} from "../data/channels";
import ItemSeparator from "../components/ItemSeperator";
// import {Container, Card, UserInfo, UserImageWrapper, UserImage, TextSection, UserInfoText, MessageText, UserName, MessageTime} from "../styles/MessagesStyles";
import { AuthContext } from '../context/AuthProvider';
import firebase from "../config/firebase";
import AppText from "../components/AppText"
import Loading from "../components/Loading";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { groupStyles as styles } from '../styles/globalStyles';

const MessagesScreen = ({navigation}) => {
    const [groups, setGroups] = useState([]);
    const [department, setDepartment] = useState([]);
    const [loading, setLoading] = useState(true);
    const usersDB = firebase.firestore().collection("users_extended");
    const userID = firebase.auth().currentUser.uid;

    useEffect( () => {
        // getGroups();
        getEnrolledGroups();
        getCurrentDepartment();
    }, [])
    
    // const getGroups = () => {
    //     firebase.firestore().collection("groups").get().then((docs)=> {
    //         const groupsArray = []
    //         docs.forEach((doc) => {
    //             groupsArray.push({ ...doc.data()})
    //         })
    //         setGroups(groupsArray);
    //         setLoading(false);
    //     })
    // }

    const getEnrolledGroups =  () => {
        usersDB.doc(userID).get().then((doc) => {
          if(doc.data()['groups'] !== undefined) {
              const groupArr = doc.data()['groups']
              setGroups(groupArr)
              setLoading(false)
           } else{
               usersDB.doc(userID).update({
                   groups: []
               })
           }
       }).catch(err => {
           console.log("Error fetching users data", err);
       })
   }

   const getCurrentDepartment = () => {
    usersDB.doc(userID).get().then((doc) => {
         if(doc.exists) {
             const myDepartment = doc.data()['department']
             setDepartment(myDepartment)
             setLoading(false);
         }
    }).catch((err) => {
        console.log(err.message);
    })
}


    
    if(loading){
        return <Loading />
    }
    return (
        <View style= {styles.container}>
            <Header headerText="Chat" />
            <AppText style={{color: colors.secondary, textAlign: "center", marginBottom: 5}}> Tap on the channel to join the chat!</AppText>

            <>
                <Text style = {styles.title}> My Department </Text>
                        <TouchableOpacity onPress = {() => navigation.navigate("Chat", department)}>
                                <View style = {styles.content}>
                                    <MaterialCommunityIcons name = {department.icon} size={35} style = {styles.channelImage} />
                                    {/* <Image source = {item.icon} style = {styles.channelImage} /> */}
                                    <AppText style = {styles.channelName}>{department.label}</AppText>
                                </View>
                            </TouchableOpacity>

             </>

             <>
                    <Text style = {styles.title}> My Groups</Text>
                    <FlatList 
                        data = {groups}
                        keyExtractor = {item => item.id.toString()}
                        ItemSeparatorComponent = {ItemSeparator}
                        showsVerticalScrollIndicator={false}
                        renderItem = {({item}) => (
                            <TouchableOpacity onPress = {() => navigation.navigate("Chat", item)}>
                                    <View style = {styles.content}>
                                        <MaterialCommunityIcons name = {item.icon} size={35} style = {styles.channelImage} />
                                        {/* <Image source = {item.icon} style = {styles.channelImage} /> */}
                                        <AppText style = {styles.channelName}>{item.abbr}</AppText>
                                    </View>
                                </TouchableOpacity>
                        )}
                   />
            </>
            </View>
    )
}

export default MessagesScreen