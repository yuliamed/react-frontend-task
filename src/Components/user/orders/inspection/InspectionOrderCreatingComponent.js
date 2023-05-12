import React, { Component } from "react";
import { connect } from "react-redux";
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Layout, Form, Input, Modal, Select, Popover } from 'antd';
import { createOrder } from "../../../../actions/orders/userInspectionOrder"
import { findAllAutoPickers } from "../../../../actions/manageUsers";
import { clear } from "../../../../actions/auth";
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;
let thisObj;

const contentSave = (
  <div>
    <p>Заполните необходимые поля</p>
  </div>
);

const contentCancel = (
  <div>
    <p>Отменить</p>
  </div>
);
class InspectionOrderCreatingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: props.user_id,
      isDisabled: true,
      autoUrl: "",
      additionalInfo: "",
      autoPickerId: null,
      isOrderCancelling: false,
      isOrderCancelled: false,
      autoPickers: [],
      isSavingAllowed: false,
      isOrderSaving: false,
    };
    this.onSaveNewOrder = this.onSaveNewOrder.bind(this);
    this.onCancelOrder = this.onCancelOrder.bind(this);
    this.cancelOrder = props.on_cancel;
    this.onSave = props.on_save;
    this.createOptionArrForAutoPickers = this.createOptionArrForAutoPickers.bind(this);
    thisObj = this;
  }


  onCancelOrder(e) {
    this.setState({ isOrderCancelling: true })
  }

  onSaveNewOrder(e) {
    const { dispatch } = this.props;
    dispatch(clear);
    let orderParams = {
      autoUrl: this.state.autoUrl,
      additionalInfo: this.state.additionalInfo,
      autoPickerId: this.state.autoPickerId
    }
    dispatch(createOrder(this.state.userID, orderParams)).then((resp) => {
      alert("Заказ был создан!");
    })
    this.onSave();
    this.render();
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    thisObj.setState({ userID: this.props.user_id })
    dispatch(findAllAutoPickers()).then((resp) => {
      console.log(resp)
      thisObj.setState({ autoPickers: resp.data })
    })
  }

  createOptionArrForAutoPickers(arr) {
    const children = [];

    for (let i = 0; i < arr.length; i++) {
      children.push(<Option key={arr[i].id}>{arr[i].name + " " + arr[i].surname}</Option>);
    }
    return children
  }

  render() {
    return (
      <>
        <Card style={{
          width: "800px"
        }}
          align="start"
          title="Заказ на оценку авто"
          actions={[
            !this.state.isSavingAllowed ?
              <Popover content={contentSave} trigger="hover">
                <SaveOutlined />
              </Popover> :
              <SaveOutlined title="Сохранить заказ"
                onClick={(e) => {
                  this.setState({ isOrderSaving: true })
                  //this.onSaveNewOrder(e)
                }
                }
                disabled={true} />
            ,
            <CloseOutlined title="Закрыть"
              onClick={(e) => this.onCancelOrder(e)} />,
          ]}>
          <Layout >
            <Content >
              <Layout style={{ display: 'flex', padding: 15 }} align="horizontal" >
                <Content >
                  <Card title="Информация по заказу" size="small"
                  >
                    <Form>
                      <Form.Item
                        label="Ссылка на авто"
                        name="ссылка"
                        rules={[{ required: true },
                        { type: 'url', warningOnly: true },
                        { type: 'string', min: 6 }
                        ]}

                      >
                        <Input

                          onChange={
                            (e) => {
                              this.setState({
                                ...this.state, autoUrl: e.target.value
                              })
                              this.setState({ isSavingAllowed: true })
                            }
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        name="Дополнительная информация"
                        label="Дополнительная информация"
                        rules={[
                          { type: 'string', max: 512 }
                        ]}
                      >
                        <TextArea placeholder="Дополнительная информация"
                          onChange={
                            (e) => this.setState({
                              ...this.state, additionalInfo: e.target.value
                            })} />
                      </Form.Item>
                      <Form.Item
                        label="Автоподборщик"

                      >
                        <Select
                          allowClear
                          placeholder="Выберете"
                          onChange={(value) => {
                            return this.setState(
                              { autoPickerId: value }
                            )
                          }}
                        >
                          {this.createOptionArrForAutoPickers(this.state.autoPickers)}
                        </Select>
                      </Form.Item>
                    </Form>
                  </Card>
                </Content>
              </Layout>
            </Content>
          </Layout>
        </Card >
        <Modal title="Отмена заказа" visible={this.state.isOrderCancelling}
          onOk={() => {
            this.cancelOrder();
            this.setState({ isOrderCancelling: false })
          }}
          onCancel={() => this.setState({ isOrderCancelling: false })}>
          <h2>Вы действительно хотите отменить этот заказ? </h2>
        </Modal>
        <Modal title="Сохранение заказа" visible={this.state.isOrderSaving}
          onOk={(e) => {
            this.onSaveNewOrder(e);
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

export default connect(mapStateToProps)(InspectionOrderCreatingComponent);