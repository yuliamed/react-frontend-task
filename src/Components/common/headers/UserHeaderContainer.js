import { NavLink } from "react-router-dom";
import { Layout, Menu, Row, Col } from "antd";
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import LogOutLink from "../LogOutLink"
import { getItem } from "./menu-common";
const { Header, } = Layout;

const logout = [
    getItem(
        <LogOutLink />,
        "log out",
        <LoginOutlined />
    )
]

const items = [
    getItem(
        <NavLink to="/profile">Profile</NavLink>,
        "profile info",
    ),
    getItem(
        <NavLink to="/user-orders">My orders</NavLink>,
        "user orders",
    ),
]

const UserHeaderContainer = () => {
    return (
        <Header><Row>
            <Col flex="1 1 200px">
                <Menu
                    theme="dark"
                    mode="horizontal "
                    items={items}
                >
                </Menu>
            </Col>
            <Col flex="0 1 200px">
                <Row justify="end">
                    <Menu
                        style={{
                            width: "150px"
                        }}
                        theme="dark"
                        mode="horizontal"
                        items={logout}
                    >
                    </Menu>
                </Row>
            </Col>
        </Row>
        </Header>
    );
}

export default UserHeaderContainer;