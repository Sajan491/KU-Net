import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, ScrollView, View, ActivityIndicator, Alert } from 'react-native'
import * as Yup from 'yup';
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import AppFormImagePicker from '../components/form/AppFormImagePicker';
import Screen from '../components/Screen'
import firebase from "../config/firebase";
import ItemPicker from '../components/ItemPicker';

import colors from '../config/colors'
import Header from '../components/Header';
import {Formik} from 'formik'

// const pages = [
//     {label: "My Department", value:1, icon:"human-greeting"},
//     {label: "Red Cross Society", value:2, icon:"hospital-box"},
//     {label: "Alumni Group", value:3, icon:"face-woman"},
//     {label: "KUCC", value:4, icon:"laptop"},
//     {label: "ANNFSU KU", value:5, icon:"fountain-pen"},
//     {label: "Sports Club", value:6, icon:"football"},
//     {label: "Chess Club", value:7, icon:"chess-knight"},
//     {label: "Dance Club", value:8, icon:"human"},
// ];

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    description: Yup.string().label("Description"),
    page: Yup.object().required().nullable().label("Page"),
    images: Yup.array().max(4, "Maximum images allowed: 4")
});

const usersCollection = firebase.firestore().collection("users_extended")
const posts = firebase.firestore().collection("posts")

const AddPostScreen = ({navigation}) => {
    const [deptName, setDeptName] = useState("")
    const [uploading, setUploading] = useState(false)
    const [clubs, setClubs] = useState([])
    useEffect(() => {
        const userID = firebase.auth().currentUser.uid;


        usersCollection.doc(userID).get().then((abc)=>{
            setDeptName(abc.data()['department'])
            let data=[{label: "My Department", value:100, icon:"human-greeting"}]
            let joinedClubs = abc.data()['groups'];
            joinedClubs.forEach(function(doc){
                data.push({label: doc.title, value:doc.id, icon:doc.icon})
            })
            setClubs(data)
            console.log(clubs)

        }).catch((error)=>{
            console.log(error)
        })
    }, [])
    


    const handleSubmit= async (values) =>{
        if(Object.keys(deptName).length===0){
            console.log('try again')
        }
        else{  
            if(values.page['label'] === 'My Department') {
                values.page = deptName;
            }
            else{
                values.page=values.page['label']
            }
            
            console.log(values)
            posts.add(values).then((doc)=>{
            console.log("Post successfully added!")
            console.log(doc.id)
            Alert.alert('Success!','Post Added Successfully')

            })

            
        }  
        

    }

    return (
        <Screen style={styles.container}>
            <Header headerText="Add a Post" />
            <ScrollView>
                <View  style={styles.formContainer}>
                <Formik
                    initialValues={{title:'', description:'',page:null, images:[], userid:firebase.auth().currentUser.uid, likesCount:0, comments:{}, postTime:firebase.firestore.Timestamp.fromDate(new Date())}}
                    onSubmit={(values, {resetForm})=>{
                        setUploading(true)
                        handleSubmit(values)
                        resetForm({});
                        setUploading(false)
                    }}
                    validationSchema={validationSchema}
                >
                    {({values})=><>
                        <AppFormImagePicker name="images" />
                        <AppFormField 
                            maxLength = {255}
                            placeholder="Title"
                            name="title"
                            value={values.title || ''}
                        />
                        <AppFormField 
                            maxLength={255}
                            multiline
                            numberOfLines={4}
                            name="description"
                            placeholder="Description"
                            value={values.description || ''}
                        />
                        <ItemPicker
                            name="page"
                            placeholder="Page"
                            items={clubs}
                            numberOfColumns={1}
                        />
                        {!uploading? <SubmitButton 
                            title="Post"
                        />: <ActivityIndicator size={40} color="#000" /> }
                    </>}
                
                </Formik>
                </View>
            </ScrollView>
        </Screen>
    )
}

export default AddPostScreen

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
    },
    
})