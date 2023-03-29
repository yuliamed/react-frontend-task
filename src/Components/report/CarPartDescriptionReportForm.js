import React, { Component } from 'react'
import { Input, Form, Card, Row, Image } from 'antd'
import CancelButton from "../common/buttons/CancelButton"
import { editBodyPartDescription, editBodyReport, getPhoto, } from '../../actions/orders/autopicker/manageInspectionReport';
import { connect } from "react-redux";
import UploadPhoto from './parts/UploadPhoto';

const { TextArea } = Input;
let thisObj = null;

class CarPartDescriptionReportForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: this.props.isDisabled,
      fileList: null,
      path: "",
      filePath: "",
      description: "",
      comment: "",
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

  validateMessages = {
    required: '${label} обязательно!',
  };

  checkSaving() {
    if (this.state.comment == "" || this.state.description == "") return false
    return true
  }

  setPhotoUrl(url) {
    let description = this.props.description;
    const { dispatch } = this.props;
    description.photoUrl = url;
    dispatch(editBodyPartDescription(description, this.props.id))
    this.setState({ filePath: url });
    dispatch(getPhoto(localStorage.getItem("userId"), this.props.orderId, url)).then(
      (responce) => {
        this.setState({ fileList: responce });
      })
  }

  render() {
    let description = this.props.description;
    
    return (
      <><Card style={{ width: 450 }}>
        <Row justify="end" style={{ marginBottom: "15px" }}>
          <CancelButton onClick={() => this.onClickRemoveDescription()}
            hidden={this.props.isDisabled} />
        </Row>
        <Form
          onChange={() => this.props.onChange(this.checkSaving())}
          validateMessages={this.validateMessages}>
          <Form.Item
            name="Название части машины"
            rules={[{
              required: true,
            }]}
            label="Название части машины"
          >
            <Input
              disabled={this.props.isDisabled}
              defaultValue={description.describingPart}
              onChange={
                (value) => {
                  description.describingPart = value.target.value;
                  this.props.onEdit(description);
                  this.setState({ description: value })
                }}
            >
            </Input>
          </Form.Item>

          <Form.Item
            name="Комментарий"
            rules={[{
              required: true,
            }]}
            label="Комментарий"
          >
            <TextArea placeholder="Комментарии по машине"
              disabled={this.props.isDisabled}
              defaultValue={description.comment}
              onChange={
                (value) => {
                  const { dispatch } = this.props;
                  description.comment = value.target.value;
                  dispatch(editBodyPartDescription(description, this.props.id))
                  this.setState({ comment: value })
                }} />
          </Form.Item>
          <Form.Item
            label="Рекомендация"
          >
            <TextArea placeholder="Рекомендации по машине"
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
            label="Фотография">
            {//description.photoUrl 
              this.state.fileList == null ? <UploadPhoto isDisabled={this.props.isDisabled} setUrl={(url) => this.setPhotoUrl(url)} />
                :
                <Image
                  width={200}
                  src={`data:image/jpeg;base64, ${this.state.fileList}`}
                />
              // console.log(this.state.fileList)
            }
            {/* <UploadPhoto isDisabled={this.props.isDisabled} setUrl={(url) => this.setPhotoUrl(url)} /> */}
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

// import { Upload, Button, Modal } from 'antd';
// import ImgCrop from 'antd-img-crop';
// //import React, { useState } from 'react';
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


// import React, { Component } from 'react'
// import { connect } from "react-redux";
// import { editBodyPartDescription, editBodyReport, getPhoto, savePhoto } from '../../actions/orders/autopicker/manageInspectionReport';
// class CarPartDescriptionReportForm extends Component {
//   state = {
//     previewVisible: false,
//     previewImage: "",
//     fileList: [],
//   };

//   handleCancel = () => this.setState({ previewVisible: false });

//   handlePreview = file => {
//     this.setState({
//       previewImage: file.thumbUrl,
//       previewVisible: true
//     });
//   };

//   handleUpload = ({ fileList }) => {
//     //---------------^^^^^----------------
//     // this is equivalent to your "const img = event.target.files[0]"
//     // here, antd is giving you an array of files, just like event.target.files
//     // but the structure is a bit different that the original file
//     // the original file is located at the `originFileObj` key of each of this files
//     // so `event.target.files[0]` is actually fileList[0].originFileObj
//     console.log('fileList', fileList);

//     // you store them in state, so that you can make a http req with them later
//     this.setState({ fileList: fileList });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     const { dispatch } = this.props;
//     // let formData = new FormData();
//     // add one or more of your files in FormData
//     // again, the original file is located at the `originFileObj` key
//     // formData.append("file", this.state.fileList[0].originFileObj);

//     // axios
//     //   .post("http://api.foo.com/bar", formData)
//     //   .then(res => {
//     //     console.log("res", res);
//     //   })
//     //   .catch(err => {
//     //     console.log("err", err);
//     //   });

//     //file = info.file;
//     // let data = new FormData();
//     // data.append("file", file);
//     dispatch(savePhoto(localStorage.getItem("userId"), 22, this.state.fileList[0].originFileObj))
//       .then(res => {
//         let description = this.props.description;
//         const { dispatch } = this.props;
//         description.photoUrl = res;
//         console.log(res);
//         // dispatch(editBodyPartDescription(description, this.props.id))
//         // this.setState({ filePath: res });
//       })
//   }


//   render() {
//     const { previewVisible, previewImage, fileList } = this.state;
//     const uploadButton = (
//       <div>
//         {/* <Icon type="plus" /> */}
//         <div className="ant-upload-text" >Upload</div>
//       </div>
//     );
//     return (
//       <div>
//         <Upload
//           disabled={fileList.length >= 1}
//           listType="picture-card"
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleUpload}
//           beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
//         >
//           {uploadButton}
//         </Upload>

//         <Button onClick={this.handleSubmit} // this button click will trigger the manual upload
//         >
//           Submit
//         </Button>

//         <Modal
//           visible={previewVisible}
//           footer={null}
//           onCancel={this.handleCancel}
//         >
//           <img alt="example" style={{ width: "100%" }} src={previewImage} />
//         </Modal>
//       </div>
//     );
//   }

// }

// function mapStateToProps(state) {
//   const { report } = state.autoPicker;
//   const { order } = state.userOrder;
//   return {
//     report, order
//   };
// }

// export default connect(mapStateToProps)(CarPartDescriptionReportForm);


