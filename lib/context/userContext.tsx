import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../appwrite";
import { router } from "expo-router";

const userContext = createContext({});

function UserProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState({
        isLoggedIn: false,
        currentUser: {},
        loading: true
    });


    useEffect(() => {
         getCurrentUser()
         .then((res) => {
            setUser({isLoggedIn: true, currentUser: res, loading: false})
         }).catch((error) => {
             setUser({isLoggedIn: false, currentUser: {}, loading: false})
            if(error.code === 401) {
                router.push('/sign-in')
            }
         });

    }, []);

    return <userContext.Provider value={{user, setUser}}>{children}</userContext.Provider>
}

const useUser = () => useContext(userContext);

export {UserProvider, useUser};