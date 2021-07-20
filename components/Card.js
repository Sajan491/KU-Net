import React,{useState} from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, Modal, Button, TouchableWithoutFeedback } from 'react-native'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import firebase from "../config/firebase";
import { Video, AVPlaybackStatus } from 'expo-av';

import colors from '../config/colors'
import ReadMore from 'react-native-read-more-text';
import {MaterialCommunityIcons} from '@expo/vector-icons'
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
    commentsCount, onPressComment}) => {

        const handleLikePress = () =>{
            console.log('Fkuu');
            if(deptId!==''){
                const departPost = firebase.firestore().collection('departments').doc(deptId).collection('posts').doc(id)
              
                departPost.get().then(doc=>{
                    doc.data()['likesCount'] = doc.data()['likesCount']
                    console.log(doc.data()['likesCount']);
                })
            }
            
            else if(grpId!==''){
                const groupPost = firebase.firestore().collection('groups').doc(grpId).collection('posts').doc(id)
                
                groupPost.get().then(doc=>{
                    console.log(doc.data()['likesCount']);
                })
            }
            
        }


        const video = React.useRef(null);
        const [status, setStatus] = React.useState({});

        let formatted_date;
        const computeDate=()=>{
            let a = postTime.toDate().toString();
            let b = a.split(" ");
            let c= b[4].split(':')
            formatted_date = b[0]+"  "+ b[1]+" " + b[2]+", "+b[3]+ " at " + c[0]+':'+c[1]; 
        }
        computeDate();
        
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

          
        const [isLiked, setIsLiked] = useState(false)
        const [modalVisible, setModalVisible] = useState(false);
        const [modalUri, setModalUri] = useState()
    return (
        <>
        {modalVisible && <Modal
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
                
            </Modal>}
        
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
                    <TouchableOpacity style={styles.interaction} onPress={handleLikePress}>
                        {isLiked?<MaterialCommunityIcons size={25} name="heart-multiple" color={colors.primary}/>:<MaterialCommunityIcons size={25} name="heart-outline" color="black" />}
                        {isLiked?<Text style={styles.interationText}> 0 Likes</Text>: <Text style={styles.interationText}>0 Likes</Text>}
                    </TouchableOpacity>
                        
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
