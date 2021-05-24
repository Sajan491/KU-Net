import React, {useContext, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Card from '../components/Card';
import colors from "../config/colors";
import Screen from '../components/Screen'
import {AuthContext} from "../context/AuthProvider";
import NotifButton from '../navigation/NotifButton';
import Constants from 'expo-constants'

const posts=[
    {   
        id:1,
        username: 'Sajan Mahat',
        userImg:require("../assets/sajan.png"),
        postTime: '1 day ago',
        postTitle:"Hiring a full stack ReactJs developer!",
        content:"We are looking for a great JavaScript developer who is proficient with React.js. Your primary focus will be on developing user interface components and implementing them following well-known React.js workflows (such as Flux or Redux). You will coordinate with the rest of the team working on different layers of the infrastructure. Therefore, a commitment to collaborative problem solving, sophisticated design, and quality product is important. Please leave a comment if you are interested!",

        postImgs:[
            {source: require("../assets/react.png"), id:1}, 
            {source: require("../assets/react.png"), id:2}, 
            {source: require("../assets/react.png"), id:3}, 
            {source: require("../assets/react.png"), id:4}, 
             ],
        liked:true,
        likes:22,
        comments: 4
    },
    {
        id:2,
        username: 'Sabin Thapa',
        userImg:require("../assets/sajan.png"),
        postTime: '4 hours ago',
        postTitle:"Hello! hau u?",
        content:"subtitle1",
        postImgs:[],
        liked:false,
        likes:2,
        comments: 1
    },
    {
        id:3,
        username: 'Nripesh Karmacharya',
        userImg:require("../assets/sajan.png"),
        postTime: '34 days ago',
        postTitle:"Aalu lelo!",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        ,postImgs:[
            {source: require("../assets/aalu.jpg"), id:1}, 
            {source: require("../assets/react.png"), id:2}, 
            {source: require("../assets/react.png"), id:3}, 
            
        ],
        liked:false,
        likes:8,
        comments: 100
    },
    {
        id:4,
        username: 'Rojan Thapa',
        userImg:require("../assets/sajan.png"),
        postTime: '1 day ago',
        postTitle:"Join AISEC. I beg you!",
        content:"subtitle1",
        postImgs:[{source: require("../assets/aisec.png"), id:1}],
        liked:true,
        likes:1,
        comments: 0
    },
    {
        id:5,
        username: 'Hero Keto',
        userImg:require("../assets/sajan.png"),
        postTime: '14 days ago',
        postTitle:"Please Like!",
        content:"subtitle1",
        postImgs:[
            {source: require("../assets/aisec.png"), id:1}, 
            {source: require("../assets/react.png"), id:2}, 
        ],
        liked:true,
        likes:5,
        comments: 0
    }
    
    
]

const HomeScreen = ({navigation}) => {

    // useEffect(() => {
    //     const fetchPosts =()=>{
    //         try {
    //             const list = []
    //             firebase.firestore().collection('posts').get().then((querySnapshot)=>{
    //                 console.log("total posts", querySnapshot.size)
    //                 querySnapshot.forEach(doc=>{
    //                     const {} = doc.data();
    //                     list.push({

    //                     });
    //                 })
    //             })
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchPosts()
    // }, [])

    const {user} = useContext(AuthContext)
    return (
            <View style={styles.container}>
                <View  style={styles.header} >
                    <Text style={styles.headerText}>Home</Text>
                    <NotifButton style={styles.notifButton} onPress={()=>navigation.navigate("Notifications")}/>
                    
                </View>
                <View  style={styles.notifCount}>
                    <Text style={styles.notifCountText}>1</Text>
                </View>
               
               
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={posts}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item})=>(
                        <Card
                            postTitle={item.postTitle}
                            content={item.content}
                            postImgs={item.postImgs}
                            username={item.username}
                            userImg={item.userImg}
                            postTime= {item.postTime}
                            liked={item.liked}
                            likesCount={item.likes}
                            commentsCount={item.comments}
                            onPressComment={()=> navigation.navigate('Comments', item)}
                        />
                    )}

                />
            </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10
    },
    text: {
        textAlign: 'center'
    },
    header:{
        paddingTop: Constants.statusBarHeight,
        flexDirection:'row',
        paddingLeft:10,
        paddingBottom:13,
        justifyContent:'space-between',
    }
    ,
    headerText:{
        color: 'tomato',
        fontWeight:'bold',
        fontSize:19
    },
    notifCount:{
        backgroundColor:'tomato',
        borderRadius:7,
        width:14,
        height:14,
        fontSize:12,
        zIndex:1,
        position:'absolute',
        alignItems:'center',
        top:Constants.statusBarHeight+20,
        right:42
    },
    notifCountText:{
        color:'white'
    },
    
    
})
