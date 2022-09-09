import { NavLink} from "react-router-dom";
import { Layout, Menu} from "antd";
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import LogOutLink from "../LogOutLink"

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem("User name",
        'sub1',
        <UserOutlined />,
        [
            getItem('Profile',
                null,
                null,
                [getItem('Account',
                    '1'),
                getItem('My orders',
                    '2')],
                'group'),
            getItem('Log out'),
        ]),]

const items2 = [
    getItem(
        <NavLink to="/profile">Profile</NavLink>,
        "profile info",
    ),
    getItem(
        <NavLink to="/user-orders">My orders</NavLink>,
        "user orders",
    ),
    getItem(
        <LogOutLink/>,
        "log out",
        <LoginOutlined />
    )
]

const UserHeaderContainer = () => {
    return (
        <Menu
            mode="horizontal"
            items={items2}>
        </Menu>
    );
}

export default UserHeaderContainer;