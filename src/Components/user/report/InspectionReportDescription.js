import React, { Component } from 'react'
import { Divider, Row, Col, Collapse, Button, } from 'antd';
import CarPartReportForm from '../../report/parts/CarPartReportForm';
import TransmissionReportComponent from '../../report/parts/TransmissionReportComponent';
import EngineReport from '../../report/parts/EngineReport';
import ComputerErrorReportComponent from '../../report/parts/ComputerErrorReportComponent';
import MainCarCharacteristic from '../../report/MainCarCharacteristic'
import MainInfoReport from './MainInfoReport';

const { Panel } = Collapse;

export default class InspectionReportDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReportCreating: false,

    };
  }
  render() {
    const { report, } = this.props;
    console.log(report);
    return (
      <div style={{ marginLeft: "4%", marginRight: "4%" }}>
        <Divider orientation="left">Main car information</Divider>
        <MainInfoReport
          report={report} />
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Body report" key="1" >
            <CarPartReportForm reportPart={report.bodyReport}
              onEditBodyDescription={this.onEditBodyDescription}
              isCreating={this.state.isReportCreating}
              onChangeBodyReport={(rep) => this.changeBodyReport(rep)}
              onSaveReport={(rep) => this.onSaveBodyReport(rep)} />
          </Panel>
          <Panel header="Salon report" key="2">
            <CarPartReportForm reportPart={report.salonReport}
              onEditBodyDescription={this.onEditBodyDescription}
              isCreating={this.state.isReportCreating}
              onChangeBodyReport={(rep) => this.changeBodyReport(rep)}
              onSaveReport={(rep) => this.onSavePendantReport(rep)} />
          </Panel>
          <Panel header="Electrical equipment report" key="3">
            <CarPartReportForm
              reportPart={report.electricalEquipmentReport
              }
              onEditBodyDescription={this.onEditBodyDescription}
              isCreating={this.state.isReportCreating}
              onChangeBodyReport={(rep) => this.changeBodyReport(rep)}
              onSaveReport={(rep) => this.onSaveElectricReport(rep)} />
          </Panel>
          <Panel header="Pendant report" key="4">
            <CarPartReportForm reportPart={report.pendantReport}
              onEditBodyDescription={this.onEditBodyDescription}
              isCreating={this.state.isReportCreating}
              onChangeBodyReport={(rep) => this.changeBodyReport(rep)}
              onSaveReport={(rep) => this.onSavePendantReport(rep)} />
          </Panel>
          <Panel header="Transmission report" key="5">
            <TransmissionReportComponent report={report.transmissionReport.noteOnWorkSet}
              onEditNoteOnWork={this.onEditTransNoteOnWork}
              onEditNoteSet={this.onEditNoteToTransmission}
              isCreating={this.state.isReportCreating}
              onSaveReport={(rep) => this.onSaveTransmissionReport(rep)}
            />
          </Panel>
          <Panel header="Engine report" key="6">
            <EngineReport isCreating={this.state.isReportCreating}
              report={report.engineReport}
              onChangeReport={this.onEditEngineReport}
              onEditNoteOnWork={this.onEditEngineNoteOnWork}
              onSaveReport={(rep) => this.onSaveEngineReport(rep)}
            />
          </Panel>
          <Panel header="Computer errors" key="7">
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
}
