import React, {useContext, useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItem
} from "@react-navigation/drawer";
import { Drawer, Avatar, Title, Caption, Paragraph } from 'react-native-paper';
import {AuthContext} from "../../context/AuthProvider";
import firebase from "../../config/firebase";
import AppText from "../../components/AppText";
import { FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import colors from '../../config/colors';
import Loading from '../../components/Loading';

const DrawerContent = (props) => {
    const usersDB = firebase.firestore().collection("users_extended")
    const userID = firebase.auth().currentUser.uid;
    const [groups, setGroups] = useState([])
    const {user, signOut} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [profilePic, setProfilePic] = useState("")

    useEffect(() => {
        getEnrolledGroups();
    }, [])

    const nameChangeHandler = () => {
        firebase.auth().currentUser.updateProfile({
            displayName: username
        })
        console.log("Username updated");
    }

    const getEnrolledGroups =  () => {
         usersDB.doc(userID).get().then((doc) => {
           if(doc.data()['groups'] !== undefined) {
               const groupArr = doc.data()['groups']
               setProfilePic(doc.data()['profilePic'])
               setGroups(groupArr)
            } else{
                usersDB.doc(userID).update({
                    groups: []
                })
            }
        }).catch(err => {
            console.log("Error fetching users data", err);
        })
        setLoading(false)
    }
    return !loading ? (
        <View style = {{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style = {styles.drawerContent}>
                    <View style = {styles.userInfoSection}>
                        <View style = {{flexDirection: "row", marginTop: 15}}>
                            <TouchableOpacity onPress = {() => props.navigation.navigate("UserProfile")}>
                                <Avatar.Image
                                    source = { profilePic ? { uri: profilePic} : require("../../assets/sajan.png")} 
                                    size = {50}
                                />
                            </TouchableOpacity>
                            <View style = {{marginLeft: 15, flexDirection: "column"}}>
                                <Title style = {{fontSize: 16, fontWeight: "bold"}}> @{user.displayName} </Title>
                                <Caption> {user.email} </Caption> 
                            </View>
                        </View>
                    </View>
            
                </View>

               <Drawer.Section style = {styles.topDdrawerSection}>
                  <DrawerItem
                        icon = {({size}) => (
                            <FontAwesome name="home" size = {size/1.2} color = {colors.black} />
                            )
                        }
                        label = "Home"
                        onPress = {() => props.navigation.navigate("Home")}
                    />
                  <DrawerItem
                        icon = {({size}) => (
                            <FontAwesome name="user-circle" size = {size/1.2} color = {colors.black} />
                            )
                        }
                        label = "Profile"
                        onPress = {() => props.navigation.navigate("UserProfile")}
                    />
                    <DrawerItem 
                        icon = {({size}) => (
                            <FontAwesome name="group" size = {size/1.2} color = {colors.black}/>
                        )}
                        label = "Groups"
                        onPress = {() => props.navigation.navigate("Group")}
                    />
                    <DrawerItem 
                        icon = {({size}) => (
                            <Entypo name="help-with-circle" size = {size/1.2} color = {colors.black}/>
                        )}
                        label = "Help"
                        onPress = {() => props.navigation.navigate("Help", {homeScreen: "yes"})}
                    />
               </Drawer.Section>
            </DrawerContentScrollView>

            <Drawer.Section style = {styles.bottomDrawerSection} >
                <DrawerItem 
                     icon = {({size}) => (
                        <MaterialCommunityIcons name="logout" size = {size} color = {colors.danger} />
                        )
                    }
                    label = "Log Out"
                    onPress = {() => signOut()  }
                />
            </Drawer.Section>
        </View>
    )
    : <Loading />
}

export default DrawerContent

const styles = StyleSheet.create({
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1,
    },
    topDrawerSection: {
        borderTopColor: "#f4f4f4",
        borderTopWidth: 2,
    },
    drawerContent: {
        marginLeft: 10
    },
    row: {
        flexDirection: "row"
    },

    count: {
        fontWeight: "bold"

    },
    followerSection: {
        flexDirection: "row",
        marginVertical: 10,
        marginRight: 20
    },
    drawerText: {
        marginLeft: 10,
    },
    enrolledGroup: {
        marginVertical: 5
    }
})
