import React, {createContext, useState} from "react";
import firebase from "../config/firebase";

export const GroupContext = createContext({});
export const GroupProvider = ({children}) => {
    const [member, setMember] = useState(false);
    const addMember = () => {
        console.log("Member Added");
    }
    return (
        <GroupContext.Provider value = {{
            member,
            setMember,
            addMember
        }}>

            {children}
        </GroupContext.Provider>
    )
}