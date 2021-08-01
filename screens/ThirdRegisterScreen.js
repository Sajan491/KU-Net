import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View,CheckBox, FlatList, TouchableOpacity, Button, TouchableWithoutFeedback } from 'react-native'
import Screen from '../components/Screen'
import firebase from "../config/firebase";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import colors from '../config/colors';

const clubsCollection = firebase.firestore().collection("groups")
const usersCollection = firebase.firestore().collection("users_extended")

const ThirdRegisterScreen = ({navigation}) => {
    const [uid, setUid] = useState('')
    const [checked, setChecked] = useState([])
    const [userName, setUserName] = useState('')
    const [clubs, setClubs] = useState([])
    useEffect(() => {
        const userID = firebase.auth().currentUser.uid;
        setUid(userID)
        clubsCollection.get().then((abc)=>{
            let data=[]
            abc.forEach(function(doc){
                data.push({title: doc.data()['title'], id:doc.data()['id'], check:false, icon:doc.data()['icon']})
            })
            setClubs(data)
            
        }).catch((err)=>{
            console.log(err)
        })
        
        usersCollection.doc(userID).get().then((abc)=>{
            setUserName(abc.data()['username'])
        }).catch((error)=>{
            console.log(error)
        })
    }, [])


    const handleTouch = (item) =>{
        item.check = !(item.check);

        if(item.check){
            setChecked([...checked, {title: item.title, id:item.id, icon:item.icon }])
        }
        else{
            setChecked(checked.filter(e=> e.title!== item.title)) 
        }
        
    }
    const handleSubmit = () =>{

        checked.forEach(function(ch){
            const groupMembers = firebase.firestore().collection('groups').doc(ch.id).collection('members')
            groupMembers.add({id:uid}).then(()=>{console.log('added user to groups')})
        })
        

        usersCollection.doc(uid).update({
            groups : checked
        }).then(()=>{
            console.log('Updated')
        }).catch((error)=>{
            console.log(error)
        })
        navigation.navigate("Help") 
    }

    return (
        <Screen>
        
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to KU-Net, {userName}</Text>
            <Text style={styles.chooseText}>Please, choose the groups you're interested in so we can curate a personalized experience for you.</Text>
        </View>
        
        <View style={styles.form}>
            
            <FlatList 
                data={clubs}
                keyExtractor={(item)=>item.id.toString()}
                contentContainerStyle={{
                    flexGrow: 1,
                    }}
                renderItem={({item})=>(
                    
                    <TouchableWithoutFeedback onPress={()=>handleTouch(item)}>
                        <View style={[styles.box, item.check? {borderLeftColor:colors.primary}: {borderLeftColor:colors.secondary}]}>
                            <Text style={styles.title}>{item.title}</Text>
                            {!item.check?<MaterialCommunityIcons style={styles.icon} name='checkbox-blank-outline' />:<MaterialCommunityIcons style={styles.icon} name='checkbox-marked' /> }
                        </View>
                        
                    </TouchableWithoutFeedback>
                )}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}><Text style={styles.submitText}>Continue</Text></TouchableOpacity>
            
        </View>
            
        </Screen>
    )
}

export default ThirdRegisterScreen

const styles = StyleSheet.create({
    submitText:{
        fontSize:15,
        fontWeight:'bold'
    },
    button:{
        flexDirection:'row',
        justifyContent:'center',
        padding:15,
        zIndex:1,
        backgroundColor:colors.secondary,
        borderTopColor:'#fff',
        borderTopWidth:0.8,
        borderRadius:10
    },  
    container:{
        alignItems:'center',
        padding:20,
    },
    welcome:{
        fontSize:20,
        fontWeight:'bold',
        paddingBottom:20
    },
    form:{
        flex:1
    },
    chooseText:{
        lineHeight:24,
    },
    box:{
        flexDirection:'row',
        marginHorizontal:20,
        marginVertical:5,
        justifyContent:'space-between',
        borderWidth:0.2,
        padding:15,
        borderLeftColor:colors.primary,
        borderLeftWidth:10
    },
    icon:{
        fontSize:20,
        color:colors.medium,
        position:'absolute',
        right:20,
        alignSelf:'center'
    },
    title:{
        marginRight:30
    }
})
