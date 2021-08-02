import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, TouchableOpacityBase, Alert } from 'react-native'
import Header from '../components/Header'
import Screen from '../components/Screen'
import colors from '../config/colors'
import Constants from 'expo-constants'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Formik} from 'formik'
import { AppFormField, SubmitButton, AppFormFilePicker } from '../components/form'
import ItemPicker from '../components/ItemPicker'
import * as Yup from 'yup';
import firebase from "../config/firebase";
import { v4 as uuidv4 } from 'uuid';
var storageRef = firebase.storage().ref();

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    description: Yup.string().label("Description"),
    page: Yup.object().required().nullable().label("Page"),
    files: Yup.array().max(4, "Maximum files allowed: 4")
});
const usersCollection = firebase.firestore().collection("users_extended")

const AddFilesScreen = ({navigation}) => {
    const [infoVisible, setInfoVisible] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [clubs, setClubs] = useState([])
    const [userName, setUserName] = useState('')
    const [userPpic, setUserPpic] = useState('')
    const [dept, setDept] = useState({})

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
            setUserName(usr.data()['username'])
            if(usr.data()['profilePic']){
                setUserPpic(usr.data()['profilePic'])
            }
            
            
        }).catch((error)=>{
            console.log(error)
        })
    }, [])


    const handleContainerVisibility = () =>{
        setInfoVisible(!infoVisible)
    }


    const uploadFile= async (values)=>{
       
        // ----------uploading to storage-----------
        
        var uris = []
        var count = 0;
        var limit = values.files.length;
        await values.files.forEach( async (file)=>{
            const random_id = uuidv4();
            const extension = file.split('.').pop();
            
            const blob = await new Promise((resolve,reject)=>{
                const xhr = new XMLHttpRequest();
                xhr.onload = function(){
                    resolve(xhr.response);
                };
                xhr.onerror = function(){
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', file, true);
                xhr.send(null);

            });
           
            const fileRef = storageRef.child(`files/${random_id+'.'+extension}`)
            const snapshot = fileRef.put(blob)
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
                fileRef.getDownloadURL().then((downloadUrl)=>{
                    count= count+1;
                    blob.close();
                    let extensions = ['pdf','docx','odt','rtf','txt','wpd','doc']
                    if (extensions.includes(extension)){
                        uris.push({uri:downloadUrl, id:random_id, type:'text'})
                    }
                    else{
                        uris.push({uri:downloadUrl, id:random_id, type:'others'})
                    }
                    
                    if (count === limit){ 
                        delete values.files
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
        const groupFiles = firebase.firestore().collection('groups').doc(values.page['value']).collection('files')
        const departFiles = firebase.firestore().collection('departments').doc(dept.value).collection('files')

        if(Object.keys(dept.label).length===0){
            console.log('try again')
        }
        else{  
            if(values.page['label'] === 'My Department') {
                values.page = dept.label;
                values.userInfo = {username: userName, profilePic: userPpic};
                departFiles.add(values).then(()=>{
                    Alert.alert('Success!','Files Added Successfully',[
                        {text: 'Continue', onPress: () => navigation.jumpTo('Feed')},
                      ])
                })
                
            }
            else{
                values.page=values.page['label']
                values.userInfo = {username: userName, profilePic: userPpic};
                groupFiles.add(values).then(()=>{
                    
                    Alert.alert('Success!','Files Added Successfully',[
                        {text: 'Continue', onPress: () => navigation.jumpTo('Feed')},
                      ])
                })
            }    
        }  
    }

    const handleSubmit= async (values) =>{
        if(values.files.length>0){
            await uploadFile(values);
        }
        else{
            finalSubmit(values)
        }
    }

    
    return (
        <Screen style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={()=>navigation.navigate('ChoiceScreen')}><MaterialCommunityIcons name="keyboard-backspace" size={24} color={colors.primary} /></TouchableOpacity>   
                <Header headerText="Upload a File" />
            </View>

            <ScrollView>
                <View  style={styles.formContainer}>
                <Formik
                    initialValues={{title:'', description:'',page:null, postContents:[], files:[], peopleWhoLiked:[], userInfo:{}, comments:[], postTime:firebase.firestore.FieldValue.serverTimestamp()}}
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
                            <Text style={styles.editNote}>Note: The maximum number of files you can add is 4.</Text>
                        </View>}
                        <AppFormFilePicker name='files' />
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
                        />: <ActivityIndicator size={40} color={colors.primary} /> }
                    </>}
                
                </Formik>
                </View>
            </ScrollView>
        </Screen>
    )
}

export default AddFilesScreen

const styles = StyleSheet.create({
    screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        marginTop:-10,
       
    },
   
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
