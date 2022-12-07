import React, { Component } from 'react'
import { Divider, Descriptions } from 'antd'
import MainInfoComponent from '../user/orders/MainInfoComponent'
export default class InspectionOrderDescriptionComponent extends Component {
  render() {
    let order = this.props.order;
    return (
      <>
        <Divider orientation="left">Основная информация</Divider>
        <MainInfoComponent creationDate={order.creationDate}
          status={order.status}
          autoPicker={order.autoPicker} />

        <Divider orientation="left">Характеристика</Divider>

        <Descriptions contentStyle={{ "font-weight": 'bold' }}>
          <Descriptions.Item
            label="Ссылка на автомобиль"
          ><a>{order.autoUrl}</a></Descriptions.Item>

        </Descriptions>
        <Descriptions contentStyle={{ "font-weight": 'bold' }}>
          <Descriptions.Item
            label="Дополнительная информация"
          >{order.additionalInfo}</Descriptions.Item>
        </Descriptions>
      </>
    )
  }
}
