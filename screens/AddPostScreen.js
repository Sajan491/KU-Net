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


const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    description: Yup.string().label("Description"),
    page: Yup.object().required().nullable().label("Page"),
    images: Yup.array().max(4, "Maximum images allowed: 4")
});

const usersCollection = firebase.firestore().collection("users_extended")

const AddPostScreen = ({navigation}) => {
    const [dept, setDept] = useState({})
    const [uploading, setUploading] = useState(false)
    const [clubs, setClubs] = useState([])

    useEffect(() => {
        const userID = firebase.auth().currentUser.uid;

        usersCollection.doc(userID).get().then((usr)=>{
            let dep = usr.data()['department']
            setDept(dep)
            let data=[{label:'My Department', value:dep.value, icon:dep.icon}]
            let groups = usr.data()['groups']
            groups.forEach(function(doc){
                data.push({label: doc.title, value:doc.id, icon:doc.icon})
            })
            setClubs(data)
        }).catch((error)=>{
            console.log(error)
        })
    }, [])
    


    const handleSubmit= async (values) =>{
        const groupPosts = firebase.firestore().collection('groups').doc(values.page['value']).collection('posts')
        const departPosts = firebase.firestore().collection('departments').doc(dept.value).collection('posts')

        if(Object.keys(dept.label).length===0){
            console.log('try again')
        }
        else{  
            if(values.page['label'] === 'My Department') {
                values.page = dept.label;
                departPosts.add(values).then(()=>{
                    Alert.alert('Success!','Post Added Successfully')
                })
            }
            else{
                values.page=values.page['label']
                groupPosts.add(values).then(()=>{
                    Alert.alert('Success!','Post Added Successfully')
                })
            }
            console.log(values)
            
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