import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Button, Checkbox, Form, Input, Select, InputNumber, Space, DatePicker, Descriptions } from 'antd';
import { BodyTypeArr, BrandNameArr, TransmissionArr, EngineTypeArr, DriveTypeArr, CurrencyArr, } from "../../../constants/enums"
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import moment from 'moment';
const { Option } = Select;
let thisObj;

class MainInfoReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      report: {},
      isDisabled: true,
    };
    this.createOptionArr = this.createOptionArr.bind(this);
    thisObj = this;
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    thisObj.setState({ report: this.props.report, isDisabled: !this.props.isCreating });
  }

  createOptionArr(arr) {
    const children = [];
    for (let i = 0; i < arr.length; i++) {
      children.push(<Option key={arr[i]}>{arr[i]}</Option>);
    }
    return children
  }

  render() {
    let report = this.props.report;
    console.log(report);

    return (
      <>
        <Descriptions style={{ "font-weight": 'bold', margin: 10 }}
        >
          <Descriptions.Item
            style={{ marginRight: '20px' }}
            label="Дата осмотра">
            {report.inspectionDate}
          </Descriptions.Item>

          <Descriptions.Item
            style={{ marginRight: '20px', width: 200 }}
            label="Марка">
            {report.brand.name}
          </Descriptions.Item>

          <Descriptions.Item
            label="Модель"
            style={{ marginRight: '20px' }}>
            {report.model}
          </Descriptions.Item>

          <Descriptions.Item
            label="Год"
            style={{ marginRight: '20px', width: 100 }}
          >
            {report.year}
          </Descriptions.Item>

          <Descriptions.Item
            label="Пробег "
            style={{ marginRight: '20px', width: 150 }}
          >
            {report.mileage} km
          </Descriptions.Item>

          <Descriptions.Item
            label="Пробег реален? "
            style={{ marginRight: '20px', width: 150 }}>
            {report.isMileageReal ? "Yes" : "No"}
          </Descriptions.Item>

          <Descriptions.Item
            label="VIN номер "
            style={{ marginRight: '20px', width: 150 }}
          >
            {report.vinNumber}
          </Descriptions.Item>

          <Descriptions.Item
            label="VIN Номер настоящий?"
            style={{ marginRight: '20px', width: 150 }}>
            {report.isVinNumberReal ? "Yes" : "No"}
          </Descriptions.Item>

          <Descriptions.Item
            label="Цена "
            style={{ marginRight: '10px' }}
          >
            {report.costValue}
          </Descriptions.Item>

          <Descriptions.Item
            label="Цена с учётом скидки "
            style={{ marginRight: '10px' }}
          >
            {report.auctionValue}
          </Descriptions.Item>

          <Descriptions.Item
            style={{ marginRight: '20px' }}
            label="Тип валюты"
          >{report.currencyType.name}
          </Descriptions.Item>

          <Descriptions.Item
            style={{ marginRight: '20px' }}
            label="Объём двигателя:"
          >
            {report.engineVolume}
          </Descriptions.Item>

          <Descriptions.Item
            style={{ marginRight: '20px' }}
            label="Тип двигателя"
          >
            {report.engine.name}
          </Descriptions.Item>

          <Descriptions.Item
            style={{ marginRight: '20px' }}
            label="Тип кузова"
          >{report.body.name}
          </Descriptions.Item>

          <Descriptions.Item
            style={{ marginRight: '20px' }}
            label="Привод"
          >{report.drive.name}
          </Descriptions.Item>

          <Descriptions.Item
            style={{ marginRight: '20px' }}
            label="Тип трансмиссии"
          >{report.transmission.name}
          </Descriptions.Item>

        </Descriptions>
      </>
    )
  }
}

export default MainInfoReport;
