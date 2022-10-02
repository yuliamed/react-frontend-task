import React, { Component } from 'react'
import { Form, Input } from 'antd';
import { editSelectionReport } from '../../actions/orders/autopicker/manageOrders';
import { connect } from "react-redux";
const { TextArea } = Input;
let thisObj;
class SelectionReportForm extends Component {
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
    this.onChangeReport = this.onChangeReport.bind(this);
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

  onChangeReport() {
    const { report } = this.props;
    let newReport = report;
    console.log(this.props.index);
    newReport.selectedCarSet[this.props.index] = this.state.reportPart;
    const { dispatch } = this.props;
    dispatch(editSelectionReport(newReport));
  }

  render() {
    const { report } = this.props;
    return (<>

      <Form
      >
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
            disabled={this.props.isDisabled}
            defaultValue={this.props.reportPart.carUrl}
            onChange={(value) => {
              let newReportPart = report.selectedCarSet[this.props.index]
              newReportPart.carUrl = value.target.value;
              let newReport = report;
              newReport.selectedCarSet[this.props.index] = newReportPart;
              const { dispatch } = this.props;
              dispatch(editSelectionReport(newReport));
            }
            }
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
            disabled={this.props.isDisabled}
            defaultValue={this.props.reportPart.comment}
            allowClear
            placeholder="info about selected car"
            onChange={(value) => {
              let newReportPart = report.selectedCarSet[this.props.index]
              newReportPart.comment = value.target.value;
              let newReport = report;
              newReport.selectedCarSet[this.props.index] = newReportPart;
              const { dispatch } = this.props;
              dispatch(editSelectionReport(newReport));
            }}
          />
        </Form.Item>
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

export default connect(mapStateToProps)(SelectionReportForm);