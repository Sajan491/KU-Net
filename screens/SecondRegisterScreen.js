
import React, {useContext} from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import * as Yup from 'yup';
import { AppForm, AppFormField, SubmitButton } from '../components/form'
import Screen from '../components/Screen'
import ProfileImagePicker from '../components/ProfileImagePicker';
import ItemPicker from '../components/ItemPicker';
import AppText from '../components/AppText';
import firebase from "../config/firebase";
import { AuthContext } from '../context/AuthProvider';

const validationSecondRegisterScreen = Yup.object().shape({
    username: Yup.string().required().min(1).label("Username"),
    age: Yup.string().required().min(1).max(2).label("Age"),
    department: Yup.object().required().nullable().label("Department"),
    bio: Yup.string().min(1).label("Bio"),
    batch:  Yup.string().required().min(4).label("Batch")
});

const departments = [
    {label: "Computer Science and Engineering", value:1, icon:"laptop"},
    {label: "Civil Engineering", value:2, icon:"account-hard-hat"},
    {label: "Chemical Engineering", value:3, icon:"chemical-weapon"},
    {label: "Electrical and Electronics", value:4, icon:"electric-switch"},
    {label: "Gemoatics Engineering", value:5, icon:"ruler"},
    {label: "Biotechnology", value:6, icon:"microscope"},
    {label: "Environmental Science and Engineering", value:7, icon:"tree"},
    {label: "Architecture", value:8, icon:"lead-pencil"},
    {label: "Mechanical Engineering", value:9, icon:"car"},
    {label: "Pharmacy", value:10, icon:"hospital-box"},
    {label: "Mathematics", value:11, icon:"math-compass"},
    {label: "Applied Science", value:12, icon:"black-mesa"},
];
    
const usersCollection = firebase.firestore().collection("users_extended")



const SecondRegisterScreen = ({navigation}) => {
    const user = useContext(AuthContext);
    const handleSubmit=(values)=>{
        console.log(values.username);
        try {
            const userID = firebase.auth().currentUser.uid;
            console.log(userID);
            usersCollection.doc(userID).set(values)

            firebase.auth().currentUser.updateProfile({
                displayName: values.username
            })
        } catch (error) {
            console.log(error)
        }

        navigation.navigate("App")      
    }

    return (
        <Screen style={styles.container}>
            <ScrollView>
            <AppText style={styles.header}>Profile Details</AppText>

            <AppForm
                initialValues={{username:'', age:'',  department:null, bio:'', batch:''}}
                onSubmit={handleSubmit}
                validationSchema={validationSecondRegisterScreen}
            >
                <AppFormField 
                    maxLength = {255}
                    placeholder='Username'
                    name="username"
                />
                <AppFormField 
                    keyboardType="numeric"
                    maxLength = {2}
                    placeholder='Age'
                    name="age"
                />
                <ProfileImagePicker name='image' />
                
                <ItemPicker
                    items = {departments}
                    name="department"
                    placeholder="Department"
                    numberOfColumns={1}
                />
                <AppFormField 
                    maxLength = {255}
                    placeholder='Short Bio'
                    name="bio"
                    multiline
                    numberOfLines={4}
                />
                <AppFormField 
                    keyboardType="numeric"
                    maxLength = {4}
                    placeholder='Batch'
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

export default SecondRegisterScreen

const styles = StyleSheet.create({
    header:{
        paddingLeft:8,
        paddingTop:30
    },
    container:{
        padding:20
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
      },
})
