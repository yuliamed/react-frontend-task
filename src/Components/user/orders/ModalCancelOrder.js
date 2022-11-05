import React, { Component } from 'react'
import { Modal } from 'antd';
export default class ModalCancelOrder extends Component {
  render() {
    return (
      <Modal title="Действительно?" visible={this.props.isOrderCancelling} onOk={
        this.props.cancelOrder
      }
        onCancel={this.props.onCancelCancelling}>
        <h2>Вы действительно хотите отменить заказ? </h2><br></br>
        <h4>Автоподборщик перестанет обрабатывать вашу заявку(</h4>
      </Modal>
    )
  }
}
