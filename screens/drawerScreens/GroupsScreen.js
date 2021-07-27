import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import Header from '../../components/Header'
import colors from '../../config/colors'
import AppText from "../../components/AppText";
import ItemSeparator from "../../components/ItemSeperator";
import firebase from "../../config/firebase";
import Loading from "../../components/Loading";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { groupStyles as styles } from '../../styles/globalStyles';

const GroupsScreen = ({navigation}) => {
    const [groups, setGroups] = useState({});
    const [loading, setLoading] = useState(true);
    const groupsDB = firebase.firestore().collection("groups")
    useEffect(() => {
        getGroups();
    }, [])

    const getGroups = () => {
        groupsDB.get().then((docs)=> {
            const groupsArray = []
            docs.forEach((doc) => {
                groupsArray.push({id: doc.id, ...doc.data()})
            })
            setGroups(groupsArray);
            setLoading(false);
        })
    }

    if(loading) {
        return <Loading />
    }
     return (
        <View style= {styles.container}>
            <Header headerText="Groups" />
           
            <AppText style={{color: colors.secondary, textAlign: "center", marginBottom: 5}}> Tap on the group & join!</AppText>
            <FlatList 
                data = {groups}
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
            </View>

    )
    
}

export default GroupsScreen

