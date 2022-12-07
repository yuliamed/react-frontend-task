import React, { Component } from 'react'
import { Divider } from 'antd'
import MainInfoComponent from '../user/orders/MainInfoComponent'
import SelectionOrderInfoComponent from '../user/orders/selection/SelectionOrderInfoComponent'

export default class SelectionOrderDescriptionComponent extends Component {
  render() {
    let order = this.props.order;
    return (
      <><Divider orientation="left">Основная информация</Divider>
        <MainInfoComponent creationDate={order.creationDate}
          status={order.status}
          autoPicker={order.autoPicker} />
        <Divider orientation="left">Характеристика</Divider>
        <SelectionOrderInfoComponent order={order} />
      </>
    )
  }
}
