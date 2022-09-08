import { NavLink } from "react-router-dom";
import { Layout, Row, Col, } from "antd";

const { Header, } = Layout;
const UserHeaderContainer = () => {

    return (<Layout>
        <Header>
            <Row>
                <Col flex="1 1 200px"><NavLink to="/sign-up">SignUp</NavLink></Col>
                <Col flex="0 1 300px">
                    <Row justify="end">
                        <Col span={8}
                        >
                            <NavLink to="/sign-in">SignIn</NavLink>
                        </Col>
                        <Col
                        >
                            <NavLink to="/sign-up">SignUp</NavLink>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Header></Layout>
    )
}

export default UserHeaderContainer;