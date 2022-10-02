import React, { Component } from 'react'
import { Row, Col, Button, } from 'antd';
import { connect } from "react-redux";
import { EditOutlined, SaveOutlined, PlusCircleOutlined } from '@ant-design/icons';
import SelectionReportForm from './SelectionReportForm';
import { START_REPORT_PROCESS } from '../../constants/colors';
import { createSelectionReport, editSelectionReport, getSelectionReport, saveEditedSelectionReport, saveNewSelectionReport } from '../../actions/orders/autopicker/manageOrders';
import { changeOrderStatus } from '../../actions/orders/userOrder';
import { ORDER_STATUSES } from '../../constants/const';
import SelectionReportDescription from './SelectionReportDescription';
let thisObj;
class InspectionReportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: null,
      isDisabled: true,
      isReportCreating: false,
      int: 0,
    }
    thisObj = this;
    this.onAddNewReportForm = this.onAddNewReportForm.bind(this);
    this.onEditInfo = this.onEditInfo.bind(this);
    this.onSaveEditedInfo = this.onSaveEditedInfo.bind(this);
    this.onCreatNewReport = this.onCreatNewReport.bind(this);
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    thisObj.setState({ orderId: this.props.orderId })
    const { autoPicker, order } = this.props;
    console.log(autoPicker);
    dispatch(getSelectionReport(order.report))
  }

  onEditInfo() {
    this.setState({ isDisabled: false })
  }

  onSaveEditedInfo() {
    const { report } = this.props;
    const { dispatch } = this.props;
    if (this.state.isReportCreating)
      dispatch(saveNewSelectionReport(localStorage.getItem("userId"),
        this.state.orderId, report))
        .then(() => {
          this.setState({ isDisabled: true, isReportCreating: false })
        })
    else
      dispatch(saveEditedSelectionReport(localStorage.getItem("userId"),
        this.state.orderId, report))
        .then(() => {
          this.setState({ isDisabled: true })
        })
  }

  onAddNewReportForm() {
    const { report } = this.props;
    const { dispatch } = this.props;
    let newReport = report;
    let newReportPart = {
      selectedCarSet: [
        { comment: '', carUrl: "" }
      ]
    }
    newReport.selectedCarSet.push(newReportPart);
    dispatch(saveEditedSelectionReport(localStorage.getItem("userId"),
      this.state.orderId, newReport))
      .then(() => {
        this.setState({ isDisabled: false })
      })
  }

  onCreatNewReport() {
    this.setState({ isReportCreating: true, isDisabled: false });
    console.log("Create new report");
    let newReport = {
      selectedCarSet: [
        { comment: '', carUrl: "" }
      ]
    }
    const { dispatch } = this.props;
    dispatch(changeOrderStatus(localStorage.getItem("userId"), this.state.orderId, ORDER_STATUSES.IN_PROCESS));
    dispatch(createSelectionReport(newReport));
  }

  render() {
    const { report, order } = this.props;
    console.log(report);

    let arr = [];
    if (report != null && report.selectedCarSet.length != 0)
      for (let i = 0; i < report.selectedCarSet.length; i++) {
        arr.push(
          this.props.isEdittingAllowed != "false" ?
          
          <SelectionReportForm reportPart={report.selectedCarSet[i]}
            isDisabled={this.state.isDisabled}
            key={i}
            index={i}
          ></SelectionReportForm> 
          :
           <SelectionReportDescription reportPart={report.selectedCarSet[i]}
            isDisabled={this.state.isDisabled}
            key={i}
            index={i} />
        )
      }

    let visibleButton =
      report == null ?
        <Button shape="round"
          type="primary"
          style={{ background: START_REPORT_PROCESS, borderColor: START_REPORT_PROCESS }}
          onClick={() =>

            this.onCreatNewReport()
          }>
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
            {this.props.isEdittingAllowed != "false" ?
              visibleButton : <></>
            }
          </Col>
        </Row>
        <br />
        <Row align="end" >
          <Button hidden={this.state.isDisabled} shape="circle" onClick={() => {
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

function mapStateToProps(state) {
  const { report } = state.autoPicker;
  const { order } = state.userOrder;
  return {
    report, order
  };
}

export default connect(mapStateToProps)(InspectionReportComponent);
