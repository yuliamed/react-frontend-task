import { Card, Form, Input, Row, Button } from 'antd'
import React, { Component } from 'react'
import { PlusCircleOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { START_REPORT_PROCESS } from '../../../constants/colors';
import NoteOnWorkForm from './NoteOnWorkForm';

let thisObj = null;
let counting = 0;

export default class EngineReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      report: {
        noteOnWorkSet: [],
        oilPure: ""
      },
      isDisabled: true,
      isCreating: false
    };
    thisObj = this;
    this.onDeleteNote = this.onDeleteNote.bind(this);
  }

  async componentDidMount() {
    thisObj.setState({
      report: this.props.report,
      isDisabled: !this.props.isCreating,
      //isCreating: this.props.isCreating,
    })
  }

  onAddNewNote() {
    let newSet = this.state.report.noteOnWorkSet;
    newSet.push({
      name: "",
      description: "",
      id: ++counting,
    })
    let newREport = this.state.report;
    newREport.noteOnWorkSet = newSet;
    this.props.onChangeReport(newREport)
    this.setState({ report: newREport })
  }

  onDeleteNote(index) {
    let newSet = this.state.report.noteOnWorkSet;
    newSet.splice(index, 1);
    let newReport = this.state.report;
    newReport.noteOnWorkSet = newSet;
    this.props.onChangeReport(newSet)
    this.setState({ report: newReport })
  }

  onEditInfo() {
    this.setState({ isDisabled: false })
  }

  onSaveEditedInfo() {
    this.props.onSaveReport(this.state.report)
    this.setState({ isDisabled: true })
  }

  render() {
    let report = this.props.report;
    let descriptions = [];
    if (report != null && report.noteOnWorkSet.length != 0)
      for (let i = 0; i < report.noteOnWorkSet.length; i++) {
        descriptions.push(
          <div key={report.noteOnWorkSet[i].id}>
            <NoteOnWorkForm id={i}
              isDisabled={this.state.isDisabled}
              onRemove={this.onDeleteNote}
              index={i}
              noteOnWork={report.noteOnWorkSet[i]}
              onEdit={this.props.onEditNoteOnWork} /></div>
        );
      }
    return (
      <Card>
        {this.props.isCreating ? <></> :
          <Row align="end" style={{ marginBottom: '10px' }} >
            {this.state.isDisabled ?
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
              </Button>}
          </Row>}
        <Form.Item
          style={{ width: '80%' }}

          label="Pure Oil"
        >
          <Input placeholder="Pure oil"
            disabled={this.state.isDisabled}
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
            hidden={this.state.isDisabled}
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
