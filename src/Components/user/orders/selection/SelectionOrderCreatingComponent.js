import React, { Component } from "react";
import { connect } from "react-redux";
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Layout, Form, Input, Modal, Select, Row, Col, InputNumber } from 'antd';
import { createOrder } from "../../../../actions/orders/userSelectionOrder"
import { BodyTypeArr, BrandNameArr, TransmissionArr, EngineTypeArr, DriveTypeArr, CurrencyArr, } from "../../../../constants/enums"
import AutoPickerSelector from "../AutoPickerSelector";
import { findAllAutoPickers } from "../../../../actions/manageUsers";
import { createArrWithName } from "../../../common/processArrays";
const { Content } = Layout;
const { TextArea } = Input;

const { Option } = Select;

let thisObj;
class SelectionOrderCreatingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
      },
      userId: props.user_id,
      isOrderCancelling: false,
      isOrderCancelled: false,
      isSavingAllowed: false,
      autoPickers: [],
    };
    this.onSave = props.on_save;
    this.cancelOrder = props.on_cancel;
    this.onSaveOrder = this.onSaveOrder.bind(this);
    this.onCancelOrder = this.onCancelOrder.bind(this);
    this.createOptionArr = this.createOptionArr.bind(this);
    this.checkAllowingSave = this.checkAllowingSave.bind(this);
    thisObj = this;
  }

  checkAllowingSave() {
    if (this.state.order.minYear != null &&
      this.state.order.mileage != null &&
      this.state.order.rangeFrom != null &&
      this.state.order.rangeTo != null &&
      this.state.order.currencyType != null) {
      this.setState({ isSavingAllowed: true });
    }
  }

  onCancelOrder(e) {
    this.setState({ isOrderCancelling: true })
  }

  onSaveOrder(e) {
    const { dispatch } = this.props;
    dispatch(createOrder(this.state.userId, this.state.order)).this((resp) => {
      alert("Order created!");
      this.setState({ order: resp })
    })
    console.log(this.state.newTransmissions);
    this.onSave();
    this.render();
  }

  getSelectedAutoPicker = (value) => {
    this.setState((state) => ({
      ...state,
      order: {
        ...state.order,
        autoPickerId: value
      }
    }))
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    this.setState({ userID: this.props.user_id })
    dispatch(findAllAutoPickers()).then((resp) => {
      console.log(resp)
      this.setState({ autoPickers: resp.objects })
    })
  }

  createOptionArr(arr) {
    const children = [];
    for (let i = 0; i < arr.length; i++) {
      children.push(<Option key={arr[i]}>{arr[i]}</Option>);
    }
    return children
  }


  validateMessages = {
    required: '${label} is required!',
    pattern: '${label} must contain digits and letters.',
    types: {
      email: '${label} not a valid',
      number: '${label} is not a valid number!',
      string: '${label} must be a string!'
    },
  };

  render() {
    console.log("object");
    return (
      <>
        <Card style={{
          width: "800px"
        }}
          align="start"
          title="Selection order"
          actions={[
            <SaveOutlined title="save order"
                onClick={(e) => this.onSaveOrder(e)}
                disabled={true} />
            ,
            <CloseOutlined title="Cancel order" 
            onClick={(e) => this.onCancelOrder(e)}
            />,
          ]}
        >
          <Layout >
            <Content >
              <Layout style={{ display: 'flex', padding: 15 }} align="horizontal" >
                <Content >
                  <Card title="Order info" size="small"
                  >
                    <Form
                      //form={form}
                      validateMessages={this.validateMessages}
                    >
                      <Row>
                        <Form.Item
                          label="Min year:"
                          name="min year"
                          rules={[{ required: true },
                          ]}
                        >
                          <InputNumber
                            min={1900}
                            max={2022}
                            style={{ margin: '0 16px' }}

                            onChange={(value) => {
                              console.log(value);
                              this.setState((state) => ({
                                ...state,
                                order: {
                                  ...state.order,
                                  minYear: value
                                }
                              }))
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          name="Mileage"
                          label="Mileage: "
                          rules={[{ required: true },
                          ]}>
                          <InputNumber
                            min={100}

                            style={{ margin: '0 16px' }}
                            onChange={(value) => {
                              this.setState((state) => ({
                                ...state,
                                order: {
                                  ...state.order,
                                  mileage: value
                                }
                              }))
                            }}
                          /><span className="ant-form-text">km</span>
                        </Form.Item>
                      </Row>
                      <p>Car price:</p>
                      <Row>
                        <Form.Item
                          label="from"
                          name="car price from"
                          style={{ marginRight: '16px' }}
                          rules={[{ required: true },
                          ]}>
                          <InputNumber
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
                        </Form.Item>
                        <Form.Item
                          style={{ marginRight: '16px' }}
                          name="car price to"
                          rules={[{ required: true },
                          ]}
                          label="to">
                          <InputNumber
                            onChange={(value) => {
                              this.setState((state) => ({
                                ...state,
                                order: {
                                  ...state.order,
                                  rangeTo: value
                                }
                              }))
                            }}
                          />
                        </Form.Item>
                        <Form.Item

                          label="Currency type"
                          name="currency type"
                          rules={[{ required: true },
                          ]}>
                          <Select
                            style={{ margin: '0 16px' }}
                            placeholder="Please select"
                            onChange={(value) => this.setState
                              ((state) => ({
                                ...state,
                                order: {
                                  ...state.order,
                                  currencyType: createArrWithName([value])[0]
                                }
                              })
                              )
                            }
                          >
                            {this.createOptionArr(CurrencyArr)}
                          </Select>
                        </Form.Item>
                      </Row>

                      <Row >
                        <Col>
                          <p>Car engine volume:</p>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Item
                          label="min:"
                        >
                          <InputNumber
                            min={0.5}
                            max={20}
                            style={{ margin: '0 16px' }}
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
                        </Form.Item>

                        <Form.Item
                          label="max:">
                          <InputNumber
                            min={1}

                            max={20}
                            style={{ margin: '0 16px' }}
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
                          <span className="ant-form-text">L</span>
                        </Form.Item>
                      </Row>
                    </Form>

                    <Form.Item
                      label="Engine types"
                    >
                      <Select

                        mode="multiple"
                        allowClear
                        style={{
                          width: '100%',
                        }}
                        placeholder="Please select"

                        onChange={(value) => this.setState((state) => ({
                          ...state,
                          order: {
                            ...state.order,
                            engines: createArrWithName(value)
                          }
                        }))}
                      >
                        {this.createOptionArr(EngineTypeArr)}
                      </Select>

                    </Form.Item>

                    <Form.Item
                      label="Body typies"
                    >
                      <Select

                        mode="multiple"
                        allowClear
                        style={{
                          width: '100%',
                        }}
                        placeholder="Please select"
                        onChange={(value) => this.setState((state) => ({
                          ...state,
                          order: {
                            ...state.order,
                            bodies: createArrWithName(value)
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
                        mode="multiple"
                        allowClear
                        style={{
                          width: '100%',
                        }}
                        placeholder="Please select"

                        onChange={(value) => this.setState((state) => ({
                          ...state,
                          order: {
                            ...state.order,
                            brands: createArrWithName(value)
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

                        mode="multiple"
                        allowClear
                        style={{
                          width: '100%',
                        }}
                        placeholder="Please select"

                        onChange={(value) => this.setState((state) => ({
                          ...state,
                          order: {
                            ...state.order,
                            drives: createArrWithName(value)
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

                        mode="multiple"
                        allowClear
                        style={{
                          width: '100%',
                        }}
                        placeholder="Please select"

                        onChange={(value) => this.setState((state) => ({
                          ...state,
                          order: {
                            ...state.order,
                            transmissions: createArrWithName(value)
                          }
                        }))}
                      >
                        {this.createOptionArr(TransmissionArr)}
                      </Select>

                    </Form.Item>

                    <Form.Item
                      label="Auto-picker"
                    >
                      <AutoPickerSelector
                        getSelectedAutoPicker={this.getSelectedAutoPicker}
                        array={this.state.autoPickers}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Additional Info"
                    >
                      <TextArea placeholder="info about order"
                        onChange={(value) => {
                          this.setState((state) => ({
                            ...state,
                            order: {
                              ...state.order,
                              additionalInfo: value
                            }
                          }))
                        }} />
                    </Form.Item>
                  </Card>

                </Content>
              </Layout>
            </Content>
          </Layout>
        </Card>
        <Modal title="Really??" visible={this.state.isOrderCancelling}
          onOk={() => {
            this.cancelOrder();
            this.setState({ isOrderCancelling: false })
          }}
          onCancel={() => this.setState({ isOrderCancelling: false })}>
          <h2>Do you really want to cancel this order? </h2><br></br><h4></h4>
        </Modal>
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

export default connect(mapStateToProps)(SelectionOrderCreatingComponent);