import React, {useState, useContext, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Header from '../components/Header'
import colors from '../config/colors'
import {messages} from "../data/messages";
import ItemSeparator from "../components/ItemSeperator";
import {Container, Card, UserInfo, UserImageWrapper, UserImage, TextSection, UserInfoText, MessageText, UserName, MessageTime} from "../styles/MessagesStyles";
import { AuthContext } from '../context/AuthProvider';
import firebase from "../config/firebase";

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
