//import { Space,Header } from "antd";
import { NavLink } from "react-router-dom";
import { Layout, Space } from "antd";
const {Header, Footer, Content } = Layout;
const UserHeaderContainer = () => {
    <Space>
        <Header>
            <NavLink to="/home">Home</NavLink>
            {/* <NavLink to="/profile">Profile</NavLink> */}
            <NavLink to="/sign-in">SignIn</NavLink>
            <NavLink to="/sign-up">SignUp</NavLink>
            {/* <NavLink to="/logout" onClick={(event) => { event.preventDefault(); dispatch(logout()) }}>LogOut</NavLink> */}
        </Header>
    </Space>
}

export default UserHeaderContainer;