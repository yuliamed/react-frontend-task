import React, { Component } from 'react';
import { Divider, Descriptions, Select, } from 'antd';
import { BodyTypeMapWithEngKeys, DriveTypeMap, EngineTypeMap, TransmissionMap } from '../../../../constants/enums';
import { getTagListFromMap } from '../../../common/processMap'
import { getTagListFromArr } from '../../../common/processArrays'
let thisObj;

class SelectionOrderInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: props.order,
    };
    thisObj = this;
  }

  async componentDidMount() {
    this.setState({ order: this.props.order });

  }

  render() {
    return (
      <>
        <Descriptions contentStyle={{ "font-weight": 'bold' }}>
          <Descriptions.Item
            label="Минимальный год"
            style={{ margin: '0 16px' }}
          >
            {this.state.order.minYear}
          </Descriptions.Item>

          <Descriptions.Item
            label="Пробег"
            style={{ margin: '0 16px' }}
          >
            {this.state.order.mileage + " км"}
          </Descriptions.Item>
        </Descriptions>
        <Divider orientation="left" orientationMargin="0">
          Цена
        </Divider>
        <Descriptions contentStyle={{ "font-weight": 'bold' }}>

          <Descriptions.Item label="От"
            style={{ margin: '0 16px' }}
          >{this.state.order.rangeFrom}</Descriptions.Item>
          <Descriptions.Item label="До"
            style={{ margin: '0 16px' }}
          >{this.state.order.rangeTo}</Descriptions.Item>
          <Select
            label="Тип валюты"
          >
            {this.state.order.currencyType.name}
          </Select>
        </Descriptions>
        <Divider orientation="left" orientationMargin="0">
          Параметры машины
        </Divider>
        <Descriptions >
          <p>Объём двигателя </p>
          <Descriptions.Item
            contentStyle={{ "font-weight": 'bold' }}
            label="от"
          >{this.state.order.minEngineVolume}   L</Descriptions.Item>
          <Descriptions.Item
            label="до"
            contentStyle={{ "font-weight": 'bold' }}
            style={{ margin: '0 16px' }}

          >{this.state.order.maxEngineVolume}  L</Descriptions.Item>

        </Descriptions>
        <Descriptions>
          <Descriptions.Item
            style={{
              width: '100%',
            }}
            label="Типы двигателя"
          >
            {getTagListFromMap(EngineTypeMap, this.state.order.engines)}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions>
          <Descriptions.Item
            label="Типы кузовов"
            style={{
              width: '100%',
            }}
          >
            {getTagListFromMap(BodyTypeMapWithEngKeys, this.state.order.bodies)}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item
            label="Марки"
            style={{
              width: '100%',
            }}
          >
            {getTagListFromArr(this.state.order.brands)}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item
            label="Приводы"
            style={{
              width: '100%',
            }}
          >
            {getTagListFromMap(DriveTypeMap, this.state.order.drives)}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions >
          <Descriptions.Item
            label="Трансмиссии"
            style={{
              width: '100%',
            }}
          >
            {getTagListFromMap(TransmissionMap, this.state.order.transmissions)}
          </Descriptions.Item>
        </Descriptions>
        <Divider orientation="left" orientationMargin="0">
          Дополнительная информация
        </Divider>
        <Descriptions>
          <Descriptions.Item
          >{this.state.order.additionalInfo == null ? "Информации нет" : this.state.order.additionalInfo}</Descriptions.Item>
        </Descriptions>

      </>
    );
  }
}

export default SelectionOrderInfoComponent;
