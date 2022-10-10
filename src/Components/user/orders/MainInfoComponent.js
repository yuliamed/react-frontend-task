import React, { Component } from 'react';
import { Descriptions, Tag } from 'antd';
import { ORDER_STATUSES } from '../../../constants/const';

class MainInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creationDate: props.creationDate,
      status: props.status,
      autoPicker: props.autoPicker,
    };
    this.getTagColor = this.getTagColor.bind(this);
  }
  getTagColor(statusName) {
    switch (statusName) {
      case ORDER_STATUSES.CANCELED: return "red";
      case ORDER_STATUSES.CLOSED: return "blue";
      case ORDER_STATUSES.CREATED: return "gold";
      case ORDER_STATUSES.IN_PROCESS: return "cyan";
    }
  }
  render() {
    return (
      <Descriptions layout="vertical" labelStyle={{"font-weight": "500"}}>
        <Descriptions.Item label="Date of order">{this.state.creationDate.substr(0, 10)}</Descriptions.Item>
        <Descriptions.Item label="Status of order"><Tag color={this.getTagColor(this.state.status.name)}>{this.state.status.name}</Tag ></Descriptions.Item>
        <Descriptions.Item label="Auto-picker">{this.state.autoPicker == null ? <Tag color="magenta">does not set yet </Tag> :
          <Tag >{this.state.autoPicker.name}</Tag>}</Descriptions.Item>
      </Descriptions >
    );
  }
}

export default MainInfoComponent;
