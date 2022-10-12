import React, { Component } from 'react'
import { Row, Col, Button, Divider, Collapse, } from 'antd';
import { connect } from "react-redux";
import { EditOutlined, SaveOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { START_REPORT_PROCESS } from '../../constants/colors';
import { createSelectionReport, saveEditedSelectionReport, saveNewSelectionReport } from '../../actions/orders/autopicker/manageOrders';
import { changeOrderStatus } from '../../actions/orders/userOrder';
import { ORDER_STATUSES } from '../../constants/const';
import MainCarCharacteristic from './MainCarCharacteristic'
import { editBodyReport, editBodyPartDescription, editTransmissionReport, editEngineReport } from '../../actions/orders/autopicker/manageInspectionReport';

import CarPartReportForm from './parts/CarPartReportForm';
import TransmissionReportComponent from './parts/TransmissionReportComponent';
import EngineReport from './parts/EngineReport';
const { Panel } = Collapse;
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
    this.changeBodyReport = this.changeBodyReport.bind(this);
    this.onEditBodyDescription = this.onEditBodyDescription.bind(this);
    this.onEditEngineReport = this.onEditEngineReport.bind(this);
    this.onEditEngineNoteOnWork = this.onEditEngineNoteOnWork.bind(this);
    this.onEditTransNoteOnWork = this.onEditTransNoteOnWork.bind(this);
    this.onAddNewNoteToTransmission = this.onAddNewNoteToTransmission.bind(this);
  }

  async componentDidMount() {
    // const { dispatch } = this.props;
    // thisObj.setState({ orderId: this.props.orderId })
    // const { autoPicker, order } = this.props;
    // console.log(autoPicker);
    // dispatch(getSelectionReport(order.report))
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
    const { report, order } = this.props;
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

  changeBodyReport(bodyReport) {
    const { dispatch } = this.props;
    dispatch(editBodyReport(bodyReport))
    this.setState({ isDisabled: !this.state.isDisabled })
  }

  onEditBodyDescription(description, id) {
    const { dispatch } = this.props;
    dispatch(editBodyPartDescription(description, id))
  }

  onEditTransNoteOnWork(noteOnWork, id) {
    const { dispatch, report } = this.props;
    let transmissionReport = report.transmissionReport;
    transmissionReport.noteOnWorkSet[id] = noteOnWork;
    report.transmissionReport = transmissionReport;
    dispatch(editTransmissionReport(report));
  }

  onAddNewNoteToTransmission(newSet) {
    const { dispatch, report } = this.props;
    let transmissionReport = report.transmissionReport;
    transmissionReport.noteOnWorkSet = newSet;
    report.transmissionReport = transmissionReport;
    dispatch(editTransmissionReport(report));
  }

  onEditEngineNoteOnWork(noteOnWork, id) {
    const { dispatch, report } = this.props;
    let engineReport = report.engineReport;
    engineReport.noteOnWorkSet[id] = noteOnWork;
    report.transmissionReport = engineReport;
    dispatch(editEngineReport(report));
  }

  onEditEngineReport(newEngineReport){
    const { dispatch, report } = this.props;
    let newReport = report;
    newReport.engineReport = newEngineReport;
    dispatch(editEngineReport(newReport));
  }

  render() {
    const { report, } = this.props;
    console.log(report);
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
      <div style={{ marginLeft: "4%", marginRight: "4%" }}>
        <Row align='end' style={{ marginLeft: "50px" }}>
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
        <Divider orientation="left">Main car information</Divider>
        <MainCarCharacteristic />
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Body report" key="1" >
            <CarPartReportForm reportPart={report.bodyReport}
              onEditBodyDescription={this.onEditBodyDescription}
              onChangeBodyReport={(rep) => this.changeBodyReport(rep)} />
          </Panel>
          <Panel header="Salon report" key="2">
            <CarPartReportForm reportPart={report.salonReport}
              onEditBodyDescription={this.onEditBodyDescription}
              onChangeBodyReport={(rep) => this.changeBodyReport(rep)} />
          </Panel>
          <Panel header="Electrical equipment report" key="3">
            <CarPartReportForm
              reportPart={report.electricalEquipmentReport
              }
              onEditBodyDescription={this.onEditBodyDescription}
              onChangeBodyReport={(rep) => this.changeBodyReport(rep)} />
          </Panel>
          <Panel header="Pendant report" key="4">
            <CarPartReportForm reportPart={report.pendantReport
            }
              onEditBodyDescription={this.onEditBodyDescription}
              onChangeBodyReport={(rep) => this.changeBodyReport(rep)} />
          </Panel>
          <Panel header="Transmission report" key="5">
            <TransmissionReportComponent report={report.transmissionReport.noteOnWorkSet}
              onEditNoteOnWork={this.onEditTransNoteOnWork}
              onAddNewNoteToTransmission={this.onAddNewNoteToTransmission}
            />
          </Panel>
          <Panel header="Engine report" key="6">
            <EngineReport report={report.engineReport} 
            onChangeReport={this.onEditEngineReport}
            onEditNoteOnWork={this.onEditEngineNoteOnWork}
            />
          </Panel>
        </Collapse >
        {/* <Divider orientation="left">Body report</Divider> */}

      </div>
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

export default connect(mapStateToProps)(InspectionReportComponent);
