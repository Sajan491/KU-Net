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

const MessagesScreen = ({navigation}) => {
    const [groups, setGroups] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        getGroups();
        console.log(groups, "hehe");
        console.log(loading, "loadings");
    }, [])
    
    const getGroups = () => {
        const groupsArr = []
        firebase.firestore().collection("groups").onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                groupsArr.push(doc.data())
            })
        })
        setGroups(groupsArr);
        setLoading(false);
    }


    
    if(loading){
        return <Loading />
    }
    return (
        <View style= {styles.container}>
            <Header headerText="Chat" />
            <AppText style={{color: colors.secondary}}> Channels</AppText>
            <FlatList 
                data = {groups}
                keyExtractor = {item => item.id}
                ItemSeparatorComponent = {ItemSeparator}
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
        marginTop: 35,
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
       marginLeft: 20,
   }
})
