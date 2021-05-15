import React, {useContext} from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import colors from "../config/colors";
import Screen from "../components/Screen";
import ListItem from '../components/ListItem';
import ItemSeperator from '../components/ItemSeperator';
import MyIcon from "../components/MyIcon";
import {AuthContext} from "../context/AuthProvider"
const menuItems = [
    {
        title:"My Posts",
        icon:{
            name:'format-list-bulleted',
            backgroundColor: colors.primary
        },
        targetScreen:"Messages"
    },
    {
        title:"Chat",
        icon:{
            name:'email',
            backgroundColor: colors.secondary
        },
        targetScreen:"Messages"
    },
    {
        title: "Add Credentials",
        icon: {
            name: "plus",
            backgroundColor: colors.secondary
        },
        targetScreen: "SecondRegister"
    }
]

const AccountScreen = ({navigation}) => {

const {user, signOut} = useContext(AuthContext);
    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem 
                    title= {user.displayName ? user.displayName : "Update name in credentials!"}
                    subTitle= {user.email}
                    image={require('../assets/sajan.png')}
                />
            </View>
            <View style={styles.container}>
                <FlatList 
                    data={menuItems}
                    keyExtractor={(menuItem)=> menuItem.title}
                    ItemSeparatorComponent={ItemSeperator}
                    renderItem={({item})=>(
                        <ListItem 
                            title={item.title}
                            IconComponent={
                                <MyIcon name={item.icon.name} backgroundColor={item.icon.backgroundColor}/>
                            }
                            onPress={()=>navigation.navigate(item.targetScreen)}
                        />
                    )}
                />
            </View>
            <View>
                <ListItem 
                    title="Log Out"
                    IconComponent={
                        <MyIcon name='logout' backgroundColor='#ffe66d'/>
                    }
                    onPress={()=>signOut()}
                />
            </View>
        </Screen>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    container:{
        marginTop:-20,
        marginVertical:15
    }
    ,screen:{
        backgroundColor:colors.light
    }
})

