import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert,TextInput, Button } from 'react-native'
import {Formik} from "formik"
import colors from "../config/colors";
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Screen from "../components/Screen"
import firebase from "../config/firebase";

const AddAnswerScreen = ({route, navigation}) => {
    const [userPpic, setUserPpic] = useState('')
    const [usersiD, setUsersiD] = useState('')
    const [userName, setUserName] = useState('')
    const question = route.params
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

    const group = route.params
    

    const validationSchema = Yup.object().shape({
        answer: Yup.string().required().min(1).label("Answer"),
    }); 

   
    const handleSubmit = (values) => {
        console.log("added");
        const QnAs = firebase.firestore().collection('groups').doc(group.id).collection('QnA')
        QNAs.where("title", '==', question.title)
                .get()
                .then((docs) => {
                    docs.forEach((doc) => {
                        doc.ref.update({
                            answers: values.title
                            })
                        })
                    }).catch((err) => {
                        console.log(err.message());
                })
        values.userInfo = {username: userName, profilePic: userPpic, usersId:usersiD};
        QnAs.add(values).then(()=>{
            Alert.alert('Success!','Answer Added Successfully',[
                {text: 'Continue', onPress: () => navigation.navigate("Answers", group)},
              ])
        })
    }

    return (
        <Screen style = {styles.screen}>
            <View  style={styles.formContainer}>
                <Formik
                    initialValues={{answer: "", postTime:firebase.firestore.FieldValue.serverTimestamp(), userInfo:{}}}
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
                            name="title"
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
