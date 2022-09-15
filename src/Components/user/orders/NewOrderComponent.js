import React, { Component } from 'react';
import Header from "../../common/headers/Header";
import { Button, Row, Col, Space } from "antd";
import SelectionOrderCreatingComponent from "./selection/SelectionOrderCreatingComponent";
import InspectionOrderCreatingComponent from "./inspection/InspectionOrderCreatingComponent";
class NewOrderComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {

      isNewOrderHidden: true,
      typeOfNewOrder: null,
    }
    this.onCreateNewSelectionOrder = this.onCreateNewSelectionOrder.bind(this);
    this.onCreateNewInspectionOrder = this.onCreateNewInspectionOrder.bind(this);
    this.onSaveNewOrder = this.onSaveNewOrder.bind(this);
  }


  onSaveNewOrder() {
    console.log("New order created!")
    this.setState({ isNewOrderHidden: true })
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

  render() {

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
    return (
      <div>
        <Header />
        <Row style={{
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
        </Row>
        <Space hidden={this.state.isNewOrderHidden} direction="vertical" size="large" style={{ display: 'flex' }}>

          <Space direction="vertical" wrap >
            <Space direction="vertical" wrap>
              {newOrder}
            </Space>
          </Space>
        </Space>

      </div>
    );
  }
}

export default NewOrderComponent;
