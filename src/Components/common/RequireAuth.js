import { useLocation, Navigate } from "react-router-dom";

const RequireAuth=()=>{
    const location = useLocation();
    const auth = false;

    const user = localStorage.getItem("user");

    if(!user){
        return <Navigate to="/sign-in"></Navigate>
    }
}