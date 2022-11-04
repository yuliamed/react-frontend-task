import React, { Component } from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Descriptions, Collapse, Divider } from 'antd';
import { CANCEL_ORDER_STATUS } from "../../../../constants/const"
import MainInfoComponent from "../MainInfoComponent";
import OrderComponent from "../OrderComponent";
const { Panel } = Collapse;
let thisObj;


class WithNavigate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: props.user_order,
    };
    this.onMoreInfo = this.onMoreInfo.bind(this);
    thisObj = this;
  }

  async componentDidMount() {
    this.setState({ order: this.props.user_order });
    let isOrderCancelled = this.props.user_order.status.name == CANCEL_ORDER_STATUS ? true : false
    console.log(isOrderCancelled)
    this.setState({ isOrderCancelled: isOrderCancelled })
  }

  onMoreInfo() {
    console.log("More info")
    this.props.navigate("../users/" + this.state.order.creator.id + "/inspection-order/" + this.state.order.id, { push: true });
  }

  render() {
    let card = <> <MainInfoComponent creationDate={this.state.order.creationDate}
      status={this.state.order.status}
      autoPicker={this.state.order.autoPicker} />
      <Collapse>
        <Panel header="Информация о заказе" key="1">
          <Descriptions contentStyle={{ "font-weight": 'bold' }}>
            <Descriptions.Item
              label="Ссылка на авто"
              style={{
                "font-weight": 'bold'
              }}
            >
              <a>{this.state.order.autoUrl}</a>

            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left" orientationMargin="0">
            Дополнительная информация
          </Divider>
          <Descriptions>
            <Descriptions.Item
            >
              {this.state.order.additionalInfo == null || this.state.order.additionalInfo == "" ? "Информации нет" : this.state.order.additionalInfo}
            </Descriptions.Item>
          </Descriptions>

        </Panel>
      </Collapse>
    </>
    return (
      <>
        <OrderComponent innerCard={card} orderId={this.state.order.id} type="inspection" onMoreInfo={this.onMoreInfo}></OrderComponent>
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

function InspectionOrderComponent(props) {
  let navigate = useNavigate();
  return <WithNavigate {...props} navigate={navigate} />
}

export default connect(mapStateToProps)(InspectionOrderComponent);