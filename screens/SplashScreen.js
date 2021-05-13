import colors from '../config/colors'
import React from 'react'
import { Button, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
const SplashScreen = ({navigation}) => {
    return (
        <ImageBackground blurRadius={5} style={styles.background} source={require('../assets/background.png')} >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logoo.png')} />
                <Text style={styles.title}>Welcome To KU-Net!</Text>
                </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[ {backgroundColor:colors.primary},styles.button]} title='Login' onPress={()=>navigation.navigate('Login')}><Text style = {styles.text}>Login</Text></TouchableOpacity>
                <TouchableOpacity style={[ {backgroundColor:colors.secondary},styles.button]} title='Register' onPress={()=>navigation.navigate('Register')}><Text style = {styles.text}>Register</Text></TouchableOpacity>
            </View>
            
        </ImageBackground>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonContainer:{
        paddingTop:20,
        marginTop: 40,
        width:'80%',
        bottom:260
    },
    logoContainer:{
        position:'absolute',
        top: 70,
        alignItems:'center'
    },
    
    logo:{
        width:280,
        height:280,
    },
    title:{
        fontSize:25,
        marginVertical:35,
        fontWeight:"bold"
    },
    button:{
        borderRadius: 25,
        justifyContent:'center',
        alignItems:'center',
        padding:15,
        width:'100%',
        marginVertical:10,
        marginBottom:5
    },
    text:{
        color:colors.white,
        fontSize:18,
        textTransform: 'uppercase',
        fontWeight: 'bold',

    }
    
})
