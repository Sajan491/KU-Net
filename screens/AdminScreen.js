import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import Header from '../components/Header';
import Loading from '../components/Loading';
import Screen from '../components/Screen'
import colors from "../config/colors";
import firebase from "../config/firebase";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from '../components/AppText';

const AdminScreen = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const groupsDB = firebase.firestore().collection("groups")
    const departsDB = firebase.firestore().collection("departments")
    const [groups, setGroups] = useState([])
    const [departs, setDeparts] = useState([])

    const fetchPosts=()=>{
        groupsDB.get().then((docs)=> {
            const groupsArray = []
            docs.forEach((doc) => {
                groupsArray.push({type:'group', ...doc.data()})
            })
            setGroups(groupsArray);
        }).catch((err) => {
            console.log("Error fetching groups data, ", err);
        })
        
        departsDB.get().then((docs)=> {
            const departsArray = []
            docs.forEach((doc) => {
                departsArray.push({type:'department', ...doc.data()})
            })
            setDeparts(departsArray);
        }).catch((err) => {
            console.log("Error fetching departments data, ", err);
        })
        setLoading(false)
    }
    
    useEffect(() => {
        fetchPosts();
    }, [])

    if(loading) {
        return <Loading />
    }

    return (
        <Screen style={styles.screen}>
            <Header headerText="Admin Control" />
            
            <FlatList 
                ListHeaderComponent = {
                    <>
                    <Text style={styles.section}>All Departments</Text>
                    <FlatList 
                        style={styles.container}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={departs}
                        ListFooterComponent = {
                            <Text style = {styles.section}> All Groups </Text>
                        }
                        keyExtractor={(item)=>item.id.toString()}
                        renderItem={({item})=>(
                            <TouchableOpacity onPress = {() => navigation.navigate("AdminDetail", item)}>
                                <View style = {styles.content}>
                                    <MaterialCommunityIcons name = {item.icon} size={35} style = {styles.icon} />
                                    <AppText style = {styles.name}>{item.title}</AppText>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    </>
                }
                data={groups}
                style={styles.container}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=>(
                    <TouchableOpacity onPress = {() => navigation.navigate("AdminDetail", item)}>
                        <View style = {styles.content}>
                            <MaterialCommunityIcons name = {item.icon} size={35} style = {styles.icon} />
                            <AppText style = {styles.name}>{item.abbr}</AppText>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </Screen>
    )
}

export default AdminScreen

const styles = StyleSheet.create({
    container:{
        width:'100%'
    },
    section:{
        fontSize:17,
        padding:10,
        fontWeight:'bold',
        color:colors.secondary
    },
    content:{
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 0.7,
        borderColor: colors.secondary,
        borderWidth: 0.5,
        borderRadius: 5,
        marginBottom: 5,
        backgroundColor: colors.white,
    },
    icon:{
        paddingVertical:13,
        marginLeft: 20
    },
    name:{
        marginTop: 22,
        marginLeft: 13,
    },
    
    screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:10,
        flex:1,

    },
 
})
