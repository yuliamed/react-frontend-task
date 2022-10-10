import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Layout, Form, Input, Modal, Select, Row, Col, InputNumber, Space } from 'antd';
import { BodyTypeArr, BrandNameArr, TransmissionArr, EngineTypeArr, DriveTypeArr, CurrencyArr, } from "../../constants/enums"
import { createArrWithName } from "../common/processArrays";

const { Option } = Select;

let thisObj;
class MainCarCharacteristic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      order: {
      },
      userId: props.user_id,
      isOrderCancelling: false,
      isOrderCancelled: false,
      isSavingAllowed: false,
      autoPickers: [],
    };
    this.createOptionArr = this.createOptionArr.bind(this);
    thisObj = this;
  }

  async componentDidMount() {
    const { dispatch } = this.props;

  }

  createOptionArr(arr) {
    const children = [];
    for (let i = 0; i < arr.length; i++) {
      children.push(<Option key={arr[i]}>{arr[i]}</Option>);
    }
    return children
  }

  render() {
    const { report } = this.props;
    return (
      <>
        <Form
          validateMessages={this.validateMessages}
        >
          <Space wrap>
            <Form.Item
              style={{ marginRight: '20px', width: 200 }}
              label="Brand"
              rules={[{ required: true }]}

            >
              <Select
                style={{ marginRight: '20px' }}
                placeholder="Please select"
                defaultValue={report.brand.name}
                onChange={(value) => this.setState((state) => ({
                  ...state,
                  order: {
                    ...state.order,
                    brands: createArrWithName(value)
                  }
                }))}
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
                defaultValue={report.model}
                style={{ marginRight: '20px' }}
                onChange={(value) => {
                  console.log(value);
                  this.setState((state) => ({
                    ...state,
                    order: {
                      ...state.order,
                      minYear: value
                    }
                  }))
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
                min={100}
                value={report.year}

                onChange={(value) => {
                  this.setState((state) => ({
                    ...state,
                    order: {
                      ...state.order,
                      mileage: value
                    }
                  }))
                }}
              /><span className="ant-form-text"></span>
            </Form.Item>
            <Form.Item
              name="Mileage"
              label="Mileage: "
              style={{ marginRight: '20px' }}
              rules={[{ required: true },

              ]}>
              <InputNumber
                min={100}
                value={report.mileage}

                onChange={(value) => {
                  this.setState((state) => ({
                    ...state,
                    order: {
                      ...state.order,
                      mileage: value
                    }
                  }))
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
                min={100}
                value={report.costValue}

                onChange={(value) => {
                  this.setState((state) => ({
                    ...state,
                    order: {
                      ...state.order,
                      mileage: value
                    }
                  }))
                }}
              /><span className="ant-form-text"></span>
            </Form.Item>
            <Form.Item

              label="Currency type"
              name="currency type"
              rules={[{ required: true },
              ]}>
              <Select
                defaultValue={report.currencyType.name}
                style={{ marginRight: '20px' }}
                placeholder="Please select"
                onChange={(value) => this.setState
                  ((state) => ({
                    ...state,
                    order: {
                      ...state.order,
                      currencyType: createArrWithName([value])[0]
                    }
                  })
                  )
                }
              >
                {this.createOptionArr(CurrencyArr)}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginRight: '20px' }}
              label="Car engine volume:">
              <InputNumber
                min={1}
                max={20}
                value={report.engineVolume}
                onChange={(value) => {
                  this.setState((state) => ({
                    ...state,
                    order: {
                      ...state.order,
                      maxEngineVolume: value
                    }
                  }))
                }}
              />
              <span className="ant-form-text">L</span>
            </Form.Item>

            <Form.Item
              style={{ marginRight: '20px' }}
              label="Engine type"
            >
              <Select
                value={report.engine.name}
                placeholder="Please select"
                onChange={(value) => this.setState((state) => ({
                  ...state,
                  order: {
                    ...state.order,
                    engines: createArrWithName(value)
                  }
                }))}
              >
                {this.createOptionArr(EngineTypeArr)}
              </Select>

            </Form.Item>

            <Form.Item
              style={{ marginRight: '20px' }}
              label="Body type"
            >
              <Select
                defaultValue={report.body.name}
                placeholder="Please select"
                onChange={(value) => this.setState((state) => ({
                  ...state,
                  order: {
                    ...state.order,
                    bodies: createArrWithName(value)
                  }
                }))}
              >
                {this.createOptionArr(BodyTypeArr)}
              </Select>

            </Form.Item>



            <Form.Item
              style={{ marginRight: '20px' }}
              label="Drive"
            >
              <Select
                placeholder="Please select"
                defaultValue={report.drive.name}
                onChange={(value) => this.setState((state) => ({
                  ...state,
                  order: {
                    ...state.order,
                    drives: createArrWithName(value)
                  }
                }))}
              >
                {this.createOptionArr(DriveTypeArr)}
              </Select>

            </Form.Item>

            <Form.Item
              style={{ marginRight: '20px' }}
              label="Transmission"
            >
              <Select
                placeholder="Please select"
                defaultValue={report.transmission.name}
                onChange={(value) => this.setState((state) => ({
                  ...state,
                  order: {
                    ...state.order,
                    transmissions: createArrWithName(value)
                  }
                }))}
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
  const { order } = state.autoPicker;
  return {
    report, order
  };
}

export default connect(mapStateToProps)(MainCarCharacteristic);
