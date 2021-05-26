import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from 'react-native'

const dummyNotifications = [
    {user:{name:'Myakuri', userImg:require("../assets/sajan.png")}, title: 'sent you a friend request.', time:'1 day ago', type:'request', id:1},
    {user:{name:'Pyakuri', userImg:require("../assets/sajan.png")}, title: 'commented on your post.', time:'1 day ago', type:'comment', id:2},
    {user:{name:'User101', userImg:require("../assets/sajan.png")}, title: 'liked your post.', time:'1 day ago', type:'like', id:3},
    {user:{name:'Lakuri Bhanjyang', userImg:require("../assets/sajan.png")}, title: 'sent you a friend request.', time:'Tue at 04:33', type:'request', id:4},
    {user:{name:'Thakuri', userImg:require("../assets/sajan.png")}, title: 'sent you a friend request.', time:'Sat at 5:30', type:'request', id:5},
    {user:{name:'Itadori', userImg:require("../assets/sajan.png")}, title: 'just upvoted your resource.', time:'1 day ago', type:'upvote', id:6},
    {user:{name:'Myakuri', userImg:require("../assets/sajan.png")}, title: 'liked your post.', time:'1 day ago', type:'like', id:7},
    
    {user:{name:'Myakuri', userImg:require("../assets/sajan.png")}, title: 'sent you a friend request.', time:'1 day ago', type:'request', id:8},
    {user:{name:'Pyakuri', userImg:require("../assets/sajan.png")}, title: 'commented on your post.', time:'1 day ago', type:'comment', id:9},
    {user:{name:'User101', userImg:require("../assets/sajan.png")}, title: 'liked your post.', time:'1 day ago', type:'like', id:10},
    {user:{name:'Lakuri Bhanjyang', userImg:require("../assets/sajan.png")}, title: 'sent you a friend request.', time:'Tue at 04:33', type:'request', id:11},
]
    


const NotificationsScreen = () => {
    return (
        <View>
           
            
            
            <FlatList 
                data={dummyNotifications}
                keyExtractor={(item)=>{return item.id.toString()}}
                renderItem={({item})=>{
                    return (<TouchableOpacity onPress={()=>{console.log('jelp')}}>
                                <View style={styles.notifBlock}>
                                    <Image style={styles.userImage} source={item.user.userImg} />
                                    <View style={styles.userInfoText}>
                                        <View style={styles.activityInfo}>
                                            <Text style={styles.username}>{item.user.name + " "}</Text>
                                            <Text style={styles.activity}>{item.title}</Text>
                                        </View>
                                        <Text style={styles.time}>{item.time}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>)
                }}
            />
        </View>
    )
}

export default NotificationsScreen

const styles = StyleSheet.create({
    activityInfo:{
        flexDirection:'row'
    },
    activity:{
        fontSize:15
    },  
    notifBlock:{
        flexDirection:"row",
        justifyContent:'flex-start',
        padding:16,
        backgroundColor:'#e9f2f2',
        borderBottomWidth:1,
        borderBottomColor:'#fff',
        borderRadius:10
    },
    username:{
        fontSize:16,
        fontWeight: "bold",
        
    },
    userInfoText:{
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:10
    },
    time:{
        fontSize:13,
        color:'#666'
    },
    userImage:{
        width:46,
        height:46,
        borderRadius:23
    },  
})
