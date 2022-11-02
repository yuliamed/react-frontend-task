import { UserOutlined, LoginOutlined, EditOutlined, } from '@ant-design/icons';
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
        "Мой профиль",
        "Профиль",
        <UserOutlined />, [
        getItem(
            <NavLink to={"/users/" + localStorage.getItem("userId")}>Профиль</NavLink>,
            "profile info",
            <EditOutlined />
        ),
        getItem(
            <LogOutLink />,
            "Выход",
            <LoginOutlined />
        )
    ]
    )
]