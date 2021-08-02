import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../components/Header'
import Screen from '../components/Screen'
import colors from '../config/colors'
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

const AddPostOrFileScreen = ({navigation}) => {

    return (
        <Screen style={styles.screen}>
            <Header headerText="Choose what you want to post!" />
            <View style={styles.container}>
                <View>
                    <TouchableOpacity style={styles.cardContainer} onPress={()=>navigation.navigate('AddPost')}>
                    <FontAwesome style={styles.icon} name="file-photo-o" size={45} color="black" />
                        <Text style={styles.text}>Photos/Videos</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.cardContainer} onPress={()=>navigation.navigate('AddFile')}>
                        <FontAwesome style={styles.icon} name="file-text" size={45} color="black" />
                        <Text style={styles.text}>File(s)</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </Screen>
    )
}

export default AddPostOrFileScreen

const styles = StyleSheet.create({
    icon:{
        position:'absolute',
        alignSelf:'flex-start',
        top:-20
    },
    container:{
        alignItems:'center',
        flex:1,
        justifyContent:'center'
    },
    cardContainer:{
        borderRadius:10,
        width:250,
        paddingVertical:30,
        paddingHorizontal:10,
        fontSize:30,
        borderColor:'#fff',
        borderWidth: 1,
        marginBottom:70,
        backgroundColor:colors.white,
        shadowColor: "#000",
        shadowOffset:{
        width: 0,
        height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    text:{
        fontSize:20,
        color:'#444',
        alignSelf:'center'
    },
    screen:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
        flex:1,
        marginTop:-10,
        
    }
})
