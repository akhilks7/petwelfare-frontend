
import React from 'react'
import { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


export const userAuthContext = createContext()

function AuthContext({ children }) {
    const [role, setrole] = useState("")
    const [Authoriseduser, setAuthoriseduser] = useState({})
    useEffect(() => {
        if (sessionStorage.getItem("userdetails") && sessionStorage.getItem("token")) {
            const user = JSON.parse(sessionStorage.getItem("userdetails"))
            setrole(user.role)
            setAuthoriseduser(user)
        }
    }, [role,Authoriseduser])
    return (
        <>
            <userAuthContext.Provider value={{ role, Authoriseduser, setAuthoriseduser }}>
                {children}
            </userAuthContext.Provider>

        </>
    )
}

export default AuthContext