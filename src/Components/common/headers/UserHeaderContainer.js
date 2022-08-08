//import { Space,Header } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { Layout, Space } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/auth";
const { Header, Footer, Content } = Layout;
const UserHeaderContainer = () => {
    const dispatch = useDispatch();
    console.log("UserHeaderContainer");
    const history = useNavigate();
    //
    return (
        
            <Header align="center">
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/user-orders">My orders</NavLink>
                <NavLink to="/logout" onClick={(event) => {
                    dispatch(logout());
                    event.preventDefault();
                    //let history = useNavigate();
                    history("/sign-in", { replace: true });

                }}>LogOut</NavLink>
            </Header>
        );
    //
}

export default UserHeaderContainer;