import React, { Component } from 'react'
import { Row, Button, Input, Card, } from 'antd';
import { PlusCircleOutlined, SaveOutlined, EditOutlined } from '@ant-design/icons';
import { START_REPORT_PROCESS } from '../../../constants/colors';
import NoteOnWorkForm from './NoteOnWorkForm';

let thisObj = null;
let counting = 0;

export default class TransmissionReportComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noteOnWorkSet: [],
      isDisabled: true
    };
    thisObj = this;
    this.onDeleteNoteToTransmission = this.onDeleteNoteToTransmission.bind(this);
  }

  async componentDidMount() {
    thisObj.setState({
      noteOnWorkSet: this.props.report,
      isDisabled: !this.props.isCreating
    })
  }

  onAddNewNoteToTransmission() {
    let newSet = this.state.noteOnWorkSet;
    newSet.push({
      name: "",
      description: "",
      id: ++counting,
    })
    this.props.onEditNoteSet(newSet)
    this.setState({ noteOnWorkSet: newSet })
  }

  onDeleteNoteToTransmission(index) {
    let newSet = this.state.noteOnWorkSet;
    newSet.splice(index, 1);
    this.props.onEditNoteSet(newSet)
    this.setState({ noteOnWorkSet: newSet })
  }

  onEditInfo() {
    this.setState({ isDisabled: false })
  }

  onSaveEditedInfo() {
    this.props.onSaveReport({ noteOnWorkSet: this.state.noteOnWorkSet })
    this.setState({ isDisabled: true })
  }

  render() {
    let report = this.props.report;
    let descriptions = [];
    if (report != null && report.length != 0)
      for (let i = 0; i < report.length; i++) {
        descriptions.push(
          <div key={report[i].id}>
            <NoteOnWorkForm id={i}
              isDisabled={this.state.isDisabled}
              index={i}
              noteOnWork={report[i]}
              onEdit={this.props.onEditNoteOnWork}
              onRemove={this.onDeleteNoteToTransmission} />
          </div>
        );
      }
    return (
      <Card>
        {this.props.isCreating ? <></> :
          <Row align="end" style={{ marginBottom: '10px' }}>
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
              </Button>}
          </Row>
        }
        <Row align="end" >
          <Button type="primary" hidden={this.state.isDisabled} style={{
            background: START_REPORT_PROCESS,
            borderColor: START_REPORT_PROCESS, marginBottom: 10
          }}
            shape="round"
            onClick={() => {
              this.onAddNewNoteToTransmission();
            }}>
            <PlusCircleOutlined />Добавить
          </Button></Row>
        {descriptions}
      </Card>
    )
  }
}
