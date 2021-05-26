import React from 'react'
import { ColorPropType, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import colors from '../config/colors';
import ReadMore from 'react-native-read-more-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CommentsScreen = ({route}) => {
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
        <View style={{flex:1}}>
            <FlatList 
                data={route.params.comments}
                keyExtractor={(item)=>{return item.id.toString()}}
                renderItem={({item})=>{
                    return (
                            <View style={styles.commentBlock}>
                                <Image style={styles.userImage} source={item.user.userImg} />
                                <View style={styles.userInfoText}>
                                    
                                    <Text style={styles.username}>{item.user.name}</Text>
                                    <ReadMore
                                        numberOfLines={3}
                                        renderTruncatedFooter={renderTruncatedFooter}
                                        renderRevealedFooter={renderRevealedFooter}
                                        >
                                        <Text style={styles.comment}>
                                            {item.comment}
                                        </Text>
                                    </ReadMore>
                                    <Text style={styles.time}>{item.time}</Text>
                                    
                                </View>
                            </View>
                            )
                }}
            />
            <View style={styles.addComment}>
                <TextInput placeholder="Add a comment."/>
                <MaterialCommunityIcons name='send' size={25} color='tomato'/>
            </View>
            
            </View>
    )
}

export default CommentsScreen

const styles = StyleSheet.create({
    addComment:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:15,
        zIndex:1,
        backgroundColor:'#faefe6',
        borderTopColor:'#fff',
        borderTopWidth:0.5,
        borderRadius:10

    },
    commentBlock:{
        flexDirection:"row",
        paddingVertical:13,
        marginLeft:14,
        paddingRight:65,
        backgroundColor:colors.light,
        borderBottomWidth:0.6,
        borderBottomColor:'#fff',
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
    time:{
        fontSize:13,
        color:'#666',
        marginTop:5
    },
    userImage:{
        width:50,
        height:50,
        borderRadius:25
    }, 
    username:{
        fontSize:16,
        fontWeight: "bold",
        
    },
})
