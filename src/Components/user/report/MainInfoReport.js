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
            label="Inspection date">
            {report.inspectionDate}
          </Descriptions.Item>

          <Descriptions.Item
            style={{ marginRight: '20px', width: 200 }}
            label="Brand">
            {report.brand.name}
          </Descriptions.Item>

          <Descriptions.Item
            label="Model"
            style={{ marginRight: '20px' }}>
            {report.model}
          </Descriptions.Item>

          <Descriptions.Item
            label="Year"
            style={{ marginRight: '20px', width: 100 }}
          >
            {report.year}
          </Descriptions.Item>

          <Descriptions.Item
            label="Mileage "
            style={{ marginRight: '20px', width: 150 }}
          >
            {report.mileage} km
          </Descriptions.Item>

          <Descriptions.Item
            label="Is mileage real? "
            style={{ marginRight: '20px', width: 150 }}>
            {report.isMileageReal ? "Yes" : "No"}
          </Descriptions.Item>

          <Descriptions.Item
            label="VIN number: "
            style={{ marginRight: '20px', width: 150 }}
          >
            {report.vinNumber}
          </Descriptions.Item>

          <Descriptions.Item
            label="Is VIN number real?"
            style={{ marginRight: '20px', width: 150 }}>
            {report.isVinNumberReal ? "Yes" : "No"}
          </Descriptions.Item>

          <Descriptions.Item
            label="Car price: "
            style={{ marginRight: '10px' }}
          >
            {report.costValue}
          </Descriptions.Item>

          <Descriptions.Item
            label="Auction price: "
            style={{ marginRight: '10px' }}
          >
            {report.auctionValue}
          </Descriptions.Item>

          <Descriptions.Item
            style={{ marginRight: '20px' }}
            label="Currency type"
          >{report.currencyType.name}
          </Descriptions.Item>

          <Descriptions.Item
            style={{ marginRight: '20px' }}
            label="Car engine volume:"
          >
            {report.engineVolume}
          </Descriptions.Item>

          <Descriptions.Item
            style={{ marginRight: '20px' }}
            label="Engine type"
          >
            {report.engine.name}
          </Descriptions.Item>

          <Descriptions.Item
            style={{ marginRight: '20px' }}
            label="Body type"
          >{report.body.name}
          </Descriptions.Item>

          <Descriptions.Item
            style={{ marginRight: '20px' }}
            label="Drive"
          >{report.drive.name}
          </Descriptions.Item>

          <Descriptions.Item
            style={{ marginRight: '20px' }}
            label="Transmission"
          >{report.transmission.name}
          </Descriptions.Item>

        </Descriptions>
      </>
    )
  }
}

export default MainInfoReport;
