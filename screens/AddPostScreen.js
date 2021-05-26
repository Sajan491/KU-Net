import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, ScrollView, Alert, ActivityIndicator } from 'react-native'
import * as Yup from 'yup';
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import AppFormImagePicker from '../components/form/AppFormImagePicker';
import Screen from '../components/Screen'
import firebase from "../config/firebase";
import ItemPicker from '../components/ItemPicker';
import storage from '@react-native-firebase/storage';
import * as Firebase from 'firebase'


const pages = [
    {label: "My Department", value:1, icon:"human-greeting"},
    {label: "Red Cross Society", value:2, icon:"hospital-box"},
    {label: "Alumni Group", value:3, icon:"face-woman"},
    {label: "KUCC", value:4, icon:"laptop"},
    {label: "ANNFSU KU", value:5, icon:"fountain-pen"},
    {label: "Sports Club", value:6, icon:"football"},
    {label: "Chess Club", value:7, icon:"chess-knight"},
    {label: "Dance Club", value:8, icon:"human"},
];

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    description: Yup.string().label("Description"),
    page: Yup.object().required().nullable().label("Page"),
    images: Yup.array().min(1, "Please select at least one image").max(4, "Maximum images allowed: 4")
});

const usersCollection = firebase.firestore().collection("users_extended")
const posts = firebase.firestore().collection("posts")

const AddPostScreen = () => {
    const [deptName, setDeptName] = useState({})
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState()
    const [uploading, setUploading] = useState(false)
    
    useEffect(() => {
        const userID = firebase.auth().currentUser.uid;
        setUserId(userID)
        usersCollection.doc(userID).get().then((abc)=>{
            setDeptName(abc.data()['department'])
            setUserName(abc.data()['username'])
        }).catch((error)=>{
            console.log(error)
        })
    }, [])


    const handleSubmit= async (values) =>{


        // const blob = await new Promise((resolve, reject )=>{
        //     const xhr = new XMLHttpRequest();
        //     xhr.onload = function(){
        //         resolve(xhr.response);
        //     };
        //     xhr.onerror = function(){
        //         reject (new TypeError('Network request failed'));
        //     };
        //     xhr.responseType = 'blob';
        //     xhr.open('GET', image, true);
        //     xhr.send(null);
        // });

        // const ref = Firebase.storage().ref().child('posts')
        // const snapshot = ref.put(blob)
        // snapshot.on(Firebase.storage.TaskEvent.STATE_CHANGED, ()=>{
        //     setUploading(true)
        // },
        // (error)=>{
        //     setUploading(false)
        //     console.log(error)
        //     blob.close()
        //     return 
        // },
        // ()=>{
        //     setUploading(false)
        //     snapshot.snapshot.ref.getDownloadURL().then((url)=>console.log('download url : ',url))
        //     blob.close()
        //     return url
        // }
        // )


        // const uploadUris = values.images;
        // console.log(uploadUris)

        // for (let i=0; i<uploadUris.length; i++){
        //     let filename = uploadUris[i].substring(uploadUris[i].lastIndexOf('/')+1);
        //     console.log(filename)
        //     try {
        //         await storage().ref("post-images" + filename).putFile(uploadUris[i])
        //         console.log('success')
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }


        // uploadUris.forEach(function(Uri){
            
        //     try {
        //         storage().ref(filename).putFile(filename)
        //     } catch (error) {
                
        //     }
        // });
       
        if(Object.keys(deptName).length===0){
            console.log('try again')
        }
        else{
            values.userid = userId;
            values.username = userName;
            values.likesCount = 0;
            values.comments={};
            values.postTime = firebase.firestore.Timestamp.fromDate(new Date())
            
            if(values.page['label'] === 'My Department') {
                values.page = deptName;
            }
            console.log(values)
            posts.add(values).then(()=>{
            console.log("Post successfully added!")
                })
        }  
    }


    return (
        <Screen style={styles.container}>
            <ScrollView>
                <AppForm
                    initialValues={{title:'', description:'',page:null, images:[]}}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                <AppFormImagePicker name="images" />
                <AppFormField 
                    maxLength = {255}
                    placeholder='Title'
                    name="title"
                />
                <AppFormField 
                    maxLength={255}
                    multiline
                    numberOfLines={3}
                    name="description"
                    placeholder="Description"
                />
                <ItemPicker
                    name="page"
                    placeholder="Page"
                    items={pages}
                    numberOfColumns={1}
                />
                {!uploading? <SubmitButton 
                    title="Post"
                />: <ActivityIndicator size={large} color="#000" /> }
                </AppForm>
            </ScrollView>
        </Screen>
    )
}

export default AddPostScreen

const styles = StyleSheet.create({
container:{
padding:20
},
})