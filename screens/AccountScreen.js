import React, {useContext, useState, useEffect, useCallback} from 'react'
import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
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
            backgroundColor: colors.secondary
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
        title: "Settings",
        icon: {
            name: "account-settings",
            backgroundColor: colors.secondary
        },
        targetScreen: "Settings"
    }
]

const delay = (timeout)  => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}



const AccountScreen = ({navigation}) => {
    const {user, signOut} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    }, [user])

    

    const loadMore = useCallback(async () => {
        setLoading(true);

        delay(500).then(() => setLoading(false))
    }, [loading])

    console.log("Username: " ,user.displayName);

    return (
        <Screen style={styles.screen}>
            <ScrollView 
                refreshControl = {
                    <RefreshControl
                    progressBackgroundColor= {colors.primary}
                    tintColor={colors.light}
                    refreshing={loading}
                    onRefresh={loadMore}
                  />
                }
            >
                <View style={styles.container}>
                    <ListItem 
                        title= {user.displayName ? user.displayName : "Update name in Settings!"}
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
                            <MyIcon name='logout' backgroundColor= {colors.primary} />
                        }
                        onPress={()=>signOut()}
                    />
                </View>
            </ScrollView>
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
        backgroundColor:colors.light,
        marginTop: 0
    }
})

