import React,{useEffect, useState, useContext} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native'
import Screen from '../components/Screen'
import firebase from "../config/firebase";
import colors from '../config/colors';
import { AuthContext } from '../context/AuthProvider';

//Add features here
const guidelinesData = [
    {
        id: 1,
        title: "User Ratings/Votes",
        desc: "You can upvote a user by going to their profile and rating them. On doing so, the user gets +1 rating. User with the most rating is considered a ----- user.",
        image: require("../assets/sajan.png")
    },
    {
        id: 2,
        title: "User Ratings/Votes",
        desc: "You can upvote a user by going to their profile and rating them. On doing so, the user gets +1 rating. User with the most rating is considered a ----- user.",
        image: require("../assets/sajan.png")
    },
    {
        id: 3,
        title: "User Ratings/Votes",
        desc: "You can upvote a user by going to their profile and rating them. On doing so, the user gets +1 rating. User with the most rating is considered a ----- user.",
        image: require("../assets/sajan.png")
    }
]

const HelpScreen = ({navigation, route}) => {
    const fromHomeScreen = route.params?.homeScreen
    const [userName, setUserName] = useState('')
    const [fromHS, setFromHS] = useState(false)

    useEffect(() => {
        const uName = firebase.auth().currentUser.displayName;
        setUserName(uName)
        if(fromHomeScreen === "yes") {
            setFromHS(true)
        }
    }, [])



    const handleSubmit = () =>{
        if(!fromHS) {
            navigation.navigate("Drawer") 
        } else {
            navigation.goBack()
        }
    }

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
               {!fromHS 
               ? (<View>
                   <Text style={styles.welcome}>Welcome to KU-Net, {userName}</Text>
                    <Text style={styles.chooseText}>Since this is your first time logging into KU-Net, there are a few
                things we'd like you to know.</Text>
                </View>)
                : (<View>
                    <Text style={styles.welcome}>Help Section </Text>
                 <Text style={styles.chooseText}>Here are some rules to guide you through the app.</Text>
                 </View>)

                }
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data = {guidelinesData}
                    keyExtractor = {(item) => item.id.toString()}
                    renderItem = {({item}) => (
                        <View style = {styles.guidelines}>
                            <Text style = {styles.title}> {item.id}. {item.title} </Text>
                            <Text style = {styles.desc}> {item.desc} </Text>
                            <View style = {{marginLeft: -40}}>
                                <Image source = {item.image} style ={styles.img} />
                            </View>
                        </View>
                    )}
                    ListFooterComponent = {
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}><Text style={styles.submitText}>Continue</Text></TouchableOpacity>
                    }
                    />
             
                
            </View>  
        </Screen>
    )
}

export default HelpScreen

const styles = StyleSheet.create({
    screen:{
        marginTop:30,
        padding:10
    },
    submitText:{
        fontSize:15,
        fontWeight:'bold',
    },
    guidelines: {

    },
    desc: {
        marginLeft: 15
    },
    chooseText:{
        lineHeight:24,
        borderBottomWidth: 0.7,
        borderBottomColor: colors.secondary
    },
    img: {
        height: 150,
        resizeMode: "contain",
        width: 400,
        marginTop: 5,
        alignSelf: "center",
        borderRadius: 15
    },
    button:{
        flexDirection:'row',
        justifyContent:'center',
        alignSelf:'center',
        padding:15,
        backgroundColor:colors.secondary,
        borderTopColor:'#fff',
        borderTopWidth:0.8,
        borderRadius:8,
        width: "90%",
        marginTop: 5
    },  
    container:{
     
        padding:20,
        flex: 1
    },
    welcome:{
        alignSelf: "center",
        fontSize:20,
        fontWeight:'bold',
        paddingBottom:20
    },


    title:{
        marginTop: 10,
        marginRight:30,
        fontWeight: "bold",
        alignSelf: "flex-start"
    }
})


