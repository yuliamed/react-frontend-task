import React, { Component } from 'react'
import { Upload, Input, Form, Card, Row, Avatar, } from 'antd'
import ImgCrop from 'antd-img-crop';
import CancelButton from "../common/buttons/CancelButton"
import { editBodyPartDescription, editBodyReport, getPhoto, savePhoto } from '../../actions/orders/autopicker/manageInspectionReport';
import { connect } from "react-redux";

const { TextArea } = Input;
let thisObj = null;

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

class CarPartDescriptionReportForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: this.props.isDisabled,
      fileList: null,
      path: "",
      filePath: ""
    };
    thisObj = this;
  }

  async componentDidMount() {
    let description = this.props.description;
    const { dispatch } = this.props;
    if (description.photoUrl != null) {
      console.log(this.props.orderId);
      dispatch(getPhoto(localStorage.getItem("userId"), this.props.orderId, description.photoUrl)).then(
        (responce) => {
          this.setState({ fileList: responce })
        })
    }
    thisObj.setState({ isDisabled: this.props.isDisabled });
  }

  changeBodyReport(bodyReport) {
    const { dispatch } = this.props;
    dispatch(editBodyReport(bodyReport))
    this.setState({ isDisabled: !this.state.isDisabled })
  }

  onClickRemoveDescription() {
    this.props.onRemove(this.props.index)
  }

  onChange = info => {
    let file = null;
    let str = null;
    const { dispatch } = this.props;
    switch (info.file.status) {
      case "uploading":
        file = info.file;
        break;
      case "done":
        file = info.file;
        // let data = new FormData();
        // data.append("file", file);
        dispatch(savePhoto(localStorage.getItem("userId"), 9, file.originFileObj))
          .then(res => {
            let description = this.props.description;
            const { dispatch } = this.props;
            description.photoUrl = res;
            dispatch(editBodyPartDescription(description, this.props.id))
            this.setState({ fileList: file, filePath: res });
          });
        break;
      default:
        file = null;
    }
    console.log(str);
    this.setState({ fileList: file, filePath: str });
  };

  onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  render() {
    let description = this.props.description;

    let upload = <ImgCrop rotate style={{ width: "300px", height: "300px" }}>
      <Upload
        onPreview={this.onPreview}
        disabled={this.props.isDisabled}
        style={{ width: "300px", height: "300px" }}
        customRequest={dummyRequest}
        listType="picture-card"
        file={this.state.fileList}
        onChange={(photo) => this.onChange(photo)}
      >
        {this.state.fileList == null && '+ Upload'}
      </Upload>
    </ImgCrop>

    let imageForm = <Avatar
      size={{ xs: 240, sm: 320, md: 400, lg: 640, xl: 800, xxl: 1000 }}
      style={{ maxHeight: 400, maxWidth: 400 }}
      shape="square"
      src={`data:image/jpeg;base64,${this.state.fileList}`}
      preview={false}
    />

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
            label="Photo">
            {description.photoUrl == null ? upload : imageForm}

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

// import { Upload } from 'antd';
// import ImgCrop from 'antd-img-crop';
// import React, { useState } from 'react';
// import autoPickerReportService from '../../services/orders/autopicker/autoPickerReportService';
// const CarPartDescriptionReportForm = () => {
//   const [fileList, setFileList] = useState();
//   const onChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   }
//   const onPreview = async (file) => {
//     let src = file.url;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);
//         reader.onload = () => resolve(reader.result);
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(image.outerHTML);
//   };

//   const getUrl = (image) => {
//     console.log("object");
//     let data = new FormData();
//     data.append("file", image);
//     let str = autoPickerReportService.savePhotoUrl(localStorage.getItem("userId"), 9, data);
//     return str;
//   }
//   return (
//     <ImgCrop rotate>
//       <Upload
//         action={
//           getUrl
//         }
//         listType="picture-card"
//         file={fileList}
//         onChange={onChange}
//         onPreview={onPreview}
//       >
//         {fileList == null && '+ Upload'}

//       </Upload>
//     </ImgCrop>
//   );
// };
// export default CarPartDescriptionReportForm;
