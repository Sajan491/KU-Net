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
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../config/colors';
import {groups} from "../../data/groups";

const DrawerContent = (props) => {
    const {user, signOut} = useContext(AuthContext);
    const [username, setUsername] = useState("")
    useEffect(() => {
        getEnrolledGroups();
    }, [])

    const nameChangeHandler = () => {
        firebase.auth().currentUser.updateProfile({
            displayName: username
        })
        console.log("Username updated");
    }

    const getEnrolledGroups = () => {
        firebase.firestore().collection("groups").get().then((docs) => {
            docs.forEach((doc) => {
                console.log(doc.data());
            })
        })
    }

    return (
        <View style = {{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style = {styles.drawerContent}>
                    <View style = {styles.userInfoSection}>
                        <View style = {{flexDirection: "row", marginTop: 15}}>
                            <TouchableOpacity onPress = {() => props.navigation.navigate("Profile")}>
                                <Avatar.Image
                                    source = {require("../../assets/sajan.png")}
                                    size = {50}
                                />
                            </TouchableOpacity>
                            <View style = {{marginLeft: 15, flexDirection: "column"}}>
                                <Title style = {{fontSize: 16, fontWeight: "bold"}}> Sabin Thapa </Title>
                                {user.displayName !== null 
                                ? <Caption> @{user.displayName} </Caption> 
                                : (
                                    <View style = {{display: "flex", flexDirection: "row", alignItems: "center", marginHorizontal: 5}}>
                                        <TextInput placeholder = "Enter Username.." value = {username} onChangeText = {(un) => setUsername(un)} />
                                        <TouchableOpacity onPress = {() => nameChangeHandler()} style = {{marginLeft: 25}}> 
                                            <AppText style = {{color: colors.secondary, fontSize: 14 }}> Update</AppText>    
                                        </TouchableOpacity>
                                    </View>
                                )
                               }
                            </View>
                        </View>
                    </View>
                
                        <View style = {styles.row}>
                            <View style = {styles.followerSection}>
                                <Paragraph style = {styles.count}> 80 </Paragraph>
                                <Caption> Following </Caption>
                            </View>
                            <View style = {styles.followerSection}>
                                <Paragraph style = {styles.count}> 80 </Paragraph>
                                <Caption> Followers </Caption>
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
                        onPress = {() => props.navigation.navigate("Profile")}
                    />
                    <DrawerItem 
                        icon = {({size}) => (
                            <FontAwesome name="group" size = {size/1.2} color = {colors.black}/>
                        )}
                        label = "Groups"
                        onPress = {() => props.navigation.navigate("Group")}
                    />
                    {/* <DrawerItem
                        icon = {({size, color}) => (
                            <MaterialCommunityIcons name="details" size = {size} color = {color} />
                            )
                        }
                        label = "About"
                        onPress = {() => props.navigation.navigate("About")}
                    /> */}
               </Drawer.Section>
               <Drawer.Section style = {styles.enrolledGroup}>
                   <Caption style = {styles.drawerText}> Enrolled</Caption>
                        {groups.map((group) => {
                            return(
                                <DrawerItem 
                                    key = {group.id}
                                    icon = {({size}) => (
                                        <FontAwesome name="hand-o-right" size = {size/1.2} color = {colors.secondary} />
                                    )}
                                    label = {group.title}
                                    onPress = {() => props.navigation.navigate("GroupDetails", group)}
                                />
                            )
                        })}
               </Drawer.Section>
            </DrawerContentScrollView>

            <Drawer.Section style = {styles.bottomDrawerSection} >
                <DrawerItem 
                     icon = {({size, color}) => (
                        <FontAwesome name="gear" size = {size} color = {color} />
                        )
                    }
                    label = "Settings"
                    onPress = {() => signOut()  }
                    style = {{ borderBottomColor: "#f4f4f4", borderBottomWidth: 1}}
                />
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
