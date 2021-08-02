import React, {useRef} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import FileInput from './FileInput'

const FileInputList = ({fileUris=[], onAddFile, onRemoveFile}) => {

    const scrollView = useRef()

    return (
        <View>
        <ScrollView showsHorizontalScrollIndicator={false} ref={scrollView} horizontal onContentSizeChange={()=>scrollView.current.scrollToEnd()}>
            <View style={styles.container}>
                {fileUris.map((uri)=>(
                    <View key={uri} style={styles.file}>
                        <FileInput 
                            fileUri={uri}
                            onChangeFile={()=>onRemoveFile(uri)} 
                        />
                    </View>
                ))}
                {fileUris.length<4 && <FileInput onChangeFile={(uri)=>onAddFile(uri)} />}
            </View>
        </ScrollView>
        </View>
    )
}

export default FileInputList

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    },  
    file:{
        marginRight:10
    }
})
