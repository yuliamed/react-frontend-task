import React, { Component } from 'react'
import { Upload, Input, Button, Form, Card, Row } from 'antd'
import { PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

import { editBodyPartDescription, editBodyReport, saveEditedBodyReport } from '../../actions/orders/autopicker/manageInspectionReport';
import { connect } from "react-redux";
const { TextArea } = Input;
let thisObj = null;
class CarPartDescriptionReportForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
      isDisabled: false,
    };
    //this.onChange = props.onChange();
    thisObj = this;
  }

  changeBodyReport(bodyReport) {
    const { dispatch } = this.props;
    dispatch(editBodyReport(bodyReport))
    this.setState({ isDisabled: !this.state.isDisabled })
  }

  render() {
    let description = this.props.description;
    //console.log("report");
    return (
      <><Card style={{ width: 450 }}>
        <Row align="end" >
          <Button type="primary" danger shape="circle" onClick={() => {
            console.log("Add form");
          }}>
            <CloseOutlined />
          </Button>
        </Row>
        <br />
        <Form>
          <Form.Item
            label="Name of car part"
          >
            <Input
              defaultValue={description.describingPart}
              onChange={
                (value)=>{
                  description.describingPart = value.target.value;
                  this.props.onEdit(description);
              }}
              >
              </Input>
          </Form.Item>

          <Form.Item
            label="Comment"
          >

            <TextArea placeholder="info about car part"
              defaultValue={description.comment}
              onChange={
                (value)=>{
                  const { dispatch } = this.props;
                  description.comment = value.target.value;
                  dispatch(editBodyPartDescription(description, this.props.id))
              }}/>
          </Form.Item>
          <Form.Item
            label="Recommendation"
          >
            <TextArea placeholder="Recommendation about car part"
              defaultValue={description.recommendation}
              onChange={
                (value)=>{
                  const { dispatch } = this.props;
                  description.recommendation = value.target.value;
                  dispatch(editBodyPartDescription(description, this.props.id))
              }} />
          </Form.Item>
          <Form.Item
            label="Photo"
          ><ImgCrop
            style={{
              height: "30px"
            }}>
              <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                action={(image) => this.onSaveImage(image)}
                beforeUpload={this.beforeUpload}
                onChange={(image) => this.onSaveImage(image)}
                onPreview={this.onPreview}
              >
                <Button icon={<PlusSquareOutlined />} ></Button>
              </Upload>
            </ImgCrop>
          </Form.Item>

        </Form></Card></>
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

export default connect(mapStateToProps)(CarPartDescriptionReportForm);
