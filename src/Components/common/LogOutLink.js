import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import { NavLink, useNavigate } from "react-router-dom";
const LogOutLink = () => {

    const dispatch = useDispatch();
    console.log("UserHeaderContainer");
    const history = useNavigate();
    return (
        <NavLink to="/logout" onClick={(event) => {
            dispatch(logout());
            event.preventDefault();
            //let history = useNavigate();
            history("/sign-in", { replace: true });

        }}>LogOut</NavLink>
    );

}

export default LogOutLink;
