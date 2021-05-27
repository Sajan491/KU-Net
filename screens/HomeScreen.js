import React, {useContext} from 'react'
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import Card from '../components/Card';
import colors from "../config/colors";
import Screen from '../components/Screen'
import {AuthContext} from "../context/AuthProvider";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import GroupLogoWithTitle from '../components/GroupLogoWithTitle';

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

const groups = [
    {
        id: 1,
        title: "KUCC",
        image:require("../assets/groups/kucc.png")
    },
    {
        id: 2,
        title: "AIESEC",
        image:require("../assets/groups/aiesec.png")
    },
    {
        id: 3,
        title: "KUSWC",
        image:require("../assets/groups/ku.png")
    },
    {
        id: 4,
        title: "ALUMNI",
        image:require("../assets/django.jpg"),
    },
    {
        id: 5,
        title: "KURCS",
        image:require("../assets/groups/redcross.png"),
    },
    {
        id: 6,
        title: "KUCS",
        image:require("../assets/django.jpg"),
    },
    {
        id: 7,
        title: "KUCE",
        image:require("../assets/groups/itmeet.png"),
    },
]

const HomeScreen = ({navigation}) => {
    const {user} = useContext(AuthContext)
    return (
            <View style={styles.screen}>
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    showsVerticalScrollIndicator = {false}
                >
                    <FlatList
                        horizontal 
                        data = {groups}
                        keyExtractor = {(item) => item.id.toString()}
                        renderItem = {({item}) => (
                            <GroupLogoWithTitle title = {item.title} image = {item.image} onPress = {() => navigation.navigate("GroupDetails", item)} />
                        )}
                    />

                </ScrollView>
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
