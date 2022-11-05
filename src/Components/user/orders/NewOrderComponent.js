import React, { Component } from 'react';
import Header from "../../common/headers/Header";
import { Button, Row, Col, Space, Avatar, Image } from "antd";
import SelectionOrderCreatingComponent from "./selection/SelectionOrderCreatingComponent";
import InspectionOrderCreatingComponent from "./inspection/InspectionOrderCreatingComponent";
class NewOrderComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {

      isNewOrderHidden: true,
      typeOfNewOrder: null,
    }
    this.cancelNewOrder = this.cancelNewOrder.bind(this);
    this.onCreateNewSelectionOrder = this.onCreateNewSelectionOrder.bind(this);
    this.onCreateNewInspectionOrder = this.onCreateNewInspectionOrder.bind(this);
    this.onSaveNewOrder = this.onSaveNewOrder.bind(this);
  }

  cancelNewOrder() {
    this.setState({ isNewOrderHidden: true })
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
      <SelectionOrderCreatingComponent
        user_id={this.state.userId}
        on_cancel={this.cancelNewOrder}
        on_save={this.onSaveNewOrder}>
      </SelectionOrderCreatingComponent>
    return (
      <div>
        <Header />
        <Space >

          <Row style={{
            marginTop: "20px",
            marginBottom: "50px"
          }
          }>
            <Col >
              <Button
                style={{
                  backgroundImage:
                    "url('https://avtopaper.ru/wp-content/uploads/2019/12/p046fyxatx6t9_1qnscd5.jpeg')",
                  height: '50vh',
                  width: "100vh",
                  fontSize: '70px',
                  fontWeight:"bold",
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
                type="primary"
                onClick={(e) => this.onCreateNewInspectionOrder(e)}>
                Осмотр автомобиля
              </Button>
            </Col>
            <Col >

              <Button
                style={{
                  backgroundImage:
                    "url('https://a.d-cd.net/gIAAAgCxfOA-960.jpg')",
                  height: '50vh',
                  width: "100vh",
                  fontSize: '70px',
                  fontWeight:"bold",
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
                type="primary"
                onClick={(e) => this.onCreateNewSelectionOrder(e)}>
                Подбор автомобиля
              </Button>

            </Col>
          </Row>
        </Space>
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
