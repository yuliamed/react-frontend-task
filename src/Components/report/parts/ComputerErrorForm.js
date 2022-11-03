import React, { Component } from 'react'
import { Form, Input, Card, Row } from 'antd';
import CancelButton from '../../common/buttons/CancelButton';

const { TextArea } = Input;
let thisObj = null;


export default class ComputerErrorForm extends Component {
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

  onClickRemoveNote() {
    console.log("object");
    this.props.onRemove(this.props.index);
  }

  render() {
    let noteOnWork = this.props.noteOnWork;
    console.log(noteOnWork.name);
    return (
      <Card>
        <Row justify="end" style={{ marginBottom: "15px" }}>
          <CancelButton onClick={() => this.onClickRemoveNote()}
           hidden={this.props.isDisabled} />
        </Row>
        <Form>
          <Form.Item
            label="Название ошибки"
            name="Название ошибки"
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
            label="Описание"
            name="Описание"
          >
            <TextArea placeholder="Напишите описание ошибки"
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
