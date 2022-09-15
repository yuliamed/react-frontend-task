import React, { Component } from "react";
import { connect } from "react-redux";
import jwt from 'jwt-decode'
import { Button, Space, Segmented, Empty } from "antd";
import { ORDER_PAGES, ORDER_STATUSES } from "../../../constants/const";
import Header from "../../common/headers/Header";
import '../modal.css';
import { findUserOrders } from "../../../actions/orders/userOrder";
import InspectionOrderComponent from "./inspection/InspectionOrderComponent"
import SelectionOrderComponent from "./selection/SelectionOrderComponent"

let thisObj;

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
      typeOfNewOrder: null,
      visibleOrders: [],
    };
    this.onChangeOrderFilter = this.onChangeOrderFilter.bind(this);
    this.getOrdersComponents = this.getOrdersComponents.bind(this);
    thisObj = this;
  }

  onChangeOrderFilter(value) {
    console.log(value)
    let filtered;
    switch (value) {
      case ORDER_PAGES.ACTUAL_ORDERS: {
        filtered = this.state.orders.filter((value) => {
          if (value.status.name == ORDER_STATUSES.CREATED || value.status.name == ORDER_STATUSES.IN_PROCESS)
            return value;
        });
        break;
      }
      case ORDER_PAGES.CANCELED: {
        filtered = this.state.orders.filter((value) => {
          if (value.status.name == ORDER_STATUSES.CANCELED)
            return value;
        });
        break;
      }
      case ORDER_PAGES.CLOSED: {
        filtered = this.state.orders.filter((value) => {
          if (value.status.name == ORDER_STATUSES.CLOSED)
            return value;
        });
        break;
      }
      default: console.log("default")
    }
    this.setState({ visibleOrders: filtered });
    //this.render();
  }

  getOrdersComponents() {
    let orders = <Empty description="You haven`t got any orders(" />
    if (this.state.visibleOrders.length != 0) {
      orders = <Space direction="vertical" wrap>
        {
          this.state.visibleOrders.map(
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
    return orders;
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(findUserOrders(this.state.userId)).then((data) => {
      thisObj.setState({ orders: data, isLoading: false })
      let visibleOrders = data.filter((value) => {
        if (value.status.name == ORDER_STATUSES.CREATED || value.status.name == ORDER_STATUSES.IN_PROCESS)
          return value;
      })
      thisObj.setState({ visibleOrders: visibleOrders })
    }
    )
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }


    //let orders = this.getOrdersComponents();
    let orders = <Button>HEY</Button>
    if (this.state.orders.length == 0) orders = <h2>You haven`t got any orders(</h2>
    else {
      orders = <Space direction="vertical" wrap>
        {
          this.state.visibleOrders.map(
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
        <Segmented options={[ORDER_PAGES.ACTUAL_ORDERS, ORDER_PAGES.CANCELED, ORDER_PAGES.CLOSED]}
          style={
            {
              margin: "15px",
              padding: "5px"
            }
          }
          onChange={(value) => this.onChangeOrderFilter(value)} />
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>

          {this.getOrdersComponents()}
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