import React, {useState, useContext} from 'react'
import { StyleSheet, View, Image, Button, FlatList, TouchableOpacity } from 'react-native'
import AppText from '../components/AppText';
import {windowHeight, windowWidth} from "../config/Dimensions";
import {Caption} from "react-native-paper";
import {AuthContext} from "../context/AuthProvider";
import {posts} from "../data/posts"
import Card from "../components/Card";
import { GroupContext } from '../context/GroupProvider';
import colors from '../config/colors';

const GroupDetailScreen = ({route, navigation}) => {
    const group = route.params
    const [postSelected, setPostSelected] = useState(false);
    const [memberSelected, setMemberSelected] = useState(false);
    const {user} = useContext(AuthContext);
    const {addMember} = useContext(GroupContext);

    //If member exists in a group database then setMember true : false
    const [member, setMember] = useState(false)

    const joinGroupHandler =  () => {
        setMember(true);
        addMember(group.id);
    }

    const showtPostsHandler = () => {
        setPostSelected(true);
    }
    const showMembersHandler = () => {
        setMemberSelected(true);
    }

    return (
        <View style = {styles.groupContainer}>
            <View style = {styles.groupContent}>
            <FlatList 
                    ListHeaderComponent = {
                        <>
                        <View style>
                            <View style = {styles.groupInfo}>
                                <Image source = {group.image} style = {styles.detailImage} resizeMode = {'contain'} />
                                <AppText> {group.title} </AppText>
                                <Caption> {group.about} </Caption>
                                { member
                                    ? <Caption> Hello {user.displayName}!</Caption> 
                                    :<Button title="Join" onPress = {() => joinGroupHandler()}/>
                                }
                            </View>
                            <View style = {styles.switchTab}>
                               <TouchableOpacity onPress = {() => showtPostsHandler()}>
                                   <AppText style = {styles.appText}> Posts</AppText>
                                </TouchableOpacity> 
                               <TouchableOpacity onPress ={() => showMembersHandler()}>
                                   <AppText style = {styles.appText}> Members</AppText>
                                </TouchableOpacity> 
                            </View>
                            <Caption style = {{alignSelf: "flex-start", padding: 4}}> Group Posts</Caption>
                        </View>
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
            </View>

        </View>
    )
}

export default GroupDetailScreen

const styles = StyleSheet.create({
    detailImage: {
        height: windowHeight/6,
        width: windowWidth
    },
    groupContainer: {
        margin: 10,
        height: windowHeight,
        backgroundColor: "#fff",
        flex: 1,
        borderRadius: 10,
    },
    groupInfo: {
        justifyContent: "center",
        alignItems: "center",

    },
    groupContent: {
        marginTop: 10
    },
    switchTab: {
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        marginLeft: windowWidth/8,
        marginRight: windowWidth/8,
        justifyContent: "space-between",

    },
    appText: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.secondary
    }
})
