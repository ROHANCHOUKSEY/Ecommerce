import React, { createContext, useEffect, useState } from 'react'

export const  AppContext = createContext();

const ContextProvider = (props) => {

    const[resetEmail, setResetEmail] = useState("");
    const[isLoggined, setIsLoggined] = useState(false);

    return (
        <AppContext.Provider value={{resetEmail, setResetEmail, isLoggined, setIsLoggined}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default ContextProvider