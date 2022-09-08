import React, { Component } from "react";
import { connect } from "react-redux";
import { EditOutlined, MenuUnfoldOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Layout, Form, Input, Modal } from 'antd';
import { updateOrder } from "../../actions/orders/userInspectionOrder"
import { changeOrderStatus } from "../../actions/orders/userOrder"
import { CANCEL_ORDER_STATUS } from "../../constants/const"
import MainInfoComponent from "./orders/MainInfoComponent";
const { Content } = Layout;
const { TextArea } = Input;

let thisObj;


class InspectionOrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: props.user_order,
            isDisabled: true,
            newAutoUrl: props.user_order.autoUrl,
            newAdditionalInfo: props.user_order.additionalInfo,
            isOrderCancelling: false,
            isOrderCancelled: false
        };
        this.onEditInfo = this.onEditInfo.bind(this);
        this.onSaveEditedInfo = this.onSaveEditedInfo.bind(this);
        this.onCancelOrder = this.onCancelOrder.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
        thisObj = this;
    }

    cancelOrder() {
        const { dispatch } = this.props;
        dispatch(changeOrderStatus(
            this.state.order.creator.id, this.state.order.id, CANCEL_ORDER_STATUS
        )).then((resp) => {
            this.setState({ isOrderCancelling: false })
            this.setState({ order: resp });
            this.render();
        })
    }

    onCancelOrder(e) {
        this.setState({ isOrderCancelling: true })
    }

    onEditInfo(e) {
        this.setState({ isDisabled: false })
        this.render();
        console.log(e)
    }

    onSaveEditedInfo(e) {
        this.setState({ isDisabled: true })
        const { dispatch } = this.props;
        console.log(this.state.newAutoUrl)
        let orderParams = {
            autoUrl: this.state.newAutoUrl,
            additionalInfo: this.state.newAdditionalInfo
        }
        dispatch(updateOrder(this.state.order.creator.id, this.state.order.id, orderParams))
        this.render();
    }

    async componentDidMount() {
        this.setState({ order: this.props.user_order });
        let isOrderCancelled = this.props.user_order.status.name == CANCEL_ORDER_STATUS ? true : false
        console.log(isOrderCancelled)
        this.setState({ isOrderCancelled: isOrderCancelled })
    }

    render() {

        console.log(this.state.order)
        return (
            <>
                <Card style={{
                    width: "800px"
                }} align="start" title="Inspection order"
                    actions={[this.state.isOrderCancelled ? <></> :
                        this.state.isDisabled ?
                            <EditOutlined title="Edit order" visible={false} onClick={(e) => this.onEditInfo(e)} /> :
                            <SaveOutlined title="save order" onClick={(e) => this.onSaveEditedInfo(e)} />
                        ,
                    this.state.isOrderCancelled ? <></> : <CloseOutlined title="Cancel order" onClick={(e) => this.onCancelOrder(e)} />,
                    ]}>
                    <Layout >
                        <Content >
                            <Layout style={{ display: 'flex', padding: 15 }} align="horizontal" >
                                <Content >
                                    {/* <Card title="Main data" size="small">
                                        <p><b>Date of order: </b>{this.state.order.creationDate.substr(0, 10)} </p>
                                        <p><b>Status of order: </b>{this.state.order.status.name}</p>
                                        <p><b>Auto-picker: </b> {this.state.order.autoPicker == null ? "does not set yet" : this.state.order.autoPicker.name}</p>

                                    </Card> */}
                                    <MainInfoComponent creationDate={this.state.order.creationDate}
                                        status={this.state.order.status}
                                        autoPicker={this.state.order.autoPicker} />
                                    <Card title="Order info" size="small">
                                        <Form.Item
                                            label="Car URL"
                                        >
                                            <Input defaultValue={this.state.order.autoUrl} disabled={this.state.isDisabled}
                                                onChange={
                                                    (e) => this.setState({
                                                        ...this.state, newAutoUrl: e.target.value
                                                    })
                                                }
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Additional Info"
                                        >
                                            <TextArea placeholder="info about order" disabled={this.state.isDisabled} defaultValue={this.state.order.additionalInfo}
                                                onChange={
                                                    (e) => this.setState({
                                                        ...this.state, newAdditionalInfo: e.target.value
                                                    })} />
                                        </Form.Item>

                                    </Card>

                                </Content>
                            </Layout>
                        </Content>
                    </Layout>
                </Card>
                <Modal title="Really??" visible={this.state.isOrderCancelling} onOk={() => this.cancelOrder()} onCancel={() => this.setState({ isOrderCancelling: false })}>

                    <h2>Do you really want to cancel this order? </h2><br></br><h4>Auto Picker will stop processing it(</h4>

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

export default connect(mapStateToProps)(InspectionOrderComponent);