import React, {useState, useEffect, useCallback} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'
import colors from '../config/colors'
import {GiftedChat} from "react-native-gifted-chat";
import { FontAwesome } from '@expo/vector-icons';

const ChatScreen = ({route}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello wa',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: require("../assets/sajan.png"),
          },
        },
        {
          _id: 2,
          text: 'Aloha',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
    
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
          _id: 1,
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
