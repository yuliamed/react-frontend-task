import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Layout, Space, Col } from 'antd';
import UserService from "../../services/userService";
import { connect } from "react-redux";
import { signIn } from "../../actions/auth";
import Header from '../common/headers/Header';
import { changePass } from "../../actions/account";
const { Content, Footer } = Layout;
var isButtonDisabled = true;
var isHiddenError = true;
class WithNavigate extends React.Component {

  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onForgetPass = this.onForgetPass.bind(this);
    this.onSaveNewPass = this.onSaveNewPass.bind(this);
    this.state = {
      email: "",
      pass: "",
      louding: false,
      isPassChanging: false,
    };
  }

  onChange() {
    isHiddenError = true;
    isButtonDisabled = true;
    if (this.state.email != undefined && this.state.pass != undefined
      && this.state.email != "" && this.state.pass != "") {
      isButtonDisabled = false;
    }
    //console.log(isButtonDisabled);
  }

  onSignIn(e) {
    isHiddenError = true;
    this.setState(
      {
        louding: true,
      }
    );
    const { dispatch } = this.props;
    let props = this.props;
    dispatch(signIn(this.state.email, this.state.pass))
      .then(() => {
        e.preventDefault();
        this.props.navigate("../", { replace: true });
      })
      .catch(() => {
        isHiddenError = false;
        this.setState({ ...this.state, louding: false })
        console.log("!!!catch " + this.state.louding)
      });
    e.preventDefault();
  }

  onForgetPass(e) {
    UserService.recoverPass(this.state.email).then(
      () => {

        alert("Проверьте указанную почту и введите токен из полученного сообщения!");
        this.setState({ isPassChanging: true });
        this.render();
      }
    ).catch(() => {
      alert("Проблемы с отпрвкой сообщения на вашу пойту!");
      this.setState({ isPassChanging: false });
      this.render();
    });
  }

  onSaveNewPass(e) {
    const { dispatch } = this.props;
    if (this.state.newPass == this.state.confirmNewPass) {
      e.preventDefault();
      dispatch(changePass(this.state.newPass, this.state.token))
        .then(
          () => {

            alert("Пароль был изменён!");
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
      alert("Вы не подтвердили свой пароль!")
    }
  }
  validateMessages = {

    required: '${label} является обязательным полем!',
    types: {
      email: '${label} неверно',
      number: '${label} неверно!',
    },
  };

  onCancelNewPass(e) {
    this.setState({ isPassChanging: false });
    this.render();
  }

  render() {
    const { isLoggedIn, message } = this.props;
    let modal = null;
    if (this.state.isPassChanging) {
      modal =
        <div >
          <br/>
          <br/>
          <p>
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
          </p>
          <p >
            <Form.Item
              label="Новый пароль:"
              name="Новый пароль"
              rules={[
                {
                  required: true,
                }
              ]}>
              <Input.Password
                placeholder="Новый пароль"
                onChange={e => this.setState({ ...this.state, newPass: e.target.value })} />
            </Form.Item>
          </p>
          <p>
            <Form.Item
              label="Подтвердите новый пароль:"
              name="Подтвердите новый пароль"
              rules={[
                {
                  required: true,
                }
              ]}>
              <Input.Password
                placeholder="Подтвердите новый пароль"
                onChange={e => this.setState({ ...this.state, confirmNewPass: e.target.value })} />
            </Form.Item>
          </p>
          <Button onClick={(e) => this.onSaveNewPass(e)} >Сохранить</Button>
          <Col>
              <Button onClick={(e) => this.onCancelNewPass(e)} >Отмена</Button>
            </Col>
        </div>
    }
    return (
      <div>
        <Header />
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, align: 'center', }}>
          <Space direction="vertical" wrap>
            <Form
              style={{
                width: "400px",
                resize: "vertical",
                padding: '15px',
                "border-radius": '15px',
                border: 0,
                "box-shadow": '4px 4px 10px rgba(0,0,0,0.06)',
                "background-color": "#fafafa",
              }}

              name="basic"
              onChange={this.onChange()}
              initialValues={{ remember: true }}
              onSubmitCapture={this.onSignIn}
              autoComplete="off"
              validateMessages={this.validateMessages}
            >
              <Form.Item>
                <h1>Введите данные</h1>
              </Form.Item>

              <Form.Item
                name="Email"
                label="Email" rules={[
                  {
                    type: 'email',
                    required: true,
                  }]}
              >
                <Input placeholder="email"
                  onChange={e =>
                    this.setState({ ...this.state, email: e.target.value })} />
              </Form.Item>
              <div hidden={this.state.isPassChanging}>
                <Form.Item

                  label="Пароль"
                  name="Пароль"
                  rules={[{
                    required: true,
                  }]}>
                  <Input.Password placeholder="Пароль"
                    hidden={this.state.isPassChanging}
                    onChange={(e) => {
                      this.setState({ ...this.state, pass: e.target.value })
                    }
                    } />
                </Form.Item>
              </div>

              <Form.Item >
                <label hidden={isHiddenError}>Проверьте данные </label>
              </Form.Item>
              <Space direction="vertical" wrap>
                <Form.Item  >
                  <Button type="primary" shape="round" htmlType="submit" 
                  disabled={isButtonDisabled} hidden={this.state.isPassChanging}>
                    Вход
                  </Button>
                  {message && (

                    <p className="alert alert-danger" role="alert">
                      {message}
                    </p>

                  )}
                </Form.Item>

                <Form.Item >
                  <a onClick={(e) => this.onForgetPass(e)} hidden={this.state.isPassChanging}>Забыли пароль?</a>
                </Form.Item>
                <>
                  {modal}
                </>
              </Space>
            </Form>
          </Space>
        </Content>
      </div >
    );
  }
}

function LoginComponent(props) {
  let navigate = useNavigate();
  return <WithNavigate {...props} navigate={navigate} />
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}
export default connect(mapStateToProps)(LoginComponent);
