import React, {useContext, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import Card from '../components/Card';
import colors from "../config/colors";
import Screen from '../components/Screen'
import {AuthContext} from "../context/AuthProvider";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import GroupLogoWithTitle from '../components/GroupLogoWithTitle';
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
            {uri: require("../assets/react.png"), id:1},
            {uri: require("../assets/sajan.png"),id:2},
            {uri: require("../assets/aisec.png"),id:3},
            {uri: require("../assets/aalu.jpg"),id:4}
             ],
        liked:true,
        likesCount:22,
        comments: [
            {id:1, user:{name:'Myakuri', userImg:require("../assets/sajan.png")}, comment: 'Wow! Amazing Stuff.', time:'24 mins ago'},
            {id:2, user:{name:'Thakuri', userImg:require("../assets/sajan.png")}, comment: 'I am interested in web development with React. How do I apply?', time:'1 day ago'},
            {id:3, user:{name:'Lyakuri', userImg:require("../assets/sajan.png")}, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', time:'2 days ago'},
            {id:4, user:{name:'Sabin', userImg:require("../assets/sajan.png")}, comment: '@Janesh dai. Eta herna paryo.', time:'2 days ago'},
            {id:5, user:{name:'Myakuri', userImg:require("../assets/sajan.png")}, comment: 'Wow! Amazing Stuff.', time:'24 mins ago'},
            {id:6, user:{name:'Thakuri', userImg:require("../assets/sajan.png")}, comment: 'I am interested in web development with React. How do I apply?', time:'1 day ago'},
            
        ]
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
        likesCount:2,
        comments: []
    },
    {
        id:3,
        username: 'Nripesh Karmacharya',
        userImg:require("../assets/sajan.png"),
        postTime: '34 days ago',
        postTitle:"Aalu lelo!",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        ,postImgs:[
            {uri: require("../assets/aalu.jpg"),id:1},
            {uri: require("../assets/aisec.png"),id:2}, 
            {uri: require("../assets/react.png"),id:3 }
            
        ],
        liked:false,
        likesCount:8,
        comments: []
    },
    {
        id:4,
        username: 'Rojan Thapa',
        userImg:require("../assets/sajan.png"),
        postTime: '1 day ago',
        postTitle:"Join AISEC. I beg you!",
        content:"subtitle1",
        postImgs:[{uri: require("../assets/aisec.png"),id:1}],
        liked:true,
        likesCount:1,
        comments: []
    },
    {
        id:5,
        username: 'Hero Keto',
        userImg:require("../assets/sajan.png"),
        postTime: '14 days ago',
        postTitle:"Please Like!",
        content:"subtitle1",
        postImgs:[
            {uri: require("../assets/aisec.png"),id:1}, 
            {uri: require("../assets/react.png"),id:2},
        ],
        liked:true,
        likesCount:5,
        comments: []
    }
    
    
]

const groups = [
    {
        id: 1,
        title: "KUCC",
        image:require("../assets/groups/kucc.png")
    },
    {
        id: 2,
        title: "AIESEC",
        image:require("../assets/groups/aiesec.png")
    },
    {
        id: 3,
        title: "KUSWC",
        image:require("../assets/groups/ku.png")
    },
    {
        id: 4,
        title: "ALUMNI",
        image:require("../assets/django.jpg"),
    },
    {
        id: 5,
        title: "KURCS",
        image:require("../assets/groups/redcross.png"),
    },
    {
        id: 6,
        title: "KUCS",
        image:require("../assets/django.jpg"),
    },
    {
        id: 7,
        title: "KUCE",
        image:require("../assets/groups/itmeet.png"),
    },
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
              {/* <ScrollView>
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    showsVerticalScrollIndicator = {false}
                    style = {styles.scrollView}
                >
                    <FlatList
                        horizontal 
                        data = {groups}
                        keyExtractor = {(item) => item.id.toString()}
                        renderItem = {({item}) => (
                            <GroupLogoWithTitle title = {item.title} image = {item.image} onPress = {() => navigation.navigate("GroupDetails", item)} />
                        )}
                    />

                </ScrollView> */}
                <FlatList 
                    ListHeaderComponent = {
                        <>
                            <FlatList
                                horizontal 
                                showsHorizontalScrollIndicator={false}
                                data = {groups}
                                keyExtractor = {(item) => item.id.toString()}
                                renderItem = {({item}) => (
                                    <GroupLogoWithTitle title = {item.title} image = {item.image} onPress = {() => navigation.navigate("GroupDetails", item)} />
                                )}
                            />
                        </>
                    }
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
                            likesCount={item.likesCount}
                            comments={item.comments}
                            commentsCount={item.comments.length}
                            onPressComment={()=> navigation.navigate('Comments', {comments: item.comments})}
                        />
                    )}

                />
                {/* </ScrollView> */}
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
        marginTop:12,
        justifyContent:'space-between',
    }
    ,
    headerText:{
        color: colors.primary,
        fontWeight:'bold',
        fontSize:21
    },
    notifCount:{
        backgroundColor:colors.primary,
        borderRadius:7,
        width:14,
        height:14,
        fontSize:12,
        zIndex:1,
        position:'absolute',
        alignItems:'center',
        top:Constants.statusBarHeight+30,
        right:42
    },
    notifCountText:{
        color:'white'
    },
    scrollView: {
        marginBottom: 15
    }
    
    
})
