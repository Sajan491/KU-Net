import {StyleSheet} from "react-native";
import colors from "../config/colors";

export const groupStyles = StyleSheet.create({
    container:{
        backgroundColor:colors.light,
        paddingHorizontal:17,
        paddingTop:20,
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
        borderBottomWidth: 1,
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 5,
        backgroundColor: colors.lightBlue
    },
   channelName: {
       marginTop: 30,
       marginLeft: 20,
   }
});