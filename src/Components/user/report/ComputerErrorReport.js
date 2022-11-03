import React, { Component } from 'react'
import {Card, } from 'antd';
import ComputerError from './ComputerError';

let thisObj = null;
let counting = 0;

export default class ComputerErrorReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carComputerErrors: [],
      isDisabled: true
    };
    thisObj = this;
  }

  async componentDidMount() {
    thisObj.setState({
      carComputerErrors: this.props.report,
      isDisabled: !this.props.isCreating
    })
  }

  render() {
    let report = this.props.report;
    let descriptions = [];
    if (report != null && report.length != 0)
      for (let i = 0; i < report.length; i++) {
        descriptions.push(
          <div key={report[i].id}>
            <ComputerError id={i}
              isDisabled={this.state.isDisabled}
              index={i}
              noteOnWork={report[i]} />
          </div>
        );
      }
    return (
      <Card>
        {descriptions}
      </Card>
    )
  }
}
