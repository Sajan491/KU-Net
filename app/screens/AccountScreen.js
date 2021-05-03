import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import colors from "../config/colors";
import Screen from "../components/Screen";
import ListItem from '../components/ListItem';
import ItemSeperator from '../components/ItemSeperator';
import MyIcon from "../components/MyIcon";
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
    }
]

const AccountScreen = ({navigation}) => {
    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem 
                    title="Sajan Mahat"
                    subTitle="sajanmahat491@gmail.com"
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
