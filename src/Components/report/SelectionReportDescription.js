import React, { Component } from 'react'
import { Modal, Descriptions, Form, Input, Select, Row, Col, Collapse, Button, InputNumber, } from 'antd';
import { editSelectionReport } from '../../actions/orders/autopicker/manageOrders';
import { connect } from "react-redux";
const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;
let thisObj;
class SelectionReportDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportPart: {
        carUrl: "",
        comment: ""
      },
      isDisabled: true,
      index: this.props.index,
      carUrl: ""
    }
    thisObj = this;
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    console.log(this.props.index);
    thisObj.setState({
      reportPart: this.props.reportPart,
      isDisabled: this.props.isDisabled,
      key: this.props.index
    })
  }


  render() {
    const { report } = this.props;
    return (<>

      <Form
      >
        <br />

        <Descriptions contentStyle={{ "font-weight": 'bold' }}>
          <Descriptions.Item
            label="Car URL"
            style={{ margin: '0 16px' }}
          >
            <a>{this.props.reportPart.carUrl}</a>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions contentStyle={{ "font-weight": 'bold' }}>
          <Descriptions.Item
            label="Additional comment"
            style={{ margin: '0 16px' }}
          >
            {this.props.reportPart.comment}
          </Descriptions.Item>
        </Descriptions>
      </Form></>
    )
  }
}

function mapStateToProps(state) {
  const { report } = state.autoPicker;
  const { order } = state.userOrder;
  return {
    report, order
  };
}

export default connect(mapStateToProps)(SelectionReportDescription);