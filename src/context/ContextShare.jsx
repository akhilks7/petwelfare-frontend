import React, { createContext, useEffect, useState } from 'react'

export const userProfileUpdateContent = createContext()

function ContextShare({ children }) {
    const [userProfileUpdateStatus, setuserProfileUpdateStatus] = useState(false)
    useEffect(() => {
            
        }, [userProfileUpdateStatus])
    return (
        <userProfileUpdateContent.Provider value={{ userProfileUpdateStatus, setuserProfileUpdateStatus }}>
            {children}
        </userProfileUpdateContent.Provider>
    )
}

export default ContextShare