import React, { Component } from 'react'
import { Upload, Input, Button, Form, Card, Row } from 'antd'
import { PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import CancelButton from "../common/buttons/CancelButton"
import { editBodyPartDescription, editBodyReport } from '../../actions/orders/autopicker/manageInspectionReport';
import { connect } from "react-redux";

const { TextArea } = Input;
let thisObj = null;

class CarPartDescriptionReportForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: this.props.isDisabled,
    };
    thisObj = this;
  }

  async componentDidMount() {
    thisObj.setState({ isDisabled: this.props.isDisabled });
  }

  changeBodyReport(bodyReport) {
    const { dispatch } = this.props;
    dispatch(editBodyReport(bodyReport))
    this.setState({ isDisabled: !this.state.isDisabled })
  }

  onClickRemoveDescription(){
    this.props.onRemove(this.props.index)
  }

  render() {
    let description = this.props.description;
    return (
      <><Card style={{ width: 450 }}>
       <Row justify="end" style={{ marginBottom: "15px" }}>
          <CancelButton onClick={() => this.onClickRemoveDescription()}
           hidden={this.props.isDisabled} />
        </Row>
        <Form>
          <Form.Item
            label="Name of car part"
          >
            <Input
            disabled={this.props.isDisabled}
              defaultValue={description.describingPart}
              onChange={
                (value) => {
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
            disabled={this.props.isDisabled}
              defaultValue={description.comment}
              onChange={
                (value) => {
                  const { dispatch } = this.props;
                  description.comment = value.target.value;
                  dispatch(editBodyPartDescription(description, this.props.id))
                }} />
          </Form.Item>
          <Form.Item
            label="Recommendation"
          >
            <TextArea placeholder="Recommendation about car part"
            disabled={this.props.isDisabled}
              defaultValue={description.recommendation}
              onChange={
                (value) => {
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
              disabled={this.props.isDisabled}
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                action={(image) => this.onSaveImage(image)}
                beforeUpload={this.beforeUpload}
                onChange={(image) => this.onSaveImage(image)}
                onPreview={this.onPreview}
              >
                <Button disabled={this.props.isDisabled} icon={<PlusSquareOutlined />} ></Button>
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
