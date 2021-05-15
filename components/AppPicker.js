import React, {useState} from 'react'
import {Button, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { FlatList } from 'react-native'
import colors from '../config/colors'
import AppText from './AppText'
import { Modal } from 'react-native'
import PickerItem from './PickerItem'


const AppPicker = ({ items, onSelectItem, numberOfColumns=1, placeholder, selectedItem}) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <React.Fragment>
            <TouchableWithoutFeedback onPress={()=>setModalVisible(true)}>
                <View style={styles.container}>
                    
                    {selectedItem? (<AppText style={styles.text}>{selectedItem.label}</AppText>):
                        (<AppText style={styles.placeholder}>{placeholder}</AppText>)
                        }
                    
                    <MaterialCommunityIcons name='chevron-down' size={25} color={colors.medium}/>
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType="slide">
                <Button title='close' onPress={()=>setModalVisible(false)}/>
                <FlatList 
                    data={items}
                    keyExtractor={(item)=>item.value.toString()}
                    numColumns={numberOfColumns}
                    renderItem={({item})=>
                        <PickerItem
                            icon={item.icon}
                            item={item}
                            onPress={()=>{
                                setModalVisible(false)
                                onSelectItem(item)
                        }}/>
                    }
                />
            </Modal>
        </React.Fragment>
    )
}

export default AppPicker

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.light,
        borderRadius:25,
        flexDirection:'row',
        width:"100%",
        padding:15,
        marginVertical:10
    },
    icon:{
        marginRight:10
    },
    placeholder:{
        color:colors.medium,
        flex:1
    },
    text:{
        flex:1
    }
    
})
