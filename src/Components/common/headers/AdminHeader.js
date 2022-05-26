//import { Space,Header } from "antd";
import { NavLink } from "react-router-dom";
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
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/logout" onClick={
                    (event) => {
                        let history = useNavigate;
                        history.replace("/sign-in");
                        event.preventDefault();
                        dispatch(logout())
                    }}>LogOut</NavLink>
            </Header>
        </Space>);
    //
}

export default UserHeaderContainer;