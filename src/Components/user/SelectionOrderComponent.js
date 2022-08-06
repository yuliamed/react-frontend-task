import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { banUser, approveUser, addUserRole } from "../../actions/manageUsers";
import jwt from 'jwt-decode'
import { LoadingOutlined, PlusOutlined, PlusSquareOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
//import { Button, List, Input, Card, Modal, Form, Image, Upload, message, Checkbox, Layout, } from "antd";
import { BASE_USER_PICTURE } from "../../constants/const";
import { EditOutlined, MenuUnfoldOutlined, CloseOutlined } from '@ant-design/icons';
import { Card, Checkbox, Avatar, Layout, Modal, Form, Image } from 'antd';
const { Content } = Layout;
const CheckboxGroup = Checkbox.Group;
let thisObj;
let isEdited = false;
var isHiddenError = true;
const uploadButton = (
    <div>
        {<PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);

class SelectionOrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: props.user_order,
            
        };

        thisObj = this;
    }


    async componentDidMount() {
        this.setState({ order: this.props.user_order });

    }

    render() {

 
        return (

            < 
            >
            <>
            <Card style={{
                width: "800px"
            }} align="start" title="Selection order"
                actions={[
                    <MenuUnfoldOutlined title="More info" />,
                    <EditOutlined title="Edit order" />,
                    <CloseOutlined title="Cansel order" />,
                ]}>
                <Layout >
                    <Content >
                        <Layout style={{ display: 'flex', padding: 15 }} align="horizontal" >
                            <Content >
                                <Card title="Main data" size="small">
                                    <p><b>Date of order: </b>{this.state.order.creationDate.substr(0, 10)} </p>
                                    <p><b>Status of order: </b>{this.state.order.status.name}</p>
                                    <p><b>Auto-picker: </b> {this.state.order.autoPicker == null ? "does not set yet" : this.state.order.autoPicker.name}</p>

                                </Card>
                                <Card title="Order info" size="small">
                                    <p><b>Car URL: </b>{this.state.order.autoUrl} </p>
                                    <p><b>Additional info: </b>{this.state.order.additionalInfo}</p>
                                </Card>


                            </Content>
                        </Layout>
                    </Content>
                </Layout>
            </Card>

        </ >
            </ >
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { account } = state.account;
    const { message } = state.message;
    return {
        user,
        account,
        message
    };


}

export default connect(mapStateToProps)(SelectionOrderComponent);