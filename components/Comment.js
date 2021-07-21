import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import ReadMore from 'react-native-read-more-text';

const Comment = ({item}) => {
    
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

    return (
        <View style={styles.commentBlock}>
            <Image style={styles.userImage} source={{uri:item.profilePic}} />
            <View style={styles.userInfoText}>
                
                <Text style={styles.username}>{item.username}</Text>
                    <Text style={styles.date}>{formatted_date}</Text>
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
    maincomment:{
        marginTop:4,
    },
    comment:{
        color:'#000',
        
    },
    commentBlock:{
        flexDirection:"row",
        paddingVertical:10,
        marginLeft:14,
        marginRight:14,
        marginBottom:10,
        paddingRight:65,
        paddingLeft:10,
        // backgroundColor:colors.primary,

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
    userInfoText:{
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'white',
        borderRadius:5
    },
   
    date:{
        fontSize:12,
        color:'#666',
        fontSize:11
    }
})
