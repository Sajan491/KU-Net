import React, {useContext} from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Card from '../components/Card';
import colors from "../config/colors";
import Screen from '../components/Screen'
import {AuthContext} from "../context/AuthProvider";

const posts=[
    {   
        id:1,
        title:"Hiring a full stack ReactJs developer!",
        subTitle:"subtitle1",
        image:require("../assets/react.png")
    },
    {
        id:3,
        title:"A glimpse of the Django Workshop",
        subTitle:"subtitle3",
        image:require("../assets/django.jpg")
    },
    {
        id:2,
        title:"Curtains for sale",
        subTitle:"subtitle2",
        image:require("../assets/curtains.png")
    }
    
]

const HomeScreen = ({navigation}) => {
    const {user} = useContext(AuthContext)
    return (
            <View style={styles.screen}>
                <Text style={styles.text}> Welcome, {user.email}</Text>
                <FlatList 
                    data={posts}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item})=>(
                        <Card
                            title={item.title}
                            subTitle={item.subTitle}
                            image={item.image}
                            onPress={()=>navigation.navigate('PostDetails', item)}
                        />
                    )}

                />
            </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    screen:{
        backgroundColor:colors.light,
        padding:9,
        flex:1,
        
    },
    text: {
        textAlign: 'center'
    }
})
