import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, ScrollView, View, ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
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
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Constants from 'expo-constants'

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
    const [postUserID, setPostUserID] = useState('')
    const [userPpic, setUserPpic] = useState('')
    const [infoVisible, setInfoVisible] = useState(false)
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
            setUserName(usr.data()['id'])
            setPostUserID(usr.data()['uid'])
            if(usr.data()['profilePic']){
                setUserPpic(usr.data()['profilePic'])
            }
            
            
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
                values.userInfo = {username: userName,userID: postUserID, profilePic: userPpic};
                departPosts.add(values).then(()=>{
                    Alert.alert('Success!','Post Added Successfully',[
                        {text: 'Continue', onPress: () => navigation.jumpTo('Feed')},
                      ])
                })
                
            }
            else{
                values.page=values.page['label']
                values.userInfo = {username: userName, userID: postUserID, profilePic: userPpic};
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
    const handleContainerVisibility = () =>{
        setInfoVisible(!infoVisible)
    }

    return (
        <Screen style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={()=>navigation.navigate('ChoiceScreen')}><MaterialCommunityIcons name="keyboard-backspace" size={24} color={colors.primary} /></TouchableOpacity>   

                <Header headerText="Upload a Post" />
               
            </View>
            <ScrollView>
                <View  style={styles.formContainer}>
                <Formik
                    initialValues={{title:'', description:'',page:null, type:'photo/Video', postContents:[], peopleWhoLiked:[], images:[], userInfo:{}, likesCount:0, comments:[], postTime:firebase.firestore.FieldValue.serverTimestamp()}}
                    onSubmit={(values, {resetForm})=>{
                        
                        handleSubmit(values)
                        resetForm({});
                    }}
                    validationSchema={validationSchema}
                >
                    {({values})=><>
                        <TouchableOpacity style={{marginLeft:5, marginBottom:10}} onPress={handleContainerVisibility}>
                            <MaterialCommunityIcons name="information-outline" size={24} color="#999999" />
                        </TouchableOpacity>
                        {infoVisible && <View style={styles.infoContainer}>
                            <Text style={styles.editNote}>Note: The maximum number of images/videos you can add is 4.</Text>
                        </View>}
                        <AppFormImagePicker name="images"/>
                        <AppFormField 
                            maxLength = {255}
                            placeholder="Title"
                            name="title"
                            value={values.title || ''}
                        />
                        <AppFormField 
                            maxLength={2555}
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
                        />: <ActivityIndicator size={40} color={colors.primary} /> }
                    </>}
                
                </Formik>
                </View>
            </ScrollView>
        </Screen>
    )
}

export default AddPostScreen

const styles = StyleSheet.create({
    
    header:{
        flex:1,
        flexDirection:'row',
        marginBottom:-10
    },
    backBtn:{
        paddingTop: Constants.statusBarHeight + 8,
        
    },
    editNote:{
        marginBottom:20,
        color: '#999999',
        marginLeft:6
    },
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