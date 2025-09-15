import React, { createContext, useState } from 'react'

export const  AppContext = createContext();

const ContextProvider = (props) => {

    const[resetEmail, setResetEmail] = useState("");

    return (
        <AppContext.Provider value={{resetEmail, setResetEmail}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default ContextProvider