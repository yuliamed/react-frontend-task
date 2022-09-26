import React, { Component } from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Select, Row, Col, Collapse, InputNumber, } from 'antd';
import { CANCEL_ORDER_STATUS } from "../../../../constants/const"
import { BodyTypeArr, BrandNameArr, TransmissionArr, EngineTypeArr, DriveTypeArr, CurrencyArr, } from "../../../../constants/enums"
import MainInfoComponent from "../MainInfoComponent";
import OrderComponent from "../OrderComponent";
import SelectionOrderInfoComponent from "./SelectionOrderInfoComponent";
const { TextArea } = Input;
const { Panel } = Collapse;
let thisObj;

class WithNavigate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: props.user_order,
      isDisabled: true,
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
    this.props.navigate("../users/" + this.state.order.creator.id + "/selection-order/" + this.state.order.id, { push: true });
  }

  render() {
    console.log("selection order " + this.state.order.id);
    let card = <>
      <MainInfoComponent creationDate={this.state.order.creationDate}
        status={this.state.order.status}
        autoPicker={this.state.order.autoPicker} />
      <Collapse>
        <Panel header="Order info" key="1">
          <Card size="small">
            <SelectionOrderInfoComponent order={this.state.order}></SelectionOrderInfoComponent>
          </Card>
        </Panel>
      </Collapse>
    </>
    return (
      <>
        <OrderComponent props={this.props} innerCard={card}
          type="selection"
          orderId={this.state.order.id}
          onMoreInfo={this.onMoreInfo}></OrderComponent>
      </ >
    );
  }

}

function SelectionOrderComponent(props) {
  let navigate = useNavigate();
  return <WithNavigate {...props} navigate={navigate} />
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { account } = state.account;
  const { message } = state.message;
  return {
    user,
    account,
    message,
  };


}

export default connect(mapStateToProps)(SelectionOrderComponent);