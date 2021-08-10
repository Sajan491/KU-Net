import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, FlatList, Button, Image, TouchableOpacity } from 'react-native'
import colors from '../config/colors'
import Screen from "../components/Screen"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import firebase from "../config/firebase"
import Loading from "../components/Loading";

const AnswersScreen = ({route, navigation}) => {
    const question = route.params.item
    const group = route.params.group
    const [answers, setAnswers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAnswers();
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("OP");
            getAnswers();
          });
          return unsubscribe;
    }, [navigation])

    const getAnswers = () => {
        firebase.firestore().collection("groups").doc(group.id).collection("QnA").doc(question.id).get().then((doc) => {
            if(doc.exists) {
                setAnswers(doc.data()['answers'])
            }
        }).catch((err) => {
            console.log(err.message());
        })

        setLoading(false)
    }
    


    return !loading ? (
        <Screen style = {styles.screen}>
            <View style = {styles.qnaContent}>
                <TouchableOpacity title = "Add Answer" onPress = {() => {navigation.navigate("AddAnswer",{question, group})}} style = {styles.addQuestion}>
                    <MaterialCommunityIcons name = "plus-circle-outline" size = {36} style = {{alignSelf: "center"}} />
                </TouchableOpacity>
                <View style = {styles.qnaContainer}>
                    <View style = {styles.userInfo}>
                        {question.userInfo.profilePic 
                                ? <Image source = {{uri: question.userInfo.profilePic}} style ={styles.userImage} />
                                :  <Image source = {require("../assets/sajan.png")} style ={styles.userImage} />
                            }

                            <View style = {{display: "flex", marginLeft: 5}}>
                                <Text style = {{fontWeight: "bold"}}> {question.userInfo?.username}</Text>
                                {/* <Text style = {{color: colors.medium, fontSize: 12}}> {question.postTime}</Text> */}
                            </View>
                    </View>
                   
                    <View style = {styles.questionContainer}>
                        <Text style = {{fontWeight: "bold"}}> {question.title}</Text>
                        <Text> {question.description}</Text>
                    </View> 
                    <Text style = {{color: colors.secondary}}> Answers </Text>

                    <FlatList
                    vertical
                    showsHorizontalScrollIndicator = {false}
                    keyExtractor = {(item) => item.id.toString()}
                    data = {answers}
                    renderItem = {({item}) => (
                        <View style = {{margin: 5, borderRadius:10, backgroundColor: "#e2ece9"}}>
                            <View style = {styles.userInfo}>
                                    {item.userInfo.profilePic 
                                        ? <Image source = {{uri: item.userInfo.profilePic}} style ={styles.userImage} />
                                        :  <Image source = {require("../assets/sajan.png")} style ={styles.userImage} />
                                    }
                                    <View style = {{display: "flex", marginLeft: 5}}>
                                        <Text style = {{fontWeight: "bold"}}> {item.userInfo.username}</Text>
                                        {/* <Text style = {[{color: colors.medium, fontSize: 12}, styles.fontColor]}> {item.postDate}</Text> */}
                                    </View>
                            </View>
                            <View style = {styles.answerContainer}>
                                <Text style = {styles.fontColor}> {item.answer}</Text>
                            </View>    
                    </View>
                    )}
                />
                    
                </View>
                
            </View>
        </Screen>
         ) : <Loading />
}

export default AnswersScreen

const styles = StyleSheet.create({
    qnaContent: {
        marginBottom: 80
    },
    qnaContainer:{
        padding: 10,
        marginBottom: 215,
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
    },
    fontColor: {
        color: "#000"
    },
    answerContainer: {
        display: "flex",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})
