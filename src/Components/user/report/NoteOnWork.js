import React, { Component } from 'react'
import { Descriptions, Card, } from 'antd';
let thisObj = null;

export default class NoteOnWork extends Component {
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
    console.log(noteOnWork.name);
    return (
      <Card style={{ "font-weight": 'bold' }}>
        <Descriptions>
          <Descriptions.Item
            label="Часть:"

          >{noteOnWork.name}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item
            style={{ width: '80%' }}
            label="Описание:"
          >
            {this.state.noteOnWork.description}
          </Descriptions.Item>
        </Descriptions></Card>
    )
  }
}
