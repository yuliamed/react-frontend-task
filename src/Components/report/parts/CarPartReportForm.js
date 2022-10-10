import React, { Component } from 'react'
import { Form, InputNumber, Input, Space, Button, Col, Row, Slider } from 'antd';
import CarPartDescriptionReportForm from '../CarPartDescriptionReportForm';
import { PlusCircleOutlined } from '@ant-design/icons';
import { START_REPORT_PROCESS } from '../../../constants/colors';
import { connect } from "react-redux";
const { TextArea } = Input;
let thisObj = null;
class CarPartReportForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reportPart: {
        mark: 1,
        generalRecommendation: "",
        generalComment: "",
        descriptions: [],
      },
      markValue: props.report.mark,
      isDisabled: false,
    };
    this.onChange = this.onChange.bind(this);
    thisObj = this;
  }

  async componentDidMount() {
    const { report, order } = this.props;
    console.log(report);
    thisObj.setState({
      markValue: this.props.report.bodyReport.mark,
      reportPart: this.props.reportPart
    })
  }

  onAddNewDescription() {
    let newReport = this.state.reportPart;
    let newDescription =
      { comment: '', photoUrl: "", recommendation: "", describingPart: "" }
    newReport.descriptions.push(newDescription);
    this.props.onChangeBodyReport(newReport);
    this.setState({ reportPart: newReport })
  }

  onChange(newValue) {
    let newReport = this.state.reportPart;
    newReport.mark = newValue;
    this.props.onChangeBodyReport(newReport);
    this.setState({ reportPart: newReport })
  };

  render() {

    let bodyReport = this.props.reportPart;
    let descriptions = [];
    if (bodyReport != null && bodyReport.descriptions.length != 0)
      for (let i = 0; i < bodyReport.descriptions.length; i++) {
        descriptions.push(
          <CarPartDescriptionReportForm id={i}
            description={bodyReport.descriptions[i]}
            onEdit={this.props.onEditBodyDescription} />
        );
      }

    return (
      <><Form>
        <Form.Item
          label="Mark"
          name="Mark"
          rules={[{ required: true },
          ]}
        >
          <Row style={{ margin: '10px' }}>
            <Col span={12}>
              <Slider
                min={1}
                max={10}
                defaultValue={bodyReport.mark}
                onChange={(v) => this.onChange(v)}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={10}
                style={{ margin: '0 16px' }}
                value={this.state.reportPart.mark}
                defaultValue={bodyReport.mark}
                onChange={(v) => this.onChange(v)}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          style={{ width: '80%' }}

          label="Comment"
        >
          <TextArea placeholder="info about car part"
            defaultValue={
              this.props.reportPart.generalComment
            }
            onChange={(value) => {
              let newReport = this.state.reportPart;
              newReport.generalComment = value.target.value;
              this.setState({ reportPart: newReport })
              this.props.onChangeBodyReport(newReport);
            }} />
        </Form.Item>
        <Form.Item
          style={{ width: '80%' }}
          label="Recommendation"
        >
          <TextArea placeholder="Recommendation about car part"
            defaultValue={
              this.props.reportPart.generalRecommendation
            }
            onChange={(value) => {
              let newReport = this.state.reportPart;
              newReport.generalRecommendation = value.target.value;
              this.setState({ reportPart: newReport })
              this.props.onChangeBodyReport(newReport);
            }} />
        </Form.Item>
        <Row align="end" >
          <Button type="primary" style={{
            background: START_REPORT_PROCESS,
            borderColor: START_REPORT_PROCESS, marginBottom: 10
          }}
            shape="round"
            onClick={() => {
              this.onAddNewDescription();
            }}>
            <PlusCircleOutlined />Add Report
          </Button>
        </Row>
        <Space direction='horizontal' align="baseline" wrap>
          {descriptions}
        </Space>

      </Form></>
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

export default connect(mapStateToProps)(CarPartReportForm);
