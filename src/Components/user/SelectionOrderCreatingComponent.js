import React, { Component } from "react";
import { connect } from "react-redux";
import { EditOutlined, MenuUnfoldOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Layout, Form, Input, Modal, Select, Row, Col, Slider, InputNumber } from 'antd';
import { updateOrder } from "../../actions/orders/userSelectionOrders"
import { changeOrderStatus } from "../../actions/orders/userOrder"
import { CANCEL_ORDER_STATUS } from "../../constants/const"
import { BodyTypeArr, BrandNameArr, TransmissionArr, OrderStatusArr, EngineTypeArr, DriveTypeArr, CurrencyArr, } from "../../constants/enums"
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

let thisObj;

class SelectionOrderCreatingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: props.user_order,
            isDisabled: true,
            isOrderCancelling: false,
            isOrderCancelled: false,
        };
        this.onEditInfo = this.onEditInfo.bind(this);
        this.onSaveEditedInfo = this.onSaveEditedInfo.bind(this);
        this.onCancelOrder = this.onCancelOrder.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
        this.getArrByNames = this.getArrByNames.bind(this);
        this.createOptionArr = this.createOptionArr.bind(this);
        this.createArrWithName = this.createArrWithName.bind(this);
        thisObj = this;
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

    onEditInfo(e) {
        this.setState({ isDisabled: false })
        this.render();
        console.log(e)
    }

    onSaveEditedInfo(e) {
        this.setState({ isDisabled: true })
        const { dispatch } = this.props;

        dispatch(updateOrder(this.state.order.creator.id, this.state.order.id, this.state.order)).this((resp) => {
            this.setState({ order: resp })
        })
        console.log(this.state.newTransmissions)
        this.render();
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
        this.setState({ order: this.props.user_order });
        let isOrderCancelled = this.props.user_order.status.name == CANCEL_ORDER_STATUS ? true : false
        console.log(isOrderCancelled)
        this.setState({ isOrderCancelled: isOrderCancelled })
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

    render() {

        return (
            <>
                <Card style={{
                    width: "800px"
                }} align="start" title="Inspection order"
                    actions={[this.state.isOrderCancelled ? <></> :
                        this.state.isDisabled ?
                            <EditOutlined title="Edit order" visible={false} onClick={(e) => this.onEditInfo(e)} /> :
                            <SaveOutlined title="save order" onClick={(e) => this.onSaveEditedInfo(e)} />
                        ,
                    this.state.isOrderCancelled ? <></> : <CloseOutlined title="Cancel order" onClick={(e) => this.onCancelOrder(e)} />,
                    ]}>
                    <Layout >
                        <Content >
                            <Layout style={{ display: 'flex', padding: 15 }} align="horizontal" >
                                <Content >
                                    <Card title="Main data" size="small">
                                        <p><b>Date of order: </b>{this.state.order.creationDate.substr(0, 10)} </p>
                                        <p><b>Status of order: </b>{this.state.order.status.name}</p>
                                        <p><b>Auto-picker: </b> {this.state.order.autoPicker == null ? "does not set yet" : this.state.order.autoPicker.name}</p>

                                    </Card>
                                    <Card title="Order info" size="small">

                                        <Row style={{ marginBottom: "10px" }}>
                                            <Col >
                                                <p>Min year:</p>
                                            </Col>
                                            <Col span={10}>
                                                <InputNumber
                                                    disabled={this.state.isDisabled}
                                                    min={1900}
                                                    max={2022}
                                                    style={{ margin: '0 16px' }}
                                                    value={this.state.order.minYear}

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
                                            </Col>
                                            <p>Mileage: </p>
                                            <Col span={4}>
                                                <InputNumber
                                                    min={100}
                                                    disabled={this.state.isDisabled}
                                                    style={{ margin: '0 16px' }}
                                                    value={this.state.order.mileage}
                                                    onChange={(value) => {
                                                        this.setState((state) => ({
                                                            ...state,
                                                            order: {
                                                                ...state.order,
                                                                mileage: value
                                                            }
                                                        }))
                                                    }}
                                                />
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
                                                <InputNumber

                                                    disabled={this.state.isDisabled}

                                                    style={{ margin: '0 16px' }}
                                                    value={this.state.order.rangeFrom}
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
                                            </Col>
                                            <p>to: </p>
                                            <Col span={4}>
                                                <InputNumber

                                                    disabled={this.state.isDisabled}
                                                    style={{ margin: '0 16px' }}
                                                    value={this.state.order.rangeTo}
                                                // onChange={onChange}
                                                />
                                            </Col>
                                            <Col span={4}>

                                                <Select
                                                    disabled={this.state.isDisabled}

                                                    style={{ margin: '0 16px' }}
                                                    placeholder="Please select"
                                                    defaultValue={this.state.order.currencyType.name}
                                                    onChange={(value) => this.setState((state) => ({
                                                        ...state,
                                                        order: {
                                                            ...state.order,
                                                            currencyType: this.createArrWithName([value])[0]
                                                        }
                                                    }))}
                                                >
                                                    {this.createOptionArr(CurrencyArr)}
                                                </Select>


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
                                                <InputNumber
                                                    min={0.5}
                                                    max={20}
                                                    disabled={this.state.isDisabled}
                                                    style={{ margin: '0 16px' }}
                                                    value={this.state.order.minEngineVolume}
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
                                            </Col>
                                            <p>max: </p>
                                            <Col span={4}>
                                                <InputNumber
                                                    min={1}
                                                    disabled={this.state.isDisabled}
                                                    max={20}
                                                    style={{ margin: '0 16px' }}
                                                    value={this.state.order.maxEngineVolume}
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
                                            </Col>
                                            <Col span={4}>
                                                <p>L</p>
                                            </Col>

                                        </Row>
                                        <Row >

                                        </Row>

                                        <Form.Item
                                            label="Engine types"
                                        >
                                            <Select
                                                disabled={this.state.isDisabled}
                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Please select"
                                                defaultValue={() => {
                                                    let arr = this.getArrByNames(this.state.order.engines);
                                                    this.setState({ newTransmissions: arr });
                                                    return arr;
                                                }}
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
                                            label="Additional Info"
                                        >
                                            <TextArea placeholder="info about order" disabled={this.state.isDisabled} defaultValue={this.state.order.additionalInfo}
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
                                        <Form.Item
                                            label="Body typies"
                                        >
                                            <Select
                                                disabled={this.state.isDisabled}
                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Please select"
                                                defaultValue={
                                                    () => {
                                                        let arr = this.getArrByNames(this.state.order.bodies);
                                                        this.setState({ newTransmissions: arr });
                                                        return arr;
                                                    }

                                                }
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
                                                disabled={this.state.isDisabled}
                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Please select"
                                                defaultValue={() => {
                                                    let arr = this.getArrByNames(this.state.order.brands);
                                                    this.setState({ newBrands: arr });
                                                    return arr;
                                                }}
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
                                                disabled={this.state.isDisabled}
                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Please select"
                                                defaultValue={
                                                    () => {
                                                        let arr = this.getArrByNames(this.state.order.drives);
                                                        this.setState({ newDrives: arr });
                                                        return arr;
                                                    }
                                                }
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
                                                disabled={this.state.isDisabled}
                                                mode="multiple"
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Please select"
                                                defaultValue={() => {
                                                    let arr = this.getArrByNames(this.state.order.transmissions);
                                                    this.setState({ newTransmissions: arr });
                                                    return arr;
                                                }}
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



                                    </Card>

                                </Content>
                            </Layout>
                        </Content>
                    </Layout>
                </Card>
                <Modal title="Really??" visible={this.state.isOrderCancelling} onOk={() => this.cancelOrder()} onCancel={() => this.setState({ isOrderCancelling: false })}>

                    <h2>Do you really want to cancel this order? </h2><br></br><h4>Auto Picker will stop processing it(</h4>

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