import React, { Component } from 'react'
import { Descriptions, Input, Card, } from 'antd';

const { TextArea } = Input;
let thisObj = null;


export default class ComputerError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteOnWork: {
        name: "",
        description: "",
      },
    };
    thisObj = this;
  }

  async componentDidMount() {
    thisObj.setState({
      noteOnWork: this.props.noteOnWork
    })
  }

  render() {
    let noteOnWork = this.props.noteOnWork;
    return (
      <Card>
        <Descriptions>
          <Descriptions.Item
            label="Название ошибки"
          >{noteOnWork.name}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item
            style={{ width: '80%' }}
            label="Описание"
          >{this.state.noteOnWork.description}
          </Descriptions.Item>
        </Descriptions></Card>
    )
  }
}
