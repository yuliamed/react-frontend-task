import React, { Component } from 'react';
import { Divider, Descriptions, Select, Tag } from 'antd';

let thisObj;

class SelectionOrderInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: props.order,
    };
    thisObj = this;
    this.getListFromArr = this.getListFromArr.bind(this);
  }

  async componentDidMount() {
    this.setState({ order: this.props.order });

  }
  getListFromArr(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {

      newArr.push(<Tag >{arr[i].name}</Tag>)
    }
    return newArr;
  }
  render() {
    return (
      <>
        <Descriptions contentStyle={{ "font-weight": 'bold' }}>
          <Descriptions.Item
            label="Min year"
            style={{ margin: '0 16px' }}
          >
            {this.state.order.minYear}
          </Descriptions.Item>

          <Descriptions.Item
            label="Mileage"
            style={{ margin: '0 16px' }}
          >
            {this.state.order.mileage + " km"}
          </Descriptions.Item>
        </Descriptions>
        <Divider orientation="left" orientationMargin="0">
          Car price
        </Divider>
        <Descriptions contentStyle={{ "font-weight": 'bold' }}>

          <Descriptions.Item label="from"
            style={{ margin: '0 16px' }}
          >{this.state.order.rangeFrom}</Descriptions.Item>
          <Descriptions.Item label="to"
            style={{ margin: '0 16px' }}
          >{this.state.order.rangeTo}</Descriptions.Item>
          <Select
            label="Currency type"
          >
            {this.state.order.currencyType.name}
          </Select>
        </Descriptions>
        <Divider orientation="left" orientationMargin="0">
          Car engine volume
        </Divider>
        <Descriptions contentStyle={{ "font-weight": 'bold' }}>
          <Descriptions.Item
            label="min"
          >{this.state.order.minEngineVolume}</Descriptions.Item>
          <Descriptions.Item
            label="max"
            style={{ margin: '0 16px' }}

          >{this.state.order.maxEngineVolume}</Descriptions.Item>
          <p>L</p>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item
            style={{
              width: '100%',
            }}
            label="Engine types"
          >
            {this.getListFromArr(this.state.order.engines)}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item label="Additional Info"
          >{this.state.order.additionalInfo}</Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item
            label="Body typies"
            style={{
              width: '100%',
            }}
          >
            {this.getListFromArr(this.state.order.bodies)}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item
            label="Brands"
            style={{
              width: '100%',
            }}
          >
            {this.getListFromArr(this.state.order.brands)}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item
            label="Drives"
            style={{
              width: '100%',
            }}
          >
            {this.getListFromArr(this.state.order.drives)}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions >
          <Descriptions.Item
            label="Transmissions"
            style={{
              width: '100%',
            }}
          >
            {this.getListFromArr(this.state.order.transmissions)}
          </Descriptions.Item>
        </Descriptions>

      </>
    );
  }
}

export default SelectionOrderInfoComponent;
