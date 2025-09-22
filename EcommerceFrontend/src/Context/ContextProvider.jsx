import React, { createContext, useEffect, useState } from 'react'
import { AppContext } from './AppContext';

const ContextProvider = (props) => {

    const[resetEmail, setResetEmail] = useState("");
    const[isLoggined, setIsLoggined] = useState(() => {
       const checkLoggined = localStorage.getItem("isLoggined");
        return checkLoggined ? checkLoggined : false;
    });

    useEffect(() => {
        localStorage.setItem("isLoggined", isLoggined);
    }, [isLoggined]);


    return (
        <AppContext.Provider value={{resetEmail, setResetEmail, isLoggined, setIsLoggined}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default ContextProvider