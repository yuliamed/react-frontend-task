import React, { Component } from 'react';
import { Descriptions, Tag } from 'antd';
import { getTagColorForOrderStatus } from '../../common/colors';
import { OrderStatusMap } from '../../../constants/enums'
import { getColoredTagFromMap } from '../../common/processMap'

class MainInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creationDate: props.creationDate,
      status: props.status,
      autoPicker: props.autoPicker,
    };
  }

  render() {
    return (
      <Descriptions layout="vertical" labelStyle={{ "font-weight": "500" }}>
        <Descriptions.Item label="Дата заказа">{this.state.creationDate.substr(0, 10)}</Descriptions.Item>
        <Descriptions.Item label="Статус заказа">
          {getColoredTagFromMap(OrderStatusMap, this.state.status.name, getTagColorForOrderStatus(this.state.status.name))}
        </Descriptions.Item>
        <Descriptions.Item label="Автоподборщик">{this.state.autoPicker == null ? <Tag color="magenta">Не выставлен </Tag> :
          <Tag >{this.state.autoPicker.name}</Tag>}</Descriptions.Item>
      </Descriptions >
    );
  }
}

export default MainInfoComponent;
