import { NavLink } from "react-router-dom";
import { Layout, Menu, Col, Row } from "antd";
import { getItem } from "./menu-common";
const { Header, } = Layout;

const items = [
    getItem(
        <NavLink to="/sign-up">SignUp</NavLink>,
        "sign up",
    ),
    getItem(
        <NavLink to="/sign-in">SignIn</NavLink>,
        "sign in",
    ),

]
const UserHeaderContainer = () => {

    return (
        <Header><Row>
            <Col flex="1 1 200px"><a>Main page of our company</a></Col>
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