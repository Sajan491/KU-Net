import React,{useState, useEffect} from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Modal, Button, TouchableWithoutFeedback, TextInput } from 'react-native'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import firebase from "../config/firebase";
import { Video } from 'expo-av';
import { v4 as uuidv4 } from 'uuid';

import colors from '../config/colors'
import ReadMore from 'react-native-read-more-text';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Comment from './Comment';
const ItemWidth = Dimensions.get('window').width / 2 -20;

const Card = ({
    id,
    deptId,
    grpId,
    postTitle, 
    content,
    postContents,
    username,
    userImg,
    postTime,
    likers,
    comments,
    commentsCount}) => {

        
        const [isLiked, setIsLiked] = useState(false)
        const [userName, setUserName] = useState('')
        const [userPpic, setUserPpic] = useState('')
        const usersCollection = firebase.firestore().collection("users_extended")
        const [likesCount, setLikesCount] = useState(0)
        const [likersModalVisible, setLikersModalVisible] = useState(false)
        const [likersList, setLikersList] = useState([])
        const [commentModalVisible, setCommentModalVisible] = useState(false)          
        const [modalVisible, setModalVisible] = useState(false);
        const [modalUri, setModalUri] = useState({})
        const [comment, setComment] = useState('')
        const [allComments, setAllComments] = useState([])
        // const [unreadComments, setUnreadComments] = useState(false)

        useEffect(() => {
            const fetchData=()=>{
                const userID = firebase.auth().currentUser.uid;
                var username;
                usersCollection.doc(userID).get().then((usr)=>{
                    
                    setUserName(usr.data()['username'])
                    username = usr.data()['username']
                    if(usr.data()['profilePic']){
                        setUserPpic(usr.data()['profilePic'])
                    }
                }).catch((error)=>{
                    console.log(error)
                })
                if(deptId!==''){
                    const departPost = firebase.firestore().collection('departments').doc(deptId).collection('posts').doc(id)
                    departPost.get().then(post=>{
                        setLikesCount(post.data()['likesCount'])
                        let postLikers = post.data()['peopleWhoLiked']
                        let tempComments = post.data()['comments']
                        // console.log(tempComments, "temp");c
                        // console.log(allComments, "all");
                        // setAllComments(tempComments) 
                        setAllComments((prev) => {
                            // if(tempComments.length != prev.length){
                            //     setUnreadComments(true)
                            //     console.log('1 comment unread');
                            // } else setUnreadComments(false)
                            return tempComments;
                        }) 
                       
                    
                        if(postLikers.length>0){
                            postLikers.some((liker)=>{
                                if(liker.username==username) setIsLiked(true)
                            })
                        }
                        setLikersList(postLikers)
                        
                    })
                }
                else if(grpId!==''){
                    const groupPost = firebase.firestore().collection('groups').doc(grpId).collection('posts').doc(id)
                    groupPost.get().then(post=>{
                        setLikesCount(post.data()['likesCount'])
                        let postLikers = post.data()['peopleWhoLiked']
                        let tempComments = post.data()['comments']
                        setAllComments((prev) => {
                            return tempComments;
                        }) 
                        if(postLikers.length>0){
                            postLikers.forEach((liker)=>{
                                if(liker.username==username) setIsLiked(true)
                            })
                        }
                        setLikersList(postLikers)
                    })
                }
            }
            const getDataEvery1s = setInterval(fetchData,1000)
            return ()=> clearInterval(getDataEvery1s);
        }, [])
     
        const handleLikePress = () =>{
            var likeCount;
            setIsLiked(!isLiked)
            
            if(!isLiked) setLikesCount(likesCount + 1)
            else setLikesCount(likesCount - 1)

            if(deptId!==''){
                const departPost = firebase.firestore().collection('departments').doc(deptId).collection('posts').doc(id)
                departPost.get().then(doc=>{
                    likeCount = doc.data()['likesCount']
                    if(isLiked){
                        //delete user from peopleWhoLiked
                        var likers = doc.data()['peopleWhoLiked']
                        var updatedLikers = likers.filter(item=>item.username!=userName)
                        setLikersList(updatedLikers)
                        departPost.update({peopleWhoLiked: updatedLikers})
                        likeCount--;
                    }
                    else{
                        //add user to peopleWhoLiked
                        var likers = doc.data()['peopleWhoLiked']
                        likers.push({username: userName, profilePic: userPpic})
                        setLikersList(likers)
                        departPost.update({peopleWhoLiked: likers})
                        likeCount++;
                    }
                    departPost.update({likesCount:likeCount})
                })  
            }
            
            else if(grpId!==''){
                const groupPost = firebase.firestore().collection('groups').doc(grpId).collection('posts').doc(id)
                console.log(grpId);
                groupPost.get().then(doc=>{
                    likeCount = doc.data()['likesCount']
                    if(isLiked){
                        //delete user from peopleWhoLiked
                        var likers = doc.data()['peopleWhoLiked']
                        var updatedLikers = likers.filter(item=>item.username!=userName)
                        setLikersList(updatedLikers)
                        groupPost.update({peopleWhoLiked: updatedLikers})
                        likeCount--;
                    }
                    else{
                        //add user to peopleWhoLiked
                        var likers = doc.data()['peopleWhoLiked']
                        likers.push({username: userName, profilePic: userPpic})
                        setLikersList(likers)
                        groupPost.update({peopleWhoLiked: likers})
                        likeCount++;
                    }
                    groupPost.update({likesCount:likeCount})
                })
            }
            
        }

        const handleLikersView =()=>{
            setLikersModalVisible(true)
        }

        const onPressComment =()=>{
            setCommentModalVisible(true)
        }

        const handleCommentAdd = () =>{
            const random_id = uuidv4();
            if(deptId!==''){
                const departPost = firebase.firestore().collection('departments').doc(deptId).collection('posts').doc(id)
                departPost.get().then(doc=>{
                    let coments = doc.data()['comments']

                    coments.push({id:random_id ,username: userName, profilePic: userPpic, comment: comment, timePosted:firebase.firestore.Timestamp.now()})
                    setAllComments(coments)
                    departPost.update({comments:coments})
                    setComment('')
                })  
            }
            
            else if(grpId!==''){
                const groupPost = firebase.firestore().collection('groups').doc(grpId).collection('posts').doc(id)
                groupPost.get().then(doc=>{
                    let coments = doc.data()['comments']
                    coments.push({id:random_id, username: userName, profilePic: userPpic, comment: comment, timePosted:firebase.firestore.Timestamp.now()})
                    setAllComments(coments)
                    groupPost.update({comments:coments})
                    setComment('')
                })
            }
        }
        

        const video = React.useRef(null);
        const [status, setStatus] = React.useState({});

        let formatted_date;
        const computeDate=(time)=>{
            let a = time.toDate().toString();
            let b = a.split(" ");
            let c= b[4].split(':')
            formatted_date = b[0]+"  "+ b[1]+" " + b[2]+", "+b[3]+ " at " + c[0]+':'+c[1]; 
        }
        computeDate(postTime);
        


        const computeColumns=()=>{
            if (postContents.length == 1){
                return {numCol:1, imgWidth: "100%", imgHeight:200};
            }
            else {
                return {numCol:2, imgWidth: ItemWidth, imgHeight:120};
            }
        }

        const {numCol, imgWidth, imgHeight} = computeColumns()

        const renderTruncatedFooter = (handlePress) => {
            return (
              <Text style={{color: "tomato", marginTop: 3}} onPress={handlePress}>
                Read more ...
              </Text>
            );
          }
        
          const renderRevealedFooter = (handlePress) => {
            return (
              <Text style={{color: "tomato", marginTop: 3}} onPress={handlePress}>
                Show less
              </Text>
            );
          }


    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible} 
                onRequestClose={() => {
                setModalVisible(false);
            }}>
               
                <View style={styles.modalView}>
                    <View style={styles.modalButton}>
                        <Button title='X' onPress={()=>setModalVisible(false)} />
                    </View>
                    {modalUri.type === 'image'?
                    <ReactNativeZoomableView
                        maxZoom={1.5}
                        minZoom={1}
                        zoomStep={0.04}
                        initialZoom={1}
                        bindToBorders={true} 
                        pinchToZoomInSensitivity={9}  
                        zoomEnabled={true} 
                        captureEvent={true} 
                    >
                        <Image style={styles.modalImage} source={{uri:modalUri.uri}} />
                    </ReactNativeZoomableView>
                    :
                    <Video
                        ref={video}
                        style={styles.video}
                        source={{
                        uri: modalUri.uri,
                        }}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                    }
                   
                </View>
                
            </Modal>
            
            {/* Likes background */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={likersModalVisible} 
                onRequestClose={() => {
                setLikersModalVisible(false);
            }}>
                
                <View style={styles.likersBack}>
                </View>   
            </Modal>

            {/* Likes Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={likersModalVisible} 
                onRequestClose={() => {
                setLikersModalVisible(false);
            }}>
                
                <View style={styles.likersModalView}>
                <View style={styles.containerlikers}>

                    <View style={styles.modalButton}>
                        <Button title='X' onPress={()=>setLikersModalVisible(false)} />
                    </View>
                    <Text style={styles.likerHeader}>People Who Liked</Text>
                    <View style={styles.likerView}>
                    <FlatList 
                        data={likersList}
                        numColumns={1}
                        keyExtractor={(item)=>{return item.username}}
                        renderItem={({item})=>{
                            return (
                                <View style={styles.oneLiker}> 
                                    <Image style={styles.likerImage} source={{uri:item.profilePic}} />
                                    <Text style={styles.likerText}>
                                        {item.username}
                                    </Text>
                                </View>
                                )
                        }}
                   />
                    </View>      
                </View>   
                </View>   
            </Modal>   
            {/* comment modal  */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={commentModalVisible} 
                onRequestClose={() => {
                setCommentModalVisible(false);
            }}>
                <View style={styles.commentsModalView}>
                    <View style={styles.modalButton}>
                        <Button title='X' onPress={()=>setCommentModalVisible(false)} />
                    </View>
                    <Text style={styles.likerHeader}>Comments</Text>
                    <View style={styles.commentContainer}>
                        
                        <FlatList 
                        
                            data={allComments}
                            keyExtractor={(item)=>{return item.id.toString()}}
                            renderItem={({item})=>{
                                return (
                                        <Comment item={item} />
                                        )
                            }}
                        />
                    
                </View> 
                <View style={styles.postComment}>
                        <TextInput onChangeText={(e)=>{
                            setComment(e)
                            }}
                            
                            value = {comment} 
                            style={styles.addCommentText} 
                            multiline 
                            placeholder="Add a comment..."
                        />
                        <TouchableOpacity style={styles.submitCommentButton} onPress={()=>{
                            if(comment.length!=0) handleCommentAdd()
                            }}>
                            <MaterialCommunityIcons name='send' size={30} color='tomato'/>
                        </TouchableOpacity>
                    </View>    
                </View>
                
                  
            </Modal>
        
        <View style={styles.card}> 
            <View style={styles.userInfo}>
                {userImg? <Image style={styles.userImage} source={{uri:userImg}} /> : <Image style={styles.userImage} source={require("../assets/sajan.png")} />}
                <View style={styles.userInfoText}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.time}>{formatted_date}</Text>
                </View>
            </View>
            
                <View>
                    <Text style={styles.title}>{postTitle}</Text>
                    {content? <View style={styles.contentWrapper}>
                        <ReadMore
                            numberOfLines={2}
                            renderTruncatedFooter={renderTruncatedFooter}
                            renderRevealedFooter={renderRevealedFooter}
                            >
                            <Text style={styles.content}>
                                {content}
                            </Text>
                        </ReadMore>
                    </View>:null}
                    
                </View>

                   <FlatList 
                        data={postContents}
                        numColumns={numCol}
                        keyExtractor={(item)=>{return item.id}}
                        renderItem={({item})=>{
                            return (
                                <TouchableWithoutFeedback onPress={()=>{
                                    setModalVisible(true)
                                    setModalUri(item)}
                                }>
                                    
                                    {item.type==='image'?
                                        <Image style={{
                                        marginTop:14,
                                        width:imgWidth,
                                        height:imgHeight,
                                        marginRight:4,
                                        resizeMode: 'cover'
                                        }} source={{uri:item.uri}} />
                                    :
                                    <Image style={{
                                        marginTop:14,
                                        width:imgWidth,
                                        height:imgHeight,
                                        marginRight:4,
                                        resizeMode: 'cover'
                                    }} source={require("../assets/thumbnail3.jpg")} />
                                    
                                    }

                                </TouchableWithoutFeedback>)
                        }}
                   />
            
                <View style={styles.interactionWrapper}>
                    <View style={styles.interaction} >
                        <TouchableOpacity onPress={handleLikePress}>
                            {isLiked?<MaterialCommunityIcons size={25} name="heart-multiple" color={colors.primary}/>:<MaterialCommunityIcons size={25} name="heart-outline" color="black" />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLikersView}>
                            <Text style={styles.interationText}>{likesCount} Likes</Text>
                        </TouchableOpacity>
                    </View>
                    
                        
                    <TouchableOpacity style={styles.interaction}  onPress={()=>onPressComment()}>
                        <MaterialCommunityIcons size={25} name="comment-outline" />
                        <Text style={styles.interationText}>Comments ({commentsCount})</Text>
                    </TouchableOpacity>
                </View>
            
        </View>
        </>
    )
}

