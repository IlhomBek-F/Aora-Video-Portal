import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../appwrite";

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
         }).catch(() => {
            setUser({isLoggedIn: false, currentUser: {}, loading: false})
         });

    }, []);

    return <userContext.Provider value={{user, setUser}}>{children}</userContext.Provider>
}

const useUser = () => useContext(userContext);

export {UserProvider, useUser};