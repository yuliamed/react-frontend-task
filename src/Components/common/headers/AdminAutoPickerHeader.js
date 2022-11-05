import { NavLink, useNavigate } from "react-router-dom";
import { Layout, Space } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/auth";
const { Header, Footer, Content } = Layout;
const UserHeaderContainer = () => {
    const dispatch = useDispatch();
    console.log("UserHeaderContainer");
    let history = useNavigate();
    //
    return (
        <Layout>
            <Header align="center">
                
                <NavLink to="/profile">Профиль</NavLink>
                <NavLink to="/users">Пользователи</NavLink>
                <NavLink to="/orders">Заказы</NavLink>
                <NavLink to="/logout" onClick={
                    (event) => {
                        dispatch(logout());
                        event.preventDefault();
                        //let history = useNavigate();
                        history("/sign-in", { replace: true });
                    }}>Выйти</NavLink>
            </Header>
        </Layout>);
    //
}

export default UserHeaderContainer;