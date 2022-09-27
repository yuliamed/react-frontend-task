import React, { Component } from 'react'
import { Modal, Divider, Form, Input, Select, Row, Col, Collapse, Button, } from 'antd';

import { EditOutlined, CloseSquareOutlined, SaveOutlined, LeftOutlined, PlusCircleOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;
let thisObj;
class SelectionReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: null,
      isDisabled: true,
    }
    thisObj = this;
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    thisObj.setState({ report: this.props.report, isDisabled: this.props.isDisabled })

  }

  render() {
    return (<>

      <Form>
        <br />
        <Form.Item
          label="Car URL"
          name="url"
          rules={[{ required: true },
          { type: 'url', warningOnly: true },
          { type: 'string', min: 6 }
          ]}

        >
          <Input
            disabled={this.state.isDisabled}
            // onChange={(value) => {
            //   this.setState((state) => ({
            //     ...state,
            //     order: {
            //       ...state.order,
            //       autoUrl: value
            //     }
            //   }))
            // }}
          />
        </Form.Item>
        <Form.Item
          name="comment"
          label="Comment"
          rules={[
            { type: 'string', max: 512 }
          ]}
        >
          <TextArea
            allowClear
            disabled={this.state.isDisabled}
            placeholder="info about order"
            // onChange={(value) => {
            //   console.log("value")
            //   this.setState((state) => ({
            //     ...state,
            //     order: {
            //       ...state.order,
            //       additionalInfo: value.target.value
            //     }
            //   }))
            // }}
          />
        </Form.Item>
      </Form></>
    )
  }
}

export default (SelectionReportForm); 