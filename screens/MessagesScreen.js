import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Header from '../components/Header'
import colors from '../config/colors'
import {messages} from "../data/messages";
import ItemSeparator from "../components/ItemSeperator";
import {Container, Card, UserInfo, UserImageWrapper, UserImage, TextSection, UserInfoText, MessageText, UserName, MessageTime} from "../styles/MessagesStyles";

const MessagesScreen = ({navigation}) => {
    return (
        <Container>
            <Header headerText="Chat" />
            <Text>Messages Screen</Text>
            <FlatList 
                data = {messages}
                keyExtractor = {item => item.id}
                ItemSeparatorComponent = {ItemSeparator}
                renderItem = {({item}) => (
                    <Card onPress = {() => navigation.navigate("Chat", item)}>
                        <UserInfo>
                            <UserImageWrapper>
                                <UserImage source= {item.userImage} />  
                            </UserImageWrapper>

                            <TextSection>
                                <UserInfoText>
                                    <UserName> {item.userName}</UserName>
                                    <MessageTime> {item.messageTime} </MessageTime>
                                </UserInfoText>
                                <MessageText> {item.messageText} </MessageText>
                                
                            </TextSection>
                        </UserInfo>
                    </Card>
                )}
            />
        </Container>
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
    }
})
