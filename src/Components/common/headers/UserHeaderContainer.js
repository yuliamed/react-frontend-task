import { NavLink } from "react-router-dom";
import { Layout, Menu, Row, Col } from "antd";
import { getItem,  } from "./menu-common";
const { Header, profileMenu} = Layout;

const items = [ 
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