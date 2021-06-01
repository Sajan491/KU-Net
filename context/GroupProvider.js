import React, {createContext, useState} from "react";
import firebase from "../config/firebase";

export const GroupContext = createContext({});
export const GroupProvider = ({children}) => {
    const [member, setMember] = useState(false);
    const addMember = (groupId) => {
        console.log("Member Added to group", groupId);
    }
    return (
        <GroupContext.Provider value = {{
            addMember
        }}>

            {children}
        </GroupContext.Provider>
    )
}