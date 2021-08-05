import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import colors from '../config/colors'
import AppText from './AppText'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ListItem = (props) => {
    return (
        <Swipeable renderRightActions={props.renderRightActions}>
            <TouchableHighlight 
                underlayColor={colors.light}
                onPress={props.onPress}
            >
                <View style={styles.userContainer}>
                    {props.image? <Image style={styles.image} source={{ uri: props.image}} /> : props.IconComponent}
                    
                    <View style={styles.textContainer}>
                        <AppText style={styles.title} numberOfLines={1}>{props.title}</AppText>
                        {props.subTitle && <AppText style={styles.subTitle} numberOfLines={2}>{props.subTitle}</AppText>}
                    </View>
                  {props.icon
                    ?  <MaterialCommunityIcons name= {props.icon} size={25} />
                    :  <MaterialCommunityIcons name="chevron-right" size={25} />
                  }
                </View>
            </TouchableHighlight>
        </Swipeable>
    )
}

export default ListItem

const styles = StyleSheet.create({
    userContainer:{
        alignItems:"center",
        paddingLeft:20,
        flexDirection:'row',
        padding:12,
        backgroundColor:colors.white,
    },
    image:{
        width:70,
        height:70,
        borderRadius:35,
        
    },
    textContainer:{
        flex:1,
        marginLeft:20,
        justifyContent:'center'
    },
    title:{
        fontSize: 16,
        fontWeight:'700',
        marginBottom:5
    },
    subTitle:{
        color: colors.medium,
        fontWeight:'600',
        fontSize:16
    }
})
