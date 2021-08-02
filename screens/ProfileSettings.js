import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, ImageBackground, Modal } from 'react-native'
import * as Yup from 'yup';
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import Screen from '../components/Screen'
import ItemPicker from '../components/ItemPicker';
import AppText from '../components/AppText';
import firebase from "../config/firebase";
import {Label} from "native-base";
import departments from "../components/Departments";
import Loading from '../components/Loading';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import colors from "../config/colors"

const validationSecondRegisterScreen = Yup.object().shape({
    username: Yup.string().min(1).nullable().label("Username"),
    age: Yup.string().min(1).max(2).label("Age"),
    department: Yup.object().nullable().label("Department"),
    bio: Yup.string().min(1).label("Bio"),
    batch:  Yup.string().min(4).label("Batch")
});

const usersCollection = firebase.firestore().collection("users_extended")
const ProfileSettings = ({navigation}) => {
    const [userName, setUserName] = useState("");
    const [department, setDepartment] = useState({});
    const [bio, setBio] = useState("")
    const [age, setAge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [batch, setBatch] = useState(null);
    const [kebabModalVisible, setKebabModalVisible] = useState(false)  

    const userID = firebase.auth().currentUser.uid;
    const db = usersCollection.doc(userID)

    useEffect(() => {
        getData();
        console.log(department.label, "I ama LABEL");
    }, [])

    const getData =  () => {
        db.get()
        .then((doc) => { 
              setUserName(doc.data()['username'])
              const dept = doc.data()['department']
              console.log(dept, "heheh");
              setDepartment(dept)
              setAge(doc.data()['age'])
              setBio(doc.data()['bio'])
              setBatch(doc.data()['batch'])
            }).catch ((err) => {
                console.log("Error receiving data from the database", err);
            })
            setLoading(false);
    }

    const handleSubmit=(values)=>{
        console.log(values, "jn");
        try {            
            console.log("User ID: ", userID);
            db.get()
                .then( () => {
                    if(values.username !== "") {
                        db.update({
                            username: values.username
                        })
                        console.log("Updated username");
                        firebase.auth().currentUser.updateProfile({
                            displayName: values.username
                        })
                    }
                    if(values.age !== "") {
                        db.update({
                            age: values.age
                        })
                        console.log("Updated age!")
                    }
                    if(values.bio !== "") {
                        db.update({
                            bio: values.bio
                        })
                        console.log("Updated bio!");
                    }
                    if(values.batch !== "") {
                        db.update({
                            batch: values.batch
                        })
                        console.log("Updated batch");
                    }

                    if(values.department !== null) {
                        db.update({
                            department: values.department
                        })
                        console.log(("Department updated!"));
                    }
                    
                    
                })          
        } catch (error) {
            console.log("Error updating values in the database",error)
        }
        navigation.goBack()      
    }

    const changeProfilePicHandler = () => {
        console.log("PP CHANGED");
    }

    if(loading){
        return <Loading/>}

    return (
        <Screen style={styles.container}>


            {/* kebab modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={kebabModalVisible} 
                onRequestClose={() => {
                setLikersModalVisible(false);
            }}>
                
                <View style={styles.kebabModalView}>
                    <View style={styles.kebabContainer}>

                        <View style={styles.modalButton}>
                            <Button title='X' onPress={()=>setKebabModalVisible(false)} />
                        </View>
                            <>
                            <TouchableOpacity style={styles.kebabOneItem} onPress={() => {}}>
                                <MaterialCommunityIcons name="content-save" size={30} color="black" />
                                <View style={styles.kebabText}>
                                    <Text style={styles.kebabTitle}>Upload Photo</Text>
                                    <Text style={styles.kebabDetail}>Upload a photo from your gallery.</Text>
                                </View> 
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.kebabOneItem} onPress={() => {}}>
                                <MaterialCommunityIcons name="camera" size={30} color="black" />
                                <View style={styles.kebabText}>
                                    <Text style={styles.kebabTitle}>Take Photo</Text>
                                    <Text style={styles.kebabDetail}>Open camera to take your photo.</Text>
                                </View> 
                            </TouchableOpacity>
                       
                            </>
                    </View>
                </View>   
            </Modal>

            <ScrollView
                showsVerticalScrollIndicator = {false}
            >
            
            <TouchableOpacity onPress = {() => setKebabModalVisible(true)}>
                <View style = {styles.imageContainer}>
                    <ImageBackground
                        source = {require("../assets/sajan.png")}
                        style = {{height: 100, width: 100, resizeMode: "contain"}}
                        imageStyle = {{borderRadius: 25}}
                    >
                        <View style = {styles.cameraIconContainer}>
                            <MaterialCommunityIcons name="camera" size = {35} color = {colors.light} style = {styles.cameraIcon} />
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>

            <AppForm
                initialValues={{username: "", age:'',  department: null, bio:'', batch:''}}
                onSubmit={handleSubmit}
                validationSchema={validationSecondRegisterScreen}
            >
                <Label style = {styles.label}> Username</Label>
                <AppFormField 
                    maxLength = {255}
                    defaultValue = {userName}
                    name="username"
                />

                <Label style = {styles.label}>Age</Label>
                <AppFormField 
                    keyboardType="numeric"
                    maxLength = {2}
                    defaultValue = {age}
                    name="age"
                />
                
                <Label style = {styles.label}>Department</Label>
                <ItemPicker
                    items={departments}
                    name= "department"
                    numberOfColumns={1}
                    placeholder= {department.label}
                />

                <Label style = {styles.label}> Bio </Label>
                <AppFormField 
                    maxLength = {255}
                    placeholder='Short Bio'
                    defaultValue = {bio}
                    name="bio"
                    multiline
                    numberOfLines={4}
                />

                <Label style = {styles.label}> Batch</Label>
                <AppFormField 
                    keyboardType="numeric"
                    maxLength = {4}
                    defaultValue = {batch}
                    name="batch"
                />
                <SubmitButton 
                    title="Save"
                />               
            </AppForm>
            </ScrollView>


    </Screen>
    )
}

export default ProfileSettings

const styles = StyleSheet.create({
    header:{
        paddingLeft:8,
        paddingTop:30
    },
    container:{
        padding:20,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
      },
    label: {
        fontSize: 13,
        paddingTop: 10,
        paddingLeft: 8
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    cameraIconContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    cameraIcon: {
        opacity: 0.9,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.light
    },

    kebab:{
        marginTop:5,
        width:10
    },
    kebabModalView:{
        width:'100%',
        height:'100%',
        display:"flex",
        flexDirection:'row',
        alignItems:'flex-end',
        backgroundColor: 'transparent'
    },
    kebabContainer:{
        minHeight:'10%',
        maxHeight:'25%',
        width:'100%',
        paddingTop:7,
        borderTopEndRadius:20,
        backgroundColor: '#fff',
        flex:1,
        flexDirection:'column'
    },
    kebabOneItem:{
        flex:1,
        flexDirection:'row',
        paddingLeft:20,
        borderBottomColor:'rgba(0,0,0,0.4)',
        borderBottomWidth:0.2,
        padding:15,
        paddingTop: 17
    },
    kebabText:{
        marginLeft:15,
        marginTop:-3
    },
    kebabTitle:{
        fontSize:16,
        fontWeight:'bold'
    },
    kebabDetail:{
        fontSize:12,
        color:'rgba(0,0,0,0.7)',

    },
    editButtonGap:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    
})
