import React, { Component } from "react";
import { connect } from "react-redux";
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Layout, Form, Input, Modal, Select, Row, Col, InputNumber } from 'antd';
import { createOrder } from "../../../../actions/orders/userSelectionOrder"
import { BodyTypeArr, BrandNameArr, TransmissionArr, EngineTypeArr, DriveTypeArr, CurrencyArr, EngineTypeMap, BodyTypeMapWithEngKeys, DriveTypeMap, TransmissionMap, } from "../../../../constants/enums"
import AutoPickerSelector from "../AutoPickerSelector";
import { findAllAutoPickers } from "../../../../actions/manageUsers";
import { createArrWithName, createOptionArr } from "../../../common/processArrays";
import { validateMessages } from "../../../common/validateForms";
import { getNamedOptionListFromMap } from "../../../common/processMap";
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
      isOrderSaving: false, 
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
    console.log(this.state.newTransmission);
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
      this.setState({ autoPickers: resp.data })
    })
  }

  createOptionArr(arr) {
    const children = [];
    for (let i = 0; i < arr.length; i++) {
      children.push(<Option key={arr[i]}>{arr[i]}</Option>);
    }
    return children
  }

  render() {
    console.log("object");
    return (
      <>
        <Card style={{
          width: "800px"
        }}
          align="start"
          title="Заказ на подбор авто"
          actions={[
            <SaveOutlined title="Сохранить заказ"
              onClick={(e) => {
                this.setState({ isOrderSaving: true })
                this.onSaveOrder(e)
              }}
              disabled={true} />
            ,
            <CloseOutlined title="отменить заказ"
              onClick={(e) => this.onCancelOrder(e)}
            />,
          ]}
        >
          <Layout >
            <Content >
              <Layout style={{ display: 'flex', padding: 15 }} align="horizontal" >
                <Content >
                  <Card title="Информация о заказе" size="small"
                  >
                    <Form
                      //form={form}
                      validateMessages={validateMessages}
                    >
                      <Row>
                        <Form.Item
                          label="Минимальный год:"
                          name="Минимальный год"
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
                          name="Пробег"
                          label="Пробег: "
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
                          /><span className="ant-form-text">км</span>
                        </Form.Item>
                      </Row>
                      <p>Цена:</p>
                      <Row>
                        <Form.Item
                          label="От"
                          name="Цена машины от"
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
                          name="Цена машины до"
                          rules={[{ required: true },
                          ]}
                          label="до">
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

                          label="Тип валюты"
                          name="Тип валюты"
                          rules={[{ required: true },
                          ]}>
                          <Select
                            style={{ margin: '0 16px' }}
                            placeholder="Выберете"
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
                            {createOptionArr(CurrencyArr)}
                          </Select>
                        </Form.Item>
                      </Row>

                      <Row >
                        <Col>
                          <p>Объём двигателя:</p>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Item
                          label="Минимум:"
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
                          label="Максимум:">
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
                      label="Типы двигателя"
                    >
                      <Select

                        mode="multiple"
                        allowClear
                        style={{
                          width: '100%',
                        }}
                        placeholder="Выберете"
                        onChange={(value) => this.setState((state) => ({
                          ...state,
                          order: {
                            ...state.order,
                            engines: createArrWithName(value)
                          }
                        }))}
                      >
                        {getNamedOptionListFromMap(EngineTypeMap)}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Тип кузова">
                      <Select
                        allowClear
                        style={{
                          width: '100%',
                        }}
                        placeholder="Выберете"
                        onChange={(value) => this.setState((state) => ({
                          ...state,
                          order: {
                            ...state.order,
                            bodies: createArrWithName(value)
                          }
                        }))}
                      >
                        {getNamedOptionListFromMap(BodyTypeMapWithEngKeys)}
                      </Select>

                    </Form.Item>

                    <Form.Item
                      label="Марка"
                    >
                      <Select
                        allowClear
                        style={{
                          width: '100%',
                        }}
                        placeholder="Выберете"
                        onChange={(value) => this.setState((state) => ({
                          ...state,
                          order: {
                            ...state.order,
                            brands: createArrWithName(value)
                          }
                        }))}
                      >
                        {createOptionArr(BrandNameArr)}
                      </Select>

                    </Form.Item>

                    <Form.Item
                      label="Модель"
                    >
                      <Input
                            style={{ margin: '0 16px' }}
                            onChange={(value) => {
                              this.setState((state) => ({
                                ...state,
                                order: {
                                  ...state.order,
                                  model: value
                                }
                              }))
                            }}
                          />

                    </Form.Item>

                    <Form.Item
                      label="Тип привод"
                    >
                      <Select
                        allowClear
                        style={{
                          width: '100%',
                        }}
                        placeholder="Выберете"
                        onChange={(value) => this.setState((state) => ({
                          ...state,
                          order: {
                            ...state.order,
                            drives: createArrWithName(value)
                          }
                        }))}
                      >
                        {getNamedOptionListFromMap(DriveTypeMap)}
                      </Select>

                    </Form.Item>

                    <Form.Item
                      label="Тип коробки передач"
                    >
                      <Select
                        allowClear
                        style={{
                          width: '100%',
                        }}
                        placeholder="Выберете"
                        onChange={(value) => this.setState((state) => ({
                          ...state,
                          order: {
                            ...state.order,
                            transmissions: createArrWithName(value)
                          }
                        }))}
                      >
                        {getNamedOptionListFromMap(TransmissionMap)}
                      </Select>

                    </Form.Item>

                    <Form.Item
                      label="Автоподборщик"
                    >
                      <AutoPickerSelector
                        getSelectedAutoPicker={this.getSelectedAutoPicker}
                        array={this.state.autoPickers}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Дополнительная информация"
                    >
                      <TextArea placeholder="Дополнительная информация"
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
        <Modal title="Вы уверены??" visible={this.state.isOrderCancelling}
          onOk={() => {
            this.cancelOrder();
            this.setState({ isOrderCancelling: false })
          }}
          onCancel={() => this.setState({ isOrderCancelling: false })}>
          <h2>Вы действительно хотите отменить заказ? </h2><br></br><h4></h4>
        </Modal>
        <Modal title="Вы уверены??" visible={this.state.isOrderSaving}
          onOk={() => {
            this.cancelOrder();
            this.setState({ isOrderSaving: false })
          }}
          onCancel={() => this.setState({ isOrderSaving: false })}>
          <h2>Вы действительно хотите оформить заказ? </h2><br></br><h4></h4>
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