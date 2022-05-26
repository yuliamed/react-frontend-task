//import { Space,Header } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { Layout, Space } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/auth";
const { Header, Footer, Content } = Layout;
const UserHeaderContainer = () => {
    const dispatch = useDispatch();
    console.log("UserHeaderContainer");
    //
    return (
        <Space>
            <Header>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                {/* <NavLink to="/sign-in">SignIn</NavLink>
        <NavLink to="/sign-up">SignUp</NavLink> */}
                <NavLink to="/logout" onClick={(event) => { 
                    dispatch(logout());
                    let history = useNavigate;
                    history.replace("/sign-in");
                    event.preventDefault();
                }}>LogOut</NavLink>
            </Header>
        </Space>);
    //
}

export default UserHeaderContainer;