import React, { Component } from 'react'
import { connect } from "react-redux";
import { Upload, Button, Modal } from 'antd';

//import React, { useState } from 'react';
//import autoPickerReportService from '../../services/orders/autopicker/autoPickerReportService';
import { editBodyPartDescription, editBodyReport, getPhoto, savePhoto } from '../../../actions/orders/autopicker/manageInspectionReport';
class UploadPhoto extends Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true
    });
  };

  handleUpload = ({ fileList }) => {
    //---------------^^^^^----------------
    // this is equivalent to your "const img = event.target.files[0]"
    // here, antd is giving you an array of files, just like event.target.files
    // but the structure is a bit different that the original file
    // the original file is located at the `originFileObj` key of each of this files
    // so `event.target.files[0]` is actually fileList[0].originFileObj
    console.log('fileList', fileList);

    // you store them in state, so that you can make a http req with them later
    this.setState({ fileList: fileList });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch } = this.props;
    // let formData = new FormData();
    // add one or more of your files in FormData
    // again, the original file is located at the `originFileObj` key
    // formData.append("file", this.state.fileList[0].originFileObj);

    // axios
    //   .post("http://api.foo.com/bar", formData)
    //   .then(res => {
    //     console.log("res", res);
    //   })
    //   .catch(err => {
    //     console.log("err", err);
    //   });

    //file = info.file;
    // let data = new FormData();
    // data.append("file", file);
    dispatch(savePhoto(localStorage.getItem("userId"), 22, this.state.fileList[0].originFileObj))
      .then(res => {
        //let description = this.props.description;
        //const { dispatch } = this.props;
        //description.photoUrl = res;
        console.log(res);
        this.props.setUrl(res);
        // dispatch(editBodyPartDescription(description, this.props.id))
        // this.setState({ filePath: res });
      }).catch(error => { alert("Не сохранилось!") })
  }


  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        {/* <Icon type="plus" /> */}
        <div className="ant-upload-text" >Загрузить</div>
      </div>
    );
    return (
      <div>
        <Upload
          disabled={fileList.length >= 1 || this.props.isDisabled}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleUpload}
          beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
        >
          {uploadButton}
        </Upload>

        <Button onClick={this.handleSubmit} disabled={fileList.length == 0}// this button click will trigger the manual upload
        >
          Подтвердить
        </Button>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { report } = state.autoPicker;
  const { order } = state.userOrder;
  return {
    report, order
  };
}

export default connect(mapStateToProps)(UploadPhoto);



