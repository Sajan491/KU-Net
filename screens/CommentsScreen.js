import React from 'react'
import { ColorPropType, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import colors from '../config/colors';
import ReadMore from 'react-native-read-more-text';

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
        <View>
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
        </View>
    )
}

export default CommentsScreen

const styles = StyleSheet.create({
    
    commentBlock:{
        flexDirection:"row",
        paddingVertical:13,
        marginLeft:14,
        marginRight:65,
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
