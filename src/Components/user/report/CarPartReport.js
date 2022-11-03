import React, { Component } from 'react'
import { Descriptions, } from 'antd';
import CarPartDescriptionReport from './CarPartDescriptionReport';
import { connect } from "react-redux";
let thisObj = null;

class CarPartReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reportPart: {
        mark: 1,
        generalRecommendation: "",
        generalComment: "",
        descriptions: [],
      },
      markValue: null,
      isDisabled: true,
    };
    thisObj = this;
  }

  async componentDidMount() {
    const { report } = this.props;
    console.log(report);
    thisObj.setState({
      markValue: this.props.report.bodyReport.mark,
      reportPart: this.props.reportPart,
      isDisabled: !this.props.isCreating
    })
  }


  render() {
    let bodyReport = this.props.reportPart;
    let descriptions = [];
    if (bodyReport != null && bodyReport.descriptions.length != 0)
      for (let i = 0; i < bodyReport.descriptions.length; i++) {
        console.log(bodyReport.descriptions[i].id);
        descriptions.push(
          <div key={bodyReport.descriptions[i].id}>
            <CarPartDescriptionReport id={i}
              orderId={this.props.orderId}
              isDisabled={this.state.isDisabled}
              description={bodyReport.descriptions[i]}/></div>
        );
      }

    return (
      <><Descriptions style={{ "font-weight": 'bold', margin: 10 }}>
        <Descriptions.Item
          label="Оценка"
          name="Оценка"

        >
          {this.state.reportPart.mark}

        </Descriptions.Item>
        <Descriptions.Item

          label="Комментарий"
        >
          {this.props.reportPart.generalComment}

        </Descriptions.Item>
        <Descriptions.Item
          label="Рекомендация"
        >
          {this.props.reportPart.generalRecommendation}
        </Descriptions.Item>
        <Descriptions.Item
        >
          {descriptions}
        </Descriptions.Item>
      </Descriptions></>
    )
  }
}


function mapStateToProps(state) {
  const { order } = state.autoPicker;
  return {
    order
  };
}
 export default connect(mapStateToProps)(CarPartReport);