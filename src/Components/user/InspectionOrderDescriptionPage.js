import React, { Component } from 'react';
import { Modal, Divider, Form, Input, Select, Row, Col, Collapse, InputNumber, Button, Space, } from 'antd';
import { getOrderById } from '../../actions/orders/userInspectionOrder';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { EditOutlined, CloseSquareOutlined, SaveOutlined, LeftOutlined } from '@ant-design/icons';
import { changeOrderStatus } from "../../actions/orders/userOrder"
import Header from "../common/headers/Header";
import MainInfoComponent from './orders/MainInfoComponent'
import { updateOrder } from "../../actions/orders/userInspectionOrder";
import { Content } from 'antd/lib/layout/layout';
import { ORDER_STATUSES } from '../../constants/const';
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
                 onClick={()=>{this.props.navigate(-1) }}
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
                <Button type="primary" danger shape="round" size={"large"}
                  onClick={(e) => this.onCancelOrder(e)}><CloseSquareOutlined />Cancel</Button>
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
            <Panel header="Order information" key="1" >

              <Divider orientation="left">Main information</Divider>
              <MainInfoComponent creationDate={this.state.order.creationDate}
                status={this.state.order.status}
                autoPicker={this.state.order.autoPicker} />
              <Divider orientation="left">Characteristic</Divider>
              <Row align='end'>
                <Col >
                  {this.state.isDisabled ?
                    <Button type="primary" shape="round" onClick={() => { this.onEditInfo() }} ><EditOutlined size={"large"} /> Edit</Button>
                    : <Button type="primary" shape="round" onClick={() => { this.onSaveEditedInfo() }} ><SaveOutlined size={"large"} /> Save</Button>}

                </Col>
              </Row>
              <br />
              <Form>
                <Form.Item
                  label="Car URL"
                  name="url"
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
                  name="additional info"
                  label="Additional Info"
                  rules={[
                    { type: 'string', max: 512 }
                  ]}
                >
                  <TextArea
                    allowClear
                    disabled={this.state.isDisabled}
                    value={this.state.order.additionalInfo}
                    placeholder="info about order"
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
              </Form>
            </Panel>
            <Panel header="Auto-picker information" key="3">
              <p>Auto-picker info</p>
            </Panel>
            <Panel header="Responce information" key="4">
              <p>info info info</p>
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
