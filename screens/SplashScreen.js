import colors from '../config/colors'
import React,{Component} from 'react'
import { Button, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity , Animated, ViewComponent } from 'react-native'
import { set, useSharedValue , useAnimatedStyle} from 'react-native-reanimated';

export class SplashScreen extends Component{
    constructor(props){
        super(props);
        setTimeout(()=>{
            this.props.navigation.navigate("Landing");
        },10000);
    }
    state={
        animationLoading: new Animated.Value(0),
    }
    animationLoading=()=>{
        Animated.timing(this.state.animationLoading,{
            toValue: 40,
            duration: 9000,
            useNativeDriver: false,
        }).start();
    }
    componentDidMount(){
        this.animationLoading()
    }
    render(){
        const animationLoading = {
            scaleX: this.state.animationLoading,
        };
        const animationSpinning ={
            transform :[{rotate: this.state.animationLoading.interpolate({
                inputRange:[0,5,15,20,30],
                outputRange:["0deg","0deg","180deg","180deg","360deg"]
            })}],
        };
        const animationScaling={
            scale: this.state.animationScaling,
        }
        var tint1 = this.state.animationLoading.interpolate({
            inputRange:[0,29,30],
            outputRange:["#648bff","#d506fe","#ffffff"],
            extrapolate:'clamp',
        })
        var rotation=this.state.animationLoading.interpolate({
            inputRange:[0,5,15,20,30],
            outputRange:["0deg","0deg","180deg","180deg","360deg"],
            extrapolate:'clamp',
        })
        var scaling=this.state.animationLoading.interpolate({
            inputRange:[30,40],
            outputRange:[1,1000],
            extrapolateLeft:'clamp',
        })
        var tint2 = this.state.animationLoading.interpolate({
            inputRange:[30,40],
            outputRange:["#37c0f2","#d506fe"],
            extrapolateLeft:'clamp',
        })
    
        return(
            
            <View blurRadius={5} style={styles.background}>
                <View style={styles.logoContainer}>
                    <Animated.View style={{height:1,
                                            width:1,
                                            borderRadius:1,
                                            backgroundColor:tint2,
                                            transform:[
                                                {scale:scaling}
                                            ],}}></Animated.View>  
                    <Animated.Image style={{width:150,
                                            height:150,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            tintColor:tint1,
                                            transform:[
                                                {rotate:rotation}
                                            ],}} source={require('../assets/log0.png')}></Animated.Image>
                </View>
            </View>
        )
    }
}
export default SplashScreen

const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#37c0f2',
    },
    buttonContainer:{
        paddingTop:20,
        width:'80%',
        bottom:260
    },
    logoContainer:{
        position:'absolute',
        top: 10,
        alignItems:'center',
        justifyContent:'center',
    },
    
    logo:{
        width:150,
        height:150,
        justifyContent: "center",
        alignItems: "center",
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

    },
    circle:{
        height:10,
        width:10,
        borderRadius:5,
        justifyContent:'center',
    }
})


// const styles = StyleSheet.create({
//     background:{
//         flex:1,
//         justifyContent: 'flex-end',
//         alignItems: 'center'
//     },
//     buttonContainer:{
//         paddingTop:20,
//         width:'80%',
//         marginBottom: "40%"
//     },
//     logoContainer:{
//         position:'absolute',
//         top: 25,
//         alignItems:'center'
//     },
    
//     logo:{
//         width:280,
//         height:280,
//     },
//     title:{
//         fontSize:25,
//         fontWeight:"bold",
//         color: colors.light
//     },
//     button:{
//         borderRadius: 25,
//         justifyContent:'center',
//         alignItems:'center',
//         padding:15,
//         width:'100%',
//         marginVertical:10,
//         marginBottom:5
//     },
//     text:{
//         color:colors.white,
//         fontSize:18,
//         textTransform: 'uppercase',
//         fontWeight: 'bold',

//     }
    
// })