export default Card

const styles = StyleSheet.create({
    postComment:{
        flexDirection:'row',
        justifyContent:'space-around',
        paddingHorizontal:25,
        // paddingVertical: 20,
        height:55,
        zIndex:1,
        backgroundColor:'#faefe6',
        borderTopColor:'#fff',
        borderTopWidth:0.5,
        borderRadius:10,
        bottom:0,
        position:'absolute',
        width:'100%',
        
                
    },
    submitCommentButton:{
       paddingTop:13
    },
    addCommentText:{
        fontSize:18,
        width:'100%',
    },
    userInfoText:{
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:5,
        paddingLeft:10,
        paddingRight:10,
        paddingVertical:3,
        backgroundColor:'white',
        borderRadius:5
    },
    
    commentsModalView:{
        paddingTop:20,
        height:'100%',
        borderRadius:25,
        backgroundColor:'white'
        
    },
    commentContainer:{
        flex:1,
        marginBottom:50
    },
    
    
    video:{
       
        width:'100%',
        height:'100%'
    },
    modalImage:{
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
        height:'100%'
    },
    borderline:{
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        width: '92%',
        marginTop:15,
        alignSelf:'center'
    },  
    card:{
        borderRadius:15,
        backgroundColor: colors.white,
        marginBottom: 15,
        overflow:'hidden',
        
    },
    
    interactionWrapper:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:15
    },
    interaction:{
        flexDirection:'row',
        justifyContent:'center',
        borderRadius:5,
        
    },
    interationText:{
        fontSize:13,
        fontWeight:'bold',
        color:'#333',
        marginTop:5,
        marginLeft:5
    },
    
    content:{
        color:colors.medium,
        fontSize:14,
        
        textAlign:'justify'
    },
    contentWrapper:{
        paddingHorizontal: 12,
        paddingTop:10,
    },
    modalView:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        backgroundColor:'rgba(0, 0, 0, 0.8)'
    },
    
    modalButton:{
        width:40,
        height:40,
        alignSelf:'flex-end',
        top:20,
        right:20,
        position:'absolute',
        zIndex:1
    },
    time:{
        fontSize:12,
        color:'#666'
    },
    title:{
        paddingLeft:15
    },
    userImage:{
        width:46,
        height:46,
        borderRadius:23
    }, 
    likersBack: {
        backgroundColor: 'rgba(0,0,0,0.35)',
        width:'100%',
        height:'100%',
    },
    likersModalView:{
        width:'100%',
        height:'100%',
        display:"flex",
        flexDirection:'row',
        alignItems:'flex-end',
        // backgroundColor: 'rgba(0,0,0,0.2)'
        backgroundColor: 'transparent'

    },
    containerlikers:{
        height:'70%',
        width:'100%',
        paddingTop:25,
        borderRadius:25,

        backgroundColor: '#fff'
        
    },
    likerImage:{
        width:45,
        height:45,
        borderRadius:23
    },
    likerText:{
        fontSize:18,
        // fontWeight:'bold',
        marginLeft:15
    },
    likerHeader:{
        fontSize:22,
        fontWeight:'bold',
        alignSelf:'flex-start',
        marginLeft:20,
        marginBottom:30,
        color:colors.primary
    },
    oneLiker:{
        paddingHorizontal:20,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:16
    },
    likerView:{
        paddingBottom:150
    },
    
    userInfo:{
        flexDirection:"row",
        justifyContent:'flex-start',
        padding:14
    },
    username:{
        fontSize:14,
        fontWeight: "bold"
    },
    userInfoText:{
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:10
    }
})
