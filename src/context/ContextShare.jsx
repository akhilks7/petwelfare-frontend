import React, { createContext, useEffect, useState } from 'react'

export const userProfileUpdateContent = createContext()

function ContextShare({ children }) {
    const [userProfileUpdateStatus, setuserProfileUpdateStatus] = useState(false)
    const [pageload, setpageload] = useState(null)

    useEffect(() => {

    }, [userProfileUpdateStatus,pageload])
    return (
        <userProfileUpdateContent.Provider value={{ userProfileUpdateStatus, setuserProfileUpdateStatus,setpageload }}>
            {children}
        </userProfileUpdateContent.Provider>
    )
}

export default ContextShare