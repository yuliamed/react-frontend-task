import React, { Component } from 'react'
import { Descriptions, Form, } from 'antd';
import { connect } from "react-redux";
let thisObj;
class SelectionReportDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportPart: {
        carUrl: "",
        comment: ""
      },
      isDisabled: true,
      index: this.props.index,
      carUrl: ""
    }
    thisObj = this;
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    console.log(this.props.index);
    thisObj.setState({
      reportPart: this.props.reportPart,
      isDisabled: this.props.isDisabled,
      key: this.props.index
    })
  }


  render() {
    return (<>

      <Form
      >
        <br />

        <Descriptions contentStyle={{ "font-weight": 'bold' }}>
          <Descriptions.Item
            label="Ссылка на автомобиль"
            style={{ margin: '0 16px' }}
          >
            <a>{this.props.reportPart.carUrl}</a>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions contentStyle={{ "font-weight": 'bold' }}>
          <Descriptions.Item
            label="Дополнительный комментарий"
            style={{ margin: '0 16px' }}
          >
            {this.props.reportPart.comment}
          </Descriptions.Item>
        </Descriptions>
      </Form></>
    )
  }
}

function mapStateToProps(state) {
  const { report } = state.autoPicker;
  const { order } = state.userOrder;
  return {
    report, order
  };
}

export default connect(mapStateToProps)(SelectionReportDescription);