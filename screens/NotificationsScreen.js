import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Button } from 'react-native'
import colors from '../config/colors'

const dummyNotifications = [
    {user:{name:'Myakuri', userImg:require("../assets/sajan.png")}, title: 'sent you a friend request.', time:'1 day ago', type:'request', id:1},
    {user:{name:'Pyakuri', userImg:require("../assets/sajan.png")}, title: 'commented on your post.', time:'1 day ago', type:'comment', id:2},
    {user:{name:'User101', userImg:require("../assets/sajan.png")}, title: 'liked your post.', time:'1 day ago', type:'like', id:3},
    {user:{name:'Lakuri Bhanjyang', userImg:require("../assets/sajan.png")}, title: 'sent you a friend request.', time:'Tue at 04:33', type:'request', id:4},
    {user:{name:'Thakuri', userImg:require("../assets/sajan.png")}, title: 'sent you a friend request.', time:'Sat at 5:30', type:'request', id:5},
    {user:{name:'Itadori', userImg:require("../assets/sajan.png")}, title: 'just upvoted your resource.', time:'1s ago', type:'upvote', id:6},
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

                    let iconName;
                    let iconColor;

                    if(item.type == 'request'){
                        iconName = 'plus-box';
                        iconColor = '#0099ff'
                    }
                    else if(item.type == 'comment'){
                        iconName = 'comment'
                        iconColor ='#009933'
                    }
                    else if (item.type == 'like'){
                        iconName= 'heart-multiple'
                        iconColor='#ff5050'
                    }
                    else{
                        iconName='arrow-up-bold'
                        iconColor='#660066'
                    }

                    return (<TouchableOpacity onPress={()=>{console.log('jelp')}}>
                                <View style={styles.notifBlock}>
                                    <Image style={styles.userImage} source={item.user.userImg} />
                                    <MaterialCommunityIcons style={styles.icon} name={iconName} color={iconColor} />
                                    <View style={styles.userInfoText}>
                                        <View style={styles.activityInfo}>
                                            <Text style={styles.username}>{item.user.name + " "}</Text>
                                            <Text style={styles.activity}>{item.title}</Text>
                                        </View>
                                        <Text style={styles.time}>{item.time}</Text>
                                        {item.type=='request' && <View style={styles.requestsHandlers}>
                                                <TouchableOpacity style={styles.buttons} onPress={()=> console.log('accepted')}><Text style={{fontWeight:'bold'}}>Accept</Text></TouchableOpacity>
                                                <TouchableOpacity style={styles.buttons} onPress={()=> console.log('declined')}><Text style={{fontWeight:'bold'}}>Decline</Text></TouchableOpacity>
                                            </View>}
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
    buttons:{
        paddingVertical:10,
        paddingHorizontal:30,
        backgroundColor:'#77daf3',
        marginRight:13,
        borderRadius:6
    },  
    icon:{
        position:'absolute',
        left: 52,
        top: 46,
        zIndex:1,
        fontSize:25
    },  
    notifBlock:{
        flexDirection:"row",
        justifyContent:'flex-start',
        paddingVertical:13,
        paddingHorizontal:18,
        backgroundColor:colors.light,
        borderBottomWidth:0.6,
        borderBottomColor:'#fff',
        
    },
    username:{
        fontSize:16,
        fontWeight: "bold",
        
    },
    userInfoText:{
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:20
    },
    requestsHandlers:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginTop:10
    },
    time:{
        fontSize:13,
        color:'#666',
        marginTop:2
    },
    userImage:{
        width:50,
        height:50,
        borderRadius:25
    },  
})
