import { Navigate, Outlet } from "react-router-dom"

export default () => {
    return !localStorage.getItem("token") ? <Outlet/> : <Navigate to={"/"}/>
}