import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import UserService from "../../services/userService";
import jwt from 'jwt-decode'
import { LoadingOutlined, PlusOutlined, PlusSquareOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Card, Modal, Form, Image, Upload, message } from "antd";
import { BASE_USER_PICTURE } from "../../constants/const";
import ImgCrop from 'antd-img-crop';
import UserHeaderContainer from "../common/headers/UserHeaderContainer";

let thisObj;
let isEdited = false;

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
            louding: false,
        };
        this.getPictureUrl = this.getPictureUrl.bind(this);
        this.onChangeProfile = this.onChangeProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onDeleteImage = this.onDeleteImage.bind(this);
        this.addPicture = this.addPicture.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
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
    }

    onChangeProfile() {
        if (isEdited) {
            console.log("id for saving: " + this.state.id);
            UserService.editProfile(this.state.id, this.state.user).then(
                () => alert("User new profile data was saved!")
            );
        }
    }

    onChangePass() {
        if (isEdited) {
            UserService.editProfile(this.state.id, this.state.user).then(
                () => alert("User new profile data was saved!")
            );
        }
    }

    addPicture = info => {
        let image = null;
        console.log("info " + info);
        this.getBase64(info.file.originFileObj, imageUrl =>
            image = imageUrl, () => {
                console.log("info 2 " + info);
                //this.props.handleImageUrlChange(this.state.imageUrl);
            });
    }

    onDeleteImage() {
        console.log("delete")
        UserService.deletePicture(this.state.id);
    }

    getPictureUrl() {
        const { user } = this.state;
       // console.log("picture: " + this.state.user.imageUrl)
        if (user.imageUrl == null || this.state.user.imageUrl == "") {
            return BASE_USER_PICTURE;
        } else {
            return atob(this.state.user.imageUrl);
        }
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

    getBase64(img, callback) {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(img)
    }



    render() {
        const { user, louding } = this.state;

        //console.log("user name " + this.state.user.imageUrl + ":" + this.state.louding);

        return (

            <div className="site-card-border-less-wrapper"
            >
                <Card bordered={true}
                    style={{
                        marginLeft: '2%',
                        width: '35%',
                        backgroundColor: "#f0f2f5",
                        padding: "2%"
                    }}
                    onChange={
                        () => {
                            isEdited = true;
                        }
                    }>
                    <Image
                        style={{
                            width: '95%',
                            padding: "2%"
                        }}
                        src={BASE_USER_PICTURE}
                        preview={false}
                    />
                    <ImgCrop rotate>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            action={"https://www.mocky.io/v2/5cc8019d300000980a055e76"}
                            showUploadList={false}
                            beforeUpload={this.beforeUpload}
                            onChange={this.addPicture}
                        >
                            <Button style={{
                                marginLeft: '2%',
                                width: '35%',
                                backgroundColor: "#FFFFFF",
                                padding: "2%"
                            }} icon={<PlusSquareOutlined />} ></Button>
                        </Upload>
                    </ImgCrop>

                    <Button label="Delete photo" style={{
                        marginLeft: '2%',
                        width: '35%',
                        backgroundColor: "#FFFFFF",
                        padding: "2%"
                    }} onClick={e => { this.onDeleteImage(e) }}><DeleteOutlined /></Button>
                    <p>
                        <strong>Email:</strong>
                        <Input label="Email" placeholder="Email"
                            value={user.email}
                            type='email'
                            name="email"
                            onChange={e =>
                                this.handleChange(e)}
                        ></Input>
                    </p>
                    <p>
                        <strong>Name:</strong>
                        <Input placeholder="Name"
                            value={user.name}
                            autoComplete="name"
                            name="name"
                            type="text"
                            onInput={e => this.handleChange(e)}></Input>
                    </p>
                    <p>
                        <strong>Surname:</strong>
                        <Input placeholder="Surname"
                            value={user.surname}
                            type="text"
                            name="surname"
                            onChange={e => this.handleChange(e)}>

                        </Input>
                    </p>
                    <Button onClick={() => this.onChangeProfile()} disabled={!isEdited}>Save Profile</Button>
                    <Button onClick={() => this.onChangePass()} >Change Pass</Button>

                    {/* <strong>Authorities:</strong>
                 <ul>
                    {decodedToken.role &&
                        decodedToken.role.map((index) => <li key={index}>{index.authority}</li>)}
                </ul>  */}
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(Profile);