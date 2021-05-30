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
const DrawerContent = (props) => {
    const {user, signOut} = useContext(AuthContext);
    const [username, setUsername] = useState("")
    useEffect(() => {
        
       console.log(user.displayName, " name")
            
    }, [])
    const nameChangeHandler = () => {
        firebase.auth().currentUser.updateProfile({
            displayName: username
        })
        console.log("Username updated");
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
                        icon = {({size, color}) => (
                            <FontAwesome name="home" size = {size} color = {color} />
                            )
                        }
                        label = "Home"
                        onPress = {() => props.navigation.navigate("Home")}
                    />
                  <DrawerItem
                        icon = {({size, color}) => (
                            <FontAwesome name="user" size = {size} color = {color} />
                            )
                        }
                        label = "Profile"
                        onPress = {() => props.navigation.navigate("Profile")}
                    />
                    <DrawerItem 
                        icon = {({size, color}) => (
                            <FontAwesome name="group" size = {size} color = {color} />
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
                        <DrawerItem 
                            icon = {({size, color}) => (
                                <MaterialCommunityIcons name="group" size = {size} color = {color} />
                            )}
                            label = "AIESEC"
                            onPress = {() => props.navigation.navigate("Group")}
                        />
                        <DrawerItem 
                            icon = {({size, color}) => (
                                <MaterialCommunityIcons name="group" size = {size} color = {color} />
                            )}
                            label = "KUCC"
                            onPress = {() => props.navigation.navigate("Group")}
                        />
                        <DrawerItem 
                            icon = {({size, color}) => (
                                <MaterialCommunityIcons name="group" size = {size} color = {color} />
                            )}
                            label = "KURCS"
                            onPress = {() => props.navigation.navigate("Group")}
                        />
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
                     icon = {({size, color}) => (
                        <MaterialCommunityIcons name="logout" size = {size} color = {color} />
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
    }
})
