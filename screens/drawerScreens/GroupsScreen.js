import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Header from '../../components/Header'
import colors from '../../config/colors'
import Screen from "../../components/Screen";
import ListItem from "../../components/ListItem";
import ItemSeparator from "../../components/ItemSeperator";
import firebase from "../../config/firebase";

const GroupsScreen = ({navigation}) => {
    const [groups, setGroups] = useState({});
    const groupsDB = firebase.firestore().collection("groups")
    useEffect(() => {
        groupsDB.get().then((docs)=> {
            const groupsArray = []
            docs.forEach((doc) => {
                groupsArray.push({id: doc.id, ...doc.data()})
            })
            console.log("GROUPS ARRAY: __________________--------------------_________-",groupsArray);
            setGroups(groupsArray);
        })
    }, [])
    return (
        <Screen style = {styles.screen}>        
            <Header headerText="Groups" />
            <View style ={styles.container}>
                <FlatList
                    data = {groups}
                    keyExtractor = {(item) => item.id.toString()}
                    ItemSeparatorComponent = {ItemSeparator}
                    renderItem = {({item}) => (
                        <ListItem
                        title = {item.title}
                        image = {item.image}
                        icon = "plus"
                        onPress = {() => navigation.navigate("GroupDetails", item)}
                        />
                        )}
                        />
            </View>
        </Screen>

    )
}

export default GroupsScreen

const styles = StyleSheet.create({
    container:{
        marginBottom:25,
        borderRadius:20,
        
    }
    ,screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10

    }
})
