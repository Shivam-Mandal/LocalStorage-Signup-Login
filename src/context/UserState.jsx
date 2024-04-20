import React, { useState } from "react";
import UserDataContext from "./UserDataContext";

const UserState = (props)=>{
    const [userData,setUserData] = useState(null)
    const setUser = (data)=>{
        setUserData(data)
    }
    return(
        <UserDataContext.Provider value={{userData,setUser}}>
            {props.children}
        </UserDataContext.Provider>
    )
}
export default UserState;