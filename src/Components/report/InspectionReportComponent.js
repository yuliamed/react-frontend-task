import React, { Component } from 'react'
import { Row, Col, Button, Divider, Collapse, } from 'antd';
import { connect } from "react-redux";
import { SaveOutlined, CheckCircleOutlined} from '@ant-design/icons';
import { START_REPORT_PROCESS } from '../../constants/colors';
import { saveEditedSelectionReport, } from '../../actions/orders/autopicker/manageOrders';
import { changeOrderStatus } from '../../actions/orders/userOrder';
import { ORDER_STATUSES } from '../../constants/const';
import { editBodyReport, editBodyPartDescription, editTransmissionReport, editEngineReport, saveEditedMainDataReport, saveEditedBodyReport, saveEditedSalonReport, saveEditedElectroReport, saveEditedPendantReport, saveEditedTransmissionReport, saveEditedEngineReport, createInspectionReport, saveNewInspectionReport, editMainReportData, saveEditedComputerErrorsReport, editComputerErrorsReport } from '../../actions/orders/autopicker/manageInspectionReport';
import CarPartReportForm from './parts/CarPartReportForm';
import TransmissionReportComponent from './parts/TransmissionReportComponent';
import EngineReport from './parts/EngineReport';
import ComputerErrorReportComponent from './parts/ComputerErrorReportComponent';
import MainCarCharacteristic from './MainCarCharacteristic'
const { Panel } = Collapse;
let thisObj;
class InspectionReportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: null,
      isDisabled: true,
      isEdittingAllowed: true,
      isReportCreating: false,
      int: 0,
      order: null
    }
    thisObj = this;
    this.onAddNewReportForm = this.onAddNewReportForm.bind(this);
    this.onEditInfo = this.onEditInfo.bind(this);
    this.onSaveReport = this.onSaveReport.bind(this);
    this.onCreatNewReport = this.onCreatNewReport.bind(this);
    this.changeBodyReport = this.changeBodyReport.bind(this);
    this.onEditBodyDescription = this.onEditBodyDescription.bind(this);
    this.onEditEngineReport = this.onEditEngineReport.bind(this);
    this.onEditEngineNoteOnWork = this.onEditEngineNoteOnWork.bind(this);
    this.onEditTransNoteOnWork = this.onEditTransNoteOnWork.bind(this);
    this.onEditNoteToTransmission = this.onEditNoteToTransmission.bind(this);
    this.onEditCarError = this.onEditCarError.bind(this);
    this.onEditCarErrorsReport = this.onEditCarErrorsReport.bind(this);
    this.saveEditedMainInfo = this.saveEditedMainInfo.bind(this);
  }

  async componentDidMount() {
    const { order } = this.props;
    thisObj.setState({ orderId: order.id, order: order })
    // const { autoPicker, order } = this.props;
    // console.log(autoPicker);
    // dispatch(getSelectionReport(order.report))
  }

  render() {
    const { report, order} = this.props;
    console.log(report);
    let visibleButton =
      report == null ?
        <Button shape="round"
          type="primary"
          style={{ background: START_REPORT_PROCESS, borderColor: START_REPORT_PROCESS }}
          onClick={() =>
            this.onCreatNewReport()
          }>
          Создать отчёт
        </Button> : <></>
    return (
      report == null ? visibleButton :
        <div style={{ marginLeft: "4%", marginRight: "4%" }}>
          <Row align='end' style={{ marginLeft: "50px" }}>
            <Col >
              {this.state.isReportCreating ?
                <Button type="primary"
                  shape="round"
                  onClick={() => { this.onSaveReport() }} >
                  <SaveOutlined size={"large"} />
                  Сохранить
                </Button> : <></>}
            </Col>
            <Col >
              <div hidden={order.status.name != ORDER_STATUSES.IN_PROCESS 
                || this.props.isEdittingAllowed}>
                <Button
                  style={{ background: START_REPORT_PROCESS, borderColor: START_REPORT_PROCESS }}
                  shape="circle"
                  type="primary" onClick={() => this.props.onCloseProccess()}>
                  <CheckCircleOutlined />
                </Button>
                </div>
            </Col>
          </Row>
          <br />
          <Divider orientation="left">Основная информация</Divider>
          <MainCarCharacteristic report={report}
            onChange={(report) => this.onChangeMainInfo(report)}
            isCreating={this.state.isReportCreating}
            saveEditedInfo={(info) => this.saveEditedMainInfo(info)} />
          <Collapse defaultActiveKey={["1"]}>
            <Panel header="Состояние кузова" key="1" >
              <CarPartReportForm reportPart={report.bodyReport}
                onEditBodyDescription={this.onEditBodyDescription}
                isCreating={this.state.isReportCreating}
                onChangeBodyReport={(rep) => this.changeBodyReport(rep)}
                onSaveReport={(rep) => this.onSaveBodyReport(rep)} />
            </Panel>
            <Panel header="Состояние салона" key="2">
              <CarPartReportForm reportPart={report.salonReport}
                onEditBodyDescription={this.onEditBodyDescription}
                isCreating={this.state.isReportCreating}
                onChangeBodyReport={(rep) => this.changeBodyReport(rep)}
                onSaveReport={(rep) => this.onSavePendantReport(rep)} />
            </Panel>
            <Panel header="Состояние электрики" key="3">
              <CarPartReportForm
                reportPart={report.electricalEquipmentReport
                }
                onEditBodyDescription={this.onEditBodyDescription}
                isCreating={this.state.isReportCreating}
                onChangeBodyReport={(rep) => this.changeBodyReport(rep)}
                onSaveReport={(rep) => this.onSaveElectricReport(rep)} />
            </Panel>
            <Panel header="Состояние подвески" key="4">
              <CarPartReportForm reportPart={report.pendantReport}
                onEditBodyDescription={this.onEditBodyDescription}
                isCreating={this.state.isReportCreating}
                onChangeBodyReport={(rep) => this.changeBodyReport(rep)}
                onSaveReport={(rep) => this.onSavePendantReport(rep)} />
            </Panel>
            <Panel header="Состояние трансмиссии" key="5">
              <TransmissionReportComponent report={report.transmissionReport.noteOnWorkSet}
                onEditNoteOnWork={this.onEditTransNoteOnWork}
                onEditNoteSet={this.onEditNoteToTransmission}
                isCreating={this.state.isReportCreating}
                onSaveReport={(rep) => this.onSaveTransmissionReport(rep)}
              />
            </Panel>
            <Panel header="Состояние двигателя" key="6">
              <EngineReport isCreating={this.state.isReportCreating} report={report.engineReport}
                onChangeReport={this.onEditEngineReport}
                onEditNoteOnWork={this.onEditEngineNoteOnWork}
                onSaveReport={(rep) => this.onSaveEngineReport(rep)}
              />
            </Panel>
            <Panel header="Компьюреные ошибки" key="7">
              <ComputerErrorReportComponent isCreating={this.state.isReportCreating}
                report={report.carComputerErrors}
                onChangeReport={this.onEditCarErrorsReport}
                onEditNoteSet={this.onEditCarError}
                onSaveReport={(rep) => this.onSaveComperErrorsReport(rep)}
              />
            </Panel>
          </Collapse >
          {/* <Divider orientation="left">Body report</Divider> */}

        </div>
    )
  }

  
  onEditInfo() {
    this.setState({ isDisabled: false })
  }

  onSaveReport() {
    const { report } = this.props;
    const { dispatch } = this.props;
    dispatch(saveNewInspectionReport(localStorage.getItem("userId"),
      this.state.orderId, report))
      .then(() => {
        this.setState({ isDisabled: true, isReportCreating: false })
      })
      // todo тут выводить надо нормальную ошибку
      .catch((error) => alert("Есть ошибки в заполнении полей! = " + error))

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
      model: "",
      year: 2000,
      engineVolume: 2,
      inspectionDate: new Date(),
      mileage: 1000,
      isMileageReal: true,
      vinNumber: "",
      isVinNumberReal: true,
      costValue: 0,
      auctionValue: 0,
      currencyType: {
        name: ""
      },
      drive: {
        name: ""
      },
      body: {
        name: ""
      },
      transmission: {
        name: ""
      },
      engine: {
        name: ""
      },
      brand: {
        name: ""
      },
      engineReport: {
        oilPure: "",
        noteOnWorkSet: []
      },
      transmissionReport: {
        noteOnWorkSet: []
      },
      salonReport: {
        mark: "",
        generalComment: "",
        generalRecommendation: "",
        descriptions: []
      },
      bodyReport: {
        mark: "",
        generalComment: "",
        generalRecommendation: "",
        descriptions: []
      },
      electricalEquipmentReport: {
        mark: "",
        generalComment: "",
        generalRecommendation: "",
        descriptions: []
      },
      pendantReport: {
        mark: "",
        generalComment: "",
        generalRecommendation: "",
        descriptions: []
      },
      carComputerErrors: []

    }
    const { dispatch } = this.props;
    dispatch(changeOrderStatus(localStorage.getItem("userId"), this.state.orderId, ORDER_STATUSES.IN_PROCESS));
    dispatch(createInspectionReport(newReport));
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

  onEditNoteToTransmission(newSet) {
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

  onEditCarError(noteOnWork, id) {
    const { dispatch, report } = this.props;
    let carErrorReport = report.carComputerErrors;
    carErrorReport[id] = noteOnWork;
    report.carComputerErrors = carErrorReport;
    dispatch(editComputerErrorsReport(report));
  }

  onEditEngineReport(newEngineReport) {
    const { dispatch, report } = this.props;
    let newReport = report;
    newReport.engineReport = newEngineReport;
    dispatch(editEngineReport(newReport));
  }

  onEditCarErrorsReport(newCarErrorsReport) {
    const { dispatch, report } = this.props;
    let newReport = report;
    newReport.carComputerErrors = newCarErrorsReport;
    dispatch(editComputerErrorsReport(newReport));
  }

  onChangeMainInfo(report) {
    const { dispatch } = this.props;
    dispatch(editMainReportData(report));
  }

  saveEditedMainInfo(mainInfo) {
    const { dispatch } = this.props;
    dispatch(saveEditedMainDataReport(localStorage.getItem("userId"), this.state.orderId, mainInfo));
  }

  onSaveSalonReport(report) {
    const { dispatch } = this.props;
    dispatch(saveEditedSalonReport(localStorage.getItem("userId"), this.state.orderId, report));
  }

  onSaveBodyReport(report) {
    const { dispatch } = this.props;
    dispatch(saveEditedBodyReport(localStorage.getItem("userId"), this.state.orderId, report));
  }

  onSaveElectricReport(report) {
    const { dispatch } = this.props;
    dispatch(saveEditedElectroReport(localStorage.getItem("userId"), this.state.orderId, report));
  }

  onSavePendantReport(report) {
    const { dispatch } = this.props;
    dispatch(saveEditedPendantReport(localStorage.getItem("userId"), this.state.orderId, report));
  }

  onSaveTransmissionReport(report) {
    const { dispatch } = this.props;
    dispatch(saveEditedTransmissionReport(localStorage.getItem("userId"), this.state.orderId, report));
  }

  onSaveEngineReport(report) {
    const { dispatch } = this.props;
    dispatch(saveEditedEngineReport(localStorage.getItem("userId"), this.state.orderId, report));
  }

  onSaveComperErrorsReport(report) {
    const { dispatch } = this.props;
    dispatch(saveEditedComputerErrorsReport(localStorage.getItem("userId"), this.state.orderId, report));
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
