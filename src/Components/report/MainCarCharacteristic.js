import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Button, Form, Input, Select, InputNumber, Space, DatePicker } from 'antd';
import { BodyTypeArr, BrandNameArr, TransmissionArr, EngineTypeArr, DriveTypeArr, CurrencyArr, } from "../../constants/enums"
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import moment from 'moment';
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
    thisObj.setState({ report: this.props.report });
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

  render() {
    let report = this.props.report;

    const disabledDate = (current) => {
      // Can not select days before today and today
      return current && current > moment().endOf('day');
    };
    return (
      <>
        <Form
          validateMessages={this.validateMessages}
        >
          <DatePicker
            disabled={this.state.isDisabled}
            disabledDate={disabledDate}
            defaultValue={moment(report.inspectionDate)}
            onChange={
              (date, dateString) => {
                let newReport = this.state.report;
                newReport.inspectionDate = dateString;
                this.setState({ report: newReport })
              }
            } />
          <Row align='end' style={{ marginLeft: "50px" }}>
            <Col > {this.state.isDisabled ?
              <Button type="primary"
                shape="round"
                onClick={() => { this.onEditInfo() }} >
                <EditOutlined size={"large"} />
                Edit
              </Button>
              : <Button type="primary"
                shape="round"
                onClick={() => { this.onSaveEditedInfo() }} >
                <SaveOutlined size={"large"} />
                Save
              </Button>}
            </Col>
          </Row>

          <Space wrap>
            <Form.Item
              style={{ marginRight: '20px', width: 200 }}
              label="Brand"
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
                  this.setState({ report: newReport })
                }}
              >
                {this.createOptionArr(BrandNameArr)}
              </Select>

            </Form.Item>
            <Form.Item
              label="Model:"
              name="Model"
              rules={[{ required: true },
              ]}
            >
              <Input
                disabled={this.state.isDisabled}
                defaultValue={report.model}
                style={{ marginRight: '20px' }}
                onChange={
                  (value) => {
                    let newReport = this.state.report;
                    newReport.model = (value.target.value);
                    this.setState({ report: newReport })
                  }}
              />
            </Form.Item>

            <Form.Item
              name="Year"
              label="Year: "
              style={{ marginRight: '20px' }}
              rules={[{ required: true },

              ]}>
              <InputNumber
                disabled={this.state.isDisabled}
                min={100}
                value={report.year}

                onChange={
                  (value) => {
                    let newReport = this.state.report;
                    newReport.year = (value.target.value);
                    this.setState({ report: newReport })
                  }}
              />
              <span className="ant-form-text"></span>
            </Form.Item>
            <Form.Item
              name="Mileage"
              label="Mileage: "
              style={{ marginRight: '20px' }}
              rules={[{ required: true },

              ]}>
              <InputNumber
                disabled={this.state.isDisabled}
                min={100}
                value={report.mileage}

                onChange={
                  (value) => {
                    let newReport = this.state.report;
                    newReport.mileage = (value.target.value);
                    this.setState({ report: newReport })
                  }}
              /><span className="ant-form-text">km</span>
            </Form.Item>

            <Form.Item
              name="Car price"
              label="Car price: "
              style={{ marginRight: '20px' }}
              rules={[{ required: true },

              ]}>
              <InputNumber
                disabled={this.state.isDisabled}
                min={100}
                value={report.costValue}

                onChange={
                  (value) => {
                    let newReport = this.state.report;
                    newReport.costValue = (value.target.value);
                    this.setState({ report: newReport })
                  }}
              /><span className="ant-form-text"></span>
            </Form.Item>
            <Form.Item

              label="Currency type"
              name="currency type"
              rules={[{ required: true },
              ]}>
              <Select
                disabled={this.state.isDisabled}
                defaultValue={report.currencyType.name}
                style={{ marginRight: '20px' }}
                placeholder="Please select"
                onChange={(value) => {
                  let newReport = this.state.report;
                  newReport.currencyType = {
                    name: (value)
                  }

                  this.setState({ report: newReport })
                }}
              >
                {this.createOptionArr(CurrencyArr)}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginRight: '20px' }}
              label="Car engine volume:">
              <InputNumber
                disabled={this.state.isDisabled}
                min={1}
                max={20}
                value={report.engineVolume}
                onChange={
                  (value) => {
                    let newReport = this.state.report;
                    newReport.engineVolume = (value.target.value);
                    this.setState({ report: newReport })
                  }}
              />
              <span className="ant-form-text">L</span>
            </Form.Item>

            <Form.Item
              style={{ marginRight: '20px' }}
              label="Engine type"
            >
              <Select
                disabled={this.state.isDisabled}
                value={report.engine.name}
                placeholder="Please select"
                onChange={(value) => {
                  let newReport = this.state.report;
                  newReport.engine = {
                    name: (value)
                  }
                  this.setState({ report: newReport })
                }}
              >
                {this.createOptionArr(EngineTypeArr)}
              </Select>

            </Form.Item>

            <Form.Item
              style={{ marginRight: '20px' }}
              label="Body type"
            >
              <Select
                disabled={this.state.isDisabled}
                defaultValue={report.body.name}
                placeholder="Please select"
                onChange={(value) => {
                  let newReport = this.state.report;
                  newReport.body = {
                    name: (value)
                  }
                  this.setState({ report: newReport })
                }}
              >
                {this.createOptionArr(BodyTypeArr)}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginRight: '20px' }}
              label="Drive"
            >
              <Select
                disabled={this.state.isDisabled}
                placeholder="Please select"
                defaultValue={report.drive.name}
                onChange={(value) => {
                  let newReport = this.state.report;
                  newReport.drive = {
                    name: (value)
                  }
                  this.setState({ report: newReport })
                }}
              >
                {this.createOptionArr(DriveTypeArr)}
              </Select>

            </Form.Item>

            <Form.Item
              style={{ marginRight: '20px' }}
              label="Transmission"
            >
              <Select
                disabled={this.state.isDisabled}
                placeholder="Please select"
                defaultValue={report.transmission.name}
                onChange={(value) => {
                  let newReport = this.state.report;
                  newReport.transmission = {
                    name: (value)
                  }
                  this.setState({ report: newReport })
                }}
              >
                {this.createOptionArr(TransmissionArr)}
              </Select>

            </Form.Item>
          </Space>
        </Form>
      </>
    )
  }
}


function mapStateToProps(state) {
  const { report } = state.autoPicker;
  return {
    report,
  };
}

export default connect(mapStateToProps)(MainCarCharacteristic);
