import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import ReadMore from 'react-native-read-more-text';
import { Entypo } from '@expo/vector-icons'; 
import firebase from "../config/firebase";

const Comment = ({item}) => {
    const userID = firebase.auth().currentUser.uid;
    const [showDeleteBtn, setShowDeleteBtn] = useState(false)

    useEffect(() => {
        if(userID===item.userId){
            setShowDeleteBtn(true)
        }
        else{
            setShowDeleteBtn(false)
        }
        
    }, [])

    let formatted_date;
        const computeDate=(time)=>{
            let a = time.toDate().toString();
            let b = a.split(" ");
            let c= b[4].split(':')
            formatted_date = b[1]+" " + b[2]+", "+b[3]+ " at " + c[0]+':'+c[1]; 
        }
        computeDate(item.timePosted);

        const renderTruncatedFooter = (handlePress) => {
            return (
              <Text style={{color: '#0d6efd', marginTop: 3}} onPress={handlePress}>
                Read more ...
              </Text>
            );
          }
        
          const renderRevealedFooter = (handlePress) => {
            return (
              <Text style={{color: "#0d6efd", marginTop: 3}} onPress={handlePress}>
                Show less
              </Text>
            );
          }

          const handleDeleteComment=()=>{
            console.log(userID);
            console.log(item.userId);
          }


          const showConfirmationModal=()=>{
            Alert.alert('Confirm Delete?','Are you sure you want to delete the comment?',[
                {text:'Confirm', onPress:()=>{handleDeleteComment()}},
                {text:'Cancel'}
            ])
          }

         

    return (
        <View style={styles.commentBlock}>
            {showDeleteBtn && <TouchableOpacity style={styles.deleteBtn} onPress={showConfirmationModal}>
                <Entypo name="circle-with-cross" size={15} color="black" />
            </TouchableOpacity>}
            {item.profilePic? <Image style={styles.userImage} source={{uri:item.profilePic}} /> : <Image style={styles.userImage} source={require("../assets/sajan.png")} />}
                <View style={styles.cBlock}>
                    <View style={styles.userInfoDate}>
                        <Text style={styles.username}>{item.username}</Text>
                        <Text style={styles.date}>{formatted_date}</Text> 
                        
                    </View>
                    <View style={styles.maincomment}>
                        <ReadMore
                            numberOfLines={2}
                            renderTruncatedFooter={renderTruncatedFooter}
                            renderRevealedFooter={renderRevealedFooter}
                            >
                            <Text style={styles.comment} >
                                {item.comment}
                            </Text>
                        </ReadMore>
                    
                    </View>
                </View>
            
                        
                
                
            
        </View>
    )
}

export default Comment

const styles = StyleSheet.create({
    deleteBtn:{
        marginRight:-14,
        zIndex:1,
        marginTop:-5
        
    },
    maincomment:{
        marginTop:4,
    },
    
    cBlock:{
        flex:1,
        flexDirection:'column',
        paddingLeft:13,
        width:'100%',
        
    },  
    
    comment:{
        color:'#000',
        
    },
    commentBlock:{
        paddingVertical:10,
        marginLeft:8,
        marginRight:14,
        marginBottom:8,
        paddingRight:15,
        paddingLeft:10,
        // backgroundColor:colors.primary,
        flex:1,
        flexDirection:'row',
        borderBottomWidth:0.2,
        borderBottomColor:'rgba(0,0,0,0.1)',
    },
    userImage:{
        width:55,
        height:57,
        borderRadius:25
    }, 
    username:{
        fontSize:16,
        fontWeight: "bold",   
    },
    userInfoDate:{
        flex:-1,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        flexWrap: 'wrap',
        width:'100%',
        resizeMode:'cover'
    },
    date:{
        color:'#666',
        fontSize:11,
        marginTop:3
    }
})
