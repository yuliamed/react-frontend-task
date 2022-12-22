import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Button, Checkbox, Form, Input, Select, InputNumber, Space, DatePicker } from 'antd';
import { BodyTypeArr, BrandNameArr, TransmissionArr, EngineTypeArr, DriveTypeArr, CurrencyArr, EngineTypeMap, BodyTypeMapWithEngKeys, DriveTypeMap, TransmissionMap, } from "../../constants/enums"
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import moment from 'moment';
import { createOptionArr } from "../common/processArrays";
import { getNamedOptionListFromMap } from "../common/processMap";
const { Option } = Select;
let thisObj;

class MainCarCharacteristic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      report: {},
      isDisabled: true,
    };
    this.createOptionArr = this.createOptionArr.bind(this);
    this.onEditInfo = this.onEditInfo.bind(this);
    this.onSaveEditedInfo = this.onSaveEditedInfo.bind(this);
    thisObj = this;
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    thisObj.setState({ report: this.props.report, isDisabled: !this.props.isCreating });
  }

  onSaveEditedInfo() {
    this.props.saveEditedInfo(this.state.report);
    this.setState({ isDisabled: true })
  }

  onEditInfo() {
    this.setState({ isDisabled: false })
  }

  createOptionArr(arr) {
    const children = [];
    for (let i = 0; i < arr.length; i++) {
      children.push(<Option key={arr[i]}>{arr[i]}</Option>);
    }
    return children
  }

  onChange(report) {
    this.props.onChange(report);
    this.setState({ report: report })
  }

  render() {
    let report = this.props.report;
    console.log( report);
    const disabledDate = (current) => {
      // Can not select days before today and today
      return current && current > moment().endOf('day');
    };
    return (
      <>
        <Form
          validateMessages={this.validateMessages}
        >
          {this.props.isCreating ? <></> :
            <Row align='end' style={{ marginLeft: "50px", marginBottom: "15px" }}>
              <Col > {this.state.isDisabled ?
                <Button type="primary"
                  shape="round"
                  onClick={() => { this.onEditInfo() }} >
                  <EditOutlined size={"large"} />
                  Изменить
                </Button>
                : <Button type="primary"
                  shape="round"
                  onClick={() => { this.onSaveEditedInfo() }} >
                  <SaveOutlined size={"large"} />
                  Сохранить
                </Button>}
              </Col>
            </Row>
          }
          <Space wrap>

            <Form.Item
              style={{ marginRight: '20px' }}
              label="Дата осмотра"
              name="Дата осмотра"
              rules={[{ required: true }]}>
              <DatePicker
                disabled={this.state.isDisabled}
                disabledDate={disabledDate}
                defaultValue={moment(report.inspectionDate)}
                onChange={
                  (date, dateString) => {
                    let newReport = this.state.report;
                    newReport.inspectionDate = dateString;
                    this.onChange(newReport);
                  }
                } />

            </Form.Item>
            <Form.Item
              style={{ marginRight: '20px', width: 200 }}
              label="Марка"
              name="Марка"
              rules={[{ required: true }]}>
              <Select
                disabled={this.state.isDisabled}
                style={{ marginRight: '20px' }}
                placeholder="Please select"
                defaultValue={report.brand.name}
                onChange={(value) => {
                  let newReport = this.state.report;
                  newReport.brand = {
                    name: (value)
                  }
                  this.onChange(newReport);
                }}

              >
                {createOptionArr(BrandNameArr)}
              </Select>

            </Form.Item>
            <Form.Item
              label="Модель:"
              name="Модель"
              style={{ marginRight: '20px' }}
              rules={[{ required: true },
              ]}
            >
              <Input
                disabled={this.state.isDisabled}
                defaultValue={report.model}
                style={{ width: 200 }}
                onChange={
                  (value) => {
                    let newReport = this.state.report;
                    console.log(value.target.value);
                    newReport.model = (value.target.value);
                    this.onChange(newReport);
                  }}
              />
            </Form.Item>

            <Form.Item
              name="Год"
              label="Год: "
              style={{ marginRight: '20px', width: 100 }}
              rules={[{ required: true }]}>
              <InputNumber
                disabled={this.state.isDisabled}
                min={100}
                value={report.year}
                onChange={
                  (value) => {
                    let newReport = this.state.report;
                    newReport.year = (value.target.value);
                    this.onChange(newReport);
                  }}
              />
            </Form.Item>
            <Form.Item
              name="Пробег"
              label="Пробег: "
              style={{ marginRight: '20px', width: 150 }}
              rules={[{ required: true },]}>
              <InputNumber
                disabled={this.state.isDisabled}
                min={100}
                value={report.mileage}
                onChange={
                  (value) => {
                    let newReport = this.state.report;
                    newReport.mileage = (value);
                    this.onChange(newReport);
                  }}
              />
            </Form.Item>
            <p style={{ marginBottom: '25px', marginRight: '20px', }}>км</p>

            <Checkbox
              style={{ marginRight: '20px', width: 200, marginBottom: "25px" }}
              chacked={report.isMileageReal}
              disabled={this.state.isDisabled}
              onChange={
                (value) => {
                  let newReport = this.state.report;
                  newReport.isMileageReal = (value.target.checked);
                  this.onChange(newReport);
                }}>Пробег действительный?</Checkbox>

            <Form.Item
              name="VIN номер"
              label="VIN номер: "
              style={{ marginRight: '20px', width: 250 }}
              rules={[{ required: true },]}>
              <Input
                disabled={this.state.isDisabled}
                min={100}
                value={report.vinNumber}

                onChange={
                  (value) => {
                    let newReport = this.state.report;
                    newReport.vinNumber = (value.target.value);
                    this.onChange(newReport);
                  }}
              />
            </Form.Item>

            <Checkbox
              style={{ marginRight: '20px', width: 200, marginBottom: "25px" }}
              chacked={report.isVinNumberReal}
              disabled={this.state.isDisabled}
              onChange={
                (value) => {
                  let newReport = this.state.report;
                  console.log(value.target.checked);
                  newReport.isVinNumberReal = (value.target.checked);
                  this.onChange(newReport);
                }}>VIN номер настоящий?</Checkbox>

            <Form.Item
              name="Цена"
              label="Цена: "
              style={{ marginRight: '10px' }}
              rules={[{ required: true },]}>
              <InputNumber
                disabled={this.state.isDisabled}
                min={100}
                style={{ width: 100 }}
                value={report.costValue}
                onChange={
                  (value) => {
                    let newReport = this.state.report;
                    newReport.costValue = (value);
                    this.onChange(newReport);
                  }}
              /><span className="ant-form-text"></span>
            </Form.Item>

            <Form.Item
              name="Цена с торгом"
              label="Цена с торгом: "
              style={{ marginRight: '10px' }}
              rules={[{ required: true },]}>
              <InputNumber
                disabled={this.state.isDisabled}
                min={100}
                style={{ width: 100 }}
                value={report.auctionValue}
                onChange={
                  (value) => {
                    let newReport = this.state.report;
                    newReport.auctionValue = (value);
                    this.onChange(newReport);
                  }}
              /><span className="ant-form-text"></span>
            </Form.Item>

            <Form.Item
              style={{ marginRight: '20px' }}
              label="Тип валюты"
              name="Тип валюты"
              rules={[{ required: true },]}>
              <Select
                disabled={this.state.isDisabled}
                defaultValue={report.currencyType.name}
                style={{ marginRight: '20px', width: 100 }}
                placeholder="Please select"
                onChange={(value) => {
                  let newReport = this.state.report;
                  newReport.currencyType = {
                    name: (value)
                  }

                  this.onChange(newReport);
                }}
              >
                {this.createOptionArr(CurrencyArr)}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginRight: '20px' }}
              label="Объём двигателя:"
              name="Объём двигателя"
              rules={[{ required: true }]}>

              <InputNumber
                style={{ width: 100 }}
                disabled={this.state.isDisabled}
                min={1}
                max={20}
                value={report.engineVolume}
                onChange={
                  (value) => {
                    let newReport = this.state.report;
                    newReport.engineVolume = (value);
                    this.onChange(newReport);
                  }}
              />
              <span className="ant-form-text">L</span>
            </Form.Item>

            <Form.Item
              style={{ marginRight: '20px' }}
              label="Тип двигателя"
              name="Тип двигателя"
              rules={[{ required: true }]}
            >
              <Select
                disabled={this.state.isDisabled}
                value={report.engine.name}
                style={{ width: 150 }}
                placeholder="Please select"
                onChange={(value) => {
                  let newReport = this.state.report;
                  newReport.engine = {
                    name: (value)
                  }
                  this.onChange(newReport);
                }}
              >
                {getNamedOptionListFromMap(EngineTypeMap)}
              </Select>

            </Form.Item>

            <Form.Item
              style={{ marginRight: '20px' }}
              label="Тип кузова"
              name="Тип кузова"
              rules={[{ required: true }]}
            >
              <Select
                disabled={this.state.isDisabled}
                defaultValue={report.body.name}
                placeholder="Please select"
                style={{ width: 150 }}
                onChange={(value) => {
                  let newReport = this.state.report;
                  newReport.body = {
                    name: (value)
                  }
                  this.onChange(newReport);
                }}
              >
                {getNamedOptionListFromMap(BodyTypeMapWithEngKeys)}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginRight: '20px' }}
              label="Привод"
              name="Привод"
              rules={[{ required: true }]}
            >
              <Select
                disabled={this.state.isDisabled}
                placeholder="Please select"
                style={{ width: 150 }}
                defaultValue={report.drive.name}
                onChange={(value) => {
                  let newReport = this.state.report;
                  newReport.drive = {
                    name: (value)
                  }
                  this.onChange(newReport);
                }}
              >
                {getNamedOptionListFromMap(DriveTypeMap)}
              </Select>

            </Form.Item>

            <Form.Item
              style={{ marginRight: '20px' }}
              label="Трансмиссия"
              name="Трансмиссия"
              rules={[{ required: true }]}
            >
              <Select
                disabled={this.state.isDisabled}
                placeholder="Please select"
                style={{ width: 150 }}
                defaultValue={report.transmission.name}
                onChange={(value) => {
                  let newReport = this.state.report;
                  newReport.transmission = {
                    name: (value)
                  }
                  this.onChange(newReport);
                }}
              >
                {getNamedOptionListFromMap(TransmissionMap)}
              </Select>

            </Form.Item>
          </Space>
        </Form>
      </>
    )
  }
}


// function mapStateToProps(state) {
//   const { report } = state.autoPicker;
//   return {
//     report,
//   };
// }

//export default connect(mapStateToProps)(MainCarCharacteristic);
export default MainCarCharacteristic;
