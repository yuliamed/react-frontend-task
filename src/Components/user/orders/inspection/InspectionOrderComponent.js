import React, { Component } from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Descriptions, Collapse } from 'antd';
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
    this.props.navigate("../inspection-order/" + this.state.order.id, { push: true });
  }

  render() {
    let card = <> <MainInfoComponent creationDate={this.state.order.creationDate}
      status={this.state.order.status}
      autoPicker={this.state.order.autoPicker} />
      <Collapse>
        <Panel header="Order info" key="1">
          <Descriptions contentStyle={{ "font-weight": 'bold' }}>
            <Descriptions.Item
              label="Car URL"
              style={{
                "font-weight": 'bold'
              }}
            >
              <a>{this.state.order.autoUrl}</a>

            </Descriptions.Item>
          </Descriptions>
          <Descriptions contentStyle={{ "font-weight": 'bold' }}>
            <Descriptions.Item
              label="Additional Info"
            >
              {this.state.order.additionalInfo}
            </Descriptions.Item>
          </Descriptions>

        </Panel>
      </Collapse>
    </>
    return (
      <>
        <OrderComponent innerCard={card} type="inspection" onMoreInfo={this.onMoreInfo}></OrderComponent>
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