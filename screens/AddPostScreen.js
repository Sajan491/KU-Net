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
import { v4 as uuidv4 } from 'uuid';
var storageRef = firebase.storage().ref();

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
    const [userName, setUserName] = useState('')

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

            let uName= usr.data()['username']
            setUserName(uName)
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    
    
    const uploadImage= async (values)=>{
       
        // ----------uploading to storage-----------
        
        var uris = []
        var count = 0;
        var limit = values.images.length;
        await values.images.forEach( async (img)=>{
            
            const random_id = uuidv4();
            const extension = img.split('.').pop();
            
            const blob = await new Promise((resolve,reject)=>{
                const xhr = new XMLHttpRequest();
                xhr.onload = function(){
                    resolve(xhr.response);
                };
                xhr.onerror = function(){
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', img, true);
                xhr.send(null);

            });
           
            const picRef = storageRef.child(`posts/${random_id+'.'+extension}`)
            const snapshot = picRef.put(blob)
            snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED, 
                (snapshot)=>{
                console.log(snapshot.state);
                console.log('progress:' + (snapshot.bytesTransferred / snapshot.totalBytes)*100);
                setUploading(true);
            },
            (error)=>{
                setUploading(false)
                console.log(error);
                blob.close()
                return
            },
            ()=>{
                picRef.getDownloadURL().then((downloadUrl)=>{
                    count= count+1;
                    blob.close();
                    let extensions = ['jpg', 'png', 'jpeg', 'gif', 'webp','bmp', 'svg']
                    if (extensions.includes(extension)){
                        uris.push({uri:downloadUrl, id:random_id, type:'image'})
                    }
                    else{
                        uris.push({uri:downloadUrl, id:random_id, type:'video'})
                    }
                    
                    if (count === limit){ 
                        delete values.images
                        values.postContents = uris
                        finalSubmit(values)
                        setUploading(false)                  
                    }
                })
            }
            );
        })
    }

    const finalSubmit= async (values)=>{
        const groupPosts = firebase.firestore().collection('groups').doc(values.page['value']).collection('posts')
        const departPosts = firebase.firestore().collection('departments').doc(dept.value).collection('posts')

        if(Object.keys(dept.label).length===0){
            console.log('try again')
        }
        else{  
            if(values.page['label'] === 'My Department') {
                values.page = dept.label;
                values.username = userName;
                departPosts.add(values).then(()=>{
                    Alert.alert('Success!','Post Added Successfully',[
                        {text: 'Continue', onPress: () => navigation.jumpTo('Feed')},
                      ])
                })
                
            }
            else{
                values.page=values.page['label']
                values.username = userName;
                groupPosts.add(values).then(()=>{
                    
                    Alert.alert('Success!','Post Added Successfully',[
                        {text: 'Continue', onPress: () => navigation.jumpTo('Feed')},
                      ])
                })
            }
            
        }  
    }

    const handleSubmit= async (values) =>{
        if(values.images.length>0){
            await uploadImage(values);
        }
        else{
            finalSubmit(values)
        }
        
        
    }

    return (
        <Screen style={styles.container}>
            <Header headerText="Add a Post" />
            <ScrollView>
                <View  style={styles.formContainer}>
                <Formik
                    initialValues={{title:'', description:'',page:null, postContents:[], peopleWhoLiked:{}, images:[], username:'', likesCount:0, comments:{}, postTime:firebase.firestore.FieldValue.serverTimestamp()}}
                    onSubmit={(values, {resetForm})=>{
                        
                        handleSubmit(values)
                        resetForm({});
                        
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