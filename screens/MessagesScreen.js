import React, {useState, useContext, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import Header from '../components/Header'
import colors from '../config/colors'
import {channels} from "../data/channels";
import ItemSeparator from "../components/ItemSeperator";
import {Container, Card, UserInfo, UserImageWrapper, UserImage, TextSection, UserInfoText, MessageText, UserName, MessageTime} from "../styles/MessagesStyles";
import { AuthContext } from '../context/AuthProvider';
import firebase from "../config/firebase";
import AppText from "../components/AppText"

const MessagesScreen = ({navigation}) => {
    const {user} = useContext(AuthContext);
    const uID = user.uid;
    const [users, setUsers] = useState(null);

    //to display all the friends of a user here in the messages screen:
    const getAllUsers =  async() => {
        const querySnap = await firebase.firestore().collection("users_extended").where('age', "==", "21").get()
        const allUsers = querySnap.docs.map(doc => doc.data())
        console.log(allUsers, "users");
        setUsers(allUsers)
    }
    useEffect(() => {
        getAllUsers();
        console.log(uID, "user id");
    }, [])
    return (
        <View style= {styles.container}>
            <Header headerText="Chat" />
            <Text>Messages Screen</Text>
            <FlatList 
                data = {channels}
                keyExtractor = {item => item.cID}
                ItemSeparatorComponent = {ItemSeparator}
                renderItem = {({item}) => (
                    <TouchableOpacity onPress = {() => navigation.navigate("Chat", item)}>
                            <View style = {styles.content}>
                                <Image source = {item.cImage} style = {styles.channelImage} />
                                <AppText style = {styles.channelName}>{item.cName}</AppText>
                            </View>
                        </TouchableOpacity>
                )}
                />
            </View>
    )
}

export default MessagesScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10
    },
    channelImage: {
        height: 60,
        width: 60,
        borderRadius: 50,
        marginTop: 25,
        marginBottom: 10
    },
   content: {
       display: "flex",
       flexDirection: "row",
       borderBottomWidth: 1,
       borderColor: colors.secondary,
   },
   channelName: {
       marginTop: 45,
       marginLeft: 20
   }
})
