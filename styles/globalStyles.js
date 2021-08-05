import {StyleSheet} from "react-native";
import colors from "../config/colors";

export const groupStyles = StyleSheet.create({
    container:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        flex:1,
    },
    channelImage: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20
    },
    content: {
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 0.7,
        borderColor: colors.secondary,
        borderWidth: 0.5,
        borderRadius: 5,
        marginBottom: 5,
        backgroundColor: colors.white,
        
    },
   channelName: {
       marginTop: 30,
       marginLeft: 20,
   },
   title: {
       fontWeight: "bold",
       fontSize: 16,
       marginBottom: 5,
       marginTop: 5,
       color: colors.secondary
   }
});