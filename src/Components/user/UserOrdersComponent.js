import React, { Component } from "react";
import { connect } from "react-redux";
import jwt from 'jwt-decode'
import { PlusOutlined} from '@ant-design/icons';
import { Button, Space } from "antd";
import { BASE_USER_PICTURE } from "../../constants/const";
import ImgCrop from 'antd-img-crop';
import Header from "../common/headers/Header";
import './modal.css';
import { findUserOrders } from "../../actions/orders/userOrder";
import InspectionOrderComponent from "./InspectionOrderComponent"
import SelectionOrderComponent from "./SelectionOrderComponent"
import SelectionOrderCreatingComponent from "./SelectionOrderCreatingComponent";
import InspectionOrderCreatingComponent from "./InspectionOrderCreatingComponent";

let thisObj;
const uploadButton = (
    <div>
        {<PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);

class UserOrdersComponent extends Component {
    constructor(props) {
        super(props);
        let decodedToken = jwt(props.user.token);
        this.state = {
            isLoading: true,
            userId: decodedToken.id,
            roles: decodedToken.role,
            orders: [],
            isNewOrderHidden: true,
            typeOfNewOrder: null
        };

        this.onCreateNewSelectionOrder = this.onCreateNewSelectionOrder.bind(this);
        this.onCreateNewInspectionOrder = this.onCreateNewInspectionOrder.bind(this);
        this.cancelNewOrder = this.cancelNewOrder.bind(this)
        this.onSaveNewOrder = this.onSaveNewOrder.bind(this);
        thisObj = this;
    }

    cancelNewOrder() {
        console.log("ЗАКРОЙ МЕНЯ ПОЖАЛУЙСТА И ЛОЖИСЬ СПАЦ")
        this.setState({ isNewOrderHidden: true })
    }

    onSaveNewOrder() {
        console.log("New order created!")
        this.setState({ isNewOrderHidden: true })
        this.componentDidMount();
        this.render();
    }

    onCreateNewSelectionOrder(e) {
        this.setState({ isNewOrderHidden: false })
        this.setState({ typeOfNewOrder: "selection" })
        console.log("Selection order")
    }


    onCreateNewInspectionOrder(e) {
        this.setState({ isNewOrderHidden: false })
        this.setState({ typeOfNewOrder: "inspection" })
        console.log("Inspection order")
    }


    async componentDidMount() {
        const { dispatch } = this.props;
        dispatch(findUserOrders(this.state.userId)).then((data) => {
            thisObj.setState({ orders: data, isLoading: false })
        }
        )
    }


    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }
        console.log(this.state.orders)

        let newOrder = null;
        this.state.typeOfNewOrder == "inspection" ?
            newOrder = <InspectionOrderCreatingComponent
                user_id={this.state.userId}
                on_cancel={this.cancelNewOrder}
                on_save={this.onSaveNewOrder}>
            </InspectionOrderCreatingComponent>
            : newOrder =
            <SelectionOrderCreatingComponent>
            </SelectionOrderCreatingComponent>
        let orders = <Button>HEY</Button>
        if (this.state.orders.length == 0) orders = <h2>You haven`t got any orders(</h2>
        else {
            orders = <Space direction="vertical" wrap>
                {this.state.orders.map(
                    (u, index,) => {
                        if (u.autoUrl != null)
                            return <InspectionOrderComponent key={index}
                                user_order={u}
                            >Inspection</InspectionOrderComponent>
                        else
                            return <SelectionOrderComponent key={index}
                                user_order={u}>Selection</SelectionOrderComponent>
                    }
                )}
            </Space>
        }
        return (

            <div className="site-card-border-less-wrapper"
            >
                <Header />
                {/* <Row style={{
                    marginTop: "20px",
                    marginBottom: "50px"
                }
                }>
                    <Col span={12}>
                        <Button
                            type="primary"
                            onClick={(e) => this.onCreateNewInspectionOrder(e)}>
                            Create inspection order
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            type="primary"
                            onClick={(e) => this.onCreateNewSelectionOrder(e)}>
                            Create selection order
                        </Button>
                    </Col>
                </Row> */}
                <Space hidden={this.state.isNewOrderHidden} direction="vertical" size="large" style={{ display: 'flex' }}>

                    <Space direction="vertical" wrap >
                        <Space direction="vertical" wrap>
                            {newOrder}

                        </Space>

                    </Space>

                </Space>

                <Space direction="vertical" size="large" style={{ display: 'flex' }}>

                    {orders}

                </Space>

            </div >
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

export default connect(mapStateToProps)(UserOrdersComponent);