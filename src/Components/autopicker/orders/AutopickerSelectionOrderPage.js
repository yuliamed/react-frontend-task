import React, { Component } from 'react';
import { Modal, Select, Row, Col, Collapse, Button, Divider, } from 'antd';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { changeOrderStatus } from "../../../actions/orders/userOrder"
import Header from "../../common/headers/Header";
import { updateOrder, getOrderById } from "../../../actions/orders/userSelectionOrder";
import { Content } from 'antd/lib/layout/layout';
import { ORDER_STATUSES } from '../../../constants/const';
import SelectionReportComponent from '../../report/SelectionReportComponent';
import { cleanSelectionReport } from '../../../actions/orders/autopicker/manageOrders';
import SelectionOrderInfoComponent from '../../user/orders/selection/SelectionOrderInfoComponent';
import MainInfoComponent from '../../user/orders/MainInfoComponent';

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
      isModalCancelingOrderOpen: false,
      isEdittingAllowed: true,
    }
    this.onEditInfo = this.onEditInfo.bind(this);
    this.onSaveEditedInfo = this.onSaveEditedInfo.bind(this);
    this.createOptionArr = this.createOptionArr.bind(this);
    this.getArrByNames = this.getArrByNames.bind(this);
    this.onProccessOrder = this.onProccessOrder.bind(this);
    this.createArrWithName = this.createArrWithName.bind(this);
    this.onChangeOrderStatus = this.onChangeOrderStatus.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onClosingOrderProccess = this.onClosingOrderProccess.bind(this);
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

  getArrByNames(inputArr) {
    let arr = [];
    Object.values(inputArr).forEach(function (entry) {
      arr.push(entry.name)
    })
    return arr;
  }

  onProccessOrder() {
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
  }

  onSaveEditedInfo(e) {
    this.setState({ isDisabled: true })
    const { dispatch } = this.props;

    dispatch(updateOrder(this.state.order.creator.id,
      this.state.order.id, this.state.order))
      .this((resp) => {
        this.setState({ order: resp })
      })
    this.render();
  }

  onChangeOrderStatus(status) {
    const { dispatch } = this.props;
    dispatch(changeOrderStatus(localStorage.getItem("userId"), this.state.order.id, status));
    this.render();
  }

  handleOk() {
    this.setState({ isModalCancelingOrderOpen: false, isEdittingAllowed: false });
    this.onChangeOrderStatus(ORDER_STATUSES.CLOSED);
  };

  handleCancel() {
    this.setState({ isModalCancelingOrderOpen: false });
  };

  onClosingOrderProccess() {
    console.log("closing");
    this.setState({ isModalCancelingOrderOpen: true });
  }

  render() {
    if (this.state.isLoading) {
      return <p>Загрузка...</p>;
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
              onClick={() => {
                const { dispatch } = this.props;
                dispatch(cleanSelectionReport());
                this.props.navigate(-1)
              }}
            >
              <LeftOutlined />
            </Button>
          </Col>
        </Row>
          <Collapse defaultActiveKey={["1"]}
            style={{
              margin: "15px",
              marginLeft: "60px",
              marginRight: "60px",
              display: 'vertical',
            }}>
            <Panel header="Информация по заказу" key="1" >
              <Divider orientation="left">Основная информация</Divider>
              <MainInfoComponent creationDate={this.state.order.creationDate}
                status={this.state.order.status}
                autoPicker={this.state.order.autoPicker} />
              <Divider orientation="left">Характеристика</Divider>
              <SelectionOrderInfoComponent order={this.state.order} />
            </Panel>

            <Panel header="Отчёт по заказу" key="2">

              <SelectionReportComponent onCloseProccess={() => this.onClosingOrderProccess()}
                orderId={this.state.order.id}
                report={this.state.order.report}
                isEdittingAllowed={this.state.isEdittingAllowed} />
            </Panel>
          </Collapse>

        </Content>
        <Modal title="Закрытие заказа"
          visible={this.state.isModalCancelingOrderOpen}
          onOk={() => this.handleOk()}
          onCancel={() => this.handleCancel()}>
          <h2>Действительно закрыть заказ?</h2>
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
