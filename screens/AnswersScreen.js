import React, {useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Button, Image, TouchableOpacity } from 'react-native'
import colors from '../config/colors'
import Screen from "../components/Screen"
import { MaterialCommunityIcons } from '@expo/vector-icons'

const AnswersScreen = ({route, navigation}) => {
    const question = route.params

    const answers = [
        {
            id: 1,
            postDate: "Nov20, 2021",
            answer: "Which government? The world doesn’t consist of just one messily governmental office. You’ve been watching too many American doomsday movies.",
            author: "Sabin Thapa",
      
        },
       {
           id: 2,
           postDate: "Nov20, 2021",
           answer: "I live in Nepal",
           author: "Sabin Thapa",
 
       },
    {
        id: 3,
             postDate: "Nov20, 2021",
        answer: "Which government? The world doesn’t consist of just one messily governmental office. You’ve been watching too many American doomsday movies.",
        author: "Sabin Thapa",
       
    }, 
    ]

    useEffect(() => {
    }, [])

    return (
        <Screen style = {styles.screen}>
            <View style = {styles.qnaContent}>
                <TouchableOpacity title = "Add Answer" onPress = {() => {navigation.navigate("AddAnswer", question)}} style = {styles.addQuestion}>
                    <MaterialCommunityIcons name = "plus-circle-outline" size = {36} style = {{alignSelf: "center"}} />
                </TouchableOpacity>
                <View style = {styles.qnaContainer}>
                    <View style = {styles.userInfo}>
                        <Image source = {require("../assets/sajan.png")} style ={styles.userImage}/>
                            <View style = {{display: "flex", marginLeft: 5}}>
                                <Text style = {{fontWeight: "bold"}}> {question.author}</Text>
                                <Text style = {{color: colors.medium, fontSize: 12}}> {question.postDate}</Text>
                            </View>
                    </View>
                   
                    <View style = {styles.questionContainer}>
                        <Text style = {{fontWeight: "bold"}}> {question.title}</Text>
                        <Text> {question.question}</Text>
                    </View> 
                    <Text style = {{color: colors.secondary}}> Answers </Text>

                    <FlatList
                    vertical
                    showsHorizontalScrollIndicator = {false}
                    keyExtractor = {(item) => item.id.toString()}
                    data = {answers}
                    renderItem = {({item}) => (
                        <View style = {{margin: 5, borderRadius:10, backgroundColor: colors.secondary}}>
                            <View style = {styles.userInfo}>
                                <Image source = {require("../assets/sajan.png")} style ={styles.userImage}/>
                                    <View style = {{display: "flex", marginLeft: 5}}>
                                        <Text style = {{fontWeight: "bold"}}> {item.author}</Text>
                                        <Text style = {[{color: colors.medium, fontSize: 12}, styles.fontColor]}> {item.postDate}</Text>
                                    </View>
                            </View>
                            <View style = {styles.questionContainer}>
                                <Text style = {styles.fontColor}> {item.answer}</Text>
                            </View>    
                    </View>
                    )}
                />
                    
                </View>
                
            </View>
        </Screen>
         )
}

export default AnswersScreen

const styles = StyleSheet.create({
    qnaContainer:{
        padding: 10,
        margin: 5,
        borderRadius: 10,
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
        marginTop: 5,
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
    fontColor: {
        color: "#fff"
    }
})
