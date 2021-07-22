import React, {useState, useLayoutEffect, useContext, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'
import colors from '../config/colors'
import {GiftedChat} from "react-native-gifted-chat";
import { FontAwesome } from '@expo/vector-icons';
import {AuthContext} from "../context/AuthProvider";
import firebase from "../config/firebase";

const ChatScreen = ({route}) => {
    const {id,abbr} = route.params;
    const {user} = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
   const docID = abbr+"-"+id

    useLayoutEffect(() => {
      const unsubscribe = firebase.firestore().collection('chats').doc(docID).collection("messages").orderBy("createdAt", "desc").onSnapshot(snapshot => setMessages(
      snapshot.docs.map(doc => ({
      _id: doc.data()._id,
      createdAt: doc.data().createdAt.toDate(),
      text: doc.data().text,
      user: doc.data().user,
      }))
      ));
      return unsubscribe;
      }, [])

    // const getAllMessages = async () => {
    //   const querySnap = await firebase.firestore().collection("chats")
    //     .doc(docID)
    //     .collection(messages)
    //     .orderBy("createdAt", "dsc")
    //     .get()
      
      
    //     const allMsgs = querySnap.docs.map(doc =>{
    //       return{
    //         ...doc.data(),
    //         createdAt: doc.data().createdAt.toDate()
    //       }
    //     })
  
    //     setMessages(allMsgs)
    // }
  
    const onSend = (messageArray) => {
      const msg = messageArray[0]
      const myMsg = {
        ...msg,
        sentBy: user.uid,
        sentTo: id,
        createdAt: new Date()
      }
      setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
      
      firebase.firestore().collection("chats")
        .doc(docID)
        .collection("messages")
        .add(myMsg)
    }
    
    const scrollToBottomComponent = () => {
        return(
            <FontAwesome name = "angle-double-down" size = {22} color = "#333" />
        )
    }
    return (
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        alwaysShowSend
        scrollToBottom
        scrollToBottomComponent = {scrollToBottomComponent}
        user={{
          _id: user?.uid,
          name: user?.displayName
        }}
      />
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10
    }
})