import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import UserService from "../../services/userService";
import jwt from 'jwt-decode'
import { LoadingOutlined, PlusOutlined, PlusSquareOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Card, Modal, Form, Image, Upload, message } from "antd";
import { BASE_USER_PICTURE } from "../../constants/const";
import ImgCrop from 'antd-img-crop';
import Header from "../common/headers/Header";

let thisObj;
let isEdited = false;

const uploadButton = (
    <div>
        {<PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);

class OrdersComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem("id"),
            roles: localStorage.getItem("roles"),
            user: {
                name: "",
                surname: "",
                email: "",
                imageUrl: "",
            },
            louding: false,
        };
    }


    render() {

        return (
            <div><Header />
                <h1>Auto-picker orders will be here soon...</h1></div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(OrdersComponent);