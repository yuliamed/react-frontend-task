import React, { Component } from 'react';
import { BodyTypeArr, BrandNameArr, TransmissionArr, EngineTypeArr, DriveTypeArr, CurrencyArr, } from "../../../../constants/enums"
import { Modal, Divider, Form, Input, Select, Row, Col, Collapse, InputNumber, Button, Space, } from 'antd';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { EditOutlined, CloseSquareOutlined, SaveOutlined, LeftOutlined } from '@ant-design/icons';
import { changeOrderStatus } from "../../../../actions/orders/userOrder"
import Header from "../../../common/headers/Header";
import MainInfoComponent from '../MainInfoComponent'
import { updateOrder, getOrderById } from "../../../../actions/orders/userSelectionOrder";
import { Content } from 'antd/lib/layout/layout';
import { ORDER_STATUSES } from '../../../../constants/const';
import SelectionReportComponent from '../../../report/SelectionReportComponent';
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
              <Button type="primary" hidden={this.state.order.status.name == ORDER_STATUSES.CANCELED || this.state.order.status.name == ORDER_STATUSES.CLOSED} danger shape="round" size={"large"}
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
                    <Button type="primary" shape="round"
                      onClick={() => { this.onEditInfo() }} >
                      <EditOutlined size={"large"} />
                      Edit
                    </Button>
                    : <Button type="primary" shape="round"
                      onClick={() => { this.onSaveEditedInfo() }} >
                      <SaveOutlined size={"large"} />
                      Save
                    </Button>}
                </Col>
              </Row>
              <Row style={{ marginBottom: "10px" }}>
                <Col >
                  <p>Min year:</p>
                </Col>
                <Col span={10}>
                  <InputNumber
                    disabled={this.state.isDisabled}
                    min={1900}
                    max={2022}
                    style={{ margin: '0 16px' }}
                    value={this.state.order.minYear}

                    onChange={(value) => {
                      this.setState((state) => ({
                        ...state,
                        order: {
                          ...state.order,
                          minYear: value
                        }
                      }))
                    }}
                  />
                </Col>
                <p>Mileage: </p>
                <Col span={4}>
                  <InputNumber
                    min={100}
                    disabled={this.state.isDisabled}
                    style={{ margin: '0 16px' }}
                    value={this.state.order.mileage}
                    onChange={(value) => {
                      this.setState((state) => ({
                        ...state,
                        order: {
                          ...state.order,
                          mileage: value
                        }
                      }))
                    }}
                  />
                </Col>
                <Col span={4}>
                  <p>km</p>
                </Col>

              </Row>
              <Row >
                <Col>
                  <p>Car price:</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: "20px" }}>
                <p>from: </p>
                <Col span={4}>
                  <InputNumber
                    disabled={this.state.isDisabled}
                    style={{ margin: '0 16px' }}
                    value={this.state.order.rangeFrom}
                    onChange={(value) => {
                      this.setState((state) => ({
                        ...state,
                        order: {
                          ...state.order,
                          rangeFrom: value
                        }
                      }))
                    }}
                  />
                </Col>
                <p>to: </p>
                <Col span={4}>
                  <InputNumber
                    disabled={this.state.isDisabled}
                    style={{ margin: '0 16px' }}
                    value={this.state.order.rangeTo}
                  />
                </Col>
                <Col span={4}>

                  <Select
                    disabled={this.state.isDisabled}

                    style={{ margin: '0 16px' }}
                    placeholder="Please select"
                    defaultValue={this.state.order.currencyType.name}
                    onChange={(value) => this.setState((state) => ({
                      ...state,
                      order: {
                        ...state.order,
                        currencyType: this.createArrWithName([value])[0]
                      }
                    }))}
                  >
                    {this.createOptionArr(CurrencyArr)}
                  </Select>
                </Col>
              </Row>

              <Row >
                <Col>
                  <p>Car engine volume:</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: "20px" }}>
                <p>min: </p>
                <Col span={4}>
                  <InputNumber
                    min={0.5}
                    max={20}
                    disabled={this.state.isDisabled}
                    style={{ margin: '0 16px' }}
                    value={this.state.order.minEngineVolume}
                    onChange={(value) => {
                      this.setState((state) => ({
                        ...state,
                        order: {
                          ...state.order,
                          minEngineVolume: value
                        }
                      }))
                    }}
                  />
                </Col>
                <p>max: </p>
                <Col span={4}>
                  <InputNumber
                    min={1}
                    disabled={this.state.isDisabled}
                    max={20}
                    style={{ margin: '0 16px' }}
                    value={this.state.order.maxEngineVolume}
                    onChange={(value) => {
                      this.setState((state) => ({
                        ...state,
                        order: {
                          ...state.order,
                          maxEngineVolume: value
                        }
                      }))
                    }}
                  />
                </Col>
                <Col span={4}>
                  <p>L</p>
                </Col>

              </Row>
              <Row >

              </Row>

              <Form.Item
                label="Engine types"
              >
                <Select
                  disabled={this.state.isDisabled}
                  mode="multiple"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please select"
                  defaultValue={() => {
                    let arr = this.getArrByNames(this.state.order.engines);
                    this.setState({ newTransmissions: arr });
                    return arr;
                  }}
                  onChange={(value) => this.setState((state) => ({
                    ...state,
                    order: {
                      ...state.order,
                      engines: this.createArrWithName(value)
                    }
                  }))}
                >
                  {this.createOptionArr(EngineTypeArr)}
                </Select>

              </Form.Item>
              <Form.Item
                label="Additional Info"
              >
                <TextArea placeholder="info about order" disabled={this.state.isDisabled} defaultValue={this.state.order.additionalInfo}
                  onChange={(value) => {
                    console.log("value")
                    this.setState((state) => ({
                      ...state,
                      order: {
                        ...state.order,
                        additionalInfo: value.target.value
                      }
                    }))
                  }} />
              </Form.Item>
              <Form.Item
                label="Body typies"
              >
                <Select
                  disabled={this.state.isDisabled}
                  mode="multiple"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please select"
                  defaultValue={
                    () => {
                      let arr = this.getArrByNames(this.state.order.bodies);
                      this.setState({ newTransmissions: arr });
                      return arr;
                    }

                  }
                  onChange={(value) => this.setState((state) => ({
                    ...state,
                    order: {
                      ...state.order,
                      bodies: this.createArrWithName(value)
                    }
                  }))}
                >
                  {this.createOptionArr(BodyTypeArr)}
                </Select>

              </Form.Item>

              <Form.Item
                label="Brands"
              >
                <Select
                  disabled={this.state.isDisabled}
                  mode="multiple"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please select"
                  defaultValue={() => {
                    let arr = this.getArrByNames(this.state.order.brands);
                    this.setState({ newBrands: arr });
                    return arr;
                  }}
                  onChange={(value) => this.setState((state) => ({
                    ...state,
                    order: {
                      ...state.order,
                      brands: this.createArrWithName(value)
                    }
                  }))}
                >
                  {this.createOptionArr(BrandNameArr)}
                </Select>

              </Form.Item>

              <Form.Item
                label="Drives"
              >
                <Select
                  disabled={this.state.isDisabled}
                  mode="multiple"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please select"
                  defaultValue={
                    () => {
                      let arr = this.getArrByNames(this.state.order.drives);
                      this.setState({ newDrives: arr });
                      return arr;
                    }
                  }
                  onChange={(value) => this.setState((state) => ({
                    ...state,
                    order: {
                      ...state.order,
                      drives: this.createArrWithName(value)
                    }
                  }))}
                >
                  {this.createOptionArr(DriveTypeArr)}
                </Select>

              </Form.Item>

              <Form.Item
                label="Transmissions"
              >
                <Select
                  disabled={this.state.isDisabled}
                  mode="multiple"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please select"
                  defaultValue={() => {
                    let arr = this.getArrByNames(this.state.order.transmissions);
                    this.setState({ newTransmissions: arr });
                    return arr;
                  }}
                  onChange={(value) => this.setState((state) => ({
                    ...state,
                    order: {
                      ...state.order,
                      transmissions: this.createArrWithName(value)
                    }
                  }))}
                >
                  {this.createOptionArr(TransmissionArr)}
                </Select>
              </Form.Item>

            </Panel>
            <Panel header="Auto-picker information" key="3">
              <p>Auto-picker info</p>
            </Panel>
            <Panel header="Responce information" key="4">

              <SelectionReportComponent isEdittingAllowed="false"></SelectionReportComponent>
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

function SelectionOrderDescription(props) {
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

export default connect(mapStateToProps)(SelectionOrderDescription);
