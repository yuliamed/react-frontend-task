import { Card, Descriptions,} from 'antd'
import React, { Component } from 'react'
import NoteOnWork from './NoteOnWork';

let thisObj = null;

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
  }

  async componentDidMount() {
    thisObj.setState({
      report: this.props.report,
      isDisabled: !this.props.isCreating,
    })
  }

  render() {
    let report = this.props.report;
    let descriptions = [];
    if (report != null && report.noteOnWorkSet.length != 0)
      for (let i = 0; i < report.noteOnWorkSet.length; i++) {
        descriptions.push(
          <div key={report.noteOnWorkSet[i].id}>
            <NoteOnWork id={i}
              isDisabled={this.state.isDisabled}
              index={i}
              noteOnWork={report.noteOnWorkSet[i]} /></div>
        );
      }
    return (
      <Card>
        <Descriptions>
        <Descriptions.Item
          label="Уровень масла"
        >{this.props.report.oilPure}
        </Descriptions.Item></Descriptions>
        {descriptions}
      </Card>
    )
  }
}
