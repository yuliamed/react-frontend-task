import React, { Component } from 'react';
import { BodyTypeMapWithEngKeys, BrandNameArr, CurrencyArr, EngineTypeMap, DriveTypeMap, TransmissionMap, } from "../../../../constants/enums"
import { Divider, Form, Input, Select, Row, Col, Collapse, InputNumber, Button, Tag } from 'antd';
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
import UserCard from '../../UserCard';
import ModalCancelOrder from '../ModalCancelOrder';
import { getNamedOptionListFromMap, getNamesListFromMap, getNameFromSetValue } from '../../../common/processMap';
import { createArrWithName, createOptionArr, createReqWithName } from '../../../common/processArrays';
import SelectionOrderDescriptionComponent from '../../../order/SelectionOrderDescriptionComponent';

const { Panel } = Collapse;
const { TextArea } = Input;
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
    this.getArrByNames = this.getArrByNames.bind(this);
    this.onCancelOrder = this.onCancelOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    thisObj = this;
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getOrderById(localStorage.getItem("userId"), window.location.href.split("/").pop())).then((data) => {
      thisObj.setState({ order: data, isLoading: false })
    }
    )
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
      window.history.go(-1);
      //this.props.navigate("../user-orders", { replace: true });
    })
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
      .then((resp) => {
        this.setState({ order: resp })
      })
    console.log(this.state.newTransmissions)
    this.render();
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
              marginLeft: "160px",
              marginRight: "160px",
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
              marginLeft: "160px",
              marginRight: "160px",
              display: 'vertical',
            }}>
            <Row justify="end">
              <Button type="primary" hidden={this.state.order.status.name != ORDER_STATUSES.CREATED || this.props.isAdmin} danger shape="round" size={"large"}
                onClick={(e) => this.onCancelOrder(e)}><CloseSquareOutlined />Отменить</Button>
            </Row>
          </Col>
        </Row>
          <Collapse defaultActiveKey={["1"]}
            style={{
              margin: "15px",
              marginLeft: "160px",
              marginRight: "160px",
              display: 'vertical',
            }}>
            <Panel header="Информация о заказе" key="1" >
              {this.props.isAdmin ? <><SelectionOrderDescriptionComponent order={this.state.order} /></> : <>
                <Divider orientation="left">Основная информация</Divider>
                <MainInfoComponent creationDate={this.state.order.creationDate}
                  status={this.state.order.status}
                  autoPicker={this.state.order.autoPicker} />
                <Divider orientation="left">Характеристика</Divider>
                <Row align='end'>
                  <Col style={{ marginBottom: "15px" }}>
                    {this.state.isDisabled ?
                      <Button type="primary" shape="round"
                        onClick={() => { this.onEditInfo() }} >
                        <EditOutlined size={"large"} />
                        Редактировать
                      </Button>
                      : <Button type="primary" shape="round"
                        onClick={() => { this.onSaveEditedInfo() }} >
                        <SaveOutlined size={"large"} />
                        Сохранить
                      </Button>}
                  </Col>
                </Row>
                <Row style={{ marginBottom: "10px" }}>
                  <Col >
                    <p>Минимальный год:</p>
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
                  <p>Пробег: </p>
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
                  <Col span={1}>
                    <p>км</p>
                  </Col>

                </Row>
                <Row >
                  <Col>
                    <p>Цена машины:</p>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "20px" }}>
                  <p>от: </p>
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
                  <p>до: </p>
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
                      placeholder="Выбрать"
                      defaultValue={this.state.order.currencyType.name}
                      onChange={(value) => this.setState((state) => ({
                        ...state,
                        order: {
                          ...state.order,
                          currencyType: createArrWithName([value])[0]
                        }
                      }))}
                    >
                      {createOptionArr(CurrencyArr)}
                    </Select>
                  </Col>
                </Row>

                <Row >
                  <Col>
                    <p>Объём двигателя:</p>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "20px" }}>
                  <p>минимум: </p>
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
                  <p>максимум: </p>
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

                <Form.Item
                  label="Марка"
                >
                  <Select
                    disabled={this.state.isDisabled}
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="Выбрать"
                    defaultValue={
                      this.state.order.brand == null ? null : getNameFromSetValue(this.state.order.brand)
                    }
                    onChange={(value) => this.setState((state) => ({
                      ...state,
                      order: {
                        ...state.order,
                        brand: createArrWithName(value)
                      }
                    }))}
                  >
                    {createOptionArr(BrandNameArr)}
                  </Select>

                </Form.Item>

                <Form.Item
                  label="Тип кузова"
                >
                  <Select
                    disabled={this.state.isDisabled}
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="Выбрать"
                    defaultValue={this.state.order.body == null ? null : getNameFromSetValue(this.state.order.body)}
                    onChange={(value) => this.setState((state) => ({
                      ...state,
                      order: {
                        ...state.order,
                        body: createReqWithName(value)
                      }
                    }))}
                  >
                    {getNamedOptionListFromMap(BodyTypeMapWithEngKeys)}
                  </Select>

                </Form.Item>

                <Form.Item
                  label="Модель"
                >
                 <TextArea placeholder="Модель" disabled={this.state.isDisabled} defaultValue={this.state.order.model}
                    onChange={(value) => {
                      this.setState((state) => ({
                        ...state,
                        order: {
                          ...state.order,
                          model: value.target.value
                        }
                      }))
                    }} />

                </Form.Item>

                <Form.Item
                  label="Типы дивигателя"
                >
                  <Select
                    disabled={this.state.isDisabled}
                    mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="Выбрать"
                    defaultValue={getNamesListFromMap(this.state.order.engines)}
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
                  label="Тип привода"
                >
                  <Select
                    disabled={this.state.isDisabled}
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="Выбрать"
                    defaultValue={this.state.order.drive == null ? null : getNameFromSetValue(this.state.order.drive)}
                    onChange={(value) => this.setState((state) => ({
                      ...state,
                      order: {
                        ...state.order,
                        drive: createArrWithName(value)
                      }
                    }))}
                  >
                    {getNamedOptionListFromMap(DriveTypeMap)}
                  </Select>

                </Form.Item>

                <Form.Item
                  label="Типы коробки передач"
                >
                  <Select
                    disabled={this.state.isDisabled}
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="Выбрать"
                    defaultValue={this.state.order.transmission == null ? null : getNameFromSetValue(this.state.order.transmission)}
                    onChange={(value) => this.setState((state) => ({
                      ...state,
                      order: {
                        ...state.order,
                        transmission: createArrWithName(value)
                      }
                    }))}
                  >
                    {getNamedOptionListFromMap(TransmissionMap)}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Дополнительная информация"
                >
                  <TextArea placeholder="Дополнительная информация о заказе" disabled={this.state.isDisabled} defaultValue={this.state.order.additionalInfo}
                    onChange={(value) => {
                      this.setState((state) => ({
                        ...state,
                        order: {
                          ...state.order,
                          additionalInfo: value.target.value
                        }
                      }))
                    }} />
                </Form.Item>
              </>}
            </Panel>
            <Panel header="Информация об автоподборщике" key="3">{
              this.state.order.autoPicker == null ? <Tag color="magenta">does not set yet </Tag> :
                <UserCard user={this.state.order.autoPicker} />}
            </Panel>
            <Panel header="Отчёт" key="4">
              <SelectionReportComponent isEdittingAllowed={false}></SelectionReportComponent>
            </Panel>
          </Collapse>
        </Content>
        <ModalCancelOrder isOrderCancelling={this.state.isOrderCancelling}
          cancelOrder={() => this.cancelOrder()}
          onCancelCancelling={() => this.setState({ isOrderCancelling: false })} />
        {/* <Modal title="Действительно?" visible={this.state.isOrderCancelling} onOk={() => {
          this.cancelOrder()
        }}
          onCancel={() => this.setState({ isOrderCancelling: false })}>
          <h2>Вы действительно хотите отменить заказ? </h2><br></br>
          <h4>Автоподборщик перестанет обрабатывать вашу заявку(</h4>
        </Modal> */}
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
