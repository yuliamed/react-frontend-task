import React, { Component } from 'react'
import { Row, Col, Button, } from 'antd';
import { connect } from "react-redux";
import { EditOutlined, SaveOutlined, PlusCircleOutlined } from '@ant-design/icons';
import SelectionReportForm from './SelectionReportForm';
import { START_REPORT_PROCESS } from '../../constants/colors';
let thisObj;
class SelectionReportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: null,
      reports: null,
      isDisabled: true,
      isReportCreating: false,
      reportsForms: [],
    }
    thisObj = this;
    this.onAddNewReportForm = this.onAddNewReportForm.bind(this);
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    let reportsForms = [];
    if (this.state.reports != null) {
      for (let i = 0; i < this.state.reports.size; i++) {
        reportsForms.push(<SelectionReportForm report={this.state.reports[i]} isDisabled={this.state.isDisabled}></SelectionReportForm>)
      }
    }
    reportsForms.push(<SelectionReportForm />);
    reportsForms.push(<SelectionReportForm />)
    thisObj.setState({ orderId: this.props.orderId, reports: this.props.reports, reportsForms: reportsForms })
  }

  onAddNewReportForm() {
    console.log("Дoбавляю");
    let arr = this.state.reportsForms;
    arr.push(<SelectionReportForm ></SelectionReportForm>);
    this.setState((state)=>({...state, reportsForms:arr}))
  }

  render() {
    let arr = this.state.reportsForms;
    let visibleButton =
      this.state.reports == null ?
        <Button shape="round"
          type="primary"
          style={{ background: START_REPORT_PROCESS, borderColor: START_REPORT_PROCESS }}
          onClick={() => {
            this.setState({ isReportCreating: true });
            this.onAddNewReportForm();
          }}>
          Create report
        </Button> :
        this.state.isDisabled ?
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
          </Button>


    return (
      <>
        <Row align='end'>
          <Col >
            {
              visibleButton
            }
          </Col>
        </Row>
        <br />
        <Row align="end" >
          <Button hidden={!this.state.isReportCreating} shape="circle" onClick={() => {
            this.onAddNewReportForm();
          }}>
            <PlusCircleOutlined />
          </Button>
        </Row>
        {arr}
      </>
    )
  }
}

export default (SelectionReportComponent);