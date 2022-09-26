import { NavLink } from "react-router-dom";
import { Layout, Menu, Row, Col } from "antd";
import { getItem, profileMenu } from "./menu-common";
const { Header, } = Layout;

const UserHeaderContainer = () => {
    let id = localStorage.getItem("userId");
    const items = [
        getItem(
            <NavLink to={'/users/' + id + '/orders'}>My orders</NavLink>,
            "user orders",
        ),
        getItem(
            <NavLink to={'/users/' + id + '/new-order'}>New orders</NavLink>,
            "new order",
        ),
    ]

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
                        items={profileMenu}
                    >
                    </Menu>
                </Row>
            </Col>
        </Row>
        </Header>
    );
}

export default UserHeaderContainer;