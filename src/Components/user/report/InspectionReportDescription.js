import React, { Component } from 'react'
import { Divider, Row, Col, Collapse, Button, } from 'antd';
import EngineReport from './EngineReport';
import ComputerErrorReportComponent from '../../report/parts/ComputerErrorReportComponent';
import MainInfoReport from './MainInfoReport';
import CarPartReport from './CarPartReport';
import TransmissionReport from './TransmissionReport'
import ComputerErrorReport from './ComputerErrorReport'

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
        <Divider orientation="left">Основная информация</Divider>
        <MainInfoReport
          report={report} />
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Состояние кузова" key="1" >
            <CarPartReport orderId={this.props.orderId} reportPart={report.bodyReport}
            />
          </Panel>
          <Panel header="Состояние салона" key="2">
            <CarPartReport orderId={this.props.orderId} reportPart={report.salonReport}
            />
          </Panel>
          <Panel header="Состояние электрики" key="3">
            <CarPartReport
              orderId={this.props.orderId}
              reportPart={report.electricalEquipmentReport}
            />
          </Panel>
          <Panel header="Состояние подвески" key="4">
            <CarPartReport reportPart={report.pendantReport} orderId={this.props.orderId}
            />
          </Panel>
          <Panel header="Состояние трансмиссии" key="5">
            <TransmissionReport report={report.transmissionReport.noteOnWorkSet}
            />
          </Panel>
          <Panel header="Состояние двигателя" key="6">
            <EngineReport isCreating={this.state.isReportCreating}
              report={report.engineReport}
            />
          </Panel>
          <Panel header="Компьютерные ошибки" key="7">
            <ComputerErrorReport isCreating={this.state.isReportCreating}
              report={report.carComputerErrors}
            />
          </Panel>
        </Collapse >
        {/* <Divider orientation="left">Body report</Divider> */}

      </div>
    )
  }
}
