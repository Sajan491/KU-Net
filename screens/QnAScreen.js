import React, {useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Button, Image, TouchableOpacity } from 'react-native'
import colors from '../config/colors'
import Screen from "../components/Screen"
import { MaterialCommunityIcons } from '@expo/vector-icons'

const QnAScreen = ({route, navigation}) => {
    const group = route.params
    const QNAs = [
        {
            id: 1,
            title: "What is your name?",
            question: "Which government? The world doesn’t consist of just one messily governmental office. You’ve been watching too many American doomsday movies.",
            author: "Sabin Thapa",
            postDate: "Nov 16, 2020"
        },
       {
           id: 2,
           title: "Where do you live?",
           question: "I live in Nepal",
           author: "Sabin Thapa",
           postDate: "Nov 16, 2020"
       },
    {
        id: 3,
        title: "What is your name?",
        question: "Which government? The world doesn’t consist of just one messily governmental office. You’ve been watching too many American doomsday movies.",
        author: "Sabin Thapa",
        postDate: "Nov 16, 2020"
    }, 
    ]

    useEffect(() => {
    }, [])

    return (
        <Screen style = {styles.screen}>
            <View style = {styles.qnaContent}>
            <TouchableOpacity title = "Add Answer" onPress = {() => {navigation.navigate("AddQuestion", group)}} style = {styles.addQuestion}>
                    <MaterialCommunityIcons name = "plus-circle-outline" size = {36} style = {{alignSelf: "center"}} />
                </TouchableOpacity>
                <FlatList
                    vertical
                    showsHorizontalScrollIndicator = {false}
                    keyExtractor = {(item) => item.id.toString()}
                    data = {QNAs}
                    renderItem = {({item}) => (
                        <View style = {styles.qnaContainer}>
                            <View style = {styles.userInfo}>
                                <Image source = {require("../assets/sajan.png")} style ={styles.userImage}/>
                                    <View style = {{display: "flex", marginLeft: 5}}>
                                        <Text style = {{fontWeight: "bold"}}> {item.author}</Text>
                                        <Text style = {{color: colors.medium, fontSize: 12}}> {item.postDate}</Text>
                                    </View>
                            </View>
                            <View style = {styles.questionContainer}>
                                <Text style = {{fontWeight: "bold"}}> {item.title}</Text>
                                <Text> {item.question}</Text>
                            </View>    
                            <TouchableOpacity onPress = {() => navigation.navigate("Answers", item)}>
                                <Text style = {{color: colors.secondary, marginLeft: 5}}>View Answers</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
                
            </View>
        </Screen>
         )
}

export default QnAScreen

const styles = StyleSheet.create({
    qnaContainer:{
        padding: 10,
        margin: 5,
        borderRadius: 10,
        paddingTop:17,
        backgroundColor: '#fff',
    },
    questionContainer: {
        borderRadius: 10,
        margin: 5,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:10,
        flex:1,
        marginTop:-10
},
    userInfo: {
        marginLeft:5,
        display: "flex",
        alignSelf: "flex-start",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    userImage: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    addQuestion: {
        marginTop: 10,
       borderBottomWidth: 1
    },
})
