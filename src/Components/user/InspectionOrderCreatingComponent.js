import React, { Component } from "react";
import { connect } from "react-redux";
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Layout, Form, Input, Modal, Select, Popover } from 'antd';
import { createOrder } from "../../actions/orders/userInspectionOrder"
import { findAllAutoPickers } from "../../actions/manageUsers";
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;
let thisObj;

const content = (
    <div>
        <p>Input values for saving</p>

    </div>
);
class InspectionOrderCreatingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: props.user_id,
            isDisabled: true,
            autoUrl: "",
            additionalInfo: "",
            autoPickerId: null,
            isOrderCancelling: false,
            isOrderCancelled: false,
            autoPickers: [],
            isSavingAllowed: false
        };
        this.onSaveNewOrder = this.onSaveNewOrder.bind(this);
        this.onCancelOrder = this.onCancelOrder.bind(this);
        this.cancelOrder = props.on_cancel;
        this.onSave = props.on_save;
        this.createOptionArrForAutoPickers = this.createOptionArrForAutoPickers.bind(this);
        thisObj = this;
    }


    onCancelOrder(e) {
        this.setState({ isOrderCancelling: true })
    }

    onSaveNewOrder(e) {
        // if (!this.state.isSavingAllowed) re

        const { dispatch } = this.props;

        let orderParams = {
            autoUrl: this.state.autoUrl,
            additionalInfo: this.state.additionalInfo,
            autoPickerId: this.state.autoPickerId
        }
        dispatch(createOrder(this.state.userID, orderParams)).then((resp) => {
            alert("Order created!");
        })
        this.onSave();
        this.render();
    }

    async componentDidMount() {
        const { dispatch } = this.props;
        thisObj.setState({ userID: this.props.user_id })
        dispatch(findAllAutoPickers()).then((resp) => {
            console.log(resp)
            thisObj.setState({ autoPickers: resp.objects })
        })
    }

    createOptionArrForAutoPickers(arr) {
        const children = [];

        for (let i = 0; i < arr.length; i++) {
            children.push(<Option key={arr[i].id}>{arr[i].name + " " + arr[i].surname}</Option>);
        }
        return children
    }

    render() {
        return (
            <>
                <Card style={{
                    width: "800px"
                }} align="start" title="Inspection order"
                    actions={[
                        !this.state.isSavingAllowed ?
                            <Popover content={content} title="Title" trigger="hover">
                                <SaveOutlined title="save order"
                                />
                            </Popover> :
                            <SaveOutlined title="save order"
                                onClick={(e) => this.onSaveNewOrder(e)}
                                disabled={true} />
                        ,
                        <CloseOutlined title="Cancel order" onClick={(e) => this.onCancelOrder(e)} />,
                    ]}>
                    <Layout >
                        <Content >
                            <Layout style={{ display: 'flex', padding: 15 }} align="horizontal" >
                                <Content >

                                    <Card title="Order info" size="small"
                                    >
                                        <Form>
                                            <Form.Item
                                                label="Car URL"
                                                name="url"
                                                rules={[{ required: true },
                                                { type: 'url', warningOnly: true },
                                                { type: 'string', min: 6 }
                                                ]}

                                            >
                                                <Input

                                                    onChange={
                                                        (e) => {
                                                            this.setState({
                                                                ...this.state, autoUrl: e.target.value
                                                            })
                                                            this.setState({ isSavingAllowed: true })
                                                        }
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name="additional info"
                                                label="Additional Info"
                                                rules={[
                                                    { type: 'string', max: 512 }
                                                ]}
                                            >
                                                <TextArea placeholder="info about order"
                                                    onChange={
                                                        (e) => this.setState({
                                                            ...this.state, additionalInfo: e.target.value
                                                        })} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Auto-picker"

                                            >
                                                <Select
                                                    allowClear
                                                    placeholder="Please select"
                                                    onChange={(value) => {
                                                        return this.setState(
                                                            { autoPickerId: value }
                                                        )
                                                    }}
                                                >
                                                    {this.createOptionArrForAutoPickers(this.state.autoPickers)}
                                                </Select>
                                            </Form.Item>
                                        </Form>
                                    </Card>
                                </Content>
                            </Layout>
                        </Content>
                    </Layout>
                </Card >
                <Modal title="Are you sure??" visible={this.state.isOrderCancelling}
                    onOk={() => {
                        this.cancelOrder();
                        this.setState({ isOrderCancelling: false })
                    }}
                    onCancel={() => this.setState({ isOrderCancelling: false })}>
                    <h2>Do you really want to save this order? </h2>
                </Modal>
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

export default connect(mapStateToProps)(InspectionOrderCreatingComponent);