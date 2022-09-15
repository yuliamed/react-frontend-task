import React, { Component } from "react";
import { connect } from "react-redux";
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Layout, Form, Input, Modal, Select, Row, Col, Popover, InputNumber } from 'antd';
import { createOrder } from "../../actions/orders/userSelectionOrder"
import { changeOrderStatus } from "../../actions/orders/userOrder"
import { CANCEL_ORDER_STATUS } from "../../constants/const"
import { BodyTypeArr, BrandNameArr, TransmissionArr, EngineTypeArr, DriveTypeArr, CurrencyArr, } from "../../constants/enums"
import AutoPickerSelector from "./orders/AutoPickerSelector";
import { findAllAutoPickers } from "../../actions/manageUsers";
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

let thisObj;
class SelectionOrderCreatingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {
            },
            userId: props.user_id,
            isOrderCancelling: false,
            isOrderCancelled: false,
            isSavingAllowed: false,
        };
        //this.validateMessages=this.validateMessages.bund(this);
        this.onSaveOrder = this.onSaveOrder.bind(this);
        this.onCancelOrder = this.onCancelOrder.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
        this.getArrByNames = this.getArrByNames.bind(this);
        this.createOptionArr = this.createOptionArr.bind(this);
        this.createArrWithName = this.createArrWithName.bind(this);
        this.checkAllowingSave = this.checkAllowingSave.bind(this);
        this.getAutoPickers = this.getAutoPickers.bind(this);
        thisObj = this;
    }

    checkAllowingSave() {
        if (this.state.order.minYear != null &&
            this.state.order.mileage != null &&
            this.state.order.rangeFrom != null &&
            this.state.order.rangeTo != null &&
            this.state.order.currencyType != null) {
            this.setState({ isSavingAllowed: true });
        }
    }

    cancelOrder() {
        const { dispatch } = this.props;
        dispatch(changeOrderStatus(
            this.state.order.creator.id, this.state.order.id, CANCEL_ORDER_STATUS
        )).then((resp) => {
            this.setState({ isOrderCancelling: false })
            this.setState({ order: resp });
            this.render();
        })
    }

    onCancelOrder(e) {
        this.setState({ isOrderCancelling: true })
    }

    onSaveOrder(e) {
        console.log("Save order")
        const { dispatch } = this.props;
        //if (this.state.isSavingAllowed) {
        dispatch(createOrder(this.state.userId, this.state.order)).this((resp) => {
            this.setState({ order: resp })
        })
        console.log(this.state.newTransmissions)
        //}
        this.render();
    }

    getSelectedAutoPicker = (value) => {
        this.setState((state) => ({
            ...state,
            order: {
                ...state.order,
                autoPickerId: value
            }
        }))
    }

    createArrWithName(arr) {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            let obj = {
                name: arr[i]
            }
            newArr.push(obj)
        }
        return newArr;
    }

    async componentDidMount() {
        // this.setState({ order: this.props.user_order });
        // let isOrderCancelled = this.props.user_order.status.name == CANCEL_ORDER_STATUS ? true : false
        // console.log(isOrderCancelled)
        // this.setState({ isOrderCancelled: isOrderCancelled })
    }

    getArrByNames(inputArr) {
        let arr = [];
        Object.values(inputArr).forEach(function (entry) {
            arr.push(entry.name)
        })
        return arr;
    }

    createOptionArr(arr) {
        const children = [];

        for (let i = 0; i < arr.length; i++) {
            children.push(<Option key={arr[i]}>{arr[i]}</Option>);
        }
        return children
    }

    getAutoPickers() {
        const { dispatch } = this.props;
        let arr = null;
        //thisObj.setState({ userID: this.props.user_id })
        dispatch(findAllAutoPickers()).then((resp) => {
            console.log(resp)
            //thisObj.setState({ autoPickers: resp.objects })
            arr = resp.objects;
        })
        return arr;
    }

    validateMessages = {
        required: '${label} is required!',
        pattern: '${label} must contain digits and letters.',
        types: {
            email: '${label} not a valid',
            number: '${label} is not a valid number!',
            string: '${label} must be a string!'
        },
    };

    render() {
        //const [form] = useForm();
        return (
            <>
                <Card style={{
                    width: "800px"
                }}
                    align="start"
                    title="Selection order"
                    actions={[
                        <SaveOutlined title="save order"
                            onClick={(e) => this.onSaveOrder(e)}
                        />
                        ,
                        <CloseOutlined title="Cancel order" onClick={(e) => this.onCancelOrder(e)}
                        />,
                    ]}
                >
                    <Layout >
                        <Content >
                            <Layout style={{ display: 'flex', padding: 15 }} align="horizontal" >
                                <Content >
                                    <Card title="Order info" size="small"
                                    >
                                        <Form
                                            //form={form}
                                            validateMessages={this.validateMessages}
                                        >
                                            <Row>
                                                <Form.Item
                                                    label="Min year:"
                                                    name="min year"
                                                    rules={[{ required: true },
                                                    ]}
                                                >
                                                    <InputNumber
                                                        min={1900}
                                                        max={2022}
                                                        style={{ margin: '0 16px' }}

                                                        onChange={(value) => {
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
                                                    name="Mileage"
                                                    label="Mileage: "
                                                    rules={[{ required: true },
                                                    ]}>
                                                    <InputNumber
                                                        min={100}

                                                        style={{ margin: '0 16px' }}
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
                                            </Row>
                                            <p>Car price:</p>
                                            <Row>
                                                <Form.Item
                                                    label="from"
                                                    name="car price from"
                                                    style={{ marginRight: '16px' }}
                                                    rules={[{ required: true },
                                                    ]}>
                                                    <InputNumber
                                                        onChange={(value) => {
                                                            this.setState((state) => ({
                                                                ...state,
                                                                order: {
                                                                    ...state.order,
                                                                    rangeFrom: value
                                                                }
                                                            }))
                                                        }}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    style={{ marginRight: '16px' }}
                                                    name="car price to"
                                                    rules={[{ required: true },
                                                    ]}
                                                    label="to">
                                                    <InputNumber
                                                        onChange={(value) => {
                                                            this.setState((state) => ({
                                                                ...state,
                                                                order: {
                                                                    ...state.order,
                                                                    rangeTo: value
                                                                }
                                                            }))
                                                        }}
                                                    />
                                                </Form.Item>
                                                <Form.Item

                                                    label="Currency type"
                                                    name="currency type"
                                                    rules={[{ required: true },
                                                    ]}>
                                                    <Select
                                                        style={{ margin: '0 16px' }}
                                                        placeholder="Please select"
                                                        onChange={(value) => this.setState
                                                            ((state) => ({
                                                                ...state,
                                                                order: {
                                                                    ...state.order,
                                                                    currencyType: this.createArrWithName([value])[0]
                                                                }
                                                            })
                                                            )
                                                        }
                                                    >
                                                        {this.createOptionArr(CurrencyArr)}
                                                    </Select>
                                                </Form.Item>
                                            </Row>

                                            <Row >
                                                <Col>
                                                    <p>Car engine volume:</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Form.Item
                                                    label="min:"
                                                >
                                                    <InputNumber
                                                        min={0.5}
                                                        max={20}
                                                        style={{ margin: '0 16px' }}
                                                        onChange={(value) => {
                                                            this.setState((state) => ({
                                                                ...state,
                                                                order: {
                                                                    ...state.order,
                                                                    minEngineVolume: value
                                                                }
                                                            }))
                                                        }}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="max:">
                                                    <InputNumber
                                                        min={1}

                                                        max={20}
                                                        style={{ margin: '0 16px' }}
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
                                            </Row>
                                        </Form>

                                        <Form.Item
                                            label="Engine types"
                                        >
                                            <Select

                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Please select"

                                                onChange={(value) => this.setState((state) => ({
                                                    ...state,
                                                    order: {
                                                        ...state.order,
                                                        engines: this.createArrWithName(value)
                                                    }
                                                }))}
                                            >
                                                {this.createOptionArr(EngineTypeArr)}
                                            </Select>

                                        </Form.Item>

                                        <Form.Item
                                            label="Body typies"
                                        >
                                            <Select

                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Please select"
                                                onChange={(value) => this.setState((state) => ({
                                                    ...state,
                                                    order: {
                                                        ...state.order,
                                                        bodies: this.createArrWithName(value)
                                                    }
                                                }))}
                                            >
                                                {this.createOptionArr(BodyTypeArr)}
                                            </Select>

                                        </Form.Item>

                                        <Form.Item
                                            label="Brands"
                                        >
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Please select"

                                                onChange={(value) => this.setState((state) => ({
                                                    ...state,
                                                    order: {
                                                        ...state.order,
                                                        brands: this.createArrWithName(value)
                                                    }
                                                }))}
                                            >
                                                {this.createOptionArr(BrandNameArr)}
                                            </Select>

                                        </Form.Item>

                                        <Form.Item
                                            label="Drives"
                                        >
                                            <Select

                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Please select"

                                                onChange={(value) => this.setState((state) => ({
                                                    ...state,
                                                    order: {
                                                        ...state.order,
                                                        drives: this.createArrWithName(value)
                                                    }
                                                }))}
                                            >
                                                {this.createOptionArr(DriveTypeArr)}
                                            </Select>

                                        </Form.Item>

                                        <Form.Item
                                            label="Transmissions"
                                        >
                                            <Select

                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Please select"

                                                onChange={(value) => this.setState((state) => ({
                                                    ...state,
                                                    order: {
                                                        ...state.order,
                                                        transmissions: this.createArrWithName(value)
                                                    }
                                                }))}
                                            >
                                                {this.createOptionArr(TransmissionArr)}
                                            </Select>

                                        </Form.Item>

                                        <Form.Item
                                            label="Auto-picker"
                                        >
                                            <AutoPickerSelector
                                                getSelectedAutoPicker={this.getSelectedAutoPicker}
                                                array={this.getAutoPickers()}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Additional Info"
                                        >
                                            <TextArea placeholder="info about order"
                                                onChange={(value) => {
                                                    this.setState((state) => ({
                                                        ...state,
                                                        order: {
                                                            ...state.order,
                                                            additionalInfo: value
                                                        }
                                                    }))
                                                }} />
                                        </Form.Item>
                                    </Card>

                                </Content>
                            </Layout>
                        </Content>
                    </Layout>
                </Card>
                <Modal title="Really??" visible={this.state.isOrderCancelling} onOk={() => this.cancelOrder()} onCancel={() => this.setState({ isOrderCancelling: false })}>
                    <h2>Do you really want to cancel this order? </h2><br></br><h4></h4>
                </Modal>
            </ >
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { account } = state.account;
    const { message } = state.message;
    return {
        user,
        account,
        message
    };


}

export default connect(mapStateToProps)(SelectionOrderCreatingComponent);