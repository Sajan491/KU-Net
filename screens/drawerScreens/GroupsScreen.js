import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import Header from '../../components/Header'
import colors from '../../config/colors'
import AppText from "../../components/AppText";
import ItemSeparator from "../../components/ItemSeperator";
import firebase from "../../config/firebase";
import Loading from "../../components/Loading";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { groupStyles as styles } from '../../styles/globalStyles';

const GroupsScreen = ({navigation}) => {
    const [groups, setGroups] = useState([]);
    const [enrolledGroups, setEnrolledGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const groupsDB = firebase.firestore().collection("groups")
    const usersDB = firebase.firestore().collection("users_extended");
    const userID = firebase.auth().currentUser.uid;

    useEffect(() => {
        getData();
    }, [])
    
    // To get the array of unjoined groups
    const filteredGroups = groups?.filter(({id: id1}) => !enrolledGroups?.some(({id: id2}) => id2 === id1 ));

    const getData =  () => {
             groupsDB.get().then((docs)=> {
                const groupsArray = []
                docs.forEach((doc) => {
                    groupsArray.push({id: doc.id, ...doc.data()})
                })
                setGroups(groupsArray);
            }).catch((err) => {
                console.log("Error fetching groups data, ", err);
            })
            
            usersDB.doc(userID).get().then((doc) => {
                if(doc.data()['groups'] !== undefined) {
                    const groupArr = doc.data()['groups']
                    console.log(groupArr);
                    setEnrolledGroups(groupArr)
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
   

    if(loading) {
        return <Loading />
    }
     return (
        <View style= {styles.container}>
            <Header headerText="Groups" />
           
            {/* <AppText style={{color: colors.secondary, textAlign: "center", marginBottom: 5}}> Tap on the group & join!</AppText> */}


            <>
                <FlatList
                    ListHeaderComponent = {
                        <>
                        {enrolledGroups.length !==0 ? <Text style = {styles.title}> My Groups </Text> : null }
                        <FlatList 
                            data = {enrolledGroups}
                            keyExtractor = {item => item.id}
                            ItemSeparatorComponent = {ItemSeparator}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent = {
                                <Text style = {styles.title}> Other Groups </Text>
                            }
                            renderItem = {({item}) => (
                                <TouchableOpacity onPress = {() => navigation.navigate("GroupDetails", item)}>
                                        <View style = {styles.content}>
                                            <MaterialCommunityIcons name = {item.icon} size={35} style = {styles.channelImage} />
                                            {/* <Image source = {item.icon} style = {styles.channelImage} /> */}
                                            <AppText style = {styles.channelName}>{item.abbr}</AppText>
                                        </View>
                                    </TouchableOpacity>
                            )}
                            />
                    </>
                    } 
                    data = {filteredGroups}
                    keyExtractor = {item => item.id}
                    ItemSeparatorComponent = {ItemSeparator}
                    showsVerticalScrollIndicator={false}
                    renderItem = {({item}) => (
                        <TouchableOpacity onPress = {() => navigation.navigate("GroupDetails", item)}>
                                <View style = {styles.content}>
                                    <MaterialCommunityIcons name = {item.icon} size={35} style = {styles.channelImage} />
                                    {/* <Image source = {item.icon} style = {styles.channelImage} /> */}
                                    <AppText style = {styles.channelName}>{item.abbr}</AppText>
                                </View>
                            </TouchableOpacity>
                    )}
                    />
            </>



            </View>

    )
    
}

export default GroupsScreen

