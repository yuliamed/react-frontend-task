import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import UserService from "../../services/userService";
import jwt from 'jwt-decode'
import { LoadingOutlined, PlusOutlined, PlusSquareOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Card, Col, Row, Form, Image, Upload, message } from "antd";
import { BASE_USER_PICTURE } from "../../constants/const";
import ImgCrop from 'antd-img-crop';
import Header from "../common/headers/Header";
import './modal.css';
import { changePass, deletePhoto, getPhoto, savePhoto } from "../../actions/account";

let thisObj;
let isEdited = false;
var isHiddenError = true;
const uploadButton = (
  <div>
    {<PlusOutlined />}
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

class Profile extends Component {
  constructor(props) {
    super(props);
    let decodedToken = jwt(props.user.token);
    this.state = {
      id: decodedToken.id,
      roles: decodedToken.role,
      user: {
        name: "",
        surname: "",
        email: "",
        imageUrl: "",
      },
      account: {
        isPassChanged: "",
      },
      louding: false,
      isModalVisible: false,
      isPassChanging: false,
      token: "",
      newPass: "",
      confirmNewPass: "",
      message: props.message,
      imageData: null
    };
    this.onChangeProfile = this.onChangeProfile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDeleteImage = this.onDeleteImage.bind(this);
    this.onSaveImage = this.onSaveImage.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onCancelNewPass = this.onCancelNewPass.bind(this);
    thisObj = this;
  }

  async componentDidMount() {
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Navigate to="/sign-in" />;
    }
    console.log("user id state " + this.state.id);
    UserService.getProfile(this.state.id).then(
      data => {
        console.log("data " + data.name);
        thisObj.setState({ user: data, louding: true })
      }
    );

    const { dispatch } = this.props;
    dispatch(getPhoto(localStorage.getItem("userId"))).then(
      (responce) => {
        this.setState({ imageData: responce })
      })
  }


  onChangeProfile() {
    if (isEdited) {
      console.log("id for saving: " + this.state.id);
      UserService.editProfile(this.state.id, this.state.user).then(
        () => {
          alert("User new profile data was saved!");
          isEdited = false;
          this.render();
        }
      );
    }
  }

  onChangePass(e) {
    UserService.recoverPass(this.state.user.email).then(
      () => {
        alert("Check your email and input reset token to change password!");
        this.setState({ isPassChanging: true });
        this.render();
      }
    ).catch(() => {
      alert("Error with your email or network!");
      this.setState({ isPassChanging: false });
      this.render();
    });
  };

  onCancelNewPass(e) {
    this.setState({ isPassChanging: false });
    this.render();
  }

  onSaveNewPass(e) {

    const { dispatch } = this.props;
    if (this.state.newPass == this.state.confirmNewPass) {
      dispatch(changePass(this.state.newPass, this.state.token))
        .then(
          (responce) => {
            alert("We changed your pass!");
            console.log(responce)
            this.setState({ isPassChanging: false });
            this.render();
          }
        )
        .catch(() => {
          const { message } = this.props;
          isHiddenError = false;
          this.setState({ ...this.state, message: message, });
        })
    } else {
      alert("You didn't confirm yoour new pass!")
    }
  }

  onSaveImage(image) {
    const { dispatch } = this.props;
    dispatch(savePhoto(localStorage.getItem("userId"), image)).then(
      (responce) => {
        console.log(responce)
        this.setState({ user: responce, imageData: image })
      },
      getPhoto(localStorage.getItem("userId"))).then(
        (responce) => {
          this.setState({ imageData: responce })
        }
      )
  }

  onDeleteImage() {
    console.log("delete")
    const { dispatch } = this.props;
    dispatch(deletePhoto(localStorage.getItem("userId"))).then(
      (resp) => {
        this.setState({ user: resp });
        this.setState({ imageData: null });
      })
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value;
    let newUser = { ...this.state.user };
    newUser[name] = value;
    this.setState({
      ...this.state, user: newUser
    });
  }

  beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M;
  }

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
    const { user, louding } = this.state;
    let modal = null;
    if (this.state.isPassChanging) {
      modal =
        <Form>
          <Form.Item
            label="Token:"
            name="Token"
            rules={[
              {
                required: true,
              }
            ]}>
            <Input
              placeholder="Token"
              onChange={e => this.setState({ ...this.state, token: e.target.value })} />
          </Form.Item>


          <Form.Item
            label="New pass"
            name="New pass"
            rules={[
              {
                required: true,
              }
            ]}>
            <Input.Password
              placeholder="New pass"
              onChange={e => this.setState({ ...this.state, newPass: e.target.value })} />
          </Form.Item>



          <Form.Item
            label="Confirm new pass"
            name="Confirm new pass"
            rules={[
              {
                required: true,
              }
            ]}>
            <Input.Password
              placeholder="Confirm new pass"
              onChange={e => this.setState({ ...this.state, confirmNewPass: e.target.value })} />
          </Form.Item>
          <Row>
            <Col>
              <Button onClick={(e) => this.onSaveNewPass(e)} >Save new pass</Button>
            </Col>
            <Col>
              <Button onClick={(e) => this.onCancelNewPass(e)} >Cancel</Button>
            </Col>
          </Row>


          <label hidden={isHiddenError}
            style={
              { color: "red" }
            }>Error of changing pass - {this.state.message}</label>
        </Form>
    }

    return (

      <div className="site-card-border-less-wrapper"
      >
        <Header />
        <Card bordered={true}
          style={{
            marginLeft: '2%',
            width: '60%',
            backgroundColor: "#f0f2f5",
            padding: "2%"
          }}
        >
          <Form onChange={
            () => {
              isEdited = true;
            }
          }>
            <Image
              style={{
                padding: "2%"
              }}
              src={this.state.imageData == null ? BASE_USER_PICTURE : `data:image/jpeg;base64,${this.state.imageData}`}
              preview={false}
            />
            <Row >
              <Col>
                <ImgCrop
                  style={{
                    height: "30px"
                  }}
                //rotate
                >
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
              </Col>


              <Col> <Button label="Delete photo" style={{

              }} onClick={e => { this.onDeleteImage(e) }}><DeleteOutlined />
              </Button>

              </Col>
            </Row>




            <Form.Item
              label="Email">
              <Input label="Email" placeholder="Email"
                value={user.email}
                type='email'
                name="email"
                onChange={e =>
                  this.handleChange(e)}
              ></Input>
            </Form.Item>
            <Form.Item label="Name">
              <Input placeholder="Name"
                value={user.name}
                autoComplete="name"
                name="name"
                type="text"
                onInput={e => this.handleChange(e)}></Input>
            </Form.Item>

            <Form.Item label="Surname">
              <Input placeholder="Surname"
                value={user.surname}
                type="text"
                name="surname"
                onChange={e => this.handleChange(e)}>

              </Input></Form.Item>

            <Button onClick={() => this.onChangeProfile()} disabled={!isEdited}>Save Profile</Button>
            <Button onClick={(e) => {
              this.onChangePass(e)
            }} disabled={false} hidden={this.state.isPassChanging}>Change Pass</Button>


          </Form>{modal}
        </Card >
      </div >
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { account } = state.account;
  const { message } = state.message;
  return {
    user,
    account,
    message
  };


}

export default connect(mapStateToProps)(Profile);


// import React from 'react'
// import { useState } from 'react';
// import { Upload } from 'antd';
// import ImgCrop from 'antd-img-crop';
// export default function Profile() {
//   const [fileList, setFileList] = useState([
//     {
//       uid: '-1',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//   ]);

//   const onChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

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

//   return (
//     <ImgCrop rotate>
//       <Upload
//         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//         listType="picture-card"
//         fileList={fileList}
//         onChange={onChange}
//         onPreview={onPreview}
//       >
//         {fileList.length < 5 && '+ Upload'}
//       </Upload>
//     </ImgCrop>
//   );
// };
