import React, { Component } from 'react'
import { Button, } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';

export default class CancelButton extends Component {
  render() {
    return (
      <Button type="primary"
        hidden={this.props.hidden} danger shape="circle"
        onClick={(e) => this.props.onClick(e)}><CloseSquareOutlined /></Button>

    )
  }
}
