import React, { Component } from 'react';
import { Modal, Divider, Form, Input, Select, Row, Col, Collapse, Button, Tag } from 'antd';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { EditOutlined, CloseSquareOutlined, SaveOutlined, LeftOutlined } from '@ant-design/icons';
import { changeOrderStatus } from "../../../../actions/orders/userOrder"
import Header from "../../../common/headers/Header";
import MainInfoComponent from '../MainInfoComponent'
import { updateOrder, getOrderById } from "../../../../actions/orders/userInspectionOrder";
import { Content } from 'antd/lib/layout/layout';
import { ORDER_STATUSES } from '../../../../constants/const';
import UserCard from '../../UserCard';
import InspectionReportDescription from '../../report/InspectionReportDescription';
import ModalCancelOrder from '../ModalCancelOrder';
import InspectionOrderDescriptionComponent from '../../../order/InspectionOrderDescriptionComponent';
const { Panel } = Collapse;
const { TextArea } = Input;
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

      this.props.navigate(window.history.go(-1), { replace: true });
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

    dispatch(updateOrder(this.state.order.creator.id, this.state.order.id, this.state.order)).this((resp) => {
      this.setState({ order: resp })
    })
    this.render();
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <><Header />
        <Content>

          <Row>
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
                <Button type="primary" danger shape="round" size={"large"} hidden={this.state.order.status.name != ORDER_STATUSES.CREATED}
                  onClick={(e) => this.onCancelOrder(e)}><CloseSquareOutlined />Отменить</Button>
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
            <Panel header="Информация о заказе" key="1" >

              {this.props.isAdmin ? <><InspectionOrderDescriptionComponent order = {this.state.order}/></> : <>

                <Divider orientation="left">Основная информация</Divider>
                <MainInfoComponent creationDate={this.state.order.creationDate}
                  status={this.state.order.status}
                  autoPicker={this.state.order.autoPicker} />
                <Divider orientation="left">Характеристика</Divider>
                <Row align='end'>
                  <Col >
                    {this.state.isDisabled ?
                      <Button type="primary" shape="round" onClick={() => { this.onEditInfo() }} ><EditOutlined size={"large"} /> Редактировать</Button>
                      : <Button type="primary" shape="round" onClick={() => { this.onSaveEditedInfo() }} ><SaveOutlined size={"large"} /> Сохранить</Button>}

                  </Col>
                </Row>
                <br />
                <Form>
                  <Form.Item
                    label="Ссылка"
                    name="Ссылка"
                    rules={[{ required: true },
                    { type: 'url', warningOnly: true },
                    { type: 'string', min: 6 }
                    ]}

                  >
                    <Input
                      disabled={this.state.isDisabled}
                      defaultValue={this.state.order.autoUrl}
                      onChange={(value) => {
                        this.setState((state) => ({
                          ...state,
                          order: {
                            ...state.order,
                            autoUrl: value
                          }
                        }))
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="Дополнительная информация"
                    label="Дополнительная информация"
                    rules={[
                      { type: 'string', max: 512 }
                    ]}
                  >
                    <TextArea
                      allowClear
                      disabled={this.state.isDisabled}
                      defaultValue={this.state.order.additionalInfo}
                      placeholder="Информация о заказе"
                      onChange={(value) => {
                        console.log("value")
                        this.setState((state) => ({
                          ...state,
                          order: {
                            ...state.order,
                            additionalInfo: value.target.value
                          }
                        }))
                      }}
                    />
                  </Form.Item>
                </Form></>}
            </Panel>
            <Panel header="Информация об автоподборщике" key="3">
              {this.state.order.autoPicker == null ? <Tag color="magenta">Не установлен</Tag> :
                <UserCard user={this.state.order.autoPicker} />}
            </Panel>
            <Panel header="Отчёт" key="4">
              {
                this.state.order.report == null ? <Tag color="magenta">Отчёт не готов </Tag> :
                  <InspectionReportDescription orderId={this.state.order.id} report={this.state.order.report} />
              }
            </Panel>
          </Collapse>
        </Content>
        <ModalCancelOrder isOrderCancelling={this.state.isOrderCancelling}
          cancelOrder={() => this.cancelOrder()}
          onCancelCancelling={() => this.setState({ isOrderCancelling: false })} />
      </>
    );
  }
}

function InspectionOrderDescription(props) {
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

export default connect(mapStateToProps)(InspectionOrderDescription);
