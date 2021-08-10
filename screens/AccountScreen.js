import React, {useContext, useState, useEffect, useCallback} from 'react'
import { FlatList, RefreshControl, ScrollView, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import colors from "../config/colors";
import Screen from "../components/Screen";
import ListItem from '../components/ListItem';
import ItemSeperator from '../components/ItemSeperator';
import MyIcon from "../components/MyIcon";
import {AuthContext} from "../context/AuthProvider"
import Header from '../components/Header';
import firebase from "../config/firebase";

const menuItems = [
    
    
    {
        title: "Profile",
        icon: {
            name: "account",
            backgroundColor: colors.secondary
        },
        targetScreen: "UserProfile"
    },
    {
        title: "Settings",
        icon: {
            name: "account-settings",
            backgroundColor: colors.secondary
        },
        targetScreen: "Settings"
    },
    {
        title: "Department Posts",
        icon: {
            name: "view-list",
            backgroundColor: colors.secondary
        },
        targetScreen: "DepartmentPosts"
    },

    {
        title: "Saved Posts",
        icon: {
            name: "content-save",
            backgroundColor: colors.secondary
        },
        targetScreen: "SavedPosts"
    },
]

const delay = (timeout)  => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}

const usersCollection = firebase.firestore().collection("users_extended")


const AccountScreen = ({navigation}) => {
    const {user, signOut} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [profilePic, setProfilePic] = useState("")
    const userId = firebase.auth().currentUser.uid;
    const [userIsAdmin, setUserIsAdmin] = useState(false)

    const getAdminStatus = async ()=>{
        await usersCollection.doc(userId).get().then((usr)=>{
            if(usr.data()['isAdmin'] !== undefined){
                if(usr.data()['isAdmin']===true){
                    setUserIsAdmin(true)
                }
            }
            
        }).catch((error)=>{
            console.log(error)
        })
    }
    useEffect(() => {
        getAdminStatus()
        usersCollection.doc(userId).get()
        .then((doc) => { 
              setProfilePic(doc.data()['profilePic'])
            }).catch ((err) => {
                console.log("Error receiving data from the database", err);
            })

    }, [])

    

    const loadMore = useCallback(async () => {
        setLoading(true);

        delay(500).then(() => setLoading(false))
    }, [loading])


    return (
        <Screen style={styles.screen}>
            <Header headerText="Account" />
            <View 
                refreshControl = {
                    <RefreshControl
                    progressBackgroundColor= {colors.primary}
                    tintColor={colors.light}
                    refreshing={loading}
                    onRefresh={loadMore}
                  />
                }
            >
                <View style={styles.container}>
                    <TouchableOpacity onPress = {() => navigation.navigate("UserProfile")} >
                        {profilePic 
                            ? <Image style={styles.image} source={{ uri: profilePic}} /> 
                            : <Image style={styles.image} source={require("../assets/sajan.png")} /> 
                        
                        }
                    </TouchableOpacity>
                   <View style = {styles.textContent}>
                        <Text style = {{fontWeight: "bold", fontSize: 16, marginBottom: 6}}>{user.displayName ? user.displayName : "Update name in Settings!"}</Text>
                        <Text style = {{fontWeight: "bold", color: colors.medium}}>{user.email}</Text>
                   </View>
                </View>
                <View style={styles.container1}>
                    {userIsAdmin && <View style={{marginBottom:10}}>
                        <ListItem 
                            title="Admin Control"
                            IconComponent={
                                <MyIcon name='wrench' backgroundColor={colors.secondary}/>
                            }wrench
                            onPress={()=>navigation.navigate("Admin")}
                        />
                    </View>}
                    <FlatList 
                        
                        data={menuItems}
                        keyExtractor={(menuItem)=> menuItem.title}
                        ItemSeparatorComponent={ItemSeperator}
                        renderItem={({item})=>(
                            <ListItem 
                                title={item.title}
                                IconComponent={
                                    <MyIcon name={item.icon.name} backgroundColor={item.icon.backgroundColor}/>
                                }
                                onPress={()=>navigation.navigate(item.targetScreen)}
                            />
                        )}
                    />
                </View>
                <View style={styles.container2}>
                    <ListItem 
                        title="Log Out"
                        IconComponent={
                            <MyIcon name='logout' backgroundColor={colors.primary}/>
                        }
                        onPress={()=>signOut()}
                    />
                </View>
            </View>
        </Screen>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    container2:{
        marginTop:10
    },
    container:{
        marginTop:10,
        marginBottom:10,
        borderRadius:10,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#fff"
    }
    ,screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:10,
        flex:1,
        marginTop:-10

},     image:{
        width:60,
        height:60,
        borderRadius:35,
        margin: 7
        
    },
    textContent: {
        display: "flex",
        margin: 10,
        alignItems: "flex-start",
        justifyContent: "center",
    }
})

