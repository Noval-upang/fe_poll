import { useEffect, useState } from "react"
import { Func } from "../helpers/init"
import { Navigate, Outlet } from "react-router-dom"

export default () => {
    const [allow, setAllow] = useState<boolean | undefined>(true)

    useEffect(() => {
        Func
            .get("/auth/user")
            .then(()=>{
                setAllow(true)
            })
            .catch(()=>{
                localStorage.clear()
                setAllow(false)
            })
    }, [])
    return (
        <>
        {allow === undefined ? null :
        allow ?  <Outlet /> : <Navigate to="/user"/>}
        </>
    )    
}

