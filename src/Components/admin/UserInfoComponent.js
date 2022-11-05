import React, { Component } from "react";
import { connect } from "react-redux";
import { banUser, approveUser, addUserRole } from "../../actions/manageUsers";
import { Button, List, Card, Image, Checkbox, Layout, Row, Col, Descriptions } from "antd";
import { BASE_USER_PICTURE } from "../../constants/const";
import { getPhoto, } from "../../actions/account";
const { Meta } = Card;
const CheckboxGroup = Checkbox.Group;
let thisObj;

class UserInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user_account,
      isRolesListChanging: false,
      rolesList: ["ADMIN", "USER", "AUTO_PICKER"],
      checkedList: [],
      imageData: null
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
    const { dispatch } = this.props;
    dispatch(getPhoto(this.props.user_account.id)).then(
      (responce) => {
        this.setState({ imageData: responce })
      })
  }

  render() {

    let user = this.state.user;
    const checkBan = () => {
      if (user.banDate == null) return "No"
      else return "Yes"
    }
    const checkBanButton = () => {
      if (user.banDate == null) return "Заблокировать"
      else return "Разблокировать"
    }
    let activationMode = null;
    if (user.isActive) {
      activationMode = <p><strong style={{
        color: "#304B26"
      }}>Активный</strong></p>
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
        <Button onClick={(e) => this.onSaveRoleList(e)}>Сохранить</Button>
      </>
    } else {
      changeRolesList = <Button onClick={() => {
        this.setState({ isRolesListChanging: true });
        this.countArr();
      }}>Добавить роль</Button>
    }

    return (

      <>
        <Card bordered={true}
          style={{
            marginRight: '4%',
            marginLeft: '4%',
            backgroundColor: "#ffffff",
            border:"red"
          }}
        >
          <Row align="middle">
            <Col span={6} >
              <Image
                style={{
                  padding: "2%",
                }}
                src={this.state.imageData == null ? BASE_USER_PICTURE : `data:image/jpeg;base64,${this.state.imageData}`}
                preview={false}
              />
            </Col>
            <Col span={14} >
              <Meta style={{ "font-weight": 'bold', margin: 10 }}
                title={this.state.user.name + " " + this.state.user.surname} />

              <Descriptions style={{ "font-weight": 'bold', margin: 10 }}>
                <Descriptions.Item
                  label="Последнее посещения портала"
                  style={{ margin: '0 16px' }}
                >
                  {this.state.user.lastVisitDate.substr(0, 10) + " " + (this.state.user.lastVisitDate.substr(11, 15))}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions style={{ "font-weight": 'bold', margin: 10 }}>
                <Descriptions.Item
                  label="Email"
                  style={{ margin: '0 16px' }}
                >
                  {user.email}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions style={{ "font-weight": 'bold', margin: 10 }}>
                <Descriptions.Item
                  label="Роли пользователя"
                  style={{ margin: '0 16px' }}
                >
                  {user.roles.map(home => <p>{home.name}</p>)}
                </Descriptions.Item>
              </Descriptions>

              <Descriptions style={{ "font-weight": 'bold', margin: 10 }}>
                <Descriptions.Item
                  label="Заблокирован?"
                  style={{ margin: '0 16px' }}
                >
                  {checkBan()}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={4}>
              <Layout align="center">
                {activationMode}
                {changeRolesList}
                <Button onClick={(e) => {
                  if (user.banDate == null)
                    this.onBanProfile(e, user.id, true);
                  else this.onBanProfile(e, user.id, false);
                }}>{checkBanButton()}</Button></Layout>
            </Col>
          </Row>


        </Card >
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