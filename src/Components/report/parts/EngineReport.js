import { Card, Form, Input, Row, Button } from 'antd'
import React, { Component } from 'react'
import { PlusCircleOutlined } from '@ant-design/icons';
import { START_REPORT_PROCESS } from '../../../constants/colors';
import NoteOnWorkForm from './NoteOnWorkForm';
const { TextArea } = Input;
let thisObj = null;
export default class EngineReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      report: {
        noteOnWorkSet: [],
        oilPure: ""
      },

    };
    thisObj = this;
  }

  async componentDidMount() {
    thisObj.setState({
      report: this.props.report
    })
  }
  onAddNewNote() {
    let newSet = this.state.report.noteOnWorkSet;
    newSet.push({
      name: "",
      description: "",
    })
    let newREport = this.state.report;
    newREport.noteOnWorkSet = newSet;
    this.props.onChangeReport(newREport)
    this.setState({ report: newREport })

  }

  render() {
    let report = this.props.report;
    let descriptions = [];
    if (report != null && report.noteOnWorkSet.length != 0)
      for (let i = 0; i < report.noteOnWorkSet.length; i++) {
        descriptions.push(
          <NoteOnWorkForm id={i}
            index={i}
            noteOnWork={report.noteOnWorkSet[i]}
            onEdit={this.props.onEditNoteOnWork} />
        );
      }
    return (
      <Card>
        <Form.Item
          style={{ width: '80%' }}

          label="Pure Oil"
        >
          <Input placeholder="Pure oil"
            defaultValue={
              this.props.report.oilPure
            }
            onChange={(value) => {
              let newReport = this.state.report;
              newReport.oilPure = value.target.value;
              this.setState({ report: newReport })
              this.props.onChangeReport(newReport);
            }} />
        </Form.Item>
        <Row align="end" >
          <Button type="primary" style={{
            background: START_REPORT_PROCESS,
            borderColor: START_REPORT_PROCESS, marginBottom: 10
          }}
            shape="round"
            onClick={() => {
              this.onAddNewNote();
            }}>
            <PlusCircleOutlined />Add Report
          </Button>
        </Row>
        {descriptions}
      </Card>
    )
  }
}
