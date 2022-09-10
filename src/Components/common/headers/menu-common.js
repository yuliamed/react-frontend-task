import { UserOutlined, LoginOutlined,EditOutlined, } from '@ant-design/icons';
import LogOutLink from "../LogOutLink"
import { NavLink } from "react-router-dom";

export function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export const profileMenu = [
    getItem(
        "Your profile",
        "profile",
        <UserOutlined />, [
        getItem(
            <NavLink to="/profile">Profile</NavLink>,
            "profile info",
            <EditOutlined />
        ),
        getItem(
            <LogOutLink />,
            "log out",
            <LoginOutlined />
        )
    ]
    )
]