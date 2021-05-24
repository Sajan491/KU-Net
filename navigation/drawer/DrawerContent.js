import React, {useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItem
} from "@react-navigation/drawer";
import { Drawer } from 'react-native-paper';
import {AuthContext} from "../../context/AuthProvider";
import { MaterialCommunityIcons } from '@expo/vector-icons';
const DrawerContent = (props) => {
    const {signOut} = useContext(AuthContext);
    return (
        <View style = {{flex: 1}}>
            <DrawerContentScrollView {...props}>
               <Drawer.Section style = {styles.drawerSection}>
                    <DrawerItem
                        icon = {({size, color}) => (
                            <MaterialCommunityIcons name="home" size = {size} color = {color} />
                            )
                        }
                        label = "Home"
                        onPress = {() => props.navigation.navigate("Home")}
                    />
                    <DrawerItem
                        icon = {({size, color}) => (
                            <MaterialCommunityIcons name="details" size = {size} color = {color} />
                            )
                        }
                        label = "About"
                        onPress = {() => props.navigation.navigate("About")}
                    />
               </Drawer.Section>
            </DrawerContentScrollView>

            <Drawer.Section style = {styles.bottomDrawerSection} >
                <DrawerItem 
                     icon = {({size, color}) => (
                        <MaterialCommunityIcons name="logout" size = {size} color = {color} />
                        )
                    }
                    label = "Log Out"
                    onPress = {() => signOut()  }
                />
            </Drawer.Section>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1
    },
    drawerSection: {
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1,
    }
})
