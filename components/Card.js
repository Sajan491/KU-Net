import React,{useState, useEffect} from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Modal, Button, TouchableWithoutFeedback, TextInput, Alert, ActivityIndicator } from 'react-native'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import firebase from "../config/firebase";
import { Video } from 'expo-av';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import {Formik} from 'formik'
import {Label} from "native-base";
import { Octicons } from '@expo/vector-icons';
import colors from '../config/colors'
import ReadMore from 'react-native-read-more-text';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Comment from './Comment';
import Header from './Header';
import { AppFormField, SubmitButton } from './form';
import AppFormImagePicker from './form/AppFormImagePicker';
const ItemWidth = Dimensions.get('window').width / 2 -20;
var storageRef = firebase.storage().ref();

const validationSchema = Yup.object().shape({
    title: Yup.string().min(1).label("Title"),
    description: Yup.string().label("Description"),
    // page: Yup.object().required().nullable().label("Page"),
    // images: Yup.array().max(4, "Maximum images allowed: 4")
});

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
    page,
    screen
    }) => {
        const [isUpdating, setIsUpdating] = useState(false)
        const [uid, setUid] = useState('')
        const [isLiked, setIsLiked] = useState(false)
        const [userName, setUserName] = useState('')
        const [userPpic, setUserPpic] = useState('')
        const usersCollection = firebase.firestore().collection("users_extended")
        const [likesCount, setLikesCount] = useState(0)
        const [likersModalVisible, setLikersModalVisible] = useState(false)
        const [likersList, setLikersList] = useState([])
        const [commentModalVisible, setCommentModalVisible] = useState(false) 
        const [kebabModalVisible, setKebabModalVisible] = useState(false)          
        const [modalVisible, setModalVisible] = useState(false);
        const [modalUri, setModalUri] = useState({})
        const [comment, setComment] = useState('')
        const [allComments, setAllComments] = useState([])
        const [commentsCount, setcommentsCount] = useState(0)
        const [postUser, setPostUser] = useState('')
        const [sameUser, setSameUser] = useState(false)
        const [homeScreen, setHomeScreen] = useState(false)
        const [editModalVisible, setEditModalVisible] = useState(false)
        const [infoVisible, setInfoVisible] = useState(false)
        // const [unreadComments, setUnreadComments] = useState(false)

        useEffect(() => {

            if(screen==='home'){
                setHomeScreen(true)
            }
            
            const fetchData=()=>{
                const userID = firebase.auth().currentUser.uid;
                setUid(userID)
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
                        let postLikers = post.data()['peopleWhoLiked']
 
                        let tempComments = post.data()['comments']
                        setPostUser(post.data()['userInfo'].username)
                        
                        setcommentsCount(tempComments.length)
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
                                else setIsLiked(false)
                            })
                        }
                        else{
                            setIsLiked(false)
                        }
                        
                        setLikesCount(postLikers.length)
                        setLikersList(postLikers)
                        
                    })
                }
                else if(grpId!==''){
                    const groupPost = firebase.firestore().collection('groups').doc(grpId).collection('posts').doc(id)
                    groupPost.get().then(post=>{
                        let postLikers = post.data()['peopleWhoLiked']
                        let tempComments = post.data()['comments']
                        setPostUser(post.data()['userInfo'].username)
                        setAllComments((prev) => {
                            return tempComments;
                        }) 
                        if(postLikers.length>0){
                            postLikers.forEach((liker)=>{
                                if(liker.username==username) setIsLiked(true)
                            })
                        }
                        setLikersList(postLikers)
                        setLikesCount(postLikers.length)
                    })
                }
            }
            fetchData()
            const getDataEvery1s = setInterval(fetchData,300000000)
            return ()=> clearInterval(getDataEvery1s);
        }, [])
     
        const handleLikePress = () =>{
            setIsLiked(prev=>!prev)
            
            if(!isLiked) setLikesCount(likesCount + 1)
            else setLikesCount(likesCount - 1)

            if(deptId!==''){
                const departPost = firebase.firestore().collection('departments').doc(deptId).collection('posts').doc(id)
                departPost.get().then(doc=>{
                    if(isLiked){
                        //delete user from peopleWhoLiked
                        var likers = doc.data()['peopleWhoLiked']
                        var updatedLikers = likers.filter(item=>item.id!=uid)
                        setLikersList(updatedLikers)
                        departPost.update({peopleWhoLiked: updatedLikers})
                       
                    }
                    else{
                        //add user to peopleWhoLiked
                        var likers = doc.data()['peopleWhoLiked']
                        likers.push({id: uid, username: userName, profilePic: userPpic})
                        setLikersList(likers)
                        departPost.update({peopleWhoLiked: likers})
                        
                    }
                })  
            }
            
            else if(grpId!==''){
                const groupPost = firebase.firestore().collection('groups').doc(grpId).collection('posts').doc(id)
                console.log(grpId);
                groupPost.get().then(doc=>{
                    if(isLiked){
                        //delete user from peopleWhoLiked
                        var likers = doc.data()['peopleWhoLiked']
                        var updatedLikers = likers.filter(item=>item.id!=uid)
                        setLikersList(updatedLikers)
                        groupPost.update({peopleWhoLiked: updatedLikers})
                    }
                    else{
                        //add user to peopleWhoLiked
                        var likers = doc.data()['peopleWhoLiked']
                        likers.push({id:uid, username: userName, profilePic: userPpic})
                        setLikersList(likers)
                        groupPost.update({peopleWhoLiked: likers})
                    }
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
                return {numCol:1, imgWidth: "100%", imgHeight:300, keyy:"one"};
            }
            else {
                return {numCol:2, imgWidth: ItemWidth, imgHeight:150, keyy:"two"};
            }
        }

        const {numCol, imgWidth, imgHeight, keyy} = computeColumns()

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

        const handleKebabPress = () =>{
        
            if(userName === postUser ) {
                setSameUser(true)
            }
            setKebabModalVisible(true)
        }

        const handleSavePost = () =>{
            var alreadySaved = false;
            const savedPosts = firebase.firestore().collection("users_extended").doc(uid).collection("savedPosts")
            savedPosts.get().then(docs=>{
                docs.forEach((doc)=>{
                    if(doc.data()['id']===id) alreadySaved=true
                }) 
               
                if(!alreadySaved){
                    savedPosts.add({
                    id:id,
                    description:content,
                    username: username,
                    userImg: userImg,
                    postTime: postTime,
                    title: postTitle,
                    postContents: postContents,
                    page:page,
                    deptId: deptId,
                    grpId: grpId,
                    }).then(()=>{
                        Alert.alert('Success!','Post Saved Successfully')
                        setKebabModalVisible(false)
                    })
                }
                else{
                    Alert.alert('Post Already Saved!')
                    setKebabModalVisible(false)
                }

            })
            
        }
        const handleEditPost = () =>{
            setEditModalVisible(true)
            setKebabModalVisible(false)
            
        }

        

        const handleDeletePost = async () =>{
            // delete from saved posts 
            const allUsers = firebase.firestore().collection("users_extended")
            await allUsers.get().then((docss)=>{
                docss.forEach(docss=>{
                    const savedPosts = allUsers.doc(docss.id).collection("savedPosts")
                    savedPosts.get().then(docss=>{
                        docss.forEach(doc=>{
                            if(doc.data()['id']===id) savedPosts.doc(doc.id).delete()
                        })
                    })
                })
            })

            // delete from posts database
            if(deptId!==''){
                const departPost = firebase.firestore().collection('departments').doc(deptId).collection('posts').doc(id)
                departPost.delete()
            }
            else if(grpId!==''){
                const groupPost = firebase.firestore().collection('groups').doc(grpId).collection('posts').doc(id)
                groupPost.delete()
            }
            setKebabModalVisible(false)
        }
        const onPressDelete=()=>{
            Alert.alert('Confirm Delete?','Are you sure you want to delete the post',[
                {text:'Confirm', onPress:()=>{handleDeletePost()}},
                {text:'Cancel'}
            ])
        }
        const handleUnsavePost = () =>{
            const savedPosts = firebase.firestore().collection("users_extended").doc(uid).collection("savedPosts")
            savedPosts.get().then(docs=>{
                docs.forEach(doc=>{
                    if(id===doc.data()['id']){
                        savedPosts.doc(doc.id).delete()
                    }
                })
            })
            setKebabModalVisible(false)
        }

        // edit form submission
        const handleSubmit = async (values)=>{

            //update from real posts
            if(deptId!==''){
                const departPost = firebase.firestore().collection('departments').doc(deptId).collection('posts').doc(id)
                if(values.title!==''){
                    departPost.update({title:values.title})
                }
                if(values.description!==''){
                    departPost.update({description:values.description})
                }
                if(values.images.length>0){
                    uploadImage(values)
                }
                if(values.images.length===0){
                    setEditModalVisible(false)
                    if(values.title!=='' || values.description!==''){
                        Alert.alert('Success!', 'Post Successfully Updated!')
                    }   
                }
            }
            else if(grpId!==''){
                const groupPost = firebase.firestore().collection('groups').doc(grpId).collection('posts').doc(id)
                if(values.title!==''){
                    groupPost.update({title:values.title})
                }
                if(values.description!==''){
                    groupPost.update({description:values.description})
                }
                if(values.images.length>0){
                    uploadImage(values)
                }
                if(values.images.length===0){
                    setEditModalVisible(false)
                    if(values.title!=='' || values.description!==''){
                        Alert.alert('Success!', 'Post Successfully Updated!')
                    }   
                }
            }
            updateInSavedPosts(values);
        }

        const updateInSavedPosts = async (values, updatedPostContents) =>{
            // update from saved posts 
            const allUsers = firebase.firestore().collection("users_extended")
            await allUsers.get().then((docss)=>{
                docss.forEach(docss=>{
                    const savedPosts = allUsers.doc(docss.id).collection("savedPosts")
                    savedPosts.get().then(docss=>{
                        docss.forEach(doc=>{
                            if(doc.data()['id']===id) {
                                if(values.title!==''){
                                    savedPosts.doc(doc.id).update({title:values.title})
                                }
                                if(values.description!==''){
                                    savedPosts.doc(doc.id).update({description:values.description})
                                }
                                if(values.images.length>0){
                                    if(updatedPostContents){
                                        savedPosts.doc(doc.id).update({postContents:updatedPostContents})
                                    }
                                }
                                
                            }
                        })
                    })  
                })
            })
        }

    

        // image uploader from edit modal
        const uploadImage= async (values)=>{
            // ----------uploading to storage-----------     
            var uris = []
            var count = 0;
            var limit = values.images.length;
            if(limit + postContents.length >4){
                Alert.alert('Error!','A post cannot have more than 4 images/videos.')
            }
            else{
                await values.images.forEach( async (img)=>{
                    
                    const random_id = uuidv4();
                    const extension = img.split('.').pop();
                    
                    const blob = await new Promise((resolve,reject)=>{
                        const xhr = new XMLHttpRequest();
                        xhr.onload = function(){
                            resolve(xhr.response);
                        };
                        xhr.onerror = function(){
                            reject(new TypeError('Network request failed'));
                        };
                        xhr.responseType = 'blob';
                        xhr.open('GET', img, true);
                        xhr.send(null);
        
                    });
                   
                    const picRef = storageRef.child(`posts/${random_id+'.'+extension}`)
                    const snapshot = picRef.put(blob)
                    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED, 
                        (snapshot)=>{
                        console.log(snapshot.state);
                        console.log('progress:' + (snapshot.bytesTransferred / snapshot.totalBytes)*100);
                        setIsUpdating(true)
                    },
                    (error)=>{
                        setIsUpdating(false)
                        console.log(error);
                        blob.close()
                        return
                    },
                    ()=>{
                        picRef.getDownloadURL().then((downloadUrl)=>{
                            count= count+1;
                            blob.close();
                            let extensions = ['jpg', 'png', 'jpeg', 'gif', 'webp','bmp', 'svg']
                            if (extensions.includes(extension)){
                                uris.push({uri:downloadUrl, id:random_id, type:'image'})
                            }
                            else{
                                uris.push({uri:downloadUrl, id:random_id, type:'video'})
                            }
                            
                            if (count === limit){ 
                                
                                const updatedPostContents = postContents.concat(uris)
                                if(deptId!==''){
                                    const departPost = firebase.firestore().collection('departments').doc(deptId).collection('posts').doc(id)
                                    departPost.update({postContents:updatedPostContents})
                                }
                                else if(grpId!==''){
                                    const groupPost = firebase.firestore().collection('groups').doc(grpId).collection('posts').doc(id)
                                    groupPost.update({postContents:updatedPostContents})
                                }  
                                updateInSavedPosts(values, updatedPostContents)
                                
                                setIsUpdating(false) 
                                setEditModalVisible(false)  
                                Alert.alert('Success!', 'Post Successfully Updated!')
                            }
                        })
                    }
                    );
                })
            }
        }

        const handleContainerVisibility = () =>{
            setInfoVisible(!infoVisible)
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

            {/* Kebab background */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={kebabModalVisible} 
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
                        keyExtractor={(item)=>{return item.id}}
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

            {/* kebab modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={kebabModalVisible} 
                onRequestClose={() => {
                setLikersModalVisible(false);
            }}>
                
                <View style={styles.kebabModalView}>
                    <View style={styles.kebabContainer}>

                        <View style={styles.modalButton}>
                            <Button title='X' onPress={()=>setKebabModalVisible(false)} />
                        </View>
                        {homeScreen? <>
                            <TouchableOpacity style={styles.kebabOneItem} onPress={handleSavePost}>
                                <MaterialCommunityIcons name="content-save" size={30} color="black" />
                                <View style={styles.kebabText}>
                                    <Text style={styles.kebabTitle}>Save</Text>
                                    <Text style={styles.kebabDetail}>Add this post to your saved items.</Text>
                                </View> 
                            </TouchableOpacity>
                            {sameUser && <>
                            <TouchableOpacity style={styles.kebabOneItem} onPress={handleEditPost}>
                                <MaterialCommunityIcons name="square-edit-outline" size={30} color="black" />
                                <View style={styles.kebabText}>
                                    <Text style={styles.kebabTitle}>Edit</Text>
                                    <Text style={styles.kebabDetail}>Make changes to the current post.</Text>
                                </View> 
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.kebabOneItem} onPress={onPressDelete}>
                                <MaterialCommunityIcons name="delete-forever" size={30} color="black" />
                                <View style={styles.kebabText}>
                                    <Text style={styles.kebabTitle}>Delete</Text>
                                    <Text style={styles.kebabDetail}>Delete this post.</Text>
                                </View> 
                            </TouchableOpacity></>}
                        </>:
                            <TouchableOpacity style={styles.kebabOneItem} onPress={handleUnsavePost}>
                            <MaterialCommunityIcons name="delete-forever" size={30} color="black" />
                            <View style={styles.kebabText}>
                                <Text style={styles.kebabTitle}>Unsave</Text>
                                <Text style={styles.kebabDetail}>Unsave this post.</Text>
                            </View> 
                            </TouchableOpacity>
                        }
                        
                    </View>
                </View>   
            </Modal>

            {/* edit modal */}
            <Modal
                animationType="fade"
                transparent={false}
                visible={editModalVisible} 
                onRequestClose={() => {
                setEditModalVisible(false);
            }}>
                    <View style={styles.modalButton}>
                        <Button title='X' onPress={()=>setEditModalVisible(false)} />
                    </View>
                    <View style={styles.editModalContainer}>
                        <Header headerText="Edit Post" />
                        <View style={styles.editForm}>
                            <Formik
                                initialValues={{title:'', description:'', postContents:postContents, images:[]}}
                                onSubmit={(values)=>{
                                    handleSubmit(values)
                                }}
                                validationSchema={validationSchema}
                            >
                                {({values})=><>
                                    <TouchableOpacity style={{marginLeft:5, marginBottom:10}} onPress={handleContainerVisibility}>
                                        <MaterialCommunityIcons name="information-outline" size={24} color="#999999" />
                                    </TouchableOpacity>
                                    {infoVisible && <View style={styles.infoContainer}>
                                        <Text style={styles.editNote}>Note: You can only add images/videos from here and cannot delete existing ones. Also, maximum number of images/ videos per post is 4.</Text>
                                    </View>}
                                    
                                    <AppFormImagePicker name="images"/>
                                    <Label style = {styles.label}> Title</Label>
                                    <AppFormField 
                                        maxLength = {255}
                                        defaultValue={postTitle}
                                        name="title"
                                    />
                                    <Label style = {styles.label}> Description</Label>
                                    <AppFormField 
                                        maxLength={255}
                                        multiline
                                        numberOfLines={4}
                                        name="description"
                                        defaultValue={content}
                                    />
                                    {!isUpdating? <SubmitButton title="Update"/>: <ActivityIndicator size={40} color="#000" />}
                                </>}
                                
                                
                            </Formik>
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
                <View style={styles.editButtonGap}>
                    <View style={styles.userInfoText}>
                        <Text style={styles.username}>{username}</Text>
                        <Text style={styles.time}>{formatted_date}</Text>
                    </View>
                    <TouchableOpacity style={styles.kebab} onPress={handleKebabPress}>
                        <Octicons name="kebab-vertical" size={20} color={colors.primary} />
                    </TouchableOpacity>

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
                        key={keyy}
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
   
    editNote:{
        marginBottom:20,
        color: '#999999',
        marginLeft:6
    },
    label: {
        fontSize: 15,
        paddingTop: 8,
        paddingLeft: 18
    },
    editModalContainer:{
        paddingHorizontal:20,
        backgroundColor:colors.white,
        height:'100%',
        marginTop:-12,
    },  
   
    kebab:{
        marginTop:5,
        width:10
    },
    kebabModalView:{
        width:'100%',
        height:'100%',
        display:"flex",
        flexDirection:'row',
        alignItems:'flex-end',
        backgroundColor: 'transparent'
    },
    kebabContainer:{
        minHeight:'10%',
        maxHeight:'25%',
        width:'100%',
        paddingTop:7,
        borderTopEndRadius:20,
        backgroundColor: '#fff',
        flex:1,
        flexDirection:'column'
    },
    kebabOneItem:{
        flex:1,
        flexDirection:'row',
        paddingLeft:20,
        borderBottomColor:'rgba(0,0,0,0.4)',
        borderBottomWidth:0.2,
        padding:15,
        paddingTop: 17
    },
    kebabText:{
        marginLeft:15,
        marginTop:-3
    },
    kebabTitle:{
        fontSize:16,
        fontWeight:'bold'
    },
    kebabDetail:{
        fontSize:12,
        color:'rgba(0,0,0,0.7)',

    },
    editButtonGap:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
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
        width:'90%',
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
        borderTopEndRadius:20,
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
        backgroundColor: 'rgba(0,0,0,0.55)',
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
        borderTopEndRadius:20,

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
        justifyContent:'flex-start',
        marginLeft:10,
        marginTop:3
    }
})
