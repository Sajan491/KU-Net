import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert,TextInput, Button } from 'react-native'
import {Formik} from "formik"
import colors from "../config/colors";
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import * as Yup from 'yup';
import Screen from "../components/Screen"
import firebase from "../config/firebase";
import { v4 as uuidv4 } from 'uuid';

const AddAnswerScreen = ({route, navigation}) => {
    const [userPpic, setUserPpic] = useState('')
    const [usersiD, setUsersiD] = useState('')
    const [userName, setUserName] = useState('')
    
    useEffect(() => {
        const usersCollection = firebase.firestore().collection("users_extended")
        const userID = firebase.auth().currentUser.uid;
        setUsersiD(userID)
        usersCollection.doc(userID).get().then((usr)=>{
            setUserName(usr.data()['username'])
            if(usr.data()['profilePic']){
                setUserPpic(usr.data()['profilePic'])
            }
        }).catch((error)=>{
            console.log(error)
        })

    }, [])

    const group = route.params.group
    const question = route.params.question
    

    const validationSchema = Yup.object().shape({
        answer: Yup.string().required().min(1).label("Answer"),
    }); 

   
    const handleSubmit = (values) => {
        var random_id = uuidv4();
        const QnAs = firebase.firestore().collection('groups').doc(group.id).collection('QnA').doc(question.id)
        values.userInfo = {username: userName, profilePic: userPpic, usersId:usersiD};
        QnAs.get().then(doc=>{
            let answers = doc.data()['answers']
            values.id = random_id
            answers.push(values)
            QnAs.update({answers:answers})
        }) 
        
    }

    return (
        <Screen style = {styles.screen}>
            <View  style={styles.formContainer}>
                <Formik
                    initialValues={{answer: "", postTime:firebase.firestore.Timestamp.now(), userInfo:{}}}
                    onSubmit={(values, {resetForm}) => {
                        handleSubmit(values)
                        resetForm({});
                    }}
                    validationSchema={validationSchema}
                >
                        {({
                        values,
                        
                    }) => (
                    <View>
                        <AppFormField 
                            maxLength = {255}
                            placeholder="Answer"
                            name="answer"
                            value={values.answer || ''}
                        />
                        <SubmitButton title="Submit"/>
                    </View>
                )}

                          
                </Formik>
        </View>
                    
        </Screen>
    )
}

export default AddAnswerScreen

const styles = StyleSheet.create({
    formContainer:{
        backgroundColor:'white',
        paddingHorizontal:12,
        borderRadius:15,
        paddingBottom:50,
        paddingTop:25,
    },
    container:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10
    }
    ,screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:10,
        flex:1,
        marginTop:-10
}, 

})
