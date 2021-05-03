import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Card from '../components/Card';
import colors from "../config/colors";

const posts=[
    {   
        id:1,
        title:"Hiring a full stack ReactJs developer!",
        subTitle:"subtitle1",
        image:require("../assets/reactjs.png")
    },
    {
        id:2,
        title:"Curtains for sale",
        subTitle:"subtitle2",
        image:require("../assets/curtains.png")
    },
    {
        id:3,
        title:"A glimpse of the Django Workshop",
        subTitle:"subtitle3",
        image:require("../assets/django.jpg")
    }
]

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.screen}>
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
        padding:5,
        flex:1,
        
    }
})
