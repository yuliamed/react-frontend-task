import React, { Component } from 'react'
import { Form, Input, Card } from 'antd';

const { TextArea } = Input;
let thisObj = null;

export default class NoteOnWorkForm extends Component {
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
      <Card><Form>
        <Form.Item
          label="Part name"
          name="Name"
          rules={[{ required: true },
          ]}
        >
          <Input
            disabled={this.props.isDisabled}
            style={{ margin: '0 16px' }}
            value={noteOnWork.name}
            defaultValue={noteOnWork.name}
            onChange={(v) => {
              noteOnWork.name = v.target.value;
              this.props.onEdit(noteOnWork, this.props.index);
            }}
          />
        </Form.Item>
        <Form.Item
          style={{ width: '80%' }}
          label="Description"
          name="Description"
        >
          <TextArea placeholder="Description about work"
            defaultValue={
              this.state.noteOnWork.description

            }
            disabled={this.props.isDisabled}
            onChange={(v) => {
              noteOnWork.description = v.target.value;
              this.props.onEdit(noteOnWork, this.props.index);
            }} />
        </Form.Item>
      </Form></Card>
    )
  }
}
