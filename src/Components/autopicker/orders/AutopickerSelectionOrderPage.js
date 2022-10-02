import React, { Component } from 'react';
import { Modal, Select, Row, Col, Collapse, Button, } from 'antd';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { changeOrderStatus } from "../../../actions/orders/userOrder"
import Header from "../../common/headers/Header";
import { updateOrder, getOrderById } from "../../../actions/orders/userSelectionOrder";
import { Content } from 'antd/lib/layout/layout';
import { ORDER_STATUSES } from '../../../constants/const';
import SelectionReportComponent from '../../report/SelectionReportComponent';
import { START_REPORT_PROCESS } from '../../../constants/colors';
import SelectionOrderDescription from '../../order/SelectionOrderDescription';

const { Panel } = Collapse;
const { Option } = Select;
let thisObj;

class WithNavigate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      order: null,
      isLoading: true,
      isDisabled: true,
      isOrderCancelling: false,
    }
    this.onEditInfo = this.onEditInfo.bind(this);
    this.onSaveEditedInfo = this.onSaveEditedInfo.bind(this);
    this.createOptionArr = this.createOptionArr.bind(this);
    this.getArrByNames = this.getArrByNames.bind(this);
    this.onCancelOrder = this.onCancelOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.createArrWithName = this.createArrWithName.bind(this);
    thisObj = this;
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getOrderById(localStorage.getItem("userId"), window.location.href.split("/").pop())).then((data) => {
      thisObj.setState({ order: data, isLoading: false })
    }
    )
  }

  createArrWithName(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      let obj = {
        name: arr[i]
      }
      newArr.push(obj)
    }
    return newArr;
  }

  onCancelOrder(e) {
    this.setState({ isOrderCancelling: true })
  }

  getArrByNames(inputArr) {
    let arr = [];
    Object.values(inputArr).forEach(function (entry) {
      arr.push(entry.name)
    })
    return arr;
  }

  cancelOrder() {
    console.log("Order changed")
    const { dispatch } = this.props;
    dispatch(changeOrderStatus(
      this.state.order.creator.id, this.state.order.id, ORDER_STATUSES.CANCELED
    )).then(() => {
      this.props.navigate("../user-orders", { replace: true });
    })
  }

  createOptionArr(arr) {
    const children = [];

    for (let i = 0; i < arr.length; i++) {
      children.push(<Option key={arr[i]}>{arr[i]}</Option>);
    }
    return children
  }

  onEditInfo(e) {
    this.setState({ isDisabled: false })
    this.render();
    console.log(e)
  }

  onSaveEditedInfo(e) {
    this.setState({ isDisabled: true })
    const { dispatch } = this.props;

    dispatch(updateOrder(this.state.order.creator.id,
      this.state.order.id, this.state.order))
      .this((resp) => {
        this.setState({ order: resp })
      })
    console.log(this.state.newTransmissions)
    this.render();
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <><Header />
        <Content><Row>
          <Col flex="0 1"
            style={{
              marginLeft: "60px",
              marginRight: "60px",
              display: 'vertical',
            }}>
            <Button shape="circle" size={"large"}
              onClick={() => { this.props.navigate(-1) }}
            >
              <LeftOutlined />
            </Button>
          </Col>
          <Col flex="3 6 "
            style={{
              marginLeft: "60px",
              marginRight: "60px",
              display: 'vertical',
            }}>
            <Row justify="end">
              <Button type="primary" hidden={this.state.order.status.name == ORDER_STATUSES.CANCELED || this.state.order.status.name == ORDER_STATUSES.CLOSED}
                shape="round" size={"large"} style={{ background: START_REPORT_PROCESS, borderColor: START_REPORT_PROCESS }}
                onClick={(e) => this.onCancelOrder(e)}>Start process</Button>
            </Row>
          </Col>
        </Row>
          <Collapse defaultActiveKey={["1"]}
            style={{
              margin: "15px",
              marginLeft: "60px",
              marginRight: "60px",
              display: 'vertical',
            }}>
            <Panel header="Order information" key="1" ><SelectionOrderDescription order={this.state.order} /></Panel>

            <Panel header="Responce information" key="4">

              <SelectionReportComponent orderId={this.state.order.id}
                report={this.state.order.report}></SelectionReportComponent>
            </Panel>
          </Collapse>

        </Content>
        <Modal title="Really??" visible={this.state.isOrderCancelling} onOk={() => {
          this.cancelOrder()
        }}
          onCancel={() => this.setState({ isOrderCancelling: false })}>
          <h2>Do you really want to cancel this order? </h2><br></br>
          <h4>Auto Picker will stop processing it(</h4>
        </Modal>
      </>
    );
  }
}

function AutopickerSelectionOrderPage(props) {
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
    message
  };
}

export default connect(mapStateToProps)(AutopickerSelectionOrderPage);
