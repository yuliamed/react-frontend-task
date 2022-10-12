import React, { Component } from 'react'
import { Row, Button, Input, Card, } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { START_REPORT_PROCESS } from '../../../constants/colors';
import NoteOnWorkForm from './NoteOnWorkForm';
let thisObj = null;
export default class TransmissionReportComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noteOnWorkSet: []
    };
    thisObj = this;
  }

  async componentDidMount() {
    thisObj.setState({
      noteOnWorkSet: this.props.report,
    })
  }
  onAddNewNoteToTransmission() {
    let newSet = this.state.noteOnWorkSet;
    newSet.push({
      name: "",
      description: "",
    })
    this.props.onAddNewNoteToTransmission(newSet)
    this.setState({ noteOnWorkSet: newSet })

  }

  render() {
    let report = this.props.report;
    let descriptions = [];
    if (report != null && report.length != 0)
      for (let i = 0; i < report.length; i++) {
        descriptions.push(
          <NoteOnWorkForm id={i}
            index={i}
            noteOnWork={report[i]}
            onEdit={this.props.onEditNoteOnWork} />
        );
      }
    return (
      <Card>
        <Row align="end" >
          <Button type="primary" style={{
            background: START_REPORT_PROCESS,
            borderColor: START_REPORT_PROCESS, marginBottom: 10
          }}
            shape="round"
            onClick={() => {
              this.onAddNewNoteToTransmission();
            }}>
            <PlusCircleOutlined />Add Report
          </Button>
        </Row>{descriptions}</Card>
    )
  }
}
