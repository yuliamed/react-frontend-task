import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { banUser, approveUser, addUserRole } from "../../actions/manageUsers";
import jwt from 'jwt-decode'
import { LoadingOutlined, PlusOutlined, PlusSquareOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Button, List, Input, Card, Modal, Form, Image, Upload, message, Checkbox, Layout, } from "antd";
import { BASE_USER_PICTURE } from "../../constants/const";

const CheckboxGroup = Checkbox.Group;
let thisObj;

class UserInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user_account,
      isRolesListChanging: false,
      rolesList: ["ADMIN", "USER", "AUTO_PICKER"],
      checkedList: []
    };

    this.getPictureUrl = this.getPictureUrl.bind(this);
    this.onBanProfile = this.onBanProfile.bind(this);
    this.onActivate = this.onActivate.bind(this);
    this.onSaveRoleList = this.onSaveRoleList.bind(this);
    this.getBase64 = this.getBase64.bind(this);
    this.countArr = this.countArr.bind(this);


    thisObj = this;
  }
  onSaveRoleList(e) {
    console.log(this.state.checkedList)
    const { dispatch } = this.props;
    e.preventDefault();

    this.state.checkedList.forEach((item) => {
      dispatch(addUserRole(this.state.user.id, item)).then((resp) => {
        this.setState({ user: resp });
        this.render();
      })
    })
    this.setState({ isRolesListChanging: false });
    alert("User " + this.state.user.name + " " + this.state.user.surname + " " + "was changed!");

  }

  onBanProfile(e, id, isBanned) {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(banUser(id, isBanned)).then((resp) => {
      alert("User " + resp.name + " " + resp.surname + " " + "was changed!");
      this.setState({ user: resp });
      this.render();
    })
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

  onActivate(e, id) {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(approveUser(id)).then((resp) => {
      alert("User " + resp.name + " " + resp.surname + " " + "was approved!");
      this.setState({ user: resp });
      this.render();
    })
  }

  countArr() {
    let arr = this.state.rolesList;
    let userArr = this.state.user.roles;
    for (let i = 0; i < userArr.length; i++) {
      arr = arr.filter(arr => arr != userArr[i].name);
    }
    this.setState({ rolesList: arr })
  }

  getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  async componentDidMount() {
    this.setState({ user: this.props.user_account });

  }

  render() {

    let user = this.state.user;
    const checkBan = () => {
      if (user.banDate == null) return "No"
      else return "Yes"
    }
    const checkBanButton = () => {
      if (user.banDate == null) return "Ban"
      else return "Unban"
    }
    let activationMode = null;
    if (user.isActive) {
      activationMode = <p><strong style={{
        color: "#304B26"
      }}>Active</strong></p>
    } else {
      activationMode = <Button onClick={(e) => {
        this.onActivate(e, user.id)
      }} disabled={false} hidden={this.state.isPassChanging}>Activate</Button>
    }

    const onListChange = (list) => {
      this.setState({ checkedList: list });
    }

    let changeRolesList = null;
    if (this.state.isRolesListChanging) {
      changeRolesList = <>
        <p>CHANGING</p>
        <CheckboxGroup options={this.state.rolesList}
          onChange={onListChange} />
        <Button onClick={(e) => this.onSaveRoleList(e)}>Save</Button>
      </>
    } else {
      changeRolesList = <Button onClick={() => {
        this.setState({ isRolesListChanging: true });
        this.countArr();
      }}>ChangeList</Button>
    }

    return (

      <
        >

        <Form className="form-user-card" bordered={true}
          style={{
            marginLeft: '2%',
            width: '350px',
            backgroundColor: "#f0f2f5",
            padding: "2%",
          }}
        >
          <Image
            style={{
              width: '70%',
              padding: "2%"
            }}
            src={BASE_USER_PICTURE}
            preview={false}
          />
          <p>
            <strong>Email:</strong>
            <label

            >{user.email}
            </label>
          </p>
          <p>
            <strong>Name:</strong>
            <label

            >{user.name}
            </label>
          </p>
          <p>
            <strong>Surname:</strong>
            <label
            >{user.surname}
            </label>

          </p>
          <p>
            <strong>Roles:</strong>
            <List>{user.roles.map(home => <p>{home.name}</p>)}</List>

          </p>
          <p>
            <strong>Is banned: </strong>
            <label>{checkBan()}</label>
          </p>
          <Layout align="center">
            {activationMode}
            {changeRolesList}
            <Button onClick={(e) => {
              if (user.banDate == null)
                this.onBanProfile(e, user.id, true);
              else this.onBanProfile(e, user.id, false);
            }}>{checkBanButton()}</Button></Layout>

        </Form >
      </ >
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

export default connect(mapStateToProps)(UserInfoComponent);