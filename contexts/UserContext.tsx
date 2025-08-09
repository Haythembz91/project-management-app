'use client'
import React, {createContext, useEffect} from "react";
import {User} from "@/libs/interfaces";
import GetUser from "@/utils/GetUser";

const UserContext = createContext<{user:User|null, setUser:React.Dispatch<React.SetStateAction<User|null>>}>({user:null,setUser:()=>{}});

export const UserProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = React.useState<User|null>(null)

    useEffect(()=>{
        const getUser = async ()=>{
            const u = await GetUser();
            setUser(u);
        }
        getUser().catch(console.error);
    },[])




    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = ()=>React.useContext(UserContext);