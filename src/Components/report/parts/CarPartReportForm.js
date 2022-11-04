import React, { Component } from 'react'
import { Form, InputNumber, Input, Space, Button, Col, Row, Slider } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import CarPartDescriptionReportForm from '../CarPartDescriptionReportForm';
import { PlusCircleOutlined } from '@ant-design/icons';
import { START_REPORT_PROCESS } from '../../../constants/colors';
import { connect } from "react-redux";

const { TextArea } = Input;
let thisObj = null;
let counting = 0;

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
      markValue: null,
      isDisabled: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onDeleteDescription = this.onDeleteDescription.bind(this);
    thisObj = this;
  }

  async componentDidMount() {
    const { report } = this.props;
    console.log(report);
    thisObj.setState({
      markValue: this.props.report.bodyReport.mark,
      reportPart: this.props.reportPart,
      isDisabled: !this.props.isCreating
    })
  }

  onEditInfo() {
    this.setState({ isDisabled: false })
  }

  onSaveEditedInfo() {
    this.props.onSaveReport(this.state.reportPart)
    this.setState({ isDisabled: true })
  }

  onAddNewDescription() {
    let newReport = this.state.reportPart;
    let newDescription =
      { comment: '', photoUrl: null, recommendation: "", describingPart: "", id: ++counting }
    newReport.descriptions.push(newDescription);
    console.log("add part");
    this.props.onChangeBodyReport(newReport);
    this.setState({ reportPart: newReport })
  }

  onChange(newValue) {
    let newReport = this.state.reportPart;
    newReport.mark = newValue;
    this.props.onChangeBodyReport(newReport);
    this.setState({ reportPart: newReport })
  };

  onDeleteDescription(index) {
    let newReport = this.state.reportPart;
    newReport.descriptions.splice(index, 1);
    this.props.onChangeBodyReport(newReport);
    this.setState({ report: newReport });
  }

  render() {
    const { order, } = this.props;
    //const { order } = this.props.userOrder;
    let bodyReport = this.props.reportPart;
    let descriptions = [];
    if (bodyReport != null && bodyReport.descriptions.length != 0)
      for (let i = 0; i < bodyReport.descriptions.length; i++) {
        descriptions.push(
          <div key={bodyReport.descriptions[i].id}>
            <CarPartDescriptionReportForm id={i}
              orderId={order.id}
              onRemove={this.onDeleteDescription}
              isDisabled={this.state.isDisabled}
              description={bodyReport.descriptions[i]}
              onEdit={this.props.onEditBodyDescription} /></div>
        );
      }

    return (
      <><Form>
        {this.props.isCreating ? <></> :
          <Row style={{ margin: '10px' }} align="end">
            {this.state.isDisabled ?
              <Button type="primary"
                shape="round"
                onClick={() => { this.onEditInfo() }} >
                <EditOutlined size={"large"} />
                Редактировать
              </Button>
              : <Button type="primary"
                shape="round"
                onClick={() => { this.onSaveEditedInfo() }} >
                <SaveOutlined size={"large"} />
                Сохранить
              </Button>}</Row>}
        <Form.Item
          label="Оценка"
          name="Оценка"
          rules={[{ required: true },
          ]}
        >
          <Row style={{ margin: '10px' }}>
            <Col span={12}>
              <Slider
                disabled={this.state.isDisabled}
                min={1}
                max={10}
                defaultValue={bodyReport.mark}
                onChange={(v) => this.onChange(v)}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                disabled={this.state.isDisabled}
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

          label="Комментарий"
        >
          <TextArea placeholder="Информация по машине"
            defaultValue={
              this.props.reportPart.generalComment
            }
            disabled={this.state.isDisabled}
            onChange={(value) => {
              let newReport = this.state.reportPart;
              newReport.generalComment = value.target.value;
              this.setState({ reportPart: newReport })
              this.props.onChangeBodyReport(newReport);
            }} />
        </Form.Item>
        <Form.Item
          style={{ width: '80%' }}
          label="Рекомендации"
        >
          <TextArea placeholder="Рекомендации по машине"
            defaultValue={
              this.props.reportPart.generalRecommendation
            }
            disabled={this.state.isDisabled}
            onChange={(value) => {
              let newReport = this.state.reportPart;
              newReport.generalRecommendation = value.target.value;
              this.setState({ reportPart: newReport })
              this.props.onChangeBodyReport(newReport);
            }} />
        </Form.Item>
        <Row align="end" >
          <Button hidden={this.state.isDisabled} type="primary" style={{
            background: START_REPORT_PROCESS,
            borderColor: START_REPORT_PROCESS, marginBottom: 10
          }}
            shape="round"
            onClick={() => {
              this.onAddNewDescription();
            }}>
            <PlusCircleOutlined />Добавить отчёт
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

//export default (CarPartReportForm);
