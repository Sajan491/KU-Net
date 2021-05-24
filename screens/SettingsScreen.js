import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Screen from "../components/Screen";
import colors from '../config/colors';
import ItemSeparator from "../components/ItemSeperator";
import MyIcon from "../components/MyIcon";
import ListItem from "../components/ListItem";
const settingsItems = [
    {
        title: "Account",
        icon: {
            name: "account",
            color: colors.secondary
        },
        targetScreen: "AccountSettings",
        routes: {
            name: "Account Settings"
        }
    },

    {
        title: "Profile",
        icon: {
            name: "face-profile",
            color: colors.secondary
        },
        targetScreen: "ProfileSettings",
        routes: {
            name: "Profile Settings"
        }
        }
]

const SettingsScreen = ({navigation}) => {
    return (
      <Screen>
          <FlatList 
            data = {settingsItems}
            keyExtractor = {(item) => item.title}
            ItemSeparatorComponent = {ItemSeparator}
            renderItem = {({item}) => (
                <ListItem 
                    title = {item.title}
                    IconComponent = {
                        <MyIcon name = {item.icon.name} backgroundColor = {item.icon.color} />
                    }
                    onPress = {() => navigation.push(item.targetScreen, item.routes)}
                />
            )}
          />

      </Screen>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({})
