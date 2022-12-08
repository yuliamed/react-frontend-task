import React, { Component } from 'react';
import { Divider, Descriptions, Row, Col, Collapse, Button, Modal } from 'antd';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { LeftOutlined, } from '@ant-design/icons';
import Header from "../../common/headers/Header";
import MainInfoComponent from '../../user/orders/MainInfoComponent'
import { updateOrder, getOrderById } from "../../../actions/orders/userInspectionOrder";
import { Content } from 'antd/lib/layout/layout';
import InspectionReportComponent from '../../report/InspectionReportComponent';
import { cleanSelectionReport, getInspectionOrder } from '../../../actions/orders/autopicker/manageOrders';
import { getInspectionReport } from '../../../actions/orders/autopicker/manageInspectionReport';
import { ORDER_STATUSES } from '../../../constants/const';
import { changeOrderStatus } from '../../../actions/orders/userOrder';
const { Panel } = Collapse;
let thisObj;
class WithNavigate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      order: null,
      isLoading: true,
      isDisabled: true,
      isOrderCancelling: false,
      isModalCancelingOrderOpen: false,
      isEdittingAllowed: true,
    }
    this.onEditInfo = this.onEditInfo.bind(this);
    this.onSaveEditedInfo = this.onSaveEditedInfo.bind(this);
    this.onClosingOrderProccess = this.onClosingOrderProccess.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onChangeOrderStatus = this.onChangeOrderStatus.bind(this);
    thisObj = this;
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getOrderById(localStorage.getItem("userId"), window.location.href.split("/").pop())).then((data) => {
      thisObj.setState({ order: data, isLoading: false })
      dispatch(getInspectionOrder(data))
      dispatch(getInspectionReport(data.report))
    }
    )
  }

  onClosingOrderProccess() {
    console.log("closing");
    this.setState({ isModalCancelingOrderOpen: true });
  }

  onChangeOrderStatus(status) {
    const { dispatch } = this.props;
    dispatch(changeOrderStatus(localStorage.getItem("userId"), this.state.order.id, status))
      .then((resp) =>
        this.setState({ order: resp }));
    //this.render();
  }

  handleOk() {
    this.onChangeOrderStatus(ORDER_STATUSES.CLOSED);
    this.setState({ isModalCancelingOrderOpen: false, isEdittingAllowed: false });
    const { dispatch } = this.props;
    dispatch(cleanSelectionReport());
    this.props.navigate(-1)
  };

  handleCancel() {
    this.setState({ isModalCancelingOrderOpen: false });
  };

  onEditInfo(e) {
    this.setState({ isDisabled: false })
    this.render();
    console.log(e)
  }

  onSaveEditedInfo(e) {
    this.setState({ isDisabled: true })
    const { dispatch } = this.props;

    dispatch(updateOrder(this.state.order.creator.id, this.state.order.id, this.state.order)).this((resp) => {
      this.setState({ order: resp })
    })
    this.render();
  }

  render() {
    if (this.state.isLoading) {
      return <p>Загрузка...</p>;
    }

    return (
      <><Header />
        <Content >

          <Row>
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

          <Collapse bordered={false} defaultActiveKey={["1"]}
            style={{

              margin: "15px",
              marginLeft: "10%",
              marginRight: "10%",
              display: 'vertical',
            }}>
            <Panel header="Информация по заказу" key="1"
            >

              <Divider orientation="left">Основная информация</Divider>

              <MainInfoComponent creationDate={this.state.order.creationDate}
                status={this.state.order.status}
                autoPicker={this.state.order.autoPicker} />

              <Divider orientation="left">Характеристика</Divider>

              <Descriptions contentStyle={{ "font-weight": 'bold' }}>
                <Descriptions.Item
                  label="Ссылка на автомобиль"
                ><a>{this.state.order.autoUrl}</a></Descriptions.Item>

              </Descriptions>
              <Descriptions contentStyle={{ "font-weight": 'bold' }}>
                <Descriptions.Item
                  label="Дополнительная информация"
                >{this.state.order.additionalInfo}</Descriptions.Item>
              </Descriptions>

            </Panel>
            <Panel header="Отчёт по заказу" key="4">
              <InspectionReportComponent onCloseProccess={() => this.onClosingOrderProccess()}
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

function AutopickerInspectionOrderPage(props) {
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

export default connect(mapStateToProps)(AutopickerInspectionOrderPage);
