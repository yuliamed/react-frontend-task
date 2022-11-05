import { NavLink } from "react-router-dom";
import { Layout, Menu, Col, Row } from "antd";
import { getItem } from "./menu-common";
const { Header, } = Layout;

const items = [
    getItem(
        <NavLink to="/sign-up">Зарегистрироваться</NavLink>,
        "sign up",
    ),
    getItem(
        <NavLink to="/sign-in">Войти</NavLink>,
        "sign in",
    ),

]
const UserHeaderContainer = () => {

    return (
        <Header><Row>
            <Col flex="1 1 200px"><a>Главная страница</a></Col>
            <Col flex="0 1 300px">
                <Row justify="end">
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={items}
                    >
                    </Menu>
                </Row>
            </Col>
        </Row>
        </Header>
    )
}

export default UserHeaderContainer;