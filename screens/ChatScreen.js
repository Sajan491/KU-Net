import React, {useState, useLayoutEffect, useContext, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'
import colors from '../config/colors'
import {GiftedChat, Bubble} from "react-native-gifted-chat";
import { FontAwesome } from '@expo/vector-icons';
import {AuthContext} from "../context/AuthProvider";
import firebase from "../config/firebase";
import Loading from "../components/Loading";

const ChatScreen = ({route}) => {
    const {id,abbr, value, label} = route.params;
    const {user} = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

   const docID = (abbr || label) +"-"+ (id || value)

    useLayoutEffect(() => {
      const unsubscribe = firebase.firestore().collection('chats').doc(docID)
          .collection("messages")
          .orderBy("createdAt", "desc")
          .onSnapshot(snapshot => setMessages(
      snapshot.docs.map(doc => ({
      _id: doc.data()._id,
      createdAt: doc.data().createdAt.toDate(),
      text: doc.data().text,
      user: doc.data().user,
      }))
      ));
      setLoading(false);
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
        sentTo: id || value,
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
    
    if(loading) {
      return <Loading />
    }
    return (
       <GiftedChat
        messages={messages}
        showAvatarForEveryMessage = {true}
        onSend={messages => onSend(messages)}
        alwaysShowSend
        scrollToBottom
        scrollToBottomComponent = {scrollToBottomComponent}
        renderUsernameOnMessage = {true}
        renderOwn
        user={{
          _id: user?.uid,
          name: user?.displayName
        }}
        renderBubble = {props => {
          return <Bubble 
            {...props}
            wrapperStyle = {{
              right: {
                backgroundColor: colors.secondary
              },
              left: {
                backgroundColor: "#fff"
              }
            }}
          />
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
