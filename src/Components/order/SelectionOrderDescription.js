import React, { Component } from 'react'
import MainInfoComponent from './MainInfoComponent'
import { Divider, Form, Row, Col, Tag, } from 'antd';

export default class SelectionOrderDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.order,
      isLoading: true,
      isDisabled: true,
      isOrderCancelling: false,
    }
    this.getTagArrWithNames = this.getTagArrWithNames.bind(this);
    this.isArrayEmpty = this.isArrayEmpty.bind(this);
  }

  getTagArrWithNames(inputArr) {
    let arr = [];
    Object.values(inputArr).forEach(function (entry) {
      arr.push(<Tag>{entry.name}</Tag>)
    })
    return arr;
  }

  isArrayEmpty(arr) {
    return arr == null || arr.length == 0;
  }

  render() {
    return (
      <>
        <Divider orientation="left">Main information</Divider>
        <MainInfoComponent creationDate={this.state.order.creationDate}
          status={this.state.order.status}
          autoPicker={this.state.order.autoPicker} />
        <Divider orientation="left">Characteristic</Divider>

        <Row style={{ marginBottom: "10px" }}>
          <Col >
            <p>Min year:</p>
          </Col>
          <Col span={10}>
            <p
              style={{ margin: '0 16px' }}
            >{this.state.order.minYear}</p>
          </Col>
          <p>Mileage: </p>
          <Col span={4}>
            <p
              style={{ margin: '0 16px' }}

            >{this.state.order.mileage}</p>
          </Col>
          <Col span={4}>
            <p>km</p>
          </Col>
        </Row>
        <Row >
          <Col>
            <p>Car price:</p>
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <p>from: </p>
          <Col span={4}>
            <p
              style={{ margin: '0 16px' }}
            >{this.state.order.rangeFrom}</p>
          </Col>
          <p>to: </p>
          <Col span={4}>
            <p
              style={{ margin: '0 16px' }}
            >{this.state.order.rangeTo}</p>
          </Col>
          <Col span={4}>

            <Tag
              style={{ margin: '0 16px' }}
            >
              {this.state.order.currencyType.name}
            </Tag>
          </Col>
        </Row>

        <Row >
          <Col>
            <p>Car engine volume:</p>
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <p>min: </p>
          <Col span={4}>
            <p
              style={{ margin: '0 16px' }}
            >{this.state.order.minEngineVolume}</p>
          </Col>
          <p>max: </p>
          <Col span={4}>
            <p
              style={{ margin: '0 16px' }}

            >{this.state.order.maxEngineVolume}</p>
          </Col>
          <Col span={4}>
            <p>L</p>
          </Col>

        </Row>
        <Form.Item
          label="Engine types"
          hidden={this.isArrayEmpty(this.state.order.engines)}
        >
          <p
            style={{
              width: '100%',
            }}
          >
            {this.getTagArrWithNames(this.state.order.engines)}
          </p>

        </Form.Item>
        <Form.Item
          label="Additional Info"
        >
          <p                >{this.state.order.additionalInfo}</p>
        </Form.Item>
        <Form.Item
          label="Body typies"
          hidden={this.isArrayEmpty(this.state.order.bodies)}
        >
          <p
            style={{
              width: '100%',
            }}
          >
            {this.getTagArrWithNames(this.state.order.bodies)}
          </p>
        </Form.Item>
        <Form.Item
          label="Brands"
          hidden={this.isArrayEmpty(this.state.order.brands)}
        >
          <p
            style={{
              width: '100%',
            }}
          >
            {this.getTagArrWithNames(this.state.order.brands)}
          </p>

        </Form.Item>
        <Form.Item
          label="Drives"
          hidden={this.isArrayEmpty(this.state.order.drives)}
        >
          <p
            style={{
              width: '100%',
            }}
          >
            {this.getTagArrWithNames(this.state.order.drives)}
          </p>

        </Form.Item>
        <Form.Item
          hidden={this.isArrayEmpty(this.state.order.transmissions)}
          label="Transmissions"
        >
          <p
            style={{
              width: '100%',
            }}
          >{this.getTagArrWithNames(this.state.order.transmissions)}
          </p>
        </Form.Item>

      </>
    )
  }

}
