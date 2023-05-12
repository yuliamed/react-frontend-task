import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Layout, Space } from 'antd';
import { connect } from "react-redux";
import { recoverPass, signIn } from "../../actions/auth";
import Header from '../common/headers/Header';
import ChangePassModal from './ChangePassModal';
import { changePass } from '../../actions/account';

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

  onCancelNewPass() {
    this.setState({ isPassChanging: false });
  }

  onSaveNewPass() {
    this.setState({ isPassChanging: false });
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
      .catch((e) => {
        isHiddenError = false;
        this.setState({ ...this.state, louding: false })
        console.log("!!!catch ")
      });
    e.preventDefault();
  }

  onForgetPass(e) {
    isHiddenError = true;
    const { dispatch } = this.props;
    dispatch(recoverPass(this.state.email))
      .then(() => {
        alert("Проверьте указанную почту и введите токен из полученного сообщения!");
        this.setState({ isPassChanging: true });
      })
      .catch(() => {
        alert("Проблемы с отпрaвкой сообщения на вашу почту!");
        this.setState({ isPassChanging: false });
      });
  }

  validateMessages = {
    required: '${label} является обязательным полем!',
    types: {
      email: '${label} неверно',
      number: '${label} неверно!',
    },
  };


  render() {
    const { isLoggedIn, message } = this.props;
    let modal = null;
    if (this.state.isPassChanging) {
      modal = <ChangePassModal onCancel={this.onCancelNewPass} onSave={this.onSaveNewPass} email={this.state.email} />;
    }

    let loginForm =
      <>
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

        <Space direction="vertical" wrap>
          <Form.Item  >
            <Button type="primary" shape="round" htmlType="submit"
              disabled={isButtonDisabled} hidden={this.state.isPassChanging}>
              Вход
            </Button>
            {message && (

              <Form.Item
                style={
                  { color: "red" }
                }>{message}</Form.Item>

            )}
          </Form.Item>

          <Form.Item >
            <a onClick={(e) => this.onForgetPass(e)} hidden={this.state.isPassChanging}>Забыли пароль?</a>
          </Form.Item>
          {/* <>
            {modal}
          </> */}
        </Space>
      </ >;

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
              {this.state.isPassChanging ? modal : loginForm}
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
